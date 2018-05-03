import { combineReducers } from "redux";
import authReducer, { AuthState } from "./authReducer";
import jobsReducer, { JobsState } from "./jobsReducer";
import likesReducer, { LikedJobsState } from "./likesReducer";

export interface AppState {
  auth: AuthState;
  jobs: JobsState;
  likes: LikedJobsState;
}

const reducerMap = {
  auth: authReducer,
  jobs: jobsReducer,
  likes: likesReducer,
};

export default combineReducers<AppState>(reducerMap);
