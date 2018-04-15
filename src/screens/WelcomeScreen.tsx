import React from "react";
import Slides from "../components/Slides";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { AppState } from "../reducers";
import authActionCreators from "../actions/auth";
import { AppLoading } from "expo";

export interface SlideData {
  text: string;
  color: string;
}

const SLIDE_DATA_LIST: SlideData[] = [
  {
    text: "Welcome to JobApp",
    color: "#03A9F4",
  },
  {
    text: "Use this to get a job",
    color: "#009688",
  },
  {
    text: "Set your location, then swipe away",
    color: "#03A9F4",
  },
];

interface WelcomeScreenProps extends NavigationScreenProps {
  token: string;
  getTokenFromStorage: () => () => void;
}

interface WelcomeScreenState {
  hasToken: boolean | undefined;
}

class WelcomeScreen extends React.Component<WelcomeScreenProps, WelcomeScreenState> {
  readonly state: WelcomeScreenState = {
    hasToken: undefined,
  };

  static getDerivedStateFromProps(nextProps: WelcomeScreenProps) {
    return {
      hasToken: !!nextProps.token,
    };
  }

  componentDidMount() {
    this.props.getTokenFromStorage();
  }

  shouldComponentUpdate(nextProps: WelcomeScreenProps, nextState: WelcomeScreenState) {
    return !!nextState.hasToken;
  }

  componentDidUpdate() {
    if (this.state.hasToken) {
      this.props.navigation.navigate("map");
    }
  }

  private handleComplete = () => {
    this.props.navigation.navigate("auth");
  }

  render() {
    if (this.state.hasToken === undefined) {
      return <AppLoading />;
    }
    return <Slides dataList={SLIDE_DATA_LIST} onComplete={this.handleComplete} />;
  }
}

export default connect(
  (state: AppState) => ({
    token: state.auth.token,
  }),
  {
    getTokenFromStorage: authActionCreators.getStorageTokenActionCreator,
  },
)(WelcomeScreen);
