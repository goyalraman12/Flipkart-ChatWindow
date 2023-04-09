import moment from "moment";
import { ObjectStr } from "../pages/types";
import store from "../store";
import { rawDataActions } from "../store/rawDataReducer";

export const updateRawData = (data: ObjectStr) => {
  store.dispatch(rawDataActions.updateRawData(data));
};

export const convertTimestampToDate = (
  ts: DOMHighResTimeStamp = Date.now(),
  format: string = "DD/MM/YYYY"
) => {
  return moment(new Date(ts)).format(format);
};
