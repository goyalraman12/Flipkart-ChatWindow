export interface ObjectStr {
  [key: string]: any;
}

export interface ReduxStateType {
  rawData?: {
    chatsData?: Array<ChatDataType>;
    filteredChatIDs?: Array<number>;
    isSideChatViewOpen?: boolean;
    selectedChatId?: number;
  };
}

export interface ChatDataType {
  id: number;
  title: string;
  imageURL: string;
  orderId: string;
  latestMessageTimestamp: DOMHighResTimeStamp;
  messageList: Array<MessageOjectType>;
}
export interface MessageOjectType {
  messageId?: string | number;
  message?: string;
  timestamp?: DOMHighResTimeStamp;
  sender?: "BOT" | "USER";
  messageType?: "text" | "optionedMessage";
  options?: Array<MessageOptionOjectType>;
}

export interface MessageOptionOjectType {
  optionText?: string;
  optionSubText?: string;
}
