import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SlideData } from "../screens/WelcomeScreen";
import { SCREEN_WIDTH } from "../constants/dimensions";

interface SingleSlideProps {
  slide: SlideData;
}

const SingleSlide: React.SFC<SingleSlideProps> = ({ slide }) => {
  return (
    <View
      style={[
        styles.slideStyle,
        {
          backgroundColor: slide.color,
        },
      ]}
    >
      <Text style={styles.textStyle}>{slide.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  textStyle: {
    fontSize: 30,
    color: "#FFF",
  },
});

export default SingleSlide;
