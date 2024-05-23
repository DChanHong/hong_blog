import { NextResponse } from "next/server";
import { openAi } from "@/app/api/openAI";

export async function GET(request: Request) {
  // 어시스턴스 생성
  const emptyThread = await openAi.beta.threads.create();

  const thread_id = emptyThread.id;
  if (thread_id !== "") {
    return NextResponse.json({ data: thread_id }, { status: 200 });
  }
}
