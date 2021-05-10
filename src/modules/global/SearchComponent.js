/* eslint-disable import/no-cycle */
import React, {useEffect, useState} from 'react';
import { Animated, StyleSheet, TextInput } from 'react-native';
import { store } from '../../redux/store';
import { deviceWidth } from './LoaderComponent';
import { GetToanBoTaiSanData } from '../quanlytaisan/QuanLyTaiSan';

const SearchComponent = (props) => {
  const {
    clampedScroll,
    total,
  } = props;
  const [totalState, setTotal] = useState('');
  const [textSearch, setTextSearch] = useState('');
  useEffect(() => {
    if (total === '0/0' || total === "") {
      setTotal('');
    } else {
      setTotal(`(${total})`);
    }
  }, [total]);
  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -(250)],
    extrapolate: 'clamp',
  });
  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [
          {
            translateY: searchBarTranslate
          }
        ],
        opacity: searchBarOpacity,
      }
    ]}
    >
      <TextInput
        placeholder={`Tìm kiếm tài sản ${totalState}`}
        style={styles.formField}
        value={textSearch}
        placeholderTextColor="#888888"
        onChangeText={(text) => {
          setTextSearch(text);
          GetToanBoTaiSanData({
            datas: store.getState().filterDVQLDataReducer.dvqlDataFilter,
            tab: store.getState().currentTabReducer.tabName,
            textFilter: text
          });
        }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    width: deviceWidth - 40,
    left: 20,
    zIndex: 99,
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: '#888888',
    fontSize: 18,
    height: 50,
    backgroundColor: 'white'
  }
})

export default SearchComponent;