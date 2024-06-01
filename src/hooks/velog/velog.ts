import axios from "axios";

const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "";

export const getVelogList = async () => {
  const result = await axios.get(`${NEXT_PUBLIC_API_DOMAIN}/api/velog/list`);

  return result.data.data;
};

export const velogKey = () => {
  return {
    VELOG_LIST: "velog_list",
  };
};

export const velogApi = () => {
  return {
    getVelogList,
    velogKey,
  };
};
