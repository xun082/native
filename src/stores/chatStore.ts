import { create } from 'zustand';

export type chatRoom = {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  rank: number;
};

interface ChatState {
  selectedChatRoom: chatRoom | null;
  setSelectedChatRoom: (chatRoom: chatRoom) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  selectedChatRoom: null,
  setSelectedChatRoom: (chatRoom) => set({ selectedChatRoom: chatRoom }),
}));
