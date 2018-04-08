import { combineReducers } from "redux";
import { Reducer } from "redux";

export interface AppState {
  auth: {};
}

type ReducesMap<S extends {}> = { [K in keyof S]: Reducer<S[K]> };

const reducerMap: ReducesMap<AppState> = {
  auth: () => {
    return {};
  },
};

export default combineReducers<AppState>(reducerMap);
