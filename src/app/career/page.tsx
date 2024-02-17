"use client";
import React from "react";
import Layout from "../../components/commons/Layout";
import Section2 from "@/components/main/Section2";

const Index = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center font-bold text-center text-[70px] h-[70vh] bg-[#010118] mt-[100px]">
        <h2 className={`text-[#fff]`}>Career</h2>
      </div>
      <Section2 />
    </Layout>
  );
};

export default Index;
