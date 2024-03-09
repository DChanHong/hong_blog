"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../../components/commons/Layout";
import { useQuery, useQueries } from "@tanstack/react-query";
import Loader from "@/components/commons/Loader";

import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { blogListRes } from "@/dataDto/blogDto";
import { htmlTagRemove } from "@/utils/blogList";
import { truncateText } from "@/utils/blogList";

const Index = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 블로그
  const [blogList, setBlogList] = useState<blogListRes[] | null>(null);
  // const [filterList, setFilterList] = useState<blogListRes[] | null>(null);

  // 이것도 API 고민이 필요할 듯 함.
  const [tagList, setTagList] = useState<string[] | null>(null);

  //검색어 체크
  const searchRef = useRef<HTMLInputElement>(null);

  // 페이지 초기값
  const [page, setPage] = useState<number>(1);
  // 몇 개씩 볼것인지
  const [viewCount, setViewCount] = useState<number>(5);
  // 현재 임의의 토탈 데이터 수
  const [totalData, setTotalData] = useState<number>(100);

  const [pageNumbers, setPageNumbers] = useState<number[] | null>(null);

  const getBlogPageList = async () => {
    const result = await axios.get(`http://localhost:1337/api/blog-posts/1/1`);
    if (result) {
      return result.data;
    }
  };

  const getCount = async () => {
    const result = await axios.get(
      "http://localhost:1337/api/blog-posts/count"
    );
    if (result.status === 200) {
      return result.data;
    }
  };
  const queryResult = useQueries({
    queries: [
      { queryKey: ["page_count"], queryFn: getCount },
      { queryKey: ["test_page"], queryFn: getBlogPageList },
    ],
  });

  const { data: CountData, status: CountStatus } = queryResult[0];
  const { data: pageList, status: PageStatus } = queryResult[1];

  useEffect(() => {
    if (pageList) {
      setBlogList(pageList.data);
    }
  }, [pageList]);

  useEffect(() => {
    // 데이터 갯수가 들어왔다.
    console.log(CountData);
    if (CountData) {
      getPageNumbers(3, 100, 5);
    }
  }, [CountData]);
  const getPageNumbers = (
    currentPage: number,
    totalPages: number,
    visiblePages: number
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

  // const searchList = () => {
  //   if (searchRef.current && blogList) {
  //     let filteredList;
  //     if (searchRef.current?.value === "") {
  //       setFilterList(blogList);
  //     } else {
  //       filteredList = blogList.filter((item: blogListRes) => {
  //         return item.title.includes(searchRef.current?.value || "");
  //       });
  //       setFilterList(filteredList);
  //     }
  //   }
  // };

  // const tagSearch = (tag: string) => {
  //   if (blogList) {
  //     const filteredList = blogList.filter((item) => {
  //       return item.tags.includes(tag);
  //     });
  //     if (filteredList.length <= 0) {
  //       setFilterList(blogList);
  //     } else {
  //       setFilterList(filteredList);
  //     }
  //   }
  // };

  // const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     searchList();
  //   }
  // };

  return (
    <Layout>
      <section className="w-full m-auto">
        <div className="flex items-center justify-center font-bold text-center text-[26px] xs:text-[46px] md:text-[70px] h-[50vh] md:h-[70vh] bg-[#010118] mt-[100px] text-white">
          <p className="text-white">Blog</p>
        </div>
        {!blogList || CountStatus !== "success" ? (
          <Loader />
        ) : (
          <div className="max-w-[1800px] w-11/12  m-auto md:w-11/12 lg2:w-11/12 3xl:w-10/12 6xl:w-11/12 mt-10 m-auto">
            <div className="flex flex-col-reverse  lg:flex-row justify-between">
              <div className={`w-full lg:w-9/12 flex flex-col justify-center`}>
                {blogList?.map((item: blogListRes, index: number) => (
                  <Link
                    key={index}
                    href={`/blog/${item.id}/${item.title}`}
                    className="w-full "
                  >
                    <div className={`border-b-2 p-4`}>
                      <div className="font-bold text-[1.8em] my-4">
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
                          <ul
                            className={`w-8/12 xs:w-1/2 ml-1 block md:hidden`}
                          >
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
                          </ul>
                        </div>

                        <div className={`w-9/12`}>
                          <ul className="hidden md:flex flex-col space-y-1">
                            <li>
                              <span className="text-[26px]">
                                {item.creator}
                              </span>
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
              <div className=" w-full lg:w-3/12">
                <div className=" px-2 py-4">
                  <div className="flex border-2 lg:mb-6 rounded-xl justify-between p-1">
                    <input
                      className="mx-2 p-1 outline-none w-11/12 w-full h-full rounded-xl p-2 dark:bg-[#232323]"
                      ref={searchRef}
                      type="text"
                      onKeyUp={() => {}}
                      placeholder="Search for Title"
                    />
                    <button
                      type="button"
                      onClick={() => {}}
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
                        <button key={index} type="button" onClick={() => {}}>
                          #{item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`border-2 flex space-x-1`}>
              <button>이전</button>
              {pageNumbers?.map((item: number) => (
                <button
                  className={`text-[16px] p-2 border-2 rounded-xl hover:border-red-400 ${
                    page === item ? "text-red-400" : ""
                  }`}
                  onClick={() => getPageNumbers(item, totalData, viewCount)}
                  key={item}
                >
                  {item}
                </button>
              ))}
              <button>다음</button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;

/* 

  <li className="text-[#828282] flex space-x-1.5 text-[15px] md:text-[20px]">
    <span>{item.intro}</span>
    {item.attributes.tags.map(
      (tag: string, index: number) => (
        <span key={index}>#{tag}</span>
      )
    )}
  </li>
    */
