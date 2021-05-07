/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, StyleSheet, TextInput } from 'react-native';
import { store } from '../../redux/store';
import { deviceWidth } from './LoaderComponent';
import { GetToanBoTaiSanData } from '../quanlytaisan/QuanLyTaiSan';
import { tabs } from '../../api/config';

const SearchComponent = (props) => {
  const {
    clampedScroll
  } = props;
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
  let total = '';
  switch(store.getState().currentTabReducer.tabName) {
    case tabs.toan_bo_tai_san: {
      total = store.getState().toanbotaisanReducer.toanbotaisanTotal > 0 ? `(${store.getState().toanbotaisanReducer.toanbotaisanData.length  }/${  store.getState().toanbotaisanReducer.toanbotaisanTotal})` : '';
      break;
    }
    case tabs.tai_san_mat: {
      total = store.getState().taisanmatReducer.taisanmatTotal > 0 ? `(${store.getState().taisanmatReducer.taisanmatData.length  }/${  store.getState().taisanmatReducer.taisanmatTotal})` : '';
      break;
    }
    case tabs.tai_san_hong: {
      total = store.getState().taisanhongReducer.taisanhongTotal > 0 ? `(${store.getState().taisanhongReducer.taisanhongData.length  }/${  store.getState().taisanhongReducer.taisanhongTotal})` : '';
      break;
    }
    case tabs.tai_san_thanh_ly: {
      total = store.getState().taisanthanhlyReducer.taisanthanhlyTotal > 0 ? `${store.getState().taisanthanhlyReducer.taisanthanhlyData.length  }/${  store.getState().taisanthanhlyReducer.taisanthanhlyTotal})` : '';
      break;
    }
    default:
      total = '';
  }
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
        placeholder={`Tìm kiếm tài sản ${total}`}
        style={styles.formField}
        placeholderTextColor="#888888"
        onChangeText={(text) => {
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