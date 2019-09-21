import React from 'react';
import { Platform,View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator ,createSwitchNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import KonusmaScreen from '../screens/KonusmaScreen';
import LoadingScreen from '../screens/LoadingScreen';
import KullaniciBilgileriScreen from '../screens/KullaniciBilgileriScreen';
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
);
HomeStack.navigationOptions = {
  title: 'Konuşmalar',
  headerTitleStyle:{
    fontSize: 17,
    fontWeight: 'bold',
    color:'#434343'
  },
  headerBackgroundTransitionPreset:'translate',
  headerLeft: (
    <View style={{marginLeft: 20,}}><Ionicons name='ios-chatbubbles' color='#434343' size={27}/></View>
  ),
  gesturesEnabled: false,
  headerRight:(
    <View style={{marginRight: 30,}}><Ionicons name='ios-cog' color='#434343' size={27}/></View>
  )
  
};
const KonuStack = createStackNavigator(
  {
    Konus: KonusmaScreen,
  },
);
KonuStack.navigationOptions = {
  title: 'Anasayfa',
 
  
};
const LoadingStack = createSwitchNavigator(
  {
    Loading: LoadingScreen,
  },
);
LoadingStack.navigationOptions = {
  header:null
  
};
const KullaniciBilgileriStack = createSwitchNavigator(
  {
    KullaniciBilgileri: KullaniciBilgileriScreen,
  },
);
KullaniciBilgileriStack.navigationOptions = {
  header:null,
  gesturesEnabled: false,
};
const tabNavigator = createStackNavigator({
  LoadingStack,
  HomeStack,
  KonuStack,
  KullaniciBilgileriStack

},{
  initialRouteName:'LoadingStack',
  headerTransitionPreset:'uikit',
});


export default tabNavigator;
