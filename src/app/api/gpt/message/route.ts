import { NextResponse } from "next/server";
import { openAi } from "@/app/api/openAI";

export async function POST(request: Request) {
  const { question, thread_id } = await request.json();
  await openAi.beta.threads.messages.create(thread_id, {
    role: "user",
    content: question,
  });
  if (thread_id !== "") {
    return NextResponse.json({ data: "" }, { status: 200 });
  }
}
