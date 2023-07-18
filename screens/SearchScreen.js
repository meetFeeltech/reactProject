import React,{useEffect} from 'react';
import { View, Text, Button,StyleSheet ,BackHandler} from 'react-native';

function SearchScreen({ navigation }) {

  useEffect(() => {
    const handleBackPress = () => {

      navigation.goBack();

      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, []);


  return (
    <View>
      <Text style={styles.head}>Search</Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
        // onPress={() => BackHandler.exitApp()}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  head:{
    color:'#006297',
    fontSize:25,
    fontFamily:'Poppins-SemiBold',
    alignSelf:'center',
    marginVertical:"2%"
  },

});

export default SearchScreen;
