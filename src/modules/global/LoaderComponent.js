import React from 'react';
import ContentLoader from 'rn-content-loader';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

import { useNavigation } from '@react-navigation/native';


function LoaderComponent({ item }) {
  //console.log(item);
  const navigation = useNavigation();

  console.log(this.props)
  return (
    <ContentLoader
      height={100}
      width={(deviceWidth)}
      speed={10}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <View style={styles.listItem}>
        <Icon style={{ justifyContent: "flex-start", alignItems: "flex-start" }} name="circle" color='#0080FF' size={15} />
        <View style={styles.infor} >
          <Text style={{fontWeight: "bold"} }>EPC: {item.maTS}</Text>
          <Text >{item.name}</Text>
          <Text>{item.position}</Text>
        </View>
        <TouchableOpacity
          style={{ height: 40, width: 20, justifyContent: "center", alignItems: "flex-end", marginLeft: 5 }}
          onPress={() => navigation.navigate(('AvailableInFullVersion'))}
        >
          <Icon name="chevron-right" color='#0080FF' size={15} />
        </TouchableOpacity>
      </View>
    </ContentLoader>
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 15,
    padding: 15,
    width: "100%",
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    height: 95,
  },
  infor: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: 50,
    width: "75%",

  }
});


export default LoaderComponent;