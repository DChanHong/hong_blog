import { NextResponse } from "next/server";
import prisma from "@/utils/client";

export async function GET(request: Request) {
  // console.log(request.headers.get("X-Forwarded-For"));
  const result = await prisma.checkip.findMany({
    where: {
      ip: request.headers.get("X-Forwarded-For"),
    },
  });

  if (result.length >= 2) {
    return NextResponse.json({ data: false }, { status: 200 });
  } else {
    return NextResponse.json({ data: true }, { status: 200 });
  }
}
