import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ChatDataType, MessageOjectType, ReduxStateType } from "../../types";
import classes from "./ChatWindow.module.css";
import { convertTimestampToDate, updateRawData } from "../../../utils";
import { SendIcon } from "../../../assets";
import OptionedMsg from "./OptionedMsg";
import { getSeperatorDay } from "../helper";

interface ChatWindowPropsType {
  chatId: number;
  className?: string;
}

const ChatWindow = (props: ChatWindowPropsType) => {
  const { chatId } = props;

  const allChatsData: ChatDataType[] | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.chatsData
  );

  const filteredChatIDs: number[] | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.filteredChatIDs
  );

  const currChatData: ChatDataType | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.chatsData
  )?.find((item: ChatDataType) => item.id === chatId);

  const [userMsg, setUserMsg] = useState<string>("");

  const msgInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMsg(e?.target?.value);
  };

  const msgInputKeyPressHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e?.key === "Enter") {
      sendMessageHandler(userMsg);
    }
  };

  const sendMessageHandler = (msg: string) => {
    if (msg) {
      const tempChatsData = JSON.parse(JSON.stringify(allChatsData));
      const tempCurrChatData = JSON.parse(JSON.stringify(currChatData));

      const latesttimestamp = Date.now();

      //add new message
      tempCurrChatData?.messageList?.push({
        messageId: latesttimestamp,
        message: msg,
        timestamp: latesttimestamp,
        sender: "USER",
      });

      //change latestMsgtimestamp for sidebar
      tempCurrChatData.latestMessageTimestamp = latesttimestamp;

      //moved chat to top in the data
      const indexOfChat = tempChatsData?.findIndex(
        (chat: ChatDataType) => chat?.id === chatId
      );
      tempChatsData?.splice(indexOfChat, 1);
      tempChatsData?.unshift(tempCurrChatData);
      updateRawData({ chatsData: tempChatsData });

      //move chat to top in sidebar
      const indexOfIdInSidebar = filteredChatIDs?.findIndex(
        (id: number) => id === chatId
      );
      const tempSideBarIds = JSON.parse(JSON.stringify(filteredChatIDs));
      tempSideBarIds?.splice(indexOfIdInSidebar, 1);
      tempSideBarIds?.unshift(chatId);
      updateRawData({
        filteredChatIDs: tempSideBarIds,
      });

      //clear message after sending
      setUserMsg("");
      scrollToBottomOfChat();
    } else return;
  };

  const clickRequestCallHandler = () => {
    sendMessageHandler("I want a callback");
  };

  const chatWindowBottomRef = useRef<any>(null);

  const scrollToBottomOfChat = () => {
    // 👇️ scroll to bottom of messages
    chatWindowBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottomOfChat();
  }, [chatId]);

  return (
    <div className={`${classes.chatWindowContainer} ${props?.className}`}>
      <div className={classes.header}>
        <div className={classes.chatIcon}>
          <img src={currChatData?.imageURL} alt="chaticon" />
        </div>
        <div className={classes.chatTitleContainer}>
          <h4>{currChatData?.title}</h4>
        </div>
      </div>

      <div className={classes.chatContentContainer}>
        {/* render messages list */}
        {currChatData?.messageList?.map(
          (msgObj: MessageOjectType, msgIndex: number) => {
            const seperationDate = getSeperatorDay(
              msgObj?.timestamp,
              msgIndex > 0
                ? currChatData?.messageList?.[msgIndex - 1]?.timestamp
                : null
            );
            return (
              <React.Fragment key={msgIndex}>
                {!!seperationDate && (
                  <div className={classes.dateSeperator}>
                    <span>{seperationDate}</span>
                  </div>
                )}

                {/* RenderOptioned Message */}
                {msgObj?.messageType === "optionedMessage" && (
                  <OptionedMsg
                    msgObj={msgObj}
                    isLastMsg={
                      msgIndex === currChatData?.messageList?.length - 1
                    }
                    clickRequestCall={clickRequestCallHandler}
                  />
                )}

                {msgObj?.messageType !== "optionedMessage" && (
                  <div
                    className={`${classes.msgContainer} ${
                      msgObj?.sender === "BOT"
                        ? classes.botMsgContainer
                        : classes.userMsgContainer
                    }`}
                  >
                    {msgObj?.message}
                    <span className={classes.timespan}>
                      {convertTimestampToDate(msgObj?.timestamp, "hh:mm A")}
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          }
        )}

        {/* display when no messages available */}
        {!currChatData?.messageList?.length && (
          <div className={classes.emptyChatContainer}>
            Send a message to start chatting
          </div>
        )}

        {/* used only for scrolling to bottom of chat */}
        <div ref={chatWindowBottomRef}></div>
      </div>

      <div className={classes.chatInputBox}>
        <input
          placeholder="Type a message.."
          value={userMsg}
          onChange={msgInputChangeHandler}
          onKeyDown={msgInputKeyPressHandler}
        />
        <img
          src={SendIcon}
          onClick={() => {
            sendMessageHandler(userMsg);
          }}
          alt="Send Button"
          style={{
            cursor: userMsg ? "pointer" : "not-allowed",
          }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
