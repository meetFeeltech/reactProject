import React, { useState ,useEffect} from 'react';
import {ScrollView, Alert, View, TextInput, Button, StyleSheet,Image,TouchableOpacity,Text,SafeAreaView ,TouchableWithoutFeedback,BackHandler,ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { Input } from 'react-native-elements';
import { PRIMARY_COLOR_blue } from './assets/colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');


  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxToggle = () => {
    setIsSelected(!isSelected);
  };

  const handleLogin =  () =>  {
    // Create an object with the email and password
    const data = {
      email: email,
      password: password
    };


    if (email === '' || password === ''){
      Alert.alert('Aleart', 'Email id or Password is Empty!');
      console.log("Empty selected=>",email,password);
    }else {
      setIsLoading(true);

          // Make the POST request to the login endpoint
          fetch('https://trackventory.teamfeeltech.com/api/v1/Authentication/login', {
          // fetch('https://orix-api2.feeltechsolutions.com/api/v1/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response =>  {
            
              if (response.status === 200)  {

                console.log("status : 200 1, accessToken  => ",response);

                setIsLoading(false);
                if(isSelected === false){
                  Alert.alert('Aleart ', 'First Accept our privacy policy and terms of service');
                }else  {
                  console.log(isSelected,"<= selected");
                  AsyncStorage.setItem('isLoggedIn', 'true');
                  navigation.navigate('Home');
                }
              } else {
                setIsLoading(false);
                // Login failed
                console.log("mess",response)
                Alert.alert('Error', 'Invalid email or password here');
              }
            })
            .catch((error) => {
              setIsLoading(false);
              Alert.alert('Error', 'An error occurred. Please try again later.');
              console.error("here erroorr",error);
            });
      

    }

  };


  const logResponse = async () => {

    if (email === '' || password === ''){
      Alert.alert('Aleart', 'Email id or Password is Empty!');
      console.log("Empty selected=>",email,password);
    }else{
          
    setIsLoading(true);
    try {
      const url = 'https://orix-api2.feeltechsolutions.com/api/v1/login'; // Replace with your API endpoint URL
      const data = {
        email: email,
        password: password
      };
   // Replace with the data you want to send in the request
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }



      if (response.status === 200)  {

        console.log("status : 200 1, accessToken  => ",response);

      
        if(isSelected === false){
          setIsLoading(false);
          Alert.alert('Aleart ', 'First Accept our privacy policy and terms of service');
        }else  {
          console.log(isSelected,"<= selected");

          const jsonResponse = await response.json();
          console.log(jsonResponse);
  
          console.log("status = 200 here", jsonResponse);
          console.log("accesstoken : => ", jsonResponse.accessToken);

          AsyncStorage.setItem('accessToken',jsonResponse.accessToken);

          const accessToken = await AsyncStorage.getItem('accessToken');
          console.log("Saved accesstoken => ",accessToken);

          AsyncStorage.setItem('isLoggedIn', 'true');
          setIsLoading(false);
          navigation.navigate('Home');
        }
      } else {
        setIsLoading(false);
        // Login failed
        console.log("mess",response)
        Alert.alert('Error', 'Invalid email or password here');
      }
    // Log the JSON response
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Invalid email or password here');
      console.error('Error occurred while making the request:', error);
    }
   
      }

  };
  



  const handleSignIn = () => {
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Button tapped!');
    navigation.navigate('SignUpScreen');

  };
  
  useEffect(() => {
    setIsLoading(false);
    const handleBackPress = () => {

       exitApp();
      // Alert.alert(
      //   'Exit App',
      //   'Are you sure you want to exit?',
      //   [
      //     { text: 'Cancel', style: 'cancel' },
      //     { text: 'Exit', onPress: () => exitApp() }
      //   ],
      //   { cancelable: false }
      // );
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, []);

  const exitApp = () => {
    BackHandler.exitApp();
  };



 
  return (
      <View style={styles.container}>
        {
          isLoading ? <Loader /> :
          <ScrollView style={styles.scrlView}>
          <ImageBackground source={require('./assets/background.png')} style={styles.imageBackground}>
            <View style={styles.maincon}>
            <Image
                   style={styles.logo2}
                source={require('./assets/logo.png')}
                ></Image>
  
      
            <View style={styles.container2}>
                <Text style={styles.text1}>Login Account</Text>
                 <Text style={styles.text2}>Login with your email & password !</Text>
                </View>
  
  
                <View style={styles.rowContainer}>
          <Image source={require('./assets/email.png')} style={styles.icon} />
             <TextInput
              value={email}
              onChangeText={setEmail}
              defaultValue='sweta.feeltech@outlook.com'
              style={styles.textField}
              placeholder="Email Address"
              fontFamily='Poppins-Regular'
              placeholderTextColor="#acadba"
              />
               </View>
           
               <View style={styles.rowContainer}>
           <Image source={require('./assets/lock.png')} style={styles.icon} />
              <TextInput
                defaultValue='Test@123'
                 value={password}
                 onChangeText={setPassword}
                 secureTextEntry={!isPasswordVisible}
              style={styles.textField}
               placeholder="Password"
               fontFamily='Poppins-Regular'
                 placeholderTextColor="#acadba"
              />
  
             <TouchableOpacity onPress={togglePasswordVisibility}>
                   <Image
                  style={styles.logo3}
               source={
                isPasswordVisible ? 
                require('./assets/eye2.png'):
                require('./assets/eye1.png')
              }
               ></Image>
               </TouchableOpacity>
              
  
               </View>
  
  
  
  
              <View style={styles.chk}>
            <Checkbox style={styles.checkbox} value={isSelected} onValueChange={setIsSelected} color={PRIMARY_COLOR_blue}/>
            <TouchableWithoutFeedback onPress={handleCheckboxToggle}>
            <Text style={styles.text3}>Accept terms of service  </Text>
            </TouchableWithoutFeedback>
            </View>
  
  
            <TouchableOpacity style={styles.button1}  onPress={logResponse}>
        <Text style={styles.buttonText1}>Login</Text>
      </TouchableOpacity>
  
  
      <View style={styles.container4}>
        <View style={styles.line} />
        <Text style={styles.text4}> Don't have an Account ? </Text>
        <View style={styles.line} />
      </View>
  
  
      <TouchableOpacity style={styles.button2}  onPress={handleSignIn}>
        <Text style={styles.buttonText2}>SignUp</Text>
      </TouchableOpacity>
  
      </View>
      </ImageBackground>
  
          </ScrollView>
  
        }
   
      </View>
  );
};

const styles = StyleSheet.create({


  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor:'white',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrlView:{
    flex:1,
  },

  maincon:{
    backgroundColor:"#ffffff",
    marginHorizontal:"5%",
    marginVertical:"15%",
    borderRadius: 12, 
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1, 
    paddingHorizontal:"4%",
    paddingVertical:"4%"
  },
  text1:{
    fontFamily:'Poppins-SemiBold',
      color:'black',
      fontSize: 26,
      alignSelf:"center",
      letterSpacing:0.
  },
  text2:{
    color:'#9c9fa2',
    fontSize: 16,
    marginBottom:20,
    fontFamily:'Poppins-Regular',
    alignSelf:"center",
    marginVertical:"2%"
},

container2:{
  marginTop:"3%",
  marginBottom:"3%",
},

logo2:{
  height:80,
  width:50,  
  alignSelf:"center",
  marginVertical:"6%"
},

logo4:{
height:25,
width:25,
marginTop:22
},


rowContainer: {
  marginTop:"5%",
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1, // You can adjust this to add a border around the row
  borderColor: '#ccc', // You can change the border color
  borderRadius: 8,
  paddingHorizontal:"4%", 
  paddingVertical:"1.2%",
 },
icon: {
  width: 24, // Set the desired width for your icon
  height: 24, // Set the desired height for your icon
},
textField: {
    marginLeft:5,
     flex: 1, 
    color:'black',
    letterSpacing:1,
    fontSize:16,
    alignSelf:'center'
},





logo3:{
  height:28,
  width:28
},

checkbox: {
  borderRadius:5,
  borderColor:"#c3c7e5",
},
chk:{
  flexDirection: 'row',
  justifyContent: 'flex-start',
  // paddingRight:30,
  // paddingLeft:20,
  // paddingTop:20,
  marginTop:"6%",
  marginBottom:"10%",
  paddingHorizontal:"4%",
  fontFamily:'Poppins-Regular'
},
text3:{
  color:'#9c9fa2',
  fontSize: 14,
  paddingHorizontal:"4%",
  marginBottom:20,
  fontFamily:'Poppins-Regular',
  color:"#4639a2"
},


button1: {
  backgroundColor: PRIMARY_COLOR_blue,
  width:"100%",
  height:56,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf:'center',
  borderRadius: 12,
  borderWidth: 1,
  borderColor:'white',
  marginTop:"3%"
},
buttonText1: {
  color: 'white',
  fontSize: 18,
  fontFamily:'Poppins-Regular'
},


button2: {
  backgroundColor: 'white',
  width:"100%",
  height:56,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf:'center',
  borderRadius: 12,
  borderWidth: 1,
  borderColor:PRIMARY_COLOR_blue,
  marginBottom:"6%"
},
buttonText2: {
  color:PRIMARY_COLOR_blue,
  fontSize: 18,
  fontFamily:'Poppins-Regular'
},


container4: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical:'6%',
  paddingHorizontal:'3%'
},
line: {
  flex: 1,
  height: 1,
  backgroundColor: '#f6f6f6',
},
text4: {
  marginHorizontal: 10,
  color:'#969aa8',
  fontSize:14,
  fontFamily:'Poppins-Regular'
},



});

export default LoginScreen;
