import React, { useRef, useState } from "react";
import useElementObserve from "@/hooks/useElementObserve";

import Link from "next/link";

const Section4 = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { flag, flagClass } = useElementObserve(targetRef);

  return (
    <div
      className={`w-full max-w-[1800px] m-auto flex justify-center mt-[150px] mb-20 ${flagClass}`}
    >
      <div
        className={` w-11/12 md:w-11/12 lg2:w-11/12 3xl:w-10/12 6xl:w-11/12 p-4`}
      >
        <Link href={"/career"}>
          <h2
            className={` font-bold mb-4 text-[40px] md:text-[50px] 3xl:text-[60px] 6xl:text-[70px] pb-4 border-b-2`}
          >
            <span className="text-container">Career</span>
          </h2>
        </Link>
        <div className={`flex`} ref={targetRef}>
          <div className="w-4/12 flex pr-2 mx-2 flex-col border-r-2">
            <p className=" text-[20px] md:text-[30px] 3xl:text-[40px] 6xl:text-[50px] text-center">
              (주) 현회사
            </p>
            <div className={`flex justify-center mt-4`}>
              <ul className={`md:w-full 3xl:w-11/12 6xl:w-10/12 flex flex-col`}>
                <li className="flex items-center md:text-[15px] lg:text-[18px] 3xl:text-[22px] 6xl:text-[25px]  my-3">
                  <p className="flex mr-2 w-3/12">
                    <span className={`font-bold  w-11/12`}>포지션</span>
                    <span className={`font-bold  w-1/12`}> :</span>
                  </p>
                  <p>Fronted-developer</p>
                </li>
                <li className="flex items-center md:text-[15px] lg:text-[18px] 3xl:text-[22px] 6xl:text-[25px]  my-3">
                  <p className="flex mr-2 w-3/12">
                    <span className={`font-bold  w-11/12`}>재직기간</span>
                    <span className={`font-bold  w-1/12`}> :</span>
                  </p>
                  <p>2023.09.04 ~</p>
                </li>
                <li className="flex items-center md:text-[15px] lg:text-[18px] 3xl:text-[22px] 6xl:text-[25px]  my-3">
                  <p className="flex mr-2 w-3/12">
                    <span className={`font-bold  w-11/12`}>직급</span>
                    <span className={`font-bold  w-1/12`}> :</span>
                  </p>
                  <p>주니어 매니저</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-4 w-8/12 ">
            <div className="ml-6">
              <p className=" text-[20px] mb-4 md:text-[30px] 3xl:text-[40px] 6xl:text-[50px] text-center">
                로위너스 신규 어플 출시
              </p>
              <ul className="mb-4 list-disc md:w-10/12 lg:w-8/12 3xl:w-6/12 6xl:w-4/12 m-auto text-[30px] leading-[50px]	">
                <li>NextJs 풀스택 개발</li>
                <li>쿠폰, 문의 단 개발</li>
                <li>앱 관리자 홈페이지 개발</li>
              </ul>
              <p className="mb-4 text-[20px] md:text-[30px] 3xl:text-[40px] 6xl:text-[50px] text-center">
                자사 홈페이지 유지보수
              </p>
              <ul className="mb-4 list-disc md:w-10/12 lg:w-8/12 3xl:w-6/12 6xl:w-4/12 m-auto text-[30px] leading-[50px]	">
                <li>자사 채용 홈페이지 당담 개발</li>
                <li>전 센터 홈페이지 유지보수</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .text-container {
            position: relative;
          }

          .text-container::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 4px;
            background-color: black;
            transition: width 0.3s ease;
          }

          .text-container:hover::before {
            width: 100%; /* 호버 시 가로 크기를 100%로 늘려 라인이 나타나도록 함 */
          }
        `}
      </style>
    </div>
  );
};

export default Section4;
