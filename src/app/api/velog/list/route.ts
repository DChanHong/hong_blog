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

export async function GET(request: Request) {
  const blogEntity: BlogEntity[] | null = await prisma.velog.findMany({});

  return NextResponse.json({ data: blogEntity }, { status: 200 });
}
