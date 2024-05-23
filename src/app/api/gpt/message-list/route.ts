import { NextResponse } from "next/server";
import { openAi } from "@/app/api/openAI";

export async function POST(request: Request) {
  const { thread_id } = await request.json();
  const threadMessages = await openAi.beta.threads.messages.list(thread_id);
  return NextResponse.json(
    { data: threadMessages.data[0].content[0] },
    { status: 200 }
  );
}

// async function listMessage(thread_id: string) {
//     const threadMessages = await openai.beta.threads.messages.list(thread_id);
//     return threadMessages.data[0].content[0];
//   }
