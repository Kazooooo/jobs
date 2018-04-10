import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import authActionCreator from "../actions/auth";
import { AppState } from "../reducers";
import { Dispatch } from "redux";

interface AuthScreenProps {
  loginFacebook: () => (
    dispatch: Dispatch<AppState>,
    getState: () => AppState,
    extraArgument: any,
  ) => void;
}

class AuthScreen extends React.Component<AuthScreenProps, {}> {
  componentDidMount() {
    this.props.loginFacebook();
  }

  render() {
    return (
      <View>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
      </View>
    );
  }
}

export default connect(null, {
  loginFacebook: authActionCreator.loginFacebookActionCreator,
})(AuthScreen);
