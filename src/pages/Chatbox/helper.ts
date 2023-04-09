import moment from "moment";
import { updateRawData } from "../../utils";

export const toggleSideChatBox = (flag: boolean = true, chatId?: number) => {
  updateRawData({ isSideChatViewOpen: flag });
  if (chatId) {
    updateRawData({ selectedChatId: chatId });
  } else {
    updateRawData({ selectedChatId: undefined });
  }
};
export const getLastMsgDateTime = (ts: DOMHighResTimeStamp = Date.now()) => {
  const momentTime: moment.Moment = moment(new Date(ts));

  //check if latestmessage is not sent today
  if (
    moment(new Date()).format("DD/MM/YYYY") === momentTime.format("DD/MM/YYYY")
  )
    return momentTime.format("hh:mm A");
  else return momentTime.format("DD/MM/YYYY");
};
