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

export const getSeperatorDay = (
  tsLatest?: DOMHighResTimeStamp,
  tsPrev?: DOMHighResTimeStamp | null
) => {
  const dateLatest = tsLatest ? moment(new Date(tsLatest)) : null;
  const datePrev = tsPrev ? moment(new Date(tsPrev)) : null;

  const diffLatestAndTodayDate = dateLatest?.diff(moment(new Date()), "days");

  const dateSeperateString =
    diffLatestAndTodayDate &&
    diffLatestAndTodayDate > 1 &&
    diffLatestAndTodayDate < 7
      ? dateLatest?.format("dddd")
      : dateLatest?.format("DD/MM/YYYY") ===
        moment(new Date()).format("DD/MM/YYYY")
      ? "Today"
      : diffLatestAndTodayDate === 1
      ? "Yesterday"
      : dateLatest?.format("DD/MM/YYYY");

  if (!datePrev && dateLatest) return dateSeperateString;
  else {
    const diffOfDates =
      tsPrev && tsPrev ? dateLatest?.diff(datePrev, "days") : null;

    if (diffOfDates) {
      return dateSeperateString;
    } else {
      return datePrev?.format("DD/MM/YYYY") === dateLatest?.format("DD/MM/YYYY")
        ? diffOfDates
        : dateSeperateString;
    }
  }
};
