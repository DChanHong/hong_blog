import { NextResponse } from "next/server";
import { openAi } from "../../openAI";

export async function GET(request: Request) {
  // 어시스턴스 생성
  const myAssistant = await openAi.beta.assistants.create({
    instructions: "It will guide you through Sung Chan-hong's information.",
    name: "Chanhong Guide",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-3.5-turbo-0125",
  });

  const assistant_id = myAssistant.id;
  if (assistant_id !== "") {
    return NextResponse.json({ data: assistant_id }, { status: 200 });
  }
}
