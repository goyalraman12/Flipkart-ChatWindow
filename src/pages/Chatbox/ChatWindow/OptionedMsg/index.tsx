import { MessageOjectType, MessageOptionOjectType } from "../../../types";
import classes from "./OptionedMsg.module.css";

interface OptionedMsgPropsType {
  msgObj: MessageOjectType;
  isLastMsg: boolean;
  clickRequestCall: () => void;
}

const OptionedMsg = (props: OptionedMsgPropsType) => {
  const { msgObj, isLastMsg, clickRequestCall } = props;
  
  const optionClickHandler = (msg?: string) => {
    if (isLastMsg && msg === "Request a call") {
      clickRequestCall();
    }
  };
  return (
    <div className={`p-0 m-0 ${classes.optionedMessageContainer}`}>
      <div className={classes.titleMsg}>{msgObj?.message}</div>
      {msgObj?.options?.map((opt: MessageOptionOjectType, index: number) => (
        <div className={classes.optContainer} key={index}>
          <span
            className={classes.optText}
            style={{ cursor: isLastMsg ? "pointer" : "not-allowed" }}
            onClick={() => optionClickHandler(opt?.optionText)}
          >
            {opt?.optionText}
          </span>
          {!!opt?.optionSubText && (
            <span className={classes.optSubtext}>{opt?.optionSubText}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default OptionedMsg;
