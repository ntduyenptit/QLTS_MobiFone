import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;

function LoaderComponent(array) {
    const items = () => array.map((item, index) => (
      <View key={`loader-component-${index + 1}`} style={styles.listItem}>
        <Image source={{uri:item.photo}} style={{width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center", height:50,width:deviceWidth / 2, paddingTop: 10}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
          <Text>{item.position}</Text>
        </View>
        <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"green"}}>Call</Text>
        </TouchableOpacity>
      </View>
          ))

    return (
      <View>{items()}</View>
    )
}

const styles = StyleSheet.create({
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"100%",
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5,
      height: 100
    }
  });


export default LoaderComponent;