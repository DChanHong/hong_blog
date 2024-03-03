"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Loader from "../commons/Loader";

import { htmlTagRemove } from "@/utils/blogList";
import { truncateText } from "@/utils/blogList";

import { usePathname, useRouter } from "next/navigation";
import { blogListDto, blogListRes } from "@/dataDto/blogDto";
import useElementObserve from "@/hooks/useElementObserve";

const Section3 = () => {
  const pathname = usePathname();
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);
  const { flag, flagClass } = useElementObserve(targetRef);
  const [blogList, setBlogList] = useState<blogListRes[] | null>(null);

  const getBlogList = async () => {
    const result = await axios.get(`http://localhost:1337/api/blog-posts`);
    return result.data.data;
  };

  const { data, status, error } = useQuery({
    queryKey: ["blog_list"],
    queryFn: getBlogList,
  });

  useEffect(() => {
    if (data) {
      setBlogList(data);
    }
  }, [data]);

  return (
    <div
      className={`w-full m-auto max-w-[1800px] flex justify-center ${flagClass}`}
      ref={targetRef}
    >
      <div
        className={` w-11/12 md:w-11/12 lg2:w-11/12 3xl:w-10/12 6xl:w-11/12`}
      >
        <Link href={"/blog"}>
          <h2
            className={` font-bold mb-4 text-[40px] md:text-[50px] 3xl:text-[60px] 6xl:text-[70px] pb-4 border-b-2`}
          >
            <span className="text-container">My Blog List</span>
          </h2>
        </Link>
        {!blogList ? (
          <Loader />
        ) : (
          <div className={`flex flex-col justify-center`}>
            {blogList.map((item: blogListRes, index: number) => (
              <Link
                key={index}
                href={`/blog/${item.id}/${item.title}`}
                className="w-full "
              >
                <div className={`border-b-2 p-4`}>
                  <div className="font-bold text-[20px] md:text-[30px] my-4">
                    {item.title}
                  </div>
                  <div className="flex flex-col md:flex-row pb-4">
                    <div className="mr-6 w-full md:w-3/12 h-full flex md:block">
                      <Image
                        src={`http://localhost:1337/uploads/${item.thumbnail_img_link}`}
                        alt="썸네일 이미지"
                        className={`w-4/12 xs:w-1/2 md:w-full h-[100px] xs:h-[150px] md:h-[200px]`}
                        width={200}
                        height={200}
                      />
                      <ul className={`w-8/12 xs:w-1/2 ml-1 block md:hidden`}>
                        <li>
                          <span className="text-[16px] md:text-[26px]">
                            {item.creator}
                          </span>
                        </li>
                        <li>
                          <span className="text-[13px] md:text-[16px] text-[#828282]">
                            {moment(item.createdAt).format("YYYY-MM-DD")}
                          </span>
                        </li>
                        <li className="text-[#828282] flex space-x-1.5 text-[15px] md:text-[20px]">
                          <span>{item?.intro}</span>
                        </li>
                      </ul>
                    </div>
                    <div className={`w-9/12`}>
                      <ul className="hidden md:flex flex-col space-y-1">
                        <li>
                          <span className="text-[26px]">{item.creator}</span>
                          <span className="text-[16px] ml-2 text-[#828282]">
                            {moment(item.createdAt).format("YYYY-MM-DD")}
                          </span>
                        </li>
                        <li className="text-[#828282] flex space-x-1.5 text-[20px]">
                          <span>{item.intro}</span>
                          {item.tags.map((tag: string, index: number) => (
                            <span key={index}>#{tag}</span>
                          ))}
                        </li>
                        <li className="text-[20px]">
                          {truncateText(htmlTagRemove(item.content), 200)}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
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
