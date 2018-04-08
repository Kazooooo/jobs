import React from "react";
import Slides from "../components/Slides";
import { NavigationScreenProps } from "react-navigation";

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

interface WelcomeScreenProps extends NavigationScreenProps {}

class WelcomeScreen extends React.Component<WelcomeScreenProps, {}> {
  private handleComplete = () => {
    this.props.navigation.navigate("auth");
  }

  render() {
    return <Slides dataList={SLIDE_DATA_LIST} onComplete={this.handleComplete} />;
  }
}

export default WelcomeScreen;
