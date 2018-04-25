import React from "react";
import { View, Text } from "react-native";
import { AppState } from "../reducers";
import { connect } from "react-redux";
import Swipe from "../components/Swipe";

interface DeckScreenProps {
  jobList: any[];
}

class DeckScreen extends React.Component<DeckScreenProps, {}> {
  render() {
    return (
      <View>
        <Swipe
          cardDataList={this.props.jobList}
        />
      </View>
    );
  }
}

export default connect((state: AppState) => ({
  jobList: state.jobs.jobList,
}))(DeckScreen);
