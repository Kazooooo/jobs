import React from "react";
import { SafeAreaView } from "react-native";
import { AppState } from "../reducers";
import { connect } from "react-redux";
import Swipe from "../components/Swipe";

interface DeckScreenProps {
  jobList: any[];
}

class DeckScreen extends React.Component<DeckScreenProps, {}> {
  render() {
    return (
      <SafeAreaView>
        <Swipe
          cardDataList={this.props.jobList}
        />
      </SafeAreaView>
    );
  }
}

export default connect((state: AppState) => ({
  jobList: state.jobs.jobList,
}))(DeckScreen);
