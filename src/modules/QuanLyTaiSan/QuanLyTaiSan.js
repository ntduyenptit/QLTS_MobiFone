import React, { } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { fonts } from '../../styles';

export default class QuanLyTaiSan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  onSearch = (text) => {
    this.setState({
      searchText: text.length > 0 ? text.toLowerCase() : null
    })
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    width: '80%',
    height: 40,
    justifyContent: 'space-around',
    marginStart: 15,
    marginTop: 10,
    borderRadius: 20,

  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },

  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: 'black',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  textStyle: {
    color: 'black',
    fontSize: 15,
  }
});
