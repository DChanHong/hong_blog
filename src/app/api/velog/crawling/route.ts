import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const html = await axios.get("https://velog.io/@hongchee/posts");
  const $ = cheerio.load(html.data);

  const $blogList = $(
    "section > div:nth-child(2) > div:nth-child(2) > div > div"
  );

  $blogList.each((idx, node) => {
    const title = $(node).find("h2").text();
  });

  return NextResponse.json({ data: "" }, { status: 200 });
}
