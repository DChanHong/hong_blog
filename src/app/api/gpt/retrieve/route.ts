import { NextResponse } from "next/server";
import { openAi } from "@/app/api/openAI";

export async function POST(request: Request) {
  const { thread_id, run_id } = await request.json();
  let retrieveResult = await openAi.beta.threads.runs.retrieve(
    thread_id,
    run_id
  );

  return NextResponse.json({ data: retrieveResult.status }, { status: 200 });
}
