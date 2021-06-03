import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get("window").width;

export default function bullet(title, text) {
    return(
      <View style={styles.row}>
        <View style={styles.bullet}>
          <Text>{'\u2022' + " "}</Text>
        </View>
        <View style={styles.bulletText}>
          <Text styles={styles.text}>
            <Text style={styles.boldText}>{`${title}: `}</Text>
          </Text>
        </View>
        <View style={styles.bulletTextNormal}>
          <Text styles={styles.text}>
            <Text style={styles.normalText}>{text}</Text>
          </Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
  
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: deviceWidth,
      paddingBottom: 5,
      paddingLeft: 10
    },
    title: {
      padding: 10,
      fontSize: 15,
      fontStyle: 'italic'
    },
    bullet: {
      width: 15
    },
    bulletText: {
      flex: 2,
      paddingRight: 5
    },
    bulletTextNormal: {
      flex: 2
    },
    boldText: {
      fontWeight: 'bold',
      alignItems: 'flex-start',
    },
    normalText: {
      flex: 1,
      alignItems: 'flex-end',
    },
    text: {
      fontSize: 15,
    },
  });
  