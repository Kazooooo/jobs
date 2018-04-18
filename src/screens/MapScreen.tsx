import React from "react";
import { View } from "react-native";
import { MapView } from "expo";

export interface RegionData {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
}

interface MapScreenState {
  region: RegionData;
}

class MapScreen extends React.Component<{}, MapScreenState> {
  readonly state: MapScreenState = {
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    },
  };

  handleRegionChangeComplete = (region: RegionData) => {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.handleRegionChangeComplete}
        />
      </View>
    );
  }
}

export default MapScreen;
