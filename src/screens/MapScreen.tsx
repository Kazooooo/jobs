import React from "react";
import { View, StyleSheet } from "react-native";
import { MapView } from "expo";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { AppState } from "../reducers";
import jobActionCreators from "../actions/job";
import { NavigationScreenProps } from "react-navigation";
import isEqual from "lodash/isEqual";

export interface RegionData {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
}

interface MapScreenProps extends NavigationScreenProps {
  fetchJobs: (region: RegionData) => () => void;
  jobList: any[];
}

interface MapScreenState {
  region: RegionData;
}

class MapScreen extends React.Component<MapScreenProps, MapScreenState> {
  readonly state: MapScreenState = {
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    },
  };

  componentDidUpdate(prevProps: MapScreenProps) {
    if (!isEqual(prevProps.jobList, this.props.jobList)) {
      this.props.navigation.navigate("deck");
    }
  }

  private handleRegionChangeComplete = (region: RegionData) => {
    this.setState({ region });
  }

  private handleButtonPress = () => {
    this.props.fetchJobs(this.state.region);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.handleRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large={true}
            title="Search This Area"
            backgroundColor="#009688"
            icon={{ name: "search" }}
            onPress={this.handleButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default connect(
  (state: AppState) => ({
    jobList: state.jobs.jobList,
  }),
  {
    fetchJobs: jobActionCreators.fetchJobsActionCreator,
  },
)(MapScreen);
