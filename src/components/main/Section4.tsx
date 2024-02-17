import React from "react";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

const Section4 = () => {
  return (
    <>
      <h3 className="font-bold text-[2.5em] mt-20">기술 스택</h3>
      <div className="flex w-full my-2 py-4">
        <ul className="w-1/2 mx-2">
          <li className="flex my-8 mx-4">
            <span className="w-12 h-12 mx-2">
              <FaHtml5 className="w-12 h-12" />
            </span>
            <span>HTML 마크업을 웹 접근성과 호환성을 생각하고 사용합니다.</span>
          </li>
          <li className="flex my-8 mx-4">
            <span className="w-12 h-12 mx-2">
              <FaCss3 className="w-12 h-12" />
            </span>
            <span>
              CSS Flex,Grid를 이용하여 레이아웃 설계를 할 수 있으며, CSS
              프레임워크로 Tailwind CSS를 사용하였습니다.
            </span>
          </li>
          <li className="flex my-8 mx-4">
            <span className="w-12 h-12 mx-2">
              <FaReact className="w-12 h-12" />
            </span>
            <span>
              React 환경에서 상태 관리 , 컴포넌트 구조화를 이해하고 적용할 수
              있습니다.
            </span>
          </li>
          <li className="flex my-8 mx-4">
            <span className="w-12 h-12 mx-2">
              <SiTypescript className="w-12 h-12" />
            </span>
            <span>
              TypeScript를 사용하여, 정적 타입 언어를 사용하는 이유를
              이해하였습니다.
            </span>
          </li>
        </ul>
        <ul className="w-1/2 mx-2">
          <li className="flex my-8 mx-4">
            <span className="w-12 h-12 mx-2">
              <FaNode className="w-12 h-12" />
            </span>
            <span>HTML 마크업을 웹 접근성과 호환성을 생각하고 사용합니다.</span>
          </li>
          <li className="flex my-8 mx-4">
            <span className="w-12 h-12 mx-2">
              <SiMysql className="w-12 h-12" />
            </span>
            <span>HTML 마크업을 웹 접근성과 호환성을 생각하고 사용합니다.</span>
          </li>
          <li className="flex my-8 mx-4">
            <span className="w-12 h-12 mx-2">
              <FaReact className="w-12 h-12" />
            </span>
            <span>HTML 마크업을 웹 접근성과 호환성을 생각하고 사용합니다.</span>
          </li>
          <li className="flex my-8 mx-4">
            <span className="w-12 h-12 mx-2">
              <IoLogoJavascript className="w-12 h-12" />
            </span>
            <span>
              ECMA Script6 및 브라우저 버전 호환성에 대한 이해도를 가지고
              있습니다.
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Section4;
