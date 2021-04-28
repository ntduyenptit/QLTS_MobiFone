import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

function LoaderComponent(array, props) {

    const items = () => array.map((item, index) => (
      <View key={`loader-component-${index + 1}`} style={styles.listItem}>
        <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#0080FF' size={15} />
        <View style={styles.infor}>
          <Text style={[{fontWeight: "bold"}, styles.infoText]}>EPC: {item.maTS}</Text>
          <Text style={styles.infoText}>{item.name}</Text>
          <Text>{item.position}</Text>
        </View>
        <TouchableOpacity
          style={{ height: 40, width: 20, alignItems: "flex-end"}}
          onPress={() => props.navigation.navigate('DetailComponent', {paramKey: item}) }
        >
          <Icon name="chevron-right" color='#0080FF' size={15} />
        </TouchableOpacity>
      </View>
          ))

    return (
      <View>{items()}</View>
    )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    flex: 1,
    width: deviceWidth - 50,
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
    width: "85%",
  },
  infoText: {
    paddingBottom: 3
  }
});

export default LoaderComponent;