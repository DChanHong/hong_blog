"use client";
import Layout from "@/components/commons/Layout";

import Section1 from "@/components/main/Section1";
import Section2 from "@/components/main/Section2";
import Section3 from "@/components/main/Section3";
import Loader from "@/components/commons/Loader";
import { MainChatBot } from "@/components/chatbot/MainChatBot";
import { MainSideChatBot } from "@/components/chatbot/MainSideChatBot";

import { IConversation } from "@/app/state/chatbot/chatBoxState";

import { useRecoilState } from "recoil";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { velogApi } from "@/hooks/velog/velog";
import axios from "axios";

import {
  chatIsChatBoxState,
  chatListState,
} from "@/app/state/chatbot/chatBoxState";

export default function Home() {
  const queryResult = useQueries({
    queries: [
      {
        queryKey: [velogApi().velogKey().VELOG_LIST],
        queryFn: () =>
          velogApi()
            .getVelogList()
            .then((obj) => obj),
      },
    ],
  });

  // 리코일 채팅 내역 저장
  const [chatList, setChatList] =
    useRecoilState<IConversation[]>(chatListState);
  // 채팅 박스 열지 말지
  const [ischatBoxState, setIsChatBoxState] =
    useRecoilState(chatIsChatBoxState);

  const [savedContent, setSavedContent] = useState<{
    savedQuetions: string;
    savedAnswer: string;
  }>({ savedQuetions: "", savedAnswer: "" });
  const { data: blogList, status: BlogListStatus } = queryResult[0];
  const [question, setQuestion] = useState<string>("");

  const test = async () => {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/cron/ip`
    );
  };

  return (
    <>
      <MainChatBot
        question={question}
        savedQuetions={savedContent.savedQuetions}
        savedAnswer={savedContent.savedAnswer}
      />
      {!ischatBoxState && <MainSideChatBot />}
      <Layout>
        <Section1 />
        <button onClick={test}>asdasdasdasd</button>
        <Section2
          question={question}
          setQuestion={setQuestion}
          setSavedContent={setSavedContent}
        />
        {BlogListStatus === "success" ? (
          <Section3 blogList={blogList} />
        ) : (
          <Loader />
        )}
      </Layout>
    </>
  );
}
