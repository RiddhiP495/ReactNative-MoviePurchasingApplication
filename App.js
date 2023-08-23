
import { StyleSheet, Text, View , Alert} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import  FontAwesome from 'react-native-vector-icons/FontAwesome';

import MyPurchaseStackScreen from './screens/MyPurchaseStackScreen';
import NowPlayingStackScreen from './screens/MyPlayingStackScreen';
import LogoutScreen from './screens/LogoutScreen';


const Tab = createBottomTabNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={ ({route}) => ({
          "tabBarStyle": [{
              "display" : "flex"
          }, null],
          "tabBarActiveTintColor": "orangered",
          "tabBarInactiveTintColor": "gray",
          "tabBarIcon": ( {color, size} ) => {
              let iconName;

              if(route.name === "NowPlayingStackScreen"){
                  iconName = 'list';
              }else if (route.name === "MyPurchaseStackScreen"){
                  iconName = 'ticket';
              }else if (route.name === "Logout"){
                iconName =  'user' ;
              }
              
              return <FontAwesome name={iconName} size={size} color={color} />;
          },
          "headerShown": false
        })}
      >
        <Tab.Screen component={NowPlayingStackScreen} name='NowPlayingStackScreen'/>
        <Tab.Screen component={MyPurchaseStackScreen} name='MyPurchaseStackScreen'/>
        <Tab.Screen component={LogoutScreen} name='Logout' /> 
        
          </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
