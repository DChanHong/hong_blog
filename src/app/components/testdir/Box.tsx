import React, { useEffect, useState } from "react";
import axios from "axios";

interface dataType {
  title: string;
  content: string;
  sub_title: string;
}

const Box = () => {
  const [data, setData] = useState<dataType>();
  const [error, setError] = useState<Error | null>(null);

  const getByBtn = async () => {
    try {
      const result = await axios.get("http://localhost:1337/api/blog-posts/5");
      setData(result.data.data.attributes);
    } catch (error: any) {
      console.error(error);
      setError(error);
    }
  };

  useEffect(() => {
    getByBtn();
  }, []);

  if (error) {
    throw error; // 에러를 던져 ErrorBoundary가 동작하도록 함
  }

  return <div>{data?.title}</div>;
};

export default Box;
