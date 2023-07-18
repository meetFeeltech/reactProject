import React from 'react';
import { View, Text, Button,StyleSheet ,ImageBackground,Image} from 'react-native';

function CartScreen({ navigation }) {


  return (
    <View>
      <Text style={styles.head}>Your Cart</Text>
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


export default CartScreen;
