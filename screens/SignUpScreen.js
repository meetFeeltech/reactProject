import React, { useState ,useEffect} from 'react';
import { View, TextInput, Alert,Button, ScrollView,StyleSheet,Image,TouchableOpacity,Text,SafeAreaView,TouchableWithoutFeedback,BackHandler,ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { PRIMARY_COLOR_blue } from './assets/colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';

const SignUpScreen = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCheckboxToggle = () => {
    setIsSelected(!isSelected);
  };


  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  
  const handleLogin = () => {
    // Create an object with the email and password

    const data = {
      firstName:fname,
      lastName: lname,
      email: email,
      password: password
    };


    if (fname === '' || lname === '' || email === '' || password === ''){
      Alert.alert('Aleart', 'Feild is still Empty!');
      console.log("Empty selected=>",fname,lname,email,password);
    }else{
             setIsLoading(true);
          fetch('https://trackventory.teamfeeltech.com/api/v1/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => {

              console.log("1data=>",data);
      
              if (response.status === 200) {
                setIsLoading(false);
                console.log("2data=>",data);
                  console.log("req 200=>",fname,lname,email,password);
                  console.log("json=>",data);
                  AsyncStorage.setItem('isLoggedIn', 'true');
                  navigation.navigate('Home');
              } else {
                setIsLoading(false);
                console.log("3data=>",data);
                console.log("req error 400 =>",fname,lname,email,password);
                console.log("mess",response)
                Alert.alert('Error', 'Invalid email or password here');
              }
            })
            .catch(error => {
              setIsLoading(false);
              console.log("4data=>",data);
              console.log("req error last =>",fname,lname,email,password);
              Alert.alert('Error', 'An error occurred. Use another Email address or Password.');
              console.error(error);
            });
      

    }




  };



  useEffect(() => {
    setIsLoading(false);
    const handleBackPress = () => {
        
       navigation.goBack();
   
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
                           <Text style={styles.text1}>Get Started</Text>
                            <Text style={styles.text2}>SignUp with register & continue !</Text>
                           </View>
               
               
               
                           <View style={styles.rowContainer}>
                     <Image source={require('./assets/fname.png')} style={styles.icon} />
                          <TextInput
                          value={fname}
                          onChangeText={setFname}
                          style={styles.textField}
                          placeholder="First Name"
                          fontFamily='Poppins-Regular'
                          placeholderTextColor="#acadba"
                          />
                          </View>
               
                      <View style={styles.rowContainer}>
                     <Image source={require('./assets/lname.png')} style={styles.icon} />
                        <TextInput
                          value={lname}
                          onChangeText={setLname}
                       style={styles.textField}
                        placeholder="Last Name"
                        fontFamily='Poppins-Regular'
                            placeholderTextColor="#acadba"
                         />
                          </View>
               
               
                           <View style={styles.rowContainer}>
                     <Image source={require('./assets/email.png')} style={styles.icon} />
                        <TextInput
                          value={email}
                          onChangeText={setEmail}
                       style={styles.textField}
                        placeholder="Email Address"
                        fontFamily='Poppins-Regular'
                            placeholderTextColor="#acadba"
                         />
                          </View>
                      
                          <View style={styles.rowContainer}>
                      <Image source={require('./assets/lock.png')} style={styles.icon} />
                         <TextInput
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
               
               
                       <TouchableOpacity style={styles.button1}  onPress={handleLogin}>
                   <Text style={styles.buttonText1}>SignUp</Text>
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
  paddingVertical:"1.2%"    
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
    fontSize:16
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




export default SignUpScreen;
