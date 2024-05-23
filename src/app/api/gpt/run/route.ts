import { NextResponse } from "next/server";
import { openAi } from "@/app/api/openAI";

export async function POST(request: Request) {
  const { thread_id, assistance_id } = await request.json();
  let runId = "";
  // 쓰레드에 활성화된 실행이 있는지 확인
  const activeRuns = await openAi.beta.threads.runs.list(thread_id);
  const activeRun = activeRuns.data.find((run: any) => run.active);

  if (activeRun) {
    // 활성화된 실행이 있다면 해당 실행의 ID를 사용
    runId = activeRun.id;
    console.log("Already active run:", runId);
  } else {
    // 활성화된 실행이 없다면 새로운 실행 생성
    const run = await openAi.beta.threads.runs.create(thread_id, {
      assistant_id: assistance_id,
    });
    runId = run.id;
    console.log("New run created:", runId);
  }
  if (runId !== "") {
    return NextResponse.json({ data: runId }, { status: 200 });
  }
}

// async function createRun(thread_id: string, assistance_id: string) {
//   let runId = "";
//   // 쓰레드에 활성화된 실행이 있는지 확인
//   const activeRuns = await openai.beta.threads.runs.list(thread_id);
//   const activeRun = activeRuns.data.find((run: any) => run.active);

//   if (activeRun) {
//     // 활성화된 실행이 있다면 해당 실행의 ID를 사용
//     runId = activeRun.id;
//     console.log("Already active run:", runId);
//   } else {
//     // 활성화된 실행이 없다면 새로운 실행 생성
//     const run = await openai.beta.threads.runs.create(thread_id, {
//       assistant_id: assistance_id,
//     });
//     runId = run.id;
//     console.log("New run created:", runId);
//   }

//   return runId;
// }
