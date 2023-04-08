import { createActions, createReducer } from "reduxsauce";

const INITIAL_STATE = {};

export interface ActionType {
  type: string;
  payload: object;
}

const { Types, Creators } = createActions({
  updateRawData: ["data"],
});

export const onUpdateRawData = (
  state = INITIAL_STATE,
  action: { data: {} }
) => ({
  ...state,
  ...action.data,
});

const HANDLERS = {
  [Types.UPDATE_RAW_DATA]: onUpdateRawData,
};

const rawDataReducer = createReducer(INITIAL_STATE, HANDLERS);
export const rawDataActions = Creators;

export default rawDataReducer;
