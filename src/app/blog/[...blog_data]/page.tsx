"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { blogListDto } from "@/dataDto/blogDto";
import { usePathname, useRouter } from "next/navigation";
import Layout from "@/components/commons/Layout";
import DOMPurify from "dompurify";

const Index = ({ params }: { params: { blog_data: string[] } }) => {
  // console.log(params.blog_data[0]);
  const pathname = usePathname();
  const router = useRouter();
  const [data, setData] = useState<blogListDto | null>(null);
  const fetchData = async () => {
    const result = await axios.get(
      `http://localhost:1337/api/blog-posts/${params.blog_data[0]}`
    );
    setData(result.data.data);
  };

  console.log(data);
  useEffect(() => {
    fetchData();
  }, [pathname]);

  return (
    <Layout>
      <div className={`mt-[100px]`}>
        {!data ? (
          <>loading...</>
        ) : (
          <div className={`flex justify-center p-4 mt-20`}>
            <div
              className="prose full-width"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.attributes.content),
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
