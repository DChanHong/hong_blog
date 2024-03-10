"use client";
import React, { useEffect, useState, useRef } from "react";

import moment from "moment";
import Layout from "../../components/commons/Layout";
import { useQueries } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/commons/Loader";

import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { blogListRes } from "@/dataDto/blogDto";
import { tagListRes } from "@/dataDto/tagDto";
import { htmlTagRemove } from "@/utils/blogList";
import { truncateText } from "@/utils/blogList";
import { getBlogPageList, getCount, getTagList } from "@/hooks/blogApi.ts/blog";

const Index = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const [blogList, setBlogList] = useState<blogListRes[] | null>(null);
  const [tagList, setTagList] = useState<tagListRes[] | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState<number>(
    params.get("page") ? Number(params.get("page")) : 1
  );
  const [viewCount, setViewCount] = useState<number>(5);
  const [totalData, setTotalData] = useState<number>(100);
  const [pageNumbers, setPageNumbers] = useState<number[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  const queryResult = useQueries({
    queries: [
      {
        queryKey: [tag, search, tag, search],
        queryFn: () => getCount(tag, search),
      },
      {
        queryKey: [page, viewCount, tag, search],
        queryFn: () => getBlogPageList(page, viewCount, tag, search),
      },
      { queryKey: ["tag_list"], queryFn: getTagList },
    ],
  });

  const { data: CountData, status: CountStatus } = queryResult[0];
  const { data: pageList, status: PageStatus } = queryResult[1];
  const { data: tagLists, status: tagStatus } = queryResult[2];

  useEffect(() => {
    if (pageList) {
      setBlogList(pageList.data);
    }
  }, [pageList]);

  useEffect(() => {
    if (CountData) {
      getPageNumbers(page, Math.ceil(CountData / viewCount), viewCount);
      // getPageNumbers(page, 2, viewCount);
    }
  }, [CountData]);

  useEffect(() => {
    if (tagLists) {
      setTagList(tagLists);
    }
  }, [tagLists]);

  useEffect(() => {
    setPage(params.get("page") ? Number(params.get("page")) : 1);
  }, [params]);

  const handlePage = (state: string) => {
    if (state === "prev" && page !== 1) {
      router.push(`${pathname}?page=${page - 1}`);
    } else if (state === "next" && Math.ceil(CountData / viewCount) !== page) {
      router.push(`${pathname}?page=${page + 1}`);
    }
  };
  const handlePageButton = (curretPage: number) => {
    router.push(`${pathname}?page=${curretPage}`);
  };

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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchRef.current) {
      if (searchRef.current?.value !== "") {
        setSearch(searchRef.current?.value);
        setTag("");
      } else {
        setSearch("");
        setTag("");
      }
    }
  };

  //  페이징 함수

  return (
    <Layout>
      <section className="w-full m-auto">
        <div className="flex items-center justify-center font-bold text-center text-[26px] xs:text-[46px] md:text-[70px] h-[50vh] md:h-[70vh] bg-[#010118] mt-[100px] text-white">
          <p className="text-white">Blog</p>
        </div>
        {!blogList || !tagList || CountStatus !== "success" ? (
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
                      onKeyUp={handleKeyUp}
                      placeholder="Search for Title"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (searchRef.current) {
                          if (searchRef.current?.value !== "") {
                            setSearch(searchRef.current?.value);
                            setTag("");
                          } else {
                            setSearch("");
                            setTag("");
                          }
                        }
                      }}
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
                      {tagList.map((item: tagListRes, index: number) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setTag(item.attributes.tag_name);
                            setSearch("");
                          }}
                        >
                          #{item.attributes.tag_name}
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
                onClick={() => handlePage("prev")}
                className={`border-y-2 border-l-2 px-2 py-1 hover:bg-[#17112B] hover:text-white hover:border-[#17112B]`}
              >
                이전
              </button>
              {pageNumbers?.map((item: number) => (
                <button
                  type="button"
                  onClick={() => handlePageButton(item)}
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
                onClick={() => handlePage("next")}
                className={`border-y-2 border-2 px-2 py-1 hover:bg-[#17112B] hover:text-white hover:border-[#17112B]`}
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

export default Index;
