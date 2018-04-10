import { AsyncStorage } from "react-native";
import { createActions } from "redux-actions";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../reducers";
import { Dispatch } from "redux";
import { identity } from "lodash";
import { Facebook } from "expo";
import { APP_ID } from "../constants/secure/facebookAuth";

const standardActionCreators: {
  facebook: {
    loginStart: any;
    loginSuccess: any;
    loginFailed: any;
  };
} = createActions({
  FACEBOOK: {
    LOGIN_START: identity,
    LOGIN_SUCCESS: identity,
    LOGIN_FAILED: identity,
  },
});

const loginFacebookActionCreator = (): ThunkAction<void, AppState, any> => async (
  dispatch: Dispatch<AppState>,
) => {
  dispatch(standardActionCreators.facebook.loginStart());
  const token = await AsyncStorage.getItem("fb_token");
  if (token) {
    dispatch(standardActionCreators.facebook.loginSuccess(token));
  } else {
    const response = await Facebook.logInWithReadPermissionsAsync(APP_ID, {
      permissions: ["public_profile"],
    });
    if (response.type === "cancel") {
      dispatch(standardActionCreators.facebook.loginFailed());
    } else {
      await AsyncStorage.setItem("fb_token", response.token);
      dispatch(standardActionCreators.facebook.loginSuccess(response.token));
    }
  }
};

const authActionCreators = {
  ...standardActionCreators,
  loginFacebookActionCreator,
};

export default authActionCreators;
