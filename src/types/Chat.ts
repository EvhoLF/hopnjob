export interface Message {
  id: string;
  chatId: string;
  fromId: string;
  text: string;
  sentAt: string; // ISO
}
export interface Chat {
  id: string;
  participants: string[]; // two users
  messages: Message[];
  lastRead: Record<string, string>;
}