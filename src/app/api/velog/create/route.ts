import { NextResponse } from "next/server";
import prisma from "@/utils/client";

interface BlogEntity {
  idx: number;
  title: string | null;
  img_src: string | null;
  created_at: Date | null;
  tags: string | null;
  detail_link: string | null;
  intro: string | null;
}

export async function POST(request: Request) {
  const blogEntity: BlogEntity | null = await prisma.velog.create({
    data: {
      title: "HTML 태그(Tag) Refactoring (feat: SEO)",
      img_src: "",
      created_at: new Date(),
      tags: "seo,React,next.js",
      detail_link:
        "https://velog.io/@hongchee/HTML-태그Tag-Refactoring-feat-SEO",
      intro: "Tag, SEO , Refactoring",
    },
  });
  console.log(blogEntity);

  return NextResponse.json({ data: "" }, { status: 200 });
}
