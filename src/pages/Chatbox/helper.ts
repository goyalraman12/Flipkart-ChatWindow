import { updateRawData } from "../../utils";

export const toggleSideChatBox = (flag: boolean = true, chatId?: number) => {
  updateRawData({ isSideChatViewOpen: flag });
  if (chatId) {
    updateRawData({ selectedChatId: chatId });
  } else {
    updateRawData({ selectedChatId: undefined });
  }
};
