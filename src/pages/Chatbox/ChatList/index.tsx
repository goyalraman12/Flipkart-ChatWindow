import { useSelector } from "react-redux";
import FilterBar from "./FilterBar";
import ChatCard from "./ChatCard";

import { ReduxStateType } from "../../types";
import classes from "./ChatList.module.css";

interface ChatListPropsType {
  className?: string;
}

const ChatList = (props: ChatListPropsType) => {
  
  const filteredChatIDs: number[] | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.filteredChatIDs
  );

  return (
    <div className={`${classes.chatListContainer} ${props?.className}`}>
      <FilterBar />
      <ul className="p-0 m-0">
        {filteredChatIDs?.map((id: number) => (
          <ChatCard key={id} chatId={id} />
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
