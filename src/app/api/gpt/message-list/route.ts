import { NextResponse } from "next/server";
import { openAi } from "@/app/api/openAI";
import prisma from "@/utils/client";
import { checkIp } from "@/hooks/gptAPI/gpt";

export async function POST(request: Request) {
  const { thread_id } = await request.json();
  const threadMessages: any = await openAi.beta.threads.messages.list(
    thread_id
  );

  let content: string = threadMessages.data[0].content[0].text.value;

  const ipHeader = request.headers.get("x-forwarded-for");
  const ip = ipHeader
    ? ipHeader.split(",")[0].trim() ?? ""
    : request.headers.get("remote-addr") ?? "";

  const ipCheck = await prisma.checkip.findFirst({
    select: {
      idx: true,
      ip: true,
      hit: true,
      updated_at: true,
    },
    where: {
      ip: ip,
    },
  });

  console.log("ipCheck", ipCheck);

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  console.log(`content.includes("false")`, content.includes("false"));
  if (content.includes("false")) {
    // false를 포함하고 있다면, ip 카운트 추가

    if (ipCheck) {
      // 현재 시간 기준 10분전인 시간보다 updated_at이 더 이전인 경우
      console.log("tenMinutesAgo", tenMinutesAgo);
      console.log("ipCheck.updated_at", ipCheck.updated_at);
      console.log(
        "tenMinutesAgo > ipCheck.updated_at",
        tenMinutesAgo > ipCheck.updated_at
      );
      if (tenMinutesAgo > ipCheck.updated_at) {
        await prisma.checkip.update({
          data: {
            hit: 1,
            updated_at: new Date(),
          },
          where: {
            idx: ipCheck.idx,
          },
        });
      }
      //
      else {
        await prisma.checkip.update({
          data: {
            hit: ipCheck.hit + 1,
            updated_at: new Date(),
          },
          where: {
            idx: ipCheck.idx,
          },
        });
      }
    } else {
      await prisma.checkip.create({
        data: {
          ip: ip ?? "",
          updated_at: new Date(),
        },
      });
    }
  } else {
    if (ipCheck && tenMinutesAgo > ipCheck.updated_at) {
      await prisma.checkip.update({
        data: {
          hit: 0,
        },
        where: {
          idx: ipCheck.idx,
        },
      });
    }
  }

  return NextResponse.json(
    { data: threadMessages.data[0].content[0] },
    { status: 200 }
  );
}
