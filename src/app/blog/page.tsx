"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../../components/commons/Layout";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { blogListDto } from "@/dataDto/blogDto";

import { htmlTagRemove } from "@/utils/blogList";
import { truncateText } from "@/utils/blogList";

const Index = () => {
  const [blogList, setBlogList] = useState<blogListDto[] | null>(null);
  const pathname = usePathname();
  const router = useRouter();

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
    <Layout>
      <section className="w-full mt-14 m-auto">
        <div className="flex items-center justify-center font-bold text-center text-[26px] xs:text-[46px] md:text-[70px] h-[50vh] md:h-[70vh] bg-[#010118] mt-[100px] text-white">
          <p className="text-white">Blog</p>
        </div>

        <div className="w-8/12 mt-10 m-auto">
          <div className="flex justify-between">
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
                      <div className="font-bold text-[1.8em] my-4">
                        {item.attributes.title}
                      </div>
                      <div className="flex pb-4">
                        <div className="mr-6 w-3/12 h-full">
                          <Image
                            src={`http://localhost:1337/uploads/${item.attributes.thumbnail_img_link}`}
                            alt="썸네일 이미지"
                            className={`w-full h-[200px]`}
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className={`w-9/12`}>
                          <ul className="flex flex-col space-y-1">
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
            <div className="3/12">
              <div className=" px-2 py-4">
                <div className="flex border-2 mb-6 rounded-xl p-1 justify-between">
                  <input
                    className="mx-2 p-1 outline-none	"
                    type="text"
                    placeholder="Search for Keyword"
                  />
                  <button type="button">
                    <IoSearch size={30} />
                  </button>
                </div>
                <div>
                  <p className="text-center mt-4 text-[1.8em] font-bold">
                    Tags
                  </p>
                  <p className="text-[1.5em] font-semibold">Skill</p>
                  <ul>
                    <li className="ml-6 mt-2 text-[#858585]">#CSS</li>
                    <li className="ml-6 mt-2 text-[#858585]">#React</li>
                    <li className="ml-6 mt-2 text-[#858585]">#Next</li>
                    <li className="ml-6 mt-2 text-[#858585]">#Node</li>
                    <li className="ml-6 mt-2 text-[#858585]">#Redux</li>
                  </ul>
                  <p className="text-[1.5em] mt-4 font-semibold">
                    TroubleShooting
                  </p>
                  <ul>
                    <li className="ml-6 mt-2 text-[#858585]">
                      <button>#error</button>
                    </li>
                    <li className="ml-6 mt-2 text-[#858585]">
                      <button>#Debugging</button>
                    </li>
                    <li className="ml-6 mt-2 text-[#858585]">
                      <button>#Test</button>
                    </li>
                  </ul>
                </div>
                <p className="text-[1.5em] mt-4 font-semibold">CS</p>
                <ul>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#data structure</button>
                  </li>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#network</button>
                  </li>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#algorithm</button>
                  </li>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#OS</button>
                  </li>
                  <li className="ml-6 mt-2 text-[#858585]">
                    <button>#architecture</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
