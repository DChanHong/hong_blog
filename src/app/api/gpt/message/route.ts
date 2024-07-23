import { NextResponse } from "next/server";
import { openAi } from "@/app/api/openAI";
import { connectDB } from "../../database";

export async function POST(request: Request) {
  const { question, thread_id } = await request.json();
  await openAi.beta.threads.messages.create(thread_id, {
    role: "user",
    content: question,
  });

  const ipHeader = request.headers.get("x-forwarded-for");
  const ip = ipHeader
    ? ipHeader.split(",")[0].trim()
    : request.headers.get("remote-addr");

  const db = (await connectDB).db("hongcluster");
  await db.collection("messageLog").insertOne({
    question: question,
    created_at: new Date(),
    ip: ip,
  });

  if (thread_id !== "") {
    return NextResponse.json({ data: "" }, { status: 200 });
  }
}
