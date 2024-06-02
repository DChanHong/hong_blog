import { NextResponse } from "next/server";
import prisma from "@/utils/client";

export async function DELETE(request: Request) {
  // console.log(request.headers.get("X-Forwarded-For"));
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const result = await prisma.checkip.deleteMany({
    where: {
      created_at: {
        lt: tenMinutesAgo, // less than 10 minutes ago
      },
    },
  });

  return NextResponse.json({ data: false }, { status: 200 });
}
