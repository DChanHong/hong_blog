"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { htmlTagRemove } from "@/utils/blogList";
import { truncateText } from "@/utils/blogList";

import { usePathname, useRouter } from "next/navigation";
import defaultImage from "../../public/image/default.webp";

import { blogListRes } from "@/dataDto/blogDto";
import useElementObserve from "@/hooks/useElementObserve";

interface props {
  blogList: blogListRes[];
}

const Section3 = ({ blogList }: props) => {
  const NEXT_PUBLOC_STRAPI_IMAGE_LINK =
    process.env.NEXT_PUBLOC_STRAPI_IMAGE_LINK ?? "";
  const targetRef = useRef<HTMLDivElement>(null);
  const { flag, flagClass } = useElementObserve(targetRef);

  const openblog = (link: string) => {
    window.open(`${link}`, "_blank", "noreferrer");
  };

  return (
    <div
      className={`w-full m-auto max-w-[1800px] flex justify-center mt-[150px] mb-20 ${flagClass}`}
      ref={targetRef}
    >
      <div
        className={` w-11/12 md:w-11/12 lg2:w-11/12 3xl:w-10/12 6xl:w-11/12`}
      >
        <Link href={"/blog"}>
          <h2
            className={`font-bold mb-4 text-[20px] md:text-[30px] 3xl:text-[40px] 6xl:text-[50px] pb-4 border-b-2`}
          >
            <span className="text-container">Recent Blog Posts</span>
          </h2>
        </Link>
        <div className={`flex flex-col justify-center`}>
          {blogList.map((item: blogListRes, index: number) => (
            <button
              key={index}
              onClick={() => openblog(item.detail_link)}
              className="w-full "
            >
              <div className={`border-b-2 p-4`}>
                <div className="flex flex-col md:flex-row pb-4">
                  <div className="mr-6 w-full md:w-3/12 h-full flex md:block">
                    <Image
                      src={
                        item.img_src === "" || !item.img_src
                          ? defaultImage
                          : item.img_src
                      }
                      alt="썸네일 이미지"
                      className={`w-4/12 xs:w-1/2 md:w-full h-[100px] xs:h-[150px] md:h-[200px]`}
                      width={200}
                      height={200}
                    />
                    <ul className={`w-8/12 xs:w-1/2 ml-1 block md:hidden`}>
                      <li className="font-bold text-[20px] md:text-[30px] my-4">
                        {item.title}
                      </li>
                      <li>
                        <span className="text-[16px] md:text-[26px]">
                          chanhong
                        </span>
                      </li>
                      <li>
                        <span className="text-[13px] md:text-[16px] text-[#828282]">
                          {moment(item.created_at).format("YYYY-MM-DD")}
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* 우측 */}
                  <div className={`w-9/12`}>
                    <ul className="hidden md:block flex-col space-y-1">
                      <li className="font-bold text-[20px] md:text-[30px] my-4">
                        {item.title}
                      </li>
                      <li className="text-left">
                        <span className="text-[26px]">chahong</span>
                        <span className="text-[16px] ml-2 text-[#828282]">
                          {moment(item.created_at).format("YYYY-MM-DD")}
                        </span>
                      </li>
                      <li className="text-[#828282] md:flex space-x-1.5 text-[20px]">
                        <span>{item.intro}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <Link
          href={"/blog"}
          className={`flex flex-col justify-center my-4 text-center text-[24px] font-bold py-4 bg-gray-100 hover:opacity-65`}
        >
          더보기 +
        </Link>
      </div>
      <style jsx>
        {`
          .text-container {
            position: relative;
          }

          .text-container::before {
            content: "";
            position: absolute;
            bottom: -20%;
            left: 0;
            width: 0;
            height: 4px;
            background-color: black;
            transition: width 0.3s ease;
          }

          .text-container:hover::before {
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default Section3;
