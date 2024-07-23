import { atom } from "recoil";

export interface IConversation {
  is_answer: boolean;
  message: string;
}

export const chatIsChatBoxState = atom<boolean>({
  key: "chatIsChatBoxState",
  default: false,
});

export const chatPossibleState = atom<boolean>({
  key: "chatPossible",
  default: true,
});

export const chatListState = atom<IConversation[]>({
  key: "chatListState",
  default: [],
});
