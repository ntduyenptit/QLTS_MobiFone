import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

const deviceWidth = Dimensions.get("window").width;

export default function bullet(props) {
    return(
      <View style={styles.row}>
        {props.isBullet ? (
          <View style={styles.bullet}>
            <Text>{'\u2022' + " "}</Text>
          </View>
) : null} 
        <View style={[styles.bulletText, {flex: props.flexTitle ? props.flexTitle : 2}]}>
          <Text styles={styles.text}>
            <Text style={styles.boldText}>{`${props.title}: `}</Text>
          </Text>
        </View>
        <View style={styles.bulletTextNormal}>
          <Text styles={styles.text}>
            <Text style={styles.normalText}>{props.text}</Text>
          </Text>
        </View>
      </View>
    );
}

bullet.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isBullet: PropTypes.bool,
  flexTitle: PropTypes.number,
  flexText: PropTypes.number
};

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
      paddingRight: 5
    },
    bulletTextNormal: {
      flex: 2,
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
  