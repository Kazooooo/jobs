import { reducerWithInitialState } from "typescript-fsa-reducers";
import { uniqBy } from "lodash";
import jobActionCreators from "../actions/job";

export interface LikedJobsData {
  likedJobs: any[];
}

export interface LikedJobsState {
  likedJobs: any[];
}

const initialState: Partial<LikedJobsData> = {
  likedJobs: [],
};

const reducer = reducerWithInitialState(initialState).case(
  jobActionCreators.likeJob,
  (state, payload) => {
    return {
      likedJobs: uniqBy([payload, ...state.likedJobs!], "jobkey"),
    };
  },
);

export default reducer;
