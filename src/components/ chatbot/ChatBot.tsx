"use client";
import React, { useState } from "react";
import { FcCustomerSupport } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

interface chatDto {
  idx: number;
  is_answer: boolean;
  message: string;
}

export const ChatBot = () => {
  const [baollonState, setBallonState] = useState<boolean>(false);
  const [chatState, setChatState] = useState<boolean>(false);

  const cahtEx: chatDto[] = [
    { idx: 0, is_answer: false, message: "찬홍님의 이력은 어떻게 되나요?" },
    { idx: 0, is_answer: true, message: "찬홍님의 이력은 XXXXXXXXX입니다." },
    { idx: 0, is_answer: true, message: "또 궁금한점이 있나요?" },
    { idx: 0, is_answer: false, message: "몇 년의 이력이 있나요?" },
    { idx: 0, is_answer: true, message: "~~~이력이 있어요" },
  ];
  return (
    <>
      <div className={`fixed right-[1%] bottom-[100px]`}>
        <button
          type={`button`}
          onClick={() => setChatState(!chatState)}
          className={`relative hover:scale-125 transition transition-all`}
        >
          <FcCustomerSupport
            size={50}
            onMouseOver={() => setBallonState(true)}
            onMouseOut={() => setBallonState(false)}
          />
          {baollonState && (
            <div className={`ballon`}>이력이 궁금하다면 클릭해보세요.</div>
          )}
        </button>
      </div>
      <div
        className={`fixed w-screen z-40 h-screen bg-black bg-opacity-35 flex items-center justify-center
        ${
          chatState
            ? "transition translate-y-0 duration-500"
            : "transition -translate-y-[120%] duration-0"
        }
        `}
        onClick={() => {
          setChatState(!chatState);
        }}
      >
        <div
          className={`bg-white dark:bg-[#232323] w-1/2 h-2/3 mb-40 p-6 rounded-2xl z-50`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`flex flex-col justify-center border-b-[2px] pb-2`}>
            <p
              className={`relative text-center h-[40px] w-full font-bold mt-2 text-xl`}
            >
              궁금한점을 입력해주세요.
              <button
                type="button"
                onClick={() => setChatState(!chatState)}
                className={`absolute right-0 -bottom-[2.5px] rounded-full hover:bg-slate-200`}
              >
                <IoIosClose size={50} />
              </button>
            </p>
          </div>
          <div className={`h-[80%] overflow-y-auto border-x-2 border-b-2 p-2`}>
            <ul className={`flex flex-col`}>
              {cahtEx.map((item: chatDto, index) => (
                <li
                  key={index}
                  className={`flex my-1 py-1 ${
                    item.is_answer ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <p>
                    <span
                      className={`px-3 py-2 rounded-xl w-1/2 ${
                        item.is_answer
                          ? "bg-stone-200 dark:bg-[#2A2A2A] text-black dark:text-white"
                          : "bg-purple-400 text-white"
                      }`}
                    >
                      {item.message}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className={` flex mt-2 `}>
            <input
              className={`w-full items-center p-2 border-2 rounded-xl`}
              placeholder="ex) 찬홍님의 이력은 어떻게 되나요?"
            />
            <button type={`button`} className={`w-[40px] rounded-xl`}>
              <CiSearch size={40} />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .ballon {
          position: absolute;
          width: 200px;
          height: 100px;
          right: 20px;
          top: -110px;
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
    </>
  );
};
