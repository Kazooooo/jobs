import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  PanResponderInstance,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { SCREEN_WIDTH } from "../constants/device";
import SwipeCard from "./SwipeCard";
import NoMoreCards from "./NoMoreCards";

const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
enum SWIPE_DIRECTION {
  RIGHT,
  LEFT,
}
interface SwipeProps {
  cardDataList: any[];
}

interface SwipeState {
  panResponder: PanResponderInstance;
  position: Animated.ValueXY;
  cardIndex: number;
}

class Swipe extends React.Component<SwipeProps, SwipeState> {
  constructor(props: SwipeProps) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe(SWIPE_DIRECTION.RIGHT);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe(SWIPE_DIRECTION.LEFT);
        } else {
          this.resetPosition();
        }
      },
    });

    this.state = { panResponder, position, cardIndex: 0 };
  }

  componentWillReceiveProps(nextProps: SwipeProps) {
    if (nextProps.cardDataList !== this.props.cardDataList) {
      this.setState({ cardIndex: 0 });
    }
  }

  componentDidUpdate() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.spring();
  }

  forceSwipe = (direction: SWIPE_DIRECTION) => {
    const x = direction === SWIPE_DIRECTION.RIGHT ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => this.handleSwipeComplete());
  }

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
    }).start();
  }

  handleSwipeComplete = () => {
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState((prevState) => ({ cardIndex: prevState.cardIndex + 1 }));
  }

  render() {
    const { cardDataList } = this.props;
    const { cardIndex, position, panResponder } = this.state;

    const getAnimatedSwipeCardStyle = () => {
      const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
        outputRange: ["-120deg", "0deg", "120deg"],
      });

      return {
        ...position.getLayout(),
        transform: [{ rotate }],
      };
    };

    if (cardIndex >= cardDataList.length) {
      return <NoMoreCards />;
    }

    return (
      <View>
        {cardDataList
          .map((cardData, index) => {
            if (index < cardIndex) {
              return null;
            }
            if (index === cardIndex) {
              return (
                <Animated.View
                  key={cardData.jobkey}
                  style={[getAnimatedSwipeCardStyle(), styles.cardStyle]}
                  {...panResponder.panHandlers}
                >
                  <SwipeCard cardData={cardData} />
                </Animated.View>
              );
            }
            return (
              <Animated.View
                key={cardData.jobkey}
                style={[styles.cardStyle, { top: 10 * (index - cardIndex) }]}
              >
                <SwipeCard cardData={cardData} />
              </Animated.View>
            );
          })
          .reverse()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});

export default Swipe;
