import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { updateRawData } from "../../utils";
import { toggleSideChatBox } from "./helper";

import { ChatDataType, ReduxStateType } from "../types";

const Chatbox = () => {
  const isSideChatViewOpen: boolean | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.isSideChatViewOpen
  );

  const selectedChatId: number | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.selectedChatId
  );

  useEffect(() => {
    //fetch data at mount and save in store
    fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
      .then((response: Response) => response.json())
      .then((data: Array<ChatDataType>) => {
        //set messageList and  in store
        updateRawData({ chatsData: data });
        //set a filteredData in store to be used finally
        updateRawData({
          filteredChatIDs: data?.map((data: ChatDataType) => data.id),
        });
      })
      .catch((err: Error) => {
        console.log(err.message);
      });

    //close chat window on press escape
    const closeChatWindow = (e: KeyboardEvent) => {
      if (e?.key === "Escape") {
        toggleSideChatBox(false);
      }
    };
    window.addEventListener("keydown", closeChatWindow);
    return () => window.removeEventListener("keydown", closeChatWindow);
  }, []);

  return (
    <div className="d-flex">
      <ChatList className={`${isSideChatViewOpen ? "w-35" : "w-100"}`} />
      {!!isSideChatViewOpen && selectedChatId && (
        <ChatWindow className="w-65" chatId={selectedChatId} />
      )}
    </div>
  );
};

export default Chatbox;
