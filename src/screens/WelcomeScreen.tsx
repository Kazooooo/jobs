import React from "react";
import Slides from "../components/Slides";

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

class WelcomeScreen extends React.Component<{}, {}> {
  render() {
    return <Slides dataList={SLIDE_DATA_LIST} />;
  }
}

export default WelcomeScreen;
