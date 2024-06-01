import { NextResponse } from "next/server";
import prisma from "@/utils/client";

export async function GET(request: Request) {
  console.log(request.headers.get("X-Forwarded-For"));

  return NextResponse.json({ data: "" }, { status: 200 });
}
