import React from "react";
import { View, StyleSheet } from "react-native";
import { MapView } from "expo";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { AppState } from "../reducers";
import jobActionCreators from "../actions/job";

export interface RegionData {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
}

interface MapScreenProps {
  fetchJobs: (region: RegionData) => () => void;
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

export default connect((state: AppState) => ({}), {
  fetchJobs: jobActionCreators.fetchJobsActionCreator,
})(MapScreen);
