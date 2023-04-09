import { useSelector } from "react-redux";
import { ChatDataType, ReduxStateType } from "../../../types";

import classes from "./Chatcard.module.css";
import { getLastMsgDateTime, toggleSideChatBox } from "../../helper";

interface ChatCardPropsType {
  chatId: number;
}

const ChatCard = (props: ChatCardPropsType) => {
  const { chatId } = props;

  const chatCard: ChatDataType | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.chatsData
  )?.find((item: ChatDataType) => item.id === chatId);

  const isSideChatViewOpen: boolean | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.isSideChatViewOpen
  );

  const selectedChatId: number | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.selectedChatId
  );

  const chatItemClickHandler = () => {
    if (selectedChatId !== chatCard?.id || !isSideChatViewOpen) {
      toggleSideChatBox(true, chatCard?.id);
    }
  };

  return (
    <li
      className={`${classes.chatitem} ${
        selectedChatId === chatCard?.id ? classes["chatitem-selected"] : ""
      }`}
      onClick={chatItemClickHandler}
    >
      <div className={classes.chaticon}>
        <img src={chatCard?.imageURL} alt="chaticon" />
      </div>
      <div className={classes.chatcontentcontainer}>
        <div className={classes.maincontainer}>
          <h5>{chatCard?.title}</h5>
          <h5>Order {chatCard?.orderId}</h5>
          {!!chatCard?.messageList?.length && (
            <div className={classes.description}>
              <h5>
                {
                  chatCard?.messageList?.[chatCard?.messageList?.length - 1]
                    ?.message
                }
              </h5>
            </div>
          )}
        </div>
        <div className={classes.timeContainer}>
          {getLastMsgDateTime(chatCard?.latestMessageTimestamp)}
        </div>
      </div>
    </li>
  );
};

export default ChatCard;
