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

  const openBlog = (link: string) => {
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
        <div
          className={`grid gap-6 
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            
          `}
        >
          {blogList.map((item: blogListRes, index: number) => (
            <button
              key={index}
              onClick={() => openBlog(item.detail_link ?? "")}
              className={"w-full border-2 border-solid"}
            >
              <div className={"flex flex-col justify-between h-full"}>
                <div>
                  <Image
                    src={
                      item.img_src === "" || !item.img_src
                        ? defaultImage
                        : item.img_src
                    }
                    alt="썸네일 이미지"
                    className={`w-full h-[300px]`}
                    width={1000}
                    height={500}
                  />
                </div>
                <div className={"flex flex-col space-y-2 my-4 mx-4"}>
                  <h3 className={`text-xl font-semibold line-clamp-1`}>
                    {item.title ?? ""}
                  </h3>
                  <p className={`flex space-x-2 justify-center`}>
                    <span className={`font-medium`}>chanhong</span>
                    <span>{moment(item.created_at).format("YYYY-MM-DD")}</span>
                  </p>
                  <p className={`flex justify-center space-x-2`}>
                    {item.tags &&
                      item.tags.length > 0 &&
                      item.tags
                        .split(",")
                        .slice(0, 3)
                        .map((item) => (
                          <span
                            key={`${item}-${index}`}
                            className="px-4 py-2 rounded-[20px] font-semibold bg-gray-100"
                          >
                            {item}
                          </span>
                        ))}
                  </p>
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
