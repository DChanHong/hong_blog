"use client";

import Layout from "@/components/commons/Layout";
import axios from "axios";

import Section1 from "@/components/main/Section1";
import Section2 from "@/components/main/Section2";
import Section3 from "@/components/main/Section3";

export default function Home() {
  return (
    <Layout>
      <Section1 />
      <Section2 />
      <Section3 />
    </Layout>
  );
}
