import React from "react";
import { ScrollView, View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { NavigationScreenConfig } from "react-navigation";
import { AppState } from "../reducers";
import { Card } from "react-native-elements";

interface ReviewScreenProps {
  likedJobs: any[];
}

class ReviewScreen extends React.Component<ReviewScreenProps, {}> {
  static readonly navigationOptions: NavigationScreenConfig<{}> = ({ navigation }) => ({
    headerTitle: "Review Jobs",
    headerRight: <Button title="Settings" onPress={() => navigation.navigate("settings")} />,
  })

  render() {
    return (
      <ScrollView>
        {this.props.likedJobs.map((job, index) => {
          console.log(job);
          return (
            <Card key={index}>
              <View style={{ height: 200 }}>
                <View style={styles.detailWrapper}>
                  <Text style={styles.italics}>{job.company}</Text>
                  <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  italics: {
    fontStyle: "italic",
  },
});

export default connect((state: AppState) => ({
  likedJobs: state.likes.likedJobs,
}))(ReviewScreen);
