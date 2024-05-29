"use client";
import Layout from "@/components/commons/Layout";

import Section1 from "@/components/main/Section1";
import Section2 from "@/components/main/Section2";
import Section3 from "@/components/main/Section3";
import Loader from "@/components/commons/Loader";

import axios from "axios";
import { blogListDto } from "@/dataDto/blogDto";
import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
  const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "";
  const getBlogList = async () => {
    const result = await axios.get(`${NEXT_PUBLIC_API_DOMAIN}/api/blog-posts`);
    return result.data.data;
  };
  const queryResult = useQueries({
    queries: [{ queryKey: ["blog_list"], queryFn: getBlogList }],
  });

  const { data: blogList, status: BlogListStatus } = queryResult[0];
  const test = async () => {
    console.log("??/");
    const result = await axios.post(`${NEXT_PUBLIC_API_DOMAIN}/api/velog/test`);
    console.log(result.data);
  };

  return (
    <Layout>
      <Section1 />
      <button onClick={test} className="text-3xl">
        테스트 해보자
      </button>
      {/* <Section2 /> */}
      {/* {BlogListStatus === "success" ? (
        <Section3 blogList={blogList} />
      ) : (
        <Loader />
      )} */}
    </Layout>
  );
}
