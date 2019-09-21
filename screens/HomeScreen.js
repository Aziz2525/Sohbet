import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

import Confetti from "react-native-confetti";

var height = Dimensions.get("window").height;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      text: ""
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});