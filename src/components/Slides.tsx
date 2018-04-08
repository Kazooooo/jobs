import React from "react";
import { ScrollView } from "react-native";
import { SlideData } from "../screens/WelcomeScreen";
import SingleSlide from "./SingleSlide";

interface SlidesProps {
  dataList: SlideData[];
  onComplete: () => void;
}

class Slides extends React.Component<SlidesProps, {}> {
  render() {
    const { dataList, onComplete } = this.props;
    return (
      <ScrollView horizontal={true} style={{ flex: 1 }} pagingEnabled={true}>
        {dataList.map((slideData, index) => (
          <SingleSlide
            key={slideData.text}
            slide={slideData}
            isLastSlide={dataList.length - 1 === index}
            onComplete={onComplete}
          />
        ))}
      </ScrollView>
    );
  }
}

export default Slides;
