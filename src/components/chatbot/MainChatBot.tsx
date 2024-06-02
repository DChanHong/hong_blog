"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { threadState } from "@/app/state/chatbot/threadState";
import { assistantState } from "@/app/state/chatbot/assistantState";
import { IConversation } from "@/app/state/chatbot/chatBoxState";
import {
  chatIsChatBoxState,
  chatListState,
} from "@/app/state/chatbot/chatBoxState";
import { useRecoilState } from "recoil";
import {
  getAssistant,
  getThreadId,
  postMessage,
  createRun,
  retrieveRun,
  getListMessage,
  checkIp,
} from "@/hooks/gptAPI/gpt";

interface props {
  question?: string;
  savedQuetions?: string;
  savedAnswer?: string;
}

export const MainChatBot = ({
  question,
  savedQuetions,
  savedAnswer,
}: props) => {
  const chatInputRef = useRef<HTMLInputElement | null>(null);
  const [isChatPossible, setIsChatPossible] = useState<boolean>(true);

  const [apiLoading, setApiLoading] = useState<boolean>(false);

  // 리코일 채팅 내역 저장
  const [chatList, setChatList] =
    useRecoilState<IConversation[]>(chatListState);
  // 채팅 박스 열지 말지
  const [ischatBoxState, setIsChatBoxState] =
    useRecoilState(chatIsChatBoxState);
  // 쓰레드 아이디 저장
  const [threadStateId, setThreadStateId] = useRecoilState(threadState);
  // 어시스턴트 아이디 저장 (default값이고 바뀔일 없음)
  const [assistantStateId, setAssistantStateId] =
    useRecoilState(assistantState);

  useEffect(() => {
    // 이 경우 질문 시작
    if (question && question !== "") {
      startChat(question);
    }
  }, [question]);

  useEffect(() => {
    // 이 경우 질문 시작
    if (
      savedQuetions &&
      savedAnswer &&
      savedQuetions !== "" &&
      savedAnswer !== ""
    ) {
      const newChatList = chatList.length > 0 ? [...chatList] : [];
      setApiLoading(true);
      setTimeout(() => {
        newChatList.push({
          is_answer: false,
          message: savedQuetions,
        });
        newChatList.push({
          is_answer: true,
          message: savedAnswer,
        });
        setChatList(newChatList);
        setApiLoading(false);
      }, 3000);
    }
  }, [savedQuetions, savedAnswer]);

  useEffect(() => {
    chatPossible();
  }, [ischatBoxState]);

  // IP 체크
  const chatPossible = async () => {
    const result = await checkIp();
    setIsChatPossible(result);
  };

  //채팅 시작
  const startChat = async (question: string) => {
    if (!isChatPossible) {
      return;
    }
    setApiLoading(true);
    const newChatList = chatList.length > 0 ? [...chatList] : [];
    newChatList.push({
      is_answer: false,
      message: question,
    });

    // 어시스턴트 id존재하는지 확인
    let assistance_id = assistantStateId;
    if (assistance_id === "") {
      // 만약 어시스턴스가 없다면 어시스턴트 생성
      const result = await getAssistant().then((obj) => {
        return obj;
      });
      assistance_id = result;
      setAssistantStateId(result);
    }
    let thread_id = threadStateId;
    // 쓰레드가 존재하는지 확인
    if (thread_id === "") {
      // 만약 쓰레드가 없다면 생성

      const reuslt = await getThreadId();
      thread_id = reuslt;
      setThreadStateId(reuslt);
    }

    // 메세지 생성
    await postMessage(question, thread_id);

    // 이제 어시스턴트를 동작시키자
    const runId = await createRun(thread_id, assistance_id);

    // 이제 몇 초 간격으로 status completed 뜰때까지 리트리브 런 돌리기
    let completeStatus = false;
    // 런 다돌아갔는지 확인
    while (!completeStatus) {
      const status = await retrieveRun(thread_id, runId);
      if (status === "completed") {
        completeStatus = true;
      } else {
        // 아직 완료 안된 경우 1초 기다림
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    // 이제 메세지 리스트를 뽑아온다.
    if (completeStatus) {
      const result: any = await getListMessage(thread_id);
      const cleanedText = result.text.value.replace(/【\d+:\d+†source】/g, "");
      newChatList.push({
        is_answer: true,
        message: cleanedText,
      });
      setChatList(newChatList);
    }
    await chatPossible();
    setApiLoading(false);
  };

  const enterButton = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (chatInputRef.current) {
        const question = chatInputRef.current.value;
        await startChat(question);
        chatInputRef.current.value = "";
      }
    }
  };
  const askQuestion = async () => {
    if (chatInputRef.current) {
      const question = chatInputRef.current.value;
      await startChat(question);
      chatInputRef.current.value = "";
    }
  };

  return (
    <>
      <div
        className={`fixed w-screen z-40 h-screen bg-black bg-opacity-35 flex items-center justify-center
        ${
          ischatBoxState
            ? "transition translate-y-0 duration-500"
            : "transition -translate-y-[120%] duration-0"
        }
        `}
        onClick={() => {
          !apiLoading && setIsChatBoxState(!ischatBoxState);
        }}
      >
        <div
          className={`bg-white dark:bg-[#232323] w-[90%] lg:w-1/2 h-2/3 overflow-auto -translate-y-[10%] p-6 rounded-2xl z-50`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`flex flex-col justify-center border-b-[2px] pb-2`}>
            <p
              className={`relative text-center h-[40px] w-full font-bold mt-2 text-xl`}
            >
              궁금한점을 입력해주세요.
              <button
                type="button"
                onClick={() =>
                  !apiLoading && setIsChatBoxState(!ischatBoxState)
                }
                className={`absolute right-0 -bottom-[2.5px] rounded-full hover:bg-slate-200`}
              >
                <IoIosClose size={50} />
              </button>
            </p>
          </div>
          <div className={`h-[80%] overflow-y-auto border-x-2 border-b-2 p-2`}>
            <ul className={`flex flex-col space-y-1`}>
              {chatList.length > 0 &&
                chatList.map((item: IConversation, index: number) => (
                  <li
                    key={index}
                    className={`flex my-1 py-1 w-full ${
                      item.is_answer
                        ? "flex-row"
                        : "flex-row-reverse text-right"
                    }`}
                  >
                    <span
                      className={`px-3 py-1.5 rounded-xl max-w-[70%] break-all ${
                        item.is_answer
                          ? "bg-[#EFF4FB] dark:bg-[#1A222C] text-black dark:text-[#818A94] "
                          : "bg-[#3C50E0] text-white"
                      }`}
                    >
                      {item.message}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          {isChatPossible ? (
            <div className={`flex mt-2`}>
              {!apiLoading ? (
                <input
                  className={`w-full items-center p-2 border-2 rounded-xl`}
                  placeholder="ex) 찬홍님의 이력은 어떻게 되나요?"
                  ref={chatInputRef}
                  onKeyUp={enterButton}
                  disabled={apiLoading}
                />
              ) : (
                <div
                  className={`w-full flex justify-center relative p-2 border-2 rounded-xl`}
                >
                  <span className="loader"></span>
                </div>
              )}
              {!apiLoading ? (
                <button
                  onClick={askQuestion}
                  type={`button`}
                  className={`w-[40px] rounded-xl`}
                >
                  <CiSearch size={40} />
                </button>
              ) : (
                <div className="ml-2 border-t-[4px] border-blue-500 border-solid rounded-full h-10 w-10 animate-spin" />
              )}
            </div>
          ) : (
            <div className="font-bold text-red-500 text-center mt-4">
              5번 이상 질문하셨습니다. 10분 후에 다시 시도해주세요.
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .loader {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: block;
          margin: auto;
          position: absolute;
          top: 30%;
          color: #3c50e0;
          box-sizing: border-box;
          animation: animloader 2s linear infinite;
        }

        @keyframes animloader {
          0% {
            box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px,
              -38px 0 0 -2px;
          }
          25% {
            box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px,
              -38px 0 0 2px;
          }
          50% {
            box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 2px,
              -38px 0 0 -2px;
          }
          75% {
            box-shadow: 14px 0 0 2px, 38px 0 0 -2px, -14px 0 0 -2px,
              -38px 0 0 -2px;
          }
          100% {
            box-shadow: 14px 0 0 -2px, 38px 0 0 2px, -14px 0 0 -2px,
              -38px 0 0 -2px;
          }
        }
      `}</style>
    </>
  );
};
