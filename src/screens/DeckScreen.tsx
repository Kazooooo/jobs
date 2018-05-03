import React from "react";
import { SafeAreaView } from "react-native";
import { AppState } from "../reducers";
import { connect } from "react-redux";
import Swipe from "../components/Swipe";
import jobActionCreators from "../actions/job";

interface DeckScreenProps {
  jobList: any[];
  likeJob: any;
}

class DeckScreen extends React.Component<DeckScreenProps, {}> {
  private handleSwipeRight = (job: any) => {
    this.props.likeJob(job);
  }

  render() {
    return (
      <SafeAreaView>
        <Swipe cardDataList={this.props.jobList} onSwipeRight={this.handleSwipeRight} />
      </SafeAreaView>
    );
  }
}

export default connect(
  (state: AppState) => ({
    jobList: state.jobs.jobList,
  }),
  {
    likeJob: jobActionCreators.likeJob,
  },
)(DeckScreen);
