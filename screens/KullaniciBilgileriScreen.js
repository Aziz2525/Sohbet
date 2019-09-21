import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
export default class KullaniciBilgileriScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      text:'',
      yukleniyor:false
    };
  }

  componentDidMount = () => {
    this.getPermissionAsync();
  
  };
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('İzin','Üzgünüz, Kamera izniniz gerekli.');
      }
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  ileri = async () => {
    this.setState({yukleniyor:true})
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    const db = mongoClient.db("Sohbet");
    const tasks = db.collection("kayit");
    if (this.state.text != "") {
      tasks
        .insertOne({
          user_id: stitchAppClient.auth.user.id,
          adi:this.state.text,
          date: new Date()
        })
        .then(() => {
         
          this.setState({ text: "" });
          this.props.navigation.navigate('Home')

        })
        .catch(err => {
          alert('Sunucu ile ilgili bir sorun gözüküyor.')
          console.warn(err);
        });
    }
  };
  render() {
    let { image } = this.state;
    return (
      <ScrollView style={styles.container} contentContainerStyle={{backgroundColor: "#fff",justifyContent: "center",alignItems: "center"}}>
        <Text style={{fontSize:25,fontWeight:'bold',color:'#434343',marginTop:40}}> Kullanıcı Bilgileri </Text>
        <Text style={{fontSize:17,fontWeight:'bold',color:'#434343',marginTop:15,textAlign:'center'}}> Burada belirteceğiniz üye bilgilerini daha sonra güncelleyebilirsiniz.</Text>
        <TouchableOpacity onPress={this._pickImage}>{image==null ?   <View><Image source={{uri:'https://k2.okccdn.com/media/img/user/placeholder_2013/pq_800.png'}} style={{width:150,height:150,borderRadius:75,marginTop:15}}/><Ionicons name='ios-add' size={30} color='blue' style={{position: 'absolute',bottom:0,right:0}} /></View>:<Image source={{ uri: image }} style={{ width: 150, height: 150,borderRadius:75,marginTop:15 }} />}</TouchableOpacity>
        <TextInput onChangeText={(text) => this.setState({text})} style={{width:'60%',padding:10,textAlign:'center',borderBottomWidth:.5,color:'#434343',borderBottomColor:'#DBDBDB',marginTop:15,fontSize:17,fontWeight:'bold'}}  placeholder='Adınız'/>
        <TouchableOpacity onPress={this.ileri} style={{width:'90%',height:50,marginTop:15,backgroundColor:this.state.text=='' ?   '#DBDBDB'  :  '#18A3E4',justifyContent:'center',alignItems: 'center',borderRadius:5}}>{this.state.yukleniyor ? <ActivityIndicator color='white' /> :<Text style={{color:'white',fontSize:25,fontWeight:'bold',}}>İleri</Text> }</TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});