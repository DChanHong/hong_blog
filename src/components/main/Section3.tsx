"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { htmlTagRemove } from "@/utils/blogList";
import { truncateText } from "@/utils/blogList";

import { usePathname, useRouter } from "next/navigation";
import { blogListDto } from "@/dataDto/blogDto";
import useElementObserve from "@/hooks/useElementObserve";

const Section3 = () => {
  const pathname = usePathname();
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);
  const { flag, flagClass } = useElementObserve(targetRef);
  const [blogList, setBlogList] = useState<blogListDto[] | null>(null);

  const getBlogList = async () => {
    const result = await axios.get(`http://localhost:1337/api/blog-posts`);
    if (result) {
      setBlogList(result.data.data);
    }
  };

  useEffect(() => {
    getBlogList();
  }, [pathname]);

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
            className={`font-bold  text-[40px] md:text-[50px] 3xl:text-[60px] 6xl:text-[70px] mb-4 pb-4 border-b-2`}
          >
            My Blog List
          </h2>
        </Link>
        {!blogList ? (
          <>loading...</>
        ) : (
          <div className={`flex flex-col justify-center`}>
            {blogList.map((item: blogListDto, index: number) => (
              <Link
                key={index}
                href={`/blog/${item.id}/${item.attributes.title}`}
                className="w-full "
              >
                <div className={`border-b-2 p-4`}>
                  <div className="font-bold text-[20px] md:text-[30px] my-4">
                    {item.attributes.title}
                  </div>
                  <div className="flex flex-col md:flex-row pb-4">
                    <div className="mr-6 w-full md:w-3/12 h-full flex md:block">
                      <Image
                        src={`http://localhost:1337/uploads/${item.attributes.thumbnail_img_link}`}
                        alt="썸네일 이미지"
                        className={`w-4/12 xs:w-1/2 md:w-full h-[100px] xs:h-[150px] md:h-[200px]`}
                        width={200}
                        height={200}
                      />
                      <ul className={`w-8/12 xs:w-1/2 ml-1 block md:hidden`}>
                        <li>
                          <span className="text-[16px] md:text-[26px]">
                            {item.attributes.creator}
                          </span>
                        </li>
                        <li>
                          <span className="text-[13px] md:text-[16px] text-[#828282]">
                            {moment(item.attributes.createdAt).format(
                              "YYYY-MM-DD"
                            )}
                          </span>
                        </li>
                        <li className="text-[#828282] flex space-x-1.5 text-[15px] md:text-[20px]">
                          <span>{item.attributes.intro}</span>
                          {/* {item.attributes.tags.map(
                            (tag: string, index: number) => (
                              <span key={index}>#{tag}</span>
                            )
                          )} */}
                        </li>
                      </ul>
                    </div>
                    <div className={`w-9/12`}>
                      <ul className="hidden md:flex flex-col space-y-1">
                        <li>
                          <span className="text-[26px]">
                            {item.attributes.creator}
                          </span>
                          <span className="text-[16px] ml-2 text-[#828282]">
                            {moment(item.attributes.createdAt).format(
                              "YYYY-MM-DD"
                            )}
                          </span>
                        </li>
                        <li className="text-[#828282] flex space-x-1.5 text-[20px]">
                          <span>{item.attributes.intro}</span>
                          {item.attributes.tags.map(
                            (tag: string, index: number) => (
                              <span key={index}>#{tag}</span>
                            )
                          )}
                        </li>
                        <li className="text-[20px]">
                          {truncateText(
                            htmlTagRemove(item.attributes.content),
                            200
                          )}
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
    </div>
  );
};

export default Section3;
