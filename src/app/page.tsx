"use client";

import Layout from "./components/commons/Layout";
import axios from "axios";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

export default function Home() {
  return (
    <Layout>
      <section className=" w-full h-full mt-14 m-auto">
        <div className="flex items-center justify-center font-bold text-center text-[2.5em] bg-[#010118] h-60">
          <p className="text-white">Hong's Developer</p>
        </div>
        <div className="w-8/12 m-auto">
          <h3 className="font-bold text-[2.5em] mt-20">Me</h3>
          <div className="my-2 py-4">
            <ul className="text-xl leading-8 ">
              <li>
                React와 NodeJs를 활용한 프로젝트를 진행한 경험이 있습니다.
              </li>
              <li>
                레이아웃 구성, 기능 구현 및 서버 구축을 통해 프론트와 백엔드의
                역할에 대해서 경험해 보았습니다.
              </li>
              <li>
                기능 구현 시, 구상도, 컴포넌트, CSS 등 구현 전 설계의 중요성에
                대해 알고 있고,
              </li>
              <li>
                예상치 못한 추가적인 옵션들을 추가하기 위한 유연한 설계의
                필요성을 잘 알고 있습니다.
              </li>
              <li>
                이러한 경험을 바탕으로 지속적인 성장을 위해 노력하는 개발자가
                되겠습니다.
              </li>
            </ul>
          </div>
          <h3 className="font-bold text-[2.5em] mt-20">기술 스택</h3>
          <div className="flex w-full my-2 py-4">
            <ul className="w-1/2 mx-2">
              <li className="flex my-8 mx-4">
                <span className="w-12 h-12 mx-2">
                  <FaHtml5 className="w-12 h-12" />
                </span>
                <span>
                  HTML 마크업을 웹 접근성과 호환성을 생각하고 사용합니다.
                </span>
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
                  React 환경에서 상태 관리 , 컴포넌트 구조화를 이해하고 적용할
                  수 있습니다.
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
                <span>
                  HTML 마크업을 웹 접근성과 호환성을 생각하고 사용합니다.
                </span>
              </li>
              <li className="flex my-8 mx-4">
                <span className="w-12 h-12 mx-2">
                  <SiMysql className="w-12 h-12" />
                </span>
                <span>
                  HTML 마크업을 웹 접근성과 호환성을 생각하고 사용합니다.
                </span>
              </li>
              <li className="flex my-8 mx-4">
                <span className="w-12 h-12 mx-2">
                  <FaReact className="w-12 h-12" />
                </span>
                <span>
                  HTML 마크업을 웹 접근성과 호환성을 생각하고 사용합니다.
                </span>
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

          <h3 className="font-bold text-[2.5em] mt-20">My Blog List</h3>
          <div className="my-2 py-4">
            <ul className="w-full">
              <li className="border-2 w-full h-full p-6 my-2 text-xl rounded-xl">
                <button type="button" className="w-full h-full">
                  Next Image를 사용한 이미치 최적화 및 속도 개선(feat :
                  라이트하우스)
                </button>
              </li>
              <li className="border-2 w-full h-full p-6 my-2 text-xl rounded-xl ">
                <button type="button" className="w-full h-full">
                  예외처리란?( + 적용)
                </button>
              </li>
              <li className="border-2 w-full h-full p-6 my-2 text-xl rounded-xl">
                <button type="button" className="w-full h-full">
                  React Query ( feat: usequery,caching, stale )
                </button>
              </li>
              <li className="border-2 w-full h-full p-6 my-2 text-xl rounded-xl">
                <button type="button" className="w-full h-full">
                  네이버api를 이용한 Oauth2.0 로그인 구현(NextJs + NodeJs)
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
