"use client";
import React from "react";
import Layout from "../components/common/Layout";
import { IoSearch } from "react-icons/io5";
import { FcBusinessman } from "react-icons/fc";
import Link from "next/link";
const Index = () => {
  return (
    <Layout>
      <section className="w-full mt-14 m-auto">
        <div className="flex items-center justify-center font-bold text-center text-[2.5em] bg-[#010118] h-60 mb-10">
          <p className="text-white">Blog</p>
        </div>

        <div className="w-8/12 m-auto">
          <div className="flex justify-between">
            <div className="w-8/12">
              <Link href={"/"} className="w-full ">
                <div className="font-bold text-[1.8em] my-4">
                  블로그 작성 제목입니다.
                </div>
                <div className="flex items-center pb-4">
                  <p className="border-2 mr-6 w-[4rem] h-[4rem]">
                    <FcBusinessman className="w-full h-full" />
                  </p>
                  <ul className="flex flex-col ">
                    <li>
                      <span className="text-[18px]">Hong</span>
                      <span className="text-[14px] ml-2 text-[#828282]">
                        2023-11-15
                      </span>
                    </li>
                    <li className="text-[#828282] text-[16px]">
                      코드 실행 중에 예기치 못한 에러가 발생했을 때가 있다.
                    </li>
                  </ul>
                </div>
                <div className="pb-10 border-b-2">
                  코드 실행 중에 예기치 못한 에러가 발생했을 때, 이로부터 코드의
                  실행 흐름을 복구할 수 있는데, 이를 예외처리(Excpetion
                  handling) 라고 한다.JavaScript는 기본적으로 싱글 스레드라서
                  스레드가 멈춘다는 것은 프로세스가 멈추는 것이라서, 예외처리는
                </div>
              </Link>
              <Link href={"/"} className="w-full ">
                <div className="font-bold text-[1.8em] my-4">
                  블로그 작성 제목입니다.
                </div>
                <div className="flex items-center pb-4">
                  <p className="border-2 mr-6 w-[4rem] h-[4rem]">
                    <FcBusinessman className="w-full h-full" />
                  </p>
                  <ul className="flex flex-col ">
                    <li>
                      <span className="text-[18px]">Hong</span>
                      <span className="text-[14px] ml-2 text-[#828282]">
                        2023-11-15
                      </span>
                    </li>
                    <li className="text-[#828282] text-[16px]">
                      코드 실행 중에 예기치 못한 에러가 발생했을 때가 있다.
                    </li>
                  </ul>
                </div>
                <div className="pb-10 border-b-2">
                  코드 실행 중에 예기치 못한 에러가 발생했을 때, 이로부터 코드의
                  실행 흐름을 복구할 수 있는데, 이를 예외처리(Excpetion
                  handling) 라고 한다.JavaScript는 기본적으로 싱글 스레드라서
                  스레드가 멈춘다는 것은 프로세스가 멈추는 것이라서, 예외처리는
                </div>
              </Link>
              <Link href={"/"} className="w-full ">
                <div className="font-bold text-[1.8em] my-4">
                  블로그 작성 제목입니다.
                </div>
                <div className="flex items-center pb-4">
                  <p className="border-2 mr-6 w-[4rem] h-[4rem]">
                    <FcBusinessman className="w-full h-full" />
                  </p>
                  <ul className="flex flex-col ">
                    <li>
                      <span className="text-[18px]">Hong</span>
                      <span className="text-[14px] ml-2 text-[#828282]">
                        2023-11-15
                      </span>
                    </li>
                    <li className="text-[#828282] text-[16px]">
                      코드 실행 중에 예기치 못한 에러가 발생했을 때가 있다.
                    </li>
                  </ul>
                </div>
                <div className="pb-10 border-b-2">
                  코드 실행 중에 예기치 못한 에러가 발생했을 때, 이로부터 코드의
                  실행 흐름을 복구할 수 있는데, 이를 예외처리(Excpetion
                  handling) 라고 한다.JavaScript는 기본적으로 싱글 스레드라서
                  스레드가 멈춘다는 것은 프로세스가 멈추는 것이라서, 예외처리는
                </div>
              </Link>
            </div>
            <div className="3/12">
              <div className=" px-2">
                <div className="flex border-2 mb-6 rounded-xl p-1 justify-between">
                  <input
                    className="mx-2 p-1 outline-none	"
                    type="text"
                    placeholder="Search for Keyword"
                  />
                  <button type="button">
                    <IoSearch size={30} />
                  </button>
                </div>
                <div>
                  <p className="text-center mt-4 text-[1.8em] font-bold">
                    Tags
                  </p>
                  <p className="text-[1.5em] font-semibold">Skill</p>
                  <ul>
                    <li className="ml-6 mt-2 text-[#858585]">#CSS</li>
                    <li className="ml-6 mt-2 text-[#858585]">#React</li>
                    <li className="ml-6 mt-2 text-[#858585]">#Next</li>
                    <li className="ml-6 mt-2 text-[#858585]">#Node</li>
                    <li className="ml-6 mt-2 text-[#858585]">#Redux</li>
                  </ul>
                  <p className="text-[1.5em] mt-4 font-semibold">
                    TroubleShooting
                  </p>
                  <ul>
                    <li className="ml-6 mt-2 text-[#858585]">
                      <button>#error</button>
                    </li>
                    <li className="ml-6 mt-2 text-[#858585]">
                      <button>#Debugging</button>
                    </li>
                    <li className="ml-6 mt-2 text-[#858585]">
                      <button>#Test</button>
                    </li>
                  </ul>
                </div>
                <p className="text-[1.5em] mt-4 font-semibold">CS</p>
                <ul>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#data structure</button>
                  </li>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#network</button>
                  </li>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#algorithm</button>
                  </li>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#OS</button>
                  </li>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#architecture</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
