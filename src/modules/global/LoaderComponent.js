import React from 'react';
import ContentLoader from 'rn-content-loader';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;

function LoaderComponent({ item }) {
    console.log(item);
    return(
      <ContentLoader
        height={100}
        width={(deviceWidth)}
        speed={10}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <View style={styles.listItem}>
          <Image source={{uri:item.photo}} style={{width:60, height:60,borderRadius:30}} />
          <View style={{alignItems:"center", height:50,width:deviceWidth / 2}}>
            <Text style={{fontWeight:"bold"}}>{item.name}</Text>
            <Text>{item.position}</Text>
          </View>
          <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:"green"}}>Call</Text>
          </TouchableOpacity>
        </View>
      </ContentLoader>
    );
}

const styles = StyleSheet.create({
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"85%",
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5,
      height: 100
    }
  });


export default LoaderComponent;