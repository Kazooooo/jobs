import actionCreatorFactory from "typescript-fsa";
import { ThunkAction } from "redux-thunk";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import { AppState } from "../reducers";
import { APP_ID } from "../constants/secure/facebookAuth";
import { AuthState } from "../reducers/authReducer";

const actionCreator = actionCreatorFactory("AUTH");
const getStorageToken = actionCreator.async<{}, AuthState, {}>("GET_STORAGE_TOKEN");
const loginFacebook = actionCreator.async<{}, AuthState, {}>("LOGIN_FACEBOOK");

const standardActionCreators = {
  getStorageTokenStart: getStorageToken.started,
  getStorageTokenFailed: getStorageToken.failed,
  getStorageTokenSuccess: getStorageToken.done,
  loginStart: loginFacebook.started,
  loginFailed: loginFacebook.failed,
  loginSuccess: loginFacebook.done,
};

const getStorageTokenActionCreator = (): ThunkAction<void, AppState, any> => async (dispatch) => {
  dispatch(standardActionCreators.getStorageTokenStart({}));
  try {
    const token = await AsyncStorage.getItem("fb_token");
    if (token) {
      dispatch(
        standardActionCreators.getStorageTokenSuccess({
          params: {},
          result: { token },
        }),
      );
    }
  } catch (error) {
    dispatch(standardActionCreators.getStorageTokenFailed({
      params: {},
      error: {},
    }));
  }
};

const loginFacebookActionCreator = (): ThunkAction<void, AppState, any> => async (dispatch) => {
  dispatch(standardActionCreators.loginStart({}));
  const response = await Facebook.logInWithReadPermissionsAsync(APP_ID, {
    permissions: ["public_profile"],
  });
  if (response.type === "cancel") {
    dispatch(
      standardActionCreators.loginFailed({
        params: {},
        error: {},
      }),
    );
  } else {
    await AsyncStorage.setItem("fb_token", response.token);
    dispatch(
      standardActionCreators.loginSuccess({
        params: {},
        result: { token: response.token },
      }),
    );
  }
};

const authActionCreators = {
  ...standardActionCreators,
  getStorageTokenActionCreator,
  loginFacebookActionCreator,
};

export default authActionCreators;
