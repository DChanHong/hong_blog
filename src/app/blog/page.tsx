"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../../components/commons/Layout";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/commons/Loader";

import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { blogListDto } from "@/dataDto/blogDto";
import { htmlTagRemove } from "@/utils/blogList";
import { truncateText } from "@/utils/blogList";

const Index = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [blogList, setBlogList] = useState<blogListDto[] | null>(null);
  const [filterList, setFilterList] = useState<blogListDto[] | null>(null);
  const [tagList, setTagList] = useState<string[] | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const getBlogList = async () => {
    const result = await axios.get(`http://localhost:1337/api/blog-posts`);
    if (result) {
      setBlogList(result.data.data);
      setFilterList(result.data.data);
    }
    return result.data.data;
  };

  const { data, status } = useQuery({
    queryKey: ["blog_list"],
    queryFn: getBlogList,
  });

  const getTest = async () => {
    const result = await axios.get(
      `http://localhost:1337/api/blog-posts?pagination[page]=1&pagination[pageSize]=2`
    );
    if (result) {
      console.log(result);
    }
  };

  const getTest2 = async () => {
    const result = await axios.get(
      `http://localhost:1337/api/blog-posts/count`
    );
    if (result) {
      console.log(result);
    }
  };

  useEffect(() => {
    if (blogList) {
      let uniqueArray: string[] = Array.from(
        new Set(blogList.flatMap((item) => item.attributes.tags))
      );
      setTagList(uniqueArray);
    }
  }, [blogList]);

  useEffect(() => {
    if (data) {
      setBlogList(data);
      setFilterList(data);
    }
  }, [data]);

  const searchList = () => {
    if (searchRef.current && blogList) {
      let filteredList;
      if (searchRef.current?.value === "") {
        setFilterList(blogList);
      } else {
        filteredList = blogList.filter((item: blogListDto) => {
          return item.attributes.title.includes(searchRef.current?.value || "");
        });
        setFilterList(filteredList);
      }
    }
  };

  const tagSearch = (tag: string) => {
    if (blogList) {
      const filteredList = blogList.filter((item) => {
        return item.attributes.tags.includes(tag);
      });
      if (filteredList.length <= 0) {
        setFilterList(blogList);
      } else {
        setFilterList(filteredList);
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchList();
    }
  };

  return (
    <Layout>
      <section className="w-full m-auto">
        <div className="flex items-center justify-center font-bold text-center text-[26px] xs:text-[46px] md:text-[70px] h-[50vh] md:h-[70vh] bg-[#010118] mt-[100px] text-white">
          <p className="text-white">Blog</p>
        </div>
        <button className="w-full boreder-2 p-4" onClick={getTest}>
          페이지 api
        </button>
        <button className="w-full boreder-2 p-4" onClick={getTest2}>
          테이블 데이터 갯수
        </button>

        <div className="max-w-[1800px] w-11/12 m-auto md:w-11/12 lg2:w-11/12 3xl:w-10/12 6xl:w-11/12 mt-10 m-auto">
          <div className="flex flex-col-reverse  lg:flex-row justify-between">
            {!filterList || !blogList || !tagList ? (
              <Loader />
            ) : (
              <div className={`w-full lg:w-9/12 flex flex-col justify-center`}>
                {filterList.map((item: blogListDto, index: number) => (
                  <Link
                    key={index}
                    href={`/blog/${item.id}/${item.attributes.title}`}
                    className="w-full "
                  >
                    <div className={`border-b-2 p-4`}>
                      <div className="font-bold text-[1.8em] my-4">
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
                          <ul
                            className={`w-8/12 xs:w-1/2 ml-1 block md:hidden`}
                          >
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
            <div className=" w-full lg:w-3/12">
              <div className=" px-2 py-4">
                <div className="flex border-2 lg:mb-6 rounded-xl justify-between p-1">
                  <input
                    className="mx-2 p-1 outline-none w-11/12 w-full h-full rounded-xl p-2 dark:bg-[#232323]"
                    ref={searchRef}
                    type="text"
                    onKeyUp={handleKeyUp}
                    placeholder="Search for Title"
                  />
                  <button
                    type="button"
                    onClick={searchList}
                    className={`w-/12`}
                  >
                    <IoSearch size={30} />
                  </button>
                </div>
                <div>
                  <p className="hidden lg:block text-center my-4 text-[1.8em] font-bold">
                    Tags
                  </p>
                  <div
                    className={`flex flex-row   mt-2 space-x-1 ml-4 lg:ml-0 lg:mt-0 lg:flex-col lg:space-y-1 text-[#858585]`}
                  >
                    {tagList?.map((item: string, index: number) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => tagSearch(item)}
                      >
                        #{item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
