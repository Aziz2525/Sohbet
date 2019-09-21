import React from "react";
import {
  RefreshControl,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  View
} from "react-native";
import moment from "moment";
import Swipeout from "react-native-swipeout";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
import Confetti from "react-native-confetti";

export default class KonusmaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }
  componentDidMount = () => {
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("Sohbet");
    const tasks = db.collection("kayit");
    const id = 
    tasks
      .find(
        {
          user_id:stitchAppClient.auth.user.id
        },
        { sort: { date: -1 } }
      )
      .asArray()
      .then(docs => {
          if(Object.keys(docs).length !=0){
            this.props.navigation.navigate('Home')
          }else{
            this.props.navigation.navigate('KullaniciBilgileri')
          }
      })
      .catch(err => {
        console.warn(err);
      });
  };
  render() {
    return (
      <View>

      </View>
    );
  }
}
KonusmaScreen.navigationOptions = {
  header:null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});