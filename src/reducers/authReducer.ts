import { reducerWithInitialState } from "typescript-fsa-reducers";
import authActionCreators from "../actions/auth";

export interface AuthStateData {
  token: string;
}

export interface AuthState {
  token: string;
}

const initialState: Partial<AuthStateData> = {
  token: undefined,
};

const reducer = reducerWithInitialState(initialState)
  .case(authActionCreators.getStorageTokenStart, (state) => state)
  .case(authActionCreators.getStorageTokenSuccess, (state, token) => ({
    ...state,
    token: token.result.token,
  }))
  .case(authActionCreators.getStorageTokenFailed, (state) => ({
    ...state,
    token: undefined,
  }))
  .case(authActionCreators.loginStart, (state) => state)
  .case(authActionCreators.loginSuccess, (state, token) => ({
    ...state,
    token: token.result.token,
  }))
  .case(authActionCreators.loginFailed, (state) => ({
    ...state,
    token: undefined,
  }));

export default reducer;
