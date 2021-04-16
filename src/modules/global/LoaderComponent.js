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
        <Text style={{ xjustifyContent: "center", alignItems: "center", marginLeft: 20 }}>{item.loaiTS}</Text>
        <View style={{ justifyContent: "center", alignItems: "center", height: 50, width: deviceWidth / 2 }} >
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>{item.name}</Text>
          <Text>{item.position}</Text>
        </View>
        <TouchableOpacity
          style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center", marginLeft: 20 }}
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
    margin: 5,
    padding: 5,
    backgroundColor: "#FFF",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  }
});


export default LoaderComponent;