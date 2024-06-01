import React, { useRef, useState, Dispatch, SetStateAction } from "react";
import { CiSearch } from "react-icons/ci";
import { IConversation } from "@/app/state/chatbot/chatBoxState";
import { assistantState } from "@/app/state/chatbot/assistantState";
import { useRecoilState } from "recoil";
import {
  chatIsChatBoxState,
  chatListState,
} from "@/app/state/chatbot/chatBoxState";

interface Iquestion {
  idx: number;
  savedQuetions: string;
  savedAnswer: string;
}

interface props {
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  setSavedContent: Dispatch<
    SetStateAction<{
      savedQuetions: string;
      savedAnswer: string;
    }>
  >;
}

const Section2 = ({ question, setQuestion, setSavedContent }: props) => {
  // 리코일 채팅 내역 저장

  const [chatList, setChatList] =
    useRecoilState<IConversation[]>(chatListState);
  // 채팅 박스 열지 말지
  const [ischatBoxState, setIsChatBoxState] =
    useRecoilState(chatIsChatBoxState);
  const chatInputRef = useRef<HTMLInputElement | null>(null);

  const questionList: Iquestion[] = [
    {
      idx: 1,
      savedQuetions: "이력이 궁금해요",
      savedAnswer: "찬홍님은 현재 Frontend 개발자로 부산에서 재직중입니다.",
    },
    {
      idx: 2,
      savedQuetions: "사용 스킬이 궁금해요",
      savedAnswer: "React , NextJs , node , mysql 등의 스킬을 가지고 있습니다.",
    },
    { idx: 3, savedQuetions: "누구인가요", savedAnswer: "27살 남자입니다." },
    {
      idx: 4,
      savedQuetions: "관심사가 궁금해요",
      savedAnswer:
        "개발 공부,넷플릭스 보기,어떻게 살아갈까에 대한 고민을 많이 합니다.",
    },
  ];

  const savedQuestionExecute = (savedQuetions: string, savedAnswer: string) => {
    setSavedContent({
      savedQuetions: savedQuetions,
      savedAnswer: savedAnswer,
    });
    setIsChatBoxState(true);
  };

  const enterButton = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (chatInputRef.current) {
        setQuestion(chatInputRef.current.value);
        setIsChatBoxState(true);
        chatInputRef.current.value = "";
      }
    }
  };
  const askQuestion = () => {
    if (chatInputRef.current) {
      setQuestion(chatInputRef.current.value);
      setIsChatBoxState(true);
      chatInputRef.current.value = "";
    }
  };

  return (
    <section
      className={`w-full max-w-[1800px] m-auto flex justify-center mt-[40px] mb-20 `}
    >
      <div
        className={` w-11/12 md:w-11/12 lg2:w-11/12 3xl:w-10/12 6xl:w-11/12 p-4`}
      >
        <div className={"text-center text-[40px] font-bold"}>
          Ask a question about chanhong's information
        </div>
        <div className={"flex justify-center space-x-2 my-8"}>
          {questionList.map((item: Iquestion, index: number) => (
            <button
              key={index}
              className="px-4 py-2 rounded-[20px] font-semibold bg-gray-100 hover:bg-[#0A0044] hover:text-slate-200 transition-colors duration-300"
              type={"button"}
              onClick={() =>
                savedQuestionExecute(item.savedQuetions, item.savedAnswer)
              }
            >
              {item.savedQuetions}
            </button>
          ))}
        </div>
        <div className={"flex justify-center items-center"}>
          <div
            className={
              "w-[1000px] flex border-2 mt-4 outline-[1px] focus-within:border-[#0A0044]"
            }
          >
            <input
              type="text"
              placeholder="찬홍님에 대해 궁금한 점을 입력해보세요."
              className={"w-full p-4 text-[20px] outline-none"}
              onKeyUp={enterButton}
              ref={chatInputRef}
            />
            <button
              onClick={askQuestion}
              type={`button`}
              className={`w-[50px] rounded-xl`}
            >
              <CiSearch size={40} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
