import { NextResponse } from "next/server";
import { openAi } from "@/app/api/openAI";

export async function POST(request: Request) {
  const { thread_id, run_id } = await request.json();
  const retrieveResult = await openAi.beta.threads.runs.retrieve(
    thread_id,
    run_id
  );
  return NextResponse.json({ data: retrieveResult.status }, { status: 200 });
}

//   // 얘는 이 쓰레드의 satus를 칮이서 답변 완료됐는지 확인하는용
//   async function retrieveRun(thread_id: string, run_id: string) {
//     const retrieveResult = await openai.beta.threads.runs.retrieve(
//       thread_id,
//       run_id
//     );
//     // 반환값에 status 보고 compelete
//     return retrieveResult.status;
//   }
