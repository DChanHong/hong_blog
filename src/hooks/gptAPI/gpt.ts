import axios from "axios";

const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "";

export const getAssistant = async () => {
  const result = await axios.get(`${NEXT_PUBLIC_API_DOMAIN}/api/gpt/assistant`);
  if (result.status === 200) {
    return result.data.data;
  } else {
    return null;
  }
};

export const getThreadId = async () => {
  const result = await axios.get(`${NEXT_PUBLIC_API_DOMAIN}/api/gpt/thread`);
  if (result.status === 200) {
    return result.data.data;
  } else {
    return null;
  }
};

export const postMessage = async (question: string, thread_id: string) => {
  const result = await axios.post(`${NEXT_PUBLIC_API_DOMAIN}/api/gpt/message`, {
    question,
    thread_id,
  });
  if (result.status === 200) {
    return result.data.data;
  } else {
    return null;
  }
};

export const createRun = async (thread_id: string, assistance_id: string) => {
  const result = await axios.post(`${NEXT_PUBLIC_API_DOMAIN}/api/gpt/run`, {
    thread_id,
    assistance_id,
  });
  if (result.status === 200) {
    return result.data.data;
  } else {
    return null;
  }
};

export const retrieveRun = async (thread_id: string, run_id: string) => {
  const result = await axios.post(
    `${NEXT_PUBLIC_API_DOMAIN}/api/gpt/retrieve`,
    { thread_id, run_id }
  );
  if (result.status === 200) {
    return result.data.data;
  } else {
    return null;
  }
};

export const getListMessage = async (thread_id: string) => {
  const result = await axios.post(
    `${NEXT_PUBLIC_API_DOMAIN}/api/gpt/message-list`,
    { thread_id }
  );
  if (result.status === 200) {
    return result.data.data;
  } else {
    return null;
  }
};

export const checkIp = async () => {
  const result = await axios.get(`${NEXT_PUBLIC_API_DOMAIN}/api/gpt/ip`);
  if (result.status === 200) {
    return result.data.data;
  } else {
    return null;
  }
};
