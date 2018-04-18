import { reducerWithInitialState } from "typescript-fsa-reducers";
import jobActionCreators from "../actions/job";

export interface JobsStateData {
  jobList: any[];
}

export interface JobsState {
  jobList: any[];
}

const initialState: Partial<JobsStateData> = {
  jobList: [],
};

const reducer = reducerWithInitialState(initialState)
  .case(jobActionCreators.fetchStart, (state) => state)
  .case(jobActionCreators.fetchSuccess, (state, payload) => ({
    ...state,
    jobList: payload.result.jobList,
  }))
  .case(jobActionCreators.fetchFailed, (state) => ({
    ...state,
    jobList: [],
  }));

export default reducer;
