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
  const url = new URL(request.url);
  const query = url.searchParams;
  const page = query.get("page") ? parseInt(query.get("page")!) : 1;
  const search = query.get("search") || "";
  const pageSize = 5;

  const offset = (Number(page) - 1) * pageSize;

  const blogEntity: BlogEntity[] | null = await prisma.velog.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          tags: {
            contains: search,
          },
        },
        {
          intro: {
            contains: search,
          },
        },
      ],
    },
    orderBy: {
      created_at: "desc",
    },
    take: pageSize,
    skip: offset,
  });

  const totalCount = await prisma.velog.count({
    where: {
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          tags: {
            contains: search,
          },
        },
        {
          intro: {
            contains: search,
          },
        },
      ],
    },
  });

  return NextResponse.json(
    {
      data: blogEntity,
      count: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    },
    { status: 200 }
  );
}
