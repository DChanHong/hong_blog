"use client";
import React, { useState } from "react";
import Link from "next/link";
import { DarkModeButton } from "../dark/DarkModeButton";

import { AiFillHome } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { FaGithub } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { SiVelog } from "react-icons/si";
// import { RouteChangeLoader } from "@/hooks/loadingHandler";
import Loader from "./Loader";

interface Wrapper {
  children: React.ReactNode;
}

const Layout = ({ children }: Wrapper) => {
  const [navData, setNavData] = useState<string>("");
  const [sideNavBar, setSideNavBar] = useState<boolean>(false);

  // const [pageMoveLoading, setPageMoveLoading] = useState<boolean>(false);
  // RouteChangeLoader(setPageMoveLoading);

  return (
    <>
      <div
        className={`min-h-[100%] dark:bg-[#2e2e2e] dark:text-[#b7babe] pb-[100px]`}
      >
        <header
          className={` fixed h-[100px]  top-0 w-full z-10 bg-black text-white 	`}
        >
          <div
            className={`relative flex h-full items-center sm:justify-normal	justify-between`}
          >
            <h1 className={`font-bold text-[15px] xs:text-[25px] mx-8`}>
              <Link href={"/"}>
                <span className="text-container">Hong Engineering</span>
              </Link>
            </h1>
            {/* <p className={`absolute top-8 right-14 sm:right-5 `}>
              <DarkModeButton />
            </p> */}

            <ul className=" flex">
              <li className={`hidden sm:block font-semibold text-[25px] mx-4`}>
                <Link href={"/blog"}>
                  <span className="text-container"> Blog</span>
                </Link>
              </li>
              {/* <li className={`hidden sm:block font-semibold text-[25px] mx-4`}>
                <Link href={"/career"}>
                  <span className="text-container">Career</span>
                </Link>
              </li> */}

              <li className={`block sm:hidden font-semibold text-[1.4em] mx-4`}>
                <button
                  onClick={() => setSideNavBar(!sideNavBar)}
                  type="button"
                  className="w-[2rem]"
                >
                  <GiHamburgerMenu size={"32"} className="underline_on_hover" />
                </button>
              </li>
            </ul>
          </div>
        </header>

        <nav
          className={`block z-10 w-full fixed border-2 bg-white top-0 min-h-[100%] h-[100%] sm:hidden ${
            sideNavBar ? "nav_open" : "nav_closed"
          }`}
        >
          <p className="flex flex-row-reverse m-1">
            <button
              type="button"
              onClick={() => setSideNavBar(!sideNavBar)}
              className="w-[2em] hover:bg-[#EFEFEF] rounded-xl"
            >
              <IoClose className="w-full h-full" />
            </button>
          </p>
          <div className="flex border-2 mb-6 rounded-xl p-1 justify-between m-4">
            <input
              className="mx-2 p-1 outline-none	"
              type="text"
              placeholder="Search for Keyword"
            />
            <button type="button">
              <IoSearch size={30} />
            </button>
          </div>
          <ul>
            <li>
              <Link
                className="flex items-center px-6 py-2 mt-4 mx-1 hover:bg-[#EFEFEF] hover:rounded-xl"
                href={"/"}
              >
                <p className="w-[2rem] mr-4">
                  <AiFillHome className="w-full h-full" />
                </p>
                <p className="text-[1rem] text-center">Home</p>
              </Link>
            </li>
            {/* <li>
              <Link
                className="flex items-center px-6 py-2 mt-4  mx-1 hover:bg-[#EFEFEF] hover:rounded-xl"
                href={"/career"}
              >
                <p className="w-[2rem] mr-4">
                  <BiSolidUser className="w-full h-full" />
                </p>
                <p className="text-[1rem] text-center">Career</p>
              </Link>
            </li> */}

            <li>
              <Link
                className="flex items-center px-6 py-2 mt-4 mx-1 hover:bg-[#EFEFEF] hover:rounded-xl"
                href={"/blog"}
              >
                <p className="w-[2rem] mr-4">
                  <BsBook className="w-full h-full" />
                </p>
                <p className="text-[1rem] text-center">Blog</p>
              </Link>
            </li>
          </ul>
        </nav>

        <div className={`h-full min-h-[calc(100vh-210px)]`}>{children}</div>
      </div>

      <footer>
        <div
          className={`flex items-center align-item justify-evenly bg-[#F9F9F9] dark:bg-[#000] h-[100px]`}
        >
          <ul>
            <li className={`font-bold text-[14px] xs:text-[20px]`}>
              성찬홍's More Info
            </li>
          </ul>
          <ul className={`flex space-x-4`}>
            <li className="w-[30px] xs:w-[40px]">
              <a
                href={"https://velog.io/@hongchee/posts"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiVelog className="w-full h-full" />
              </a>
            </li>

            <li className="w-[30px] xs:w-[40px]">
              <a
                href={"https://github.com/DChanHong"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-full h-full" />
              </a>
            </li>
          </ul>
        </div>
      </footer>

      <style jsx>
        {`
          .underline_on_hover {
            position: relative;
            text-decoration: none;
            cursor: pointer;
            color: inherit;
            width: 100%;
            height: 100%;
          }
          .underline_on_hover::before {
            content: "";
            position: absolute;
            width: 0%;
            height: 3px;
            bottom: -7px;
            left: 0;
            background-color: #fff;
            transition: width 0.3s ease-in-out;
          }
          .underline_on_hover:hover::before {
            width: 100%;
            transition: width 0.2s ease-in-out;
          }
          .nav_open {
            transform: translateY(0);
            transition: transform 0.3s ease-in-out;
          }
          .nav_closed {
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
          }
          .text-container {
            position: relative;
          }

          .text-container::before {
            content: "";
            position: absolute;
            bottom: -30%;
            left: 0;
            width: 0;
            height: 4px;
            background-color: white;
            transition: width 0.3s ease;
          }

          .text-container:hover::before {
            width: 100%; /* 호버 시 가로 크기를 100%로 늘려 라인이 나타나도록 함 */
          }
        `}
      </style>
    </>
  );
};
export default Layout;
