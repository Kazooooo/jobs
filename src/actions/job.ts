import actionCreatorFactory from "typescript-fsa";
import { ThunkAction } from "redux-thunk";
import { AxiosInstance } from "axios";
import { AppState } from "../reducers";
import { RegionData } from "../screens/MapScreen";
import { JobsState } from "../reducers/jobsReducer";
import reverseGeocode from "latlng-to-zip";
import qs from "qs";

const actionCreator = actionCreatorFactory("JOBS");
const fetchJobs = actionCreator.async<{}, JobsState, {}>("FETCH_JOBS");

const standardActionCreators = {
  fetchStart: fetchJobs.started,
  fetchFailed: fetchJobs.failed,
  fetchSuccess: fetchJobs.done,
};

const JOB_ROOT_URL = "http://api.indeed.com/ads/apisearch?";
const JOB_QUERY_PARAMS = {
  publisher: "4201738803816157",
  format: "json",
  v: "2",
  latlong: 1,
  radius: 10,
  q: "javascript",
};

const buildJobsUrl = (zip: string) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

const fetchJobsActionCreator = (
  region: RegionData,
): ThunkAction<void, AppState, AxiosInstance> => async (dispatch, getState, axios) => {
  dispatch(standardActionCreators.fetchStart({}));
  try {
    const zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    const { data } = await axios.get(url);
    dispatch(
      standardActionCreators.fetchSuccess({
        params: {},
        result: {
          jobList: data.results,
        },
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

const jobActionCreators = {
  ...standardActionCreators,
  fetchJobsActionCreator,
};

export default jobActionCreators;
