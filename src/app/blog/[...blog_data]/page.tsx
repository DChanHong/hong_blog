import axios from "axios";
import { blogListRes } from "@/dataDto/blogDto";
import { usePathname, useRouter } from "next/navigation";
import Layout from "@/components/commons/Layout";
import DOMPurify from "isomorphic-dompurify";

async function getData(id: string) {
  try {
    const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "";
    const result = await axios.get(
      `${NEXT_PUBLIC_API_DOMAIN}/api/blog-posts/${id}}`
    );

    if (result) {
      return result.data.data;
    } else false;
  } catch (error) {
    console.error(error);
  }
}

const Index = async ({ params }: { params: { blog_data: string[] } }) => {
  const data: blogListRes = await getData(params.blog_data[0]);
  console.log(data);

  return (
    <Layout>
      <div className={`mt-[100px]`}>
        <div className={`flex justify-center`}>
          <div
            className="prose w-full border-2 rounded-xl p-2 3xs:p-6 sm:p-10 dark:!text-[#b7babe] mt-[30px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.content),
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
