import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: typeof window !== "undefined" ? window.sessionStorage : undefined,
});

interface ChatDto {
  is_answer: boolean;
  message: string;
}

export const questionListState = atom<ChatDto[]>({
  key: "questionListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
