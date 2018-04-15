import React from "react";
import { View } from "react-native";
import { MapView } from "expo";

class MapScreen extends React.Component<{}, {}> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} />
      </View>
    );
  }
}

export default MapScreen;
