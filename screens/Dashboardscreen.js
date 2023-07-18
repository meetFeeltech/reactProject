import React,{ useState ,useEffect}  from 'react';
import { View, ScrollView, StyleSheet ,TouchableWithoutFeedback, Alert, Text,Image,FlatList ,BackHandler,TextInput,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRIMARY_COLOR_blue } from './assets/colours';
import slides from './slides';
import { color } from 'react-native-elements/dist/helpers';
import Carousel, { Pagination } from 'react-native-snap-carousel'


const DashboardScreen = () =>  {
      


  const navigation = useNavigation();
  
  const data = [
    { id: '1', image: require('./assets/lgo.png'), text: 'Item 1' },
    { id: '2', image: require('./assets/Filter.png'), text: 'Item 2' },
    { id: '3', image: require('./assets/Heart.png'), text: 'Item 3' },
    { id: '4', image: require('./assets/Notification.png'), text: 'Item 4' },
    { id: '5', image: require('./assets/lgo.png'), text: 'Item 5' },
    { id: '6', image: require('./assets/email.png'), text: 'Item 6' },
    { id: '7', image: require('./assets/lgo.png'), text: 'Item 7' },
    { id: '8', image: require('./assets/Filter.png'), text: 'Item 8' },
    { id: '9', image: require('./assets/Heart.png'), text: 'Item 9' },
    { id: '10', image: require('./assets/Notification.png'), text: 'Item 10' },
    { id: '11', image: require('./assets/lgo.png'), text: 'Item 11' },
    { id: '12', image: require('./assets/email.png'), text: 'Item 12' },
  ];
  

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  useEffect(() => {

    const fetchData = async () => {
      try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log("dashboard's AccessToken here = > ",accessToken);
        const response = await axios.get('https://orix-api2.feeltechsolutions.com/api/v1/offer', {
          headers: {
            Authorization: `${accessToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    
    const handleBackPress = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', onPress: () => exitApp() }
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, []);

  const exitApp = () => {
    BackHandler.exitApp();
  };

  const handleLogOut = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to LogOut?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: async () => { 
          await AsyncStorage.removeItem('isLoggedIn');
          await AsyncStorage.removeItem('accessToken')
          navigation.navigate('Login');
        } }
      ],
      { cancelable: false }
    );
    return true;
  };

  const handleSearchFeild = () => {
      console.log("Navigate to Another Screen !");
      navigation.navigate('SearchScreen');
  };


  const renderItem2 = ({ item }) => (
    <View style={styles.render2}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.render2txt}>{item.text}</Text>
    </View>
  );


  const [activeSlide, setActiveSlide] = React.useState(0);
  const screenWidth = Dimensions.get('window').width;
const sliderWidth = screenWidth - 40;
const itemWidth = screenWidth - 40; 


  return (
    <View style={styles.container}>
           <ScrollView style={styles.scrlView}>
           <View style={styles.rowContainer}>
           <TouchableWithoutFeedback onPress={handleSearchFeild}>
                <View
                  style={{   flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor:'#f9fafd',
                  borderRadius:8
                }}
                >
                       <View style={{    
                        // marginTop:"5%",
                        marginVertical:"3%",
                        flexDirection: 'row',
                        alignItems: 'center',
                        // height:40,
                        }}>
                  <Image source={require('./assets/s1.png')} style={{marginHorizontal:"4%",height:28,width:28}} />
                  <View
                  style={{
                    backgroundColor:"",
                    width:"65%",
                  }}
                  >
                    <Text style={{color:'#999ba9',
                    fontFamily:'Poppins-Regular',
                    fontSize:16}}>Search Item . .</Text>
                  </View>
                 </View>

                </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback onPress={handleLogOut}>
                  <Image source={require('./assets/Heart.png')} style={styles.icon} />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={handleLogOut}>
                  <Image source={require('./assets/Notification.png')} style={styles.icon} />
                  </TouchableWithoutFeedback>
             </View>

                    <Text style={{color:'black',fontSize:15}}>accessToken : </Text>


                        <Carousel
                        data={data}
                        renderItem={renderItem2}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        layout="default"
                        loop={true}
                        autoplay={true}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        />

                  <Pagination
                        dotsLength={data.length}
                        activeDotIndex={activeSlide}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={1} 
                        containerStyle={{alignSelf:'center'}}
                        dotStyle={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                          }}
                        inactiveDotColor='#d9f2ff'
                        dotColor='#54c1fb'
                        />



          <View style={styles.row}>
          <Text style={styles.tl}>Categories</Text>
          <Text style={styles.tr}>View all</Text>
          </View>

          <FlatList
         data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
        />

          <View style={styles.row}>
          <Text style={styles.tl}>Popular Products</Text>
          <Text style={styles.tr}>View all</Text>
          </View>




         <FlatList
         data={data}
         keyExtractor={(item) => item.id}
          renderItem={renderItem2}
          numColumns={2}
          scrollEnabled={false}
        /> 

           </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  render2txt:{
    color:'black',
  fontSize:25
},
  render2:{    
    flex: 1,
    margin: 4,
    padding: 8,
    height:200,
    borderWidth: 1,
    borderColor: '#eff0f2',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius:10
  },
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor:'white',
    paddingHorizontal:"4%",
  },
  scrlView:{
    flex:1,
  },
  t1:{
    color:'black',
  },
  rowContainer: {
    marginTop:"5%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   },

  icon: {
    width: 28, // Set the desired width for your icon
    height: 28,
    marginHorizontal:"1.5%" // Set the desired height for your icon
  },
  textField: {
    marginLeft:5,
    flex: 1, 
      color:'black',
      letterSpacing:1,
      fontSize:16,
    borderWidth:1,
    borderColor:'black'
  },
  

  logo:{
    height:18,
    width:18,
    margin:20,
    padding:15
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    // borderRadius: 50,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    color:'black'
  },
  row:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'white',
    marginVertical:5,
    // paddingHorizontal:"4%",
  },
  tl:{
    color:"#006297",
    fontFamily:'Poppins-SemiBold',
    fontSize:19
  },
  tr:{
    color:"#54c1fb",
    fontFamily:'Poppins-Regular',
    fontSize:17
  }

});

export default DashboardScreen;
