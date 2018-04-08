import React from "react";
import { ScrollView } from "react-native";
import { SlideData } from "../screens/WelcomeScreen";
import SingleSlide from "./SingleSlide";

interface SlidesProps {
  dataList: SlideData[];
}

class Slides extends React.Component<SlidesProps, {}> {
  render() {
    return (
      <ScrollView horizontal={true} style={{ flex: 1 }} pagingEnabled={true}>
        {this.props.dataList.map((slideData) => (
          <SingleSlide key={slideData.text} slide={slideData} />
        ))}
      </ScrollView>
    );
  }
}

export default Slides;
