import React from "react";
import { connect } from "react-redux";
import { NavigationScreenProps } from "react-navigation";
import { View, Text } from "react-native";
import authActionCreator from "../actions/auth";
import { AppState } from "../reducers";

interface AuthScreenProps extends NavigationScreenProps {
  loginFacebook: () => () => void;
  token: string;
}

interface AuthScreenState {
  hasToken: boolean;
}

class AuthScreen extends React.Component<AuthScreenProps, AuthScreenState> {
  readonly state: AuthScreenState = {
    hasToken: false,
  };

  componentDidMount() {
    this.props.loginFacebook();
  }

  static getDerivedStateFromProps(nextProps: AuthScreenProps, prevState: AuthScreenState) {
    return {
      hasToken: !!nextProps.token,
    };
  }

  componentDidUpdate() {
    if (this.state.hasToken) {
      this.handleAuthComplete();
    }
  }

  handleAuthComplete = () => {
    this.props.navigation.navigate("map");
  };

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

export default connect(
  (state: AppState) => ({
    token: state.auth.token,
  }),
  {
    loginFacebook: authActionCreator.loginFacebookActionCreator,
  },
)(AuthScreen);
