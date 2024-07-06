import React, { useState } from "react";
import Image from "next/image";
import botIcon from "../../public/image/botIcon.webp";
import { chatIsChatBoxState } from "@/app/state/chatbot/chatBoxState";
import { useRecoilState } from "recoil";

export const MainSideChatBot = () => {
  const [ischatBoxState, setIsChatBoxState] =
    useRecoilState(chatIsChatBoxState);
  return (
    <div className={`fixed z-50 right-[3%] bottom-[100px]`}>
      <button
        type={`button`}
        onClick={() => setIsChatBoxState((prev) => !prev)}
        className={`relative hover:scale-125 transition-all`}
      >
        <Image
          src={botIcon}
          alt="챗봇 이미지"
          className={`w-[100px] h-[100px]`}
          width={100}
          height={100}
        />
        <div className={`ballon`}>챗봇에게 찬홍님에 대해 질문해보세요.</div>
      </button>
      <style jsx>{`
        .ballon {
          position: absolute;
          width: 200px;
          height: 80px;
          right: 20px;
          top: -85px;
          background: #484848;
          color: white;
          border-radius: 5px;
          padding: 12px 12.8px;
          border:1px solid 
          z-index: 1;
        }

        .ballon::after {
          content: "";
          position: absolute;
          top: 100%;
          right: 15px;
          border-width: 10px;
          border-style: solid;
          border-color: #484848 transparent transparent transparent;
        }
      `}</style>
    </div>
  );
};
