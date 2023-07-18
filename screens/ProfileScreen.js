import React,{useState} from 'react';
import { View, Text, Button ,Alert,StyleSheet,TouchableOpacity} from 'react-native';

function ProfileScreen({ navigation }) {
  return (
    <View>
      <Text style={styles.head}>Profile</Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      
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



export default ProfileScreen;
