import { combineReducers } from "redux";
import { AuthState } from "./authReducer";
import authReducer from "./authReducer";

export interface AppState {
  auth: AuthState;
}

const reducerMap = {
  auth: authReducer,
};

export default combineReducers<AppState>(reducerMap);
