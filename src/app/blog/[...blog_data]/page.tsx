"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { blogListDto } from "@/dataDto/blogDto";
import { usePathname, useRouter } from "next/navigation";
import Layout from "@/components/commons/Layout";
import DOMPurify from "dompurify";
import { useQuery } from "@tanstack/react-query";

const Index = ({ params }: { params: { blog_data: string[] } }) => {
  // console.log(params.blog_data[0]);
  const pathname = usePathname();
  const router = useRouter();
  const [blogObj, setBlogObj] = useState<blogListDto | null>(null);

  const fetchData = async () => {
    const result = await axios.get(
      `http://localhost:1337/api/blog-posts/${params.blog_data[0]}`
    );
    return result.data.data;
  };

  const { data, status } = useQuery({
    queryKey: ["blog_list", params.blog_data[0]],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (data) {
      setBlogObj(data);
    }
  }, [data]);

  return (
    <Layout>
      <div className={`mt-[100px]`}>
        {!blogObj ? (
          <>loading...</>
        ) : (
          <div className={`flex justify-center p-4 mt-20`}>
            <div
              className="prose full-width dark:!text-[#b7babe]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blogObj.attributes.content),
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
