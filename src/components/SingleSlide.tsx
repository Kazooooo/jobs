import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SlideData } from "../screens/WelcomeScreen";
import { SCREEN_WIDTH } from "../constants/dimensions";
import { Button } from "react-native-elements";

interface SingleSlideProps {
  slide: SlideData;
  isLastSlide: boolean;
  onComplete: () => void;
}

const SingleSlide: React.SFC<SingleSlideProps> = ({ slide, isLastSlide, onComplete }) => {
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
      {isLastSlide && (
        <Button
          containerViewStyle={styles.buttonContainerStyle}
          buttonStyle={styles.buttonStyle}
          title="Onwards!"
          raised={true}
          onPress={onComplete}
        />
      )}
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
    textAlign: "center",
    width: "95%",
  },
  buttonContainerStyle: {
    marginTop: 15,
  },
  buttonStyle: {
    backgroundColor: "#0288D1",
  },
});

export default SingleSlide;
