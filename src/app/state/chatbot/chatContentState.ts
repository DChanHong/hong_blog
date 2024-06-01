import { atom } from "recoil";

interface chatDto {
  is_answer: boolean;
  message: string;
}

export const questionListState = atom<chatDto[]>({
  key: "questionListState",
  default: [],
});
