import axios from "axios";

export const getBlogPageList = async (
  page: number,
  viewCount: number,
  tag: string,
  search: string
) => {
  const result = await axios.get(
    `http://localhost:1337/api/blog-posts/${page}/${viewCount}/${
      tag === "" ? "blank" : tag
    }/${search === "" ? "blank" : search}`
  );
  return result.data;
};

export const getCount = async (tag: string, search: string) => {
  const result = await axios.get(
    `http://localhost:1337/api/blog-posts/count/${tag === "" ? "blank" : tag}/${
      search === "" ? "blank" : search
    }`
  );
  return result.data;
};

export const getTagList = async () => {
  const result = await axios.get("http://localhost:1337/api/tags");

  return result.data.data;
};
