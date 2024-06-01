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
      title:
        "Error: Access denied for user 'root' @'localhost' EC2 ubuntu mysql 설치 후 접속시 에러",
      img_src: "",
      created_at: new Date(),
      tags: "ec2,mysql,ubuntu",
      detail_link:
        "https://velog.io/@hongchee/Error-Access-denied-for-user-rootlocalhost-EC2-ubuntu-mysql-설치-후-접속시-에러",
      intro: "",
    },
  });

  return NextResponse.json({ data: "" }, { status: 200 });
}
