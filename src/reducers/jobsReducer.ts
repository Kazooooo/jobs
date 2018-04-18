import { reducerWithInitialState } from "typescript-fsa-reducers";
import jobActionCreators from "../actions/job";

export interface JobsStateData {
  data: any;
}

export interface JobsState {
  data: any;
}

const initialState: Partial<JobsStateData> = {
  data: undefined,
};

const reducer = reducerWithInitialState(initialState)
  .case(jobActionCreators.fetchStart, (state) => state)
  .case(jobActionCreators.fetchSuccess, (state, data) => ({
    ...state,
    data,
  }))
  .case(jobActionCreators.fetchFailed, (state) => ({
    ...state,
    data: undefined,
  }));

export default reducer;
