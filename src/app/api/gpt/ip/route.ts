import { NextResponse } from "next/server";
import prisma from "@/utils/client";

export async function GET(request: Request) {
  const ipHeader = request.headers.get("x-forwarded-for");
  const ip = ipHeader
    ? ipHeader.split(",")[0].trim()
    : request.headers.get("remote-addr");

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const result: any | null = await prisma.checkip.findFirst({
    select: {
      idx: true,
      ip: true,
      hit: true,
      updated_at: true,
    },
    where: {
      ip: ip ?? "",
      updated_at: {
        gte: tenMinutesAgo,
      },
    },
  });

  // result가 존재하지 않으면, 해당 ip가 없는거니까 pass
  if (!result) {
    return NextResponse.json({ data: true }, { status: 200 });
  }
  // result가 있고 hit가 5미만이면 통과
  else if (result && result.hit < 5) {
    return NextResponse.json({ data: true }, { status: 200 });
  }
  // result가 있고 5넘은거니까 불가능
  else {
    return NextResponse.json({ data: false }, { status: 200 });
  }
}
