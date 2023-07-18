import React from 'react';
import { View, Text, StyleSheet,Image ,TouchableWithoutFeedback, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './Dashboardscreen';
import SearchScreen from './SearchScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import { PRIMARY_COLOR_blue } from './assets/colours';


const Tab = createBottomTabNavigator();
const HomeScreen = () => (
  <Tab.Navigator     
  //   tabBarOptions={{
  //   style: { backgroundColor: PRIMARY_COLOR_blue },
  //   tabStyle: { backgroundColor: PRIMARY_COLOR_blue },
  // }}
  barStyle={{ backgroundColor: PRIMARY_COLOR_blue }}
  screenOptions={({ route }) => ({
    tabBarStyle:{
      height:"8%",
      backgroundColor:"#00a6ff"
    },
    tabBarIcon: ({ focused }) => {
      let iconImage;

      if (route.name === 'DashboardScreen') {
        iconImage = focused
          ? require('./assets/icons/home.png')
          : require('./assets/icons/Home2.png');
      } else if (route.name === 'Search') {
        iconImage = focused
          ? require('./assets/icons/Search.png')
          : require('./assets/icons/Search2.png');
      } else if (route.name === 'Cart') {
        iconImage = focused
          ? require('./assets/icons/Bag.png')
          : require('./assets/icons/Bag2.png');
      }
      else if (route.name === 'Profile') {
        iconImage = focused
          ? require('./assets/icons/Profile.png')
          : require('./assets/icons/Profile2.png');
      }

      return <Image source={iconImage} style={{
        height:focused? 85 :25,
        width:focused? 85:25,
        resizeMode: 'center'}}></Image>;
    },
  })}
  
  >
    <Tab.Screen name="DashboardScreen" component={DashboardScreen}  
    options={{
      headerShown: false,
          tabBarLabel: ({ focused }) => (
            null
            // <Text style={{fontFamily:'Roboto-Regular' , fontSize: 12, color: focused ? 'white' : '#b9e5fd' }}>
            // </Text>
          ),
        }}
        />
            <Tab.Screen name="Search" component={SearchScreen}  
    options={{
      headerShown: false,
          tabBarLabel: ({ focused }) => (
            null
            // <Text style={{fontFamily:'Roboto-Regular' , fontSize: 12, color: focused ? 'white' : '#b9e5fd' }}>
            // </Text>
          ),
        }}
        />
    <Tab.Screen name="Cart" component={CartScreen}    
     options={{
      headerShown: false,
          tabBarLabel: ({ focused }) => (
            null
            // <Text style={{fontFamily:'Poppins-Regular' , fontSize: 12, color: focused ? 'white' : '#b9e5fd' }}>
            //   Cart
            // </Text>
          ),
        }}/>
    <Tab.Screen name="Profile" component={ProfileScreen} options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            null
            // <Text style={{fontFamily:'Poppins-Regular' , fontSize: 12, color: focused ? 'white' : '#b9e5fd' }}>
            //   Profile
            // </Text>
          ),
        }}/>
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily:'Poppins-Regular'
  },
  btn:{
    color:'black',
    fontFamily:'Poppins-Regular'
    },
    tap:{
      color:'blue',
      fontFamily:'Poppins-Regular'
    },
    logo2:{
      height:15,
      width:15,
    },
    icn:{
      height:18,
      width:18,
      resizeMode: 'center'
    }
});

export default HomeScreen;




