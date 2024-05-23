import { NextResponse } from "next/server";
import fs from "fs";
import OpenAI from "openai";

export async function GET(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? "",
  });

  const file = await openai.files.create({
    file: fs.createReadStream("/src/public/textfiles/example.txt"),
    purpose: "assistants",
  });
  console.log(file);

  return NextResponse.json({ message: "Hello from Next.js!" });
}

// import { NextApiRequest, NextApiResponse } from "next";
// // import { HttpStatusCode } from "axios";

// type Data = {
//   data: any;
//   // status: HttpStatusCode;
// };

// export default async function fileRead(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   console.log(req.method);
//   console.log("파일 여기 오긴 오나?");
//   const fileStreams = ["/src/utils/gptchanhong.txt"].map((path) =>
//     fs.createReadStream(path)
//   );
//   console.log(fileStreams);

//   res.status(200).json({
//     data: fileStreams,
//     // status: HttpStatusCode.Accepted,
//   });
// }
