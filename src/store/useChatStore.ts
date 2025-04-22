// import { create } from 'zustand';
// import { chatsData } from '@/src/data/chatsData';
// import { Chat } from '@/src/types/Chat';

// interface ChatState {
//   chats: Chat[];
//   sendMessage: (chatId: string, fromId: string, text: string) => void;
// }

// export const useChatStore = create<ChatState>((set) => ({
//   chats: chatsData,
//   sendMessage: (chatId, fromId, text) =>
//     set((state) => ({
//       chats: state.chats.map((c) =>
//         c.id === chatId
//           ? {
//             ...c,
//             messages: [
//               ...c.messages,
//               {
//                 id: Date.now().toString(),
//                 chatId,
//                 fromId,
//                 text,
//                 sentAt: new Date().toISOString()
//               }
//             ]
//           }
//           : c
//       )
//     }))
// }));