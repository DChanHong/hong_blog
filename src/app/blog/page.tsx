"use client";
import React, { useEffect, useState, useRef } from "react";
import { useQueries } from "@tanstack/react-query";
import { getBlogPageList } from "@/hooks/blogApi.ts/blog";
import { blogListRes } from "@/dataDto/blogDto";
import moment from "moment";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/commons/Layout";
import defaultImage from "../../public/image/default.webp";
import Loader from "@/components/commons/Loader";

interface Itag {
  idx: number;
  tag: string;
}

const page = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [blogList, setBlogList] = useState<blogListRes[]>([]);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const queryResult = useQueries({
    queries: [
      {
        queryKey: [page, search],
        queryFn: async () => {
          const data = await getBlogPageList(page, search);
          return data;
        },
      },
    ],
  });

  const tagList: Itag[] = [
    { idx: 0, tag: "Tag" },
    { idx: 1, tag: "React" },
    { idx: 2, tag: "Refactoring" },
    { idx: 3, tag: "next.js" },
    { idx: 4, tag: "Node" },
    { idx: 5, tag: "자료구조" },
    { idx: 6, tag: "알고리즘" },
    { idx: 7, tag: "SEO " },
  ];
  const { data: searchData, status: searchStatus } = queryResult[0];
  useEffect(() => {
    if (searchData) {
      setBlogList(searchData.data);
      setTotalCount(searchData.count);
      setTotalPage(searchData.totalPages);
      getPageNumbers(searchData.currentPage, searchData.totalPages, 5);
    }
  }, [searchData]);

  const openblog = (link: string) => {
    window.open(`${link}`, "_blank", "noreferrer");
  };

  const searchStart = () => {
    if (searchRef.current) {
      if (searchRef.current?.value !== "") {
        setSearch(searchRef.current?.value);
        setPage(1);
      } else {
        setSearch("");
        setPage(1);
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchRef.current) {
      if (searchRef.current?.value !== "") {
        setSearch(searchRef.current?.value);
      } else {
        setSearch("");
      }
    }
  };

  const searchTag = (tag: string) => {
    setSearch(tag);
  };

  const clickPage = (page: number) => {
    setPage(page);
  };
  const prevPage = () => {
    if (page === 1) {
      return;
    } else {
      setPage((prev) => prev - 1);
    }
  };
  const nextPage = () => {
    if (page === totalPage) {
      return;
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const getPageNumbers = (
    currentPage: number,
    totalPages: number,
    visiblePages: 5
  ) => {
    const pageNumberArr: number[] = [];
    const halfVisiblePages = Math.floor(visiblePages / 2);

    let startPage = currentPage - halfVisiblePages;
    let endPage = currentPage + halfVisiblePages;

    // 시작 페이지가 1보다 작은 경우 , 1페이지 or 2페이지인 상태이므로 보여줄 페이지수랑 총 갯수 비교해서 작은 수를 넣어준다.
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(visiblePages, totalPages);
    }
    // 마지막 페이지가 전체 페이지수를 넘어버린 경우 ,마지막 페이지는 전페이지로 설정하고 시작 페이지는
    if (endPage > totalPages) {
      endPage = totalPages;
      // 1보다 작아지는 걸 방지하기 위해 1or endPage - visiblePages + 1
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumberArr.push(i);
    }

    setPage(currentPage);
    setPageNumbers(pageNumberArr);
  };

  return (
    <Layout>
      <section className="w-full m-auto">
        <div className="flex items-center justify-center font-bold text-center text-[26px] xs:text-[46px] md:text-[70px] h-[50vh] md:h-[70vh] bg-[#010118] mt-[100px] text-white">
          <p className="text-white">Blog</p>
        </div>
        {searchStatus !== "success" ? (
          <Loader />
        ) : (
          <div className="max-w-[1800px] w-11/12  m-auto md:w-11/12 lg2:w-11/12 3xl:w-10/12 6xl:w-11/12 mt-10 m-auto">
            <div className="flex flex-col-reverse  lg:flex-row justify-between">
              <div className={`w-full lg:w-9/12 flex flex-col justify-center`}>
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
                            <ul
                              className={`w-8/12 xs:w-1/2 ml-1 block md:hidden`}
                            >
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
                              <li className="text-center">
                                <span className="text-[26px]">chahong</span>
                                <span className="text-[16px] ml-2 text-[#828282]">
                                  {moment(item.created_at).format("YYYY-MM-DD")}
                                </span>
                              </li>
                              <li className="text-[#828282] text-center md:flex justify-center space-x-1.5 text-[20px]">
                                <span>{item.intro}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
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
                      onClick={searchStart}
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
                      className={`flex flex-wrap flex-row   mt-2 space-x-1 ml-4 lg:ml-0 lg:mt-0 lg:flex-col lg:space-y-1 text-[#858585]`}
                    >
                      {tagList.map((item: Itag, index: number) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => searchTag(item.tag)}
                        >
                          #{item.tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-6 flex justify-center`}>
              <button
                type="button"
                onClick={prevPage}
                className={`border-y-2 border-l-2 px-2 py-1 hover:bg-[#17112B] hover:text-white hover:border-[#17112B]`}
                disabled={page === 1}
              >
                이전
              </button>
              {pageNumbers.map((item: number) => (
                <button
                  type="button"
                  onClick={() => clickPage(Number(item))}
                  className={`text-[22px] px-3 py-1 border-y-2 border-l-2 hover:bg-[#17112B] hover:text-white hover:border-[#17112B] ${
                    page === item
                      ? "bg-[#17112B] text-white border-[#17112B]"
                      : ""
                  }`}
                  key={item}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                onClick={nextPage}
                className={`border-y-2 border-2 px-2 py-1 hover:bg-[#17112B] hover:text-white hover:border-[#17112B]`}
                disabled={page === totalPage}
              >
                다음
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default page;
