import actionCreatorFactory from "typescript-fsa";
import { ThunkAction } from "redux-thunk";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import { AppState } from "../reducers";
import { APP_ID } from "../constants/secure/facebookAuth";
import { AuthState } from "../reducers/authReducer";

const actionCreator = actionCreatorFactory("AUTH");
const loginFacebook = actionCreator.async<{}, AuthState, {}>("LOGIN_FACEBOOK");

const standardActionCreators = {
  loginStart: loginFacebook.started,
  loginFailed: loginFacebook.failed,
  loginSuccess: loginFacebook.done,
};

const loginFacebookActionCreator = (): ThunkAction<void, AppState, any> => async (dispatch) => {
  dispatch(standardActionCreators.loginStart({}));
  const token = await AsyncStorage.getItem("fb_token");
  if (token) {
    dispatch(
      standardActionCreators.loginSuccess({
        params: {},
        result: { token },
      }),
    );
  } else {
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
  }
};

const authActionCreators = {
  ...standardActionCreators,
  loginFacebookActionCreator,
};

export default authActionCreators;
