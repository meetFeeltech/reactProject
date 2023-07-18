import React, { useEffect } from 'react';
import { View, Text ,StyleSheet,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      checkLoginStatus();
      // navigation.navigate('Login');
    }, 2500); // Delay navigation for 2 seconds

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [navigation]);


  const checkLoginStatus = async () => {
    try {
      const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');
      const isLoggedIn = isLoggedInValue === 'true';
      
      if (isLoggedIn) {
        console.log("home=>",isLoggedInValue,isLoggedIn);
        navigation.navigate('Home');
      } else {
        console.log("LogIn=>",isLoggedInValue,isLoggedIn);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  

  return (
    <View style={styles.container}>
             <Image
           style={styles.logo2}
        source={require('./assets/lgo.png')}
        ></Image>
    </View>
  );


};


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        backgroundColor:'white',
        paddingHorizontal:"4%",
    },
    logo2:{
        height:170,
        width:140,
        alignSelf:'center'
      },

});

export default SplashScreen;
