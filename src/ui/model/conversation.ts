export interface ConversationMessage {
  body: string;
  outbound: boolean;
  time: number;
  readableTime: string;
}

export interface Conversation {
  name: string;
  phone: string;
  messages: ConversationMessage[];
}
