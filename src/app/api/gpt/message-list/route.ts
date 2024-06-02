import { NextResponse } from "next/server";
import { openAi } from "@/app/api/openAI";
import prisma from "@/utils/client";

export async function POST(request: Request) {
  const { thread_id } = await request.json();
  const threadMessages = await openAi.beta.threads.messages.list(thread_id);
  const ip = request.headers.get("X-Forwarded-For");
  await prisma.checkip.create({
    data: {
      ip: ip,
      created_at: new Date(),
    },
  });

  return NextResponse.json(
    { data: threadMessages.data[0].content[0] },
    { status: 200 }
  );
}
