import React from "react";
import Image from "next/image";
import botIcon from "../../public/image/botIcon.webp";

export const MainSideChatBot = () => {
  return (
    <div className={`fixed z-50 right-[3%] bottom-[100px]`}>
      <button
        type={`button`}
        className={`relative hover:scale-125 transition transition-all`}
      >
        <Image
          src={botIcon}
          alt="챗봇 이미지"
          className={`w-[100px] h-[100px]`}
          width={100}
          height={100}
        />
      </button>
    </div>
  );
};
