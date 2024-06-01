import { atom } from "recoil";

export interface IConversation {
  is_answer: boolean;
  message: string;
}

export const chatIsChatBoxState = atom<boolean>({
  key: "chatIsChatBoxState",
  default: false,
});

export const chatListState = atom<IConversation[]>({
  key: "chatListState",
  default: [],
});
