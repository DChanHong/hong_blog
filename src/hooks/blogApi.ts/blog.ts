import axios from "axios";

const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "";
export const getBlogPageList = async (
  page: number,
  viewCount: number,
  tag: string,
  search: string
) => {
  const result = await axios.get(
    `${NEXT_PUBLIC_API_DOMAIN}/api/blog-posts/${page}/${viewCount}/${
      tag === "" ? "blank" : tag
    }/${search === "" ? "blank" : search}`
  );
  return result.data;
};

export const getCount = async (tag: string, search: string) => {
  const result = await axios.get(
    `${NEXT_PUBLIC_API_DOMAIN}/api/blog-posts/count/${
      tag === "" ? "blank" : tag
    }/${search === "" ? "blank" : search}`
  );
  return result.data;
};

export const getTagList = async () => {
  const result = await axios.get(`${NEXT_PUBLIC_API_DOMAIN}/api/tags`);

  return result.data.data;
};
