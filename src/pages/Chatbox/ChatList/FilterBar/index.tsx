import { useState } from "react";
import { useSelector } from "react-redux";

import { ChatDataType, ReduxStateType } from "../../../types";
import classes from "./FilterBar.module.css";
import { updateRawData } from "../../../../utils";

const FilterBar = () => {
  const allChatsData: ChatDataType[] | undefined = useSelector(
    (state: ReduxStateType) => state?.rawData?.chatsData
  );
  const [filterVal, setFilterVal] = useState<string>("");

  const filterChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterVal(e?.target?.value);
    
    if (e?.target?.value) {
      const tempChatsData = JSON.parse(JSON.stringify(allChatsData));
      const filteredChats = tempChatsData?.filter(
        (chat: ChatDataType) =>
          chat?.title?.toLowerCase()?.indexOf(e?.target?.value?.toLowerCase()) >
            -1 ||
          chat?.orderId
            ?.toLowerCase()
            ?.indexOf(e?.target?.value?.toLowerCase()) > -1
      );
      const filteredIds = filteredChats?.map((item: ChatDataType) => item.id);
      updateRawData({ filteredChatIDs: filteredIds });
    } else {
      updateRawData({
        filteredChatIDs: allChatsData?.map((item: ChatDataType) => item.id),
      });
    }
  };

  return (
    <div className={classes.filterbar}>
      <h4>Filter by Title / Order ID</h4>
      <input
        placeholder="Start typing to search"
        value={filterVal}
        onChange={filterChangeHandler}
      />
    </div>
  );
};
export default FilterBar;
