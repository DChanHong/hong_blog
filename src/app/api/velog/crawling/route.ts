import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import prisma from "@/utils/client";
import { blogListRes } from "@/dataDto/blogDto";

interface BlogCrawl {
  title: string;
  img_src: string;
  created_at: string;
  tags: string[];
  detail_link: string;
  intro: string;
}

// background에서 브라우저를 열어서 내용을 가져오는 함수
const openBrowser = async (url: string) => {
  chromium.setHeadlessMode = true;
  chromium.setGraphicsMode = false;

  // 크로미움으로 브라우저를 연다.
  const browser = await puppeteer.launch(
    process.env.NODE_ENV === "development"
      ? // 로컬 실행 환경
        {
          headless: true,
          executablePath: process.env.NEXT_LOCAL_CHROME_PATH,
        }
      : // 서버 실행 환경
        {
          args: [
            ...chromium.args,
            "--hide-scrollbars",
            "--disable-web-security",
            "--no-sandbox",
            "--disable-setuid-sandbox",
          ],
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(``),
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        }
  );

  // console.log('browser',browser)
  // 페이지 열기
  const page = await browser.newPage();

  // 링크 이동
  await page.goto(url, {
    waitUntil: "networkidle2", // 500ms 동안 두 개 이상의 네트워크 연결이 없을 때 탐색이 완료되는 것으로 간주
  });

  //4. HTML 정보 가지고 온다.
  const content: string = await page.content();
  // console.log(content);

  //5. 페이지와 브라우저 종료
  await page.close();

  return content;
};

const getHtml = async (url: string) => {
  try {
    const $ = cheerio.load(await openBrowser(url));

    let content: any[] = [];
    const ARTICLE_SELECTOR = $(
      "main section > div:nth-child(2) > div:nth-child(3) > div"
    );

    // FUNCTION get tag
    const getTag = (tagSelector: any) => {
      let result: string[] = [];

      const tagList = $(tagSelector).find(
        ".FlatPostCard_tagsWrapper__iNQR3 > a"
      );

      tagList.map((idx, el) => {
        const tag = $(el).text();
        result[idx] = tag;
      });

      return result;
    };

    ARTICLE_SELECTOR.map((idx, el) => {
      content[idx] = {
        img_src: $(el).find("img").attr("src"),
        created_at: $(el)
          .find(".FlatPostCard_subInfo__cT3J6 > span:first-of-type")
          .text(),
        intro: $(el).find("p").text(),
        detail_link: $(el).find("a:first-child").attr("href"),
        title: $(el).find("h2").text(),
        tags: getTag(el),
      };
    });
    return content;
  } catch (e) {
    console.log(e);
  }
};

export async function GET(request: Request) {
  const article: BlogCrawl[] | null =
    (await getHtml(process.env.NEXT_PUBLIC_BLOG_URL || "")) ?? null;
  const blogList: blogListRes[] = await prisma.velog.findMany({});

  if (blogList && article && article.length > 0) {
    const stingFilter = (arr: string[]) => {
      let str = "";
      arr.length >= 0 &&
        arr.forEach((item: string, index: number) => {
          str += `${item}${arr.length === index + 1 ? "" : ","}`;
        });
      return str;
    };

    const now = new Date();

    const createDate = (daysAgo: number) => {
      const date = new Date(now);
      date.setDate(now.getDate() - daysAgo);
      date.setHours(18, 0, 0, 0); // 18시 00분 00초 000밀리초로 설정
      return date;
    };

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(18, 0, 0, 0);
    console.log(article);

    const result = await Promise.all(
      article.map(async (item) => {
        if (blogList.find((blog) => blog.title === item.title)) {
          return "";
        } else {
          return await prisma.velog.create({
            data: {
              title: item.title ?? "",
              img_src: item.img_src ?? "",
              created_at:
                item.created_at === "어제"
                  ? yesterday
                  : item.created_at.includes("전")
                  ? createDate(Number(item.created_at.substring(0, 1)))
                  : new Date(
                      item.created_at
                        .replace("년 ", "-")
                        .replace("월 ", "-")
                        .replace("일", "")
                    ),
              tags: stingFilter(item.tags),
              detail_link: item.detail_link ?? "",
              intro: item.intro ?? "",
            },
          });
        }
      })
    );
  }

  return NextResponse.json({ data: "" }, { status: 200 });
}

// export async function GET(request: Request) {
//   const html = await axios.get("https://velog.io/@hongchee/posts");
//   const $ = cheerio.load(html.data);
//
//   const $blogList = $(
//     "section > div:nth-child(2) > div:nth-child(2) > div > div"
//   );
//
//   $blogList.each((idx, node) => {
//     const title = $(node).find("h2").text();
//   });
//
//   return NextResponse.json({ data: "" }, { status: 200 });
// }
