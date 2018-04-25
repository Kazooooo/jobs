import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Card, Button } from "react-native-elements";
import { MapView } from "expo";

export interface SwipeCardProps {
  cardData: any;
}

class SwipeCard extends React.Component<SwipeCardProps, {}> {
  render() {
    const { cardData } = this.props;
    const initialRegion = {
      longitude: cardData.longitude,
      latitude: cardData.latitude,
      longitudeDelta: 0.045,
      latitudeDelta: 0.02,
    };

    return (
      <Card title={cardData.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === "android"}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{cardData.company}</Text>
          <Text>{cardData.formattedRelativeTime}</Text>
        </View>
        <Text>{cardData.snippet.replace(/<b>/g, "").replace(/<\/b>/g, "")}</Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="View Now!"
          onPress={() => {}}
        />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
});

export default SwipeCard;
