import { combineReducers } from "redux";
import authReducer, { AuthState } from "./authReducer";
import jobsReducer, { JobsState } from "./jobsReducer";

export interface AppState {
  auth: AuthState;
  jobs: JobsState;
}

const reducerMap = {
  auth: authReducer,
  jobs: jobsReducer,
};

export default combineReducers<AppState>(reducerMap);
