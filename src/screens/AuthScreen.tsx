import React from "react";
import { connect } from "react-redux";
import { NavigationScreenProps } from "react-navigation";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import authActionCreators from "../actions/auth";
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
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default connect(
  (state: AppState) => ({
    token: state.auth.token,
  }),
  {
    loginFacebook: authActionCreators.loginFacebookActionCreator,
  },
)(AuthScreen);
