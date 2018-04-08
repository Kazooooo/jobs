import React from "react";
import { View, Text, Button } from "react-native";

import { NavigationScreenConfig } from "react-navigation";

class ReviewScreen extends React.Component<{}, {}> {
  static readonly navigationOptions: NavigationScreenConfig<{}> = ({ navigation }) => ({
    headerTitle: "Review Jobs",
    headerRight: <Button title="Settings" onPress={() => navigation.navigate("settings")} />,
  })

  render() {
    return (
      <View>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
      </View>
    );
  }
}

export default ReviewScreen;
