/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, Alert } from 'react-native';
import { connect } from 'react-redux';
import LoaderComponent from '../global/LoaderComponent';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';
import { createGetMethod } from '../../api/Apis';
import { endPoint, tabs } from '../../api/config';
import { store } from '../../redux/store';
import {
  taisanhongGetData,
  taisanmatGetData,
  taisanthanhlyGetData,
  toanbotaisanGetData,
  taisandangsudungGetData,
  taisanchuasudungGetData
} from '../../redux/actions/quanlytaisan.actions';

export function GetToanBoTaiSanData(datas, tab = tabs.toan_bo_tai_san) {
  if (datas && datas.length > 0) {
    let url;
    switch (tab) {
      case tabs.toan_bo_tai_san:
        url = `${endPoint.getToanBoTaiSan}?`;
        break;
      case tabs.tai_san_thanh_ly:
        url = `${endPoint.getTaiSanThanhLy}?`;
        break;
      case tabs.tai_san_mat:
        url = `${endPoint.getTaiSanMat}?`;
        break;
      case tabs.tai_san_hong:
        url = `${endPoint.getTaiSanHong}?`;
        break;
      case tabs.tai_san_dang_su_dung:
        url = `${endPoint.getTaiSanDangSuDung}?`;
        break;
      case tabs.tai_san_chua_su_dung:
        url = `${endPoint.getTaiSanChuaSuDung}?`;
        break;
      default:
        url = `${endPoint.getToanBoTaiSan}?`;
        break;
    }

    datas.forEach(e => {
      url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
    });
    if (tabs.tai_san_dang_su_dung || tabs.tai_san_chua_su_dung) {
      datas.forEach(e => {
        url += `PhongBanQuanLyId=${encodeURIComponent(`${e.id}`)}&`;
      });
    }

    url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
    url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
    url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
    createGetMethod(url)
      .then(res => {
        if (res) {
          switch (tab) {
            case tabs.toan_bo_tai_san:
              store.dispatch(toanbotaisanGetData(res));
              break;
            case tabs.tai_san_thanh_ly:
              store.dispatch(taisanthanhlyGetData(res));
              break;
            case tabs.tai_san_mat:
              store.dispatch(taisanmatGetData(res));
              break;
            case tabs.tai_san_hong:
              store.dispatch(taisanhongGetData(res));
              break;
            case tabs.tai_san_dang_su_dung:
              store.dispatch(taisandangsudungGetData(res));
              break;
            case tabs.tai_san_chua_su_dung:
              store.dispatch(taisanchuasudungGetData(res));
              break;
            default:
              break;
          }
        } else {
          Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch(err => console.log(err));
  }
}

const QuanLyTaiSan = (state) => {
  const [scrollYValue] = useState(new Animated.Value(0));
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      new Animated.Value(0),
    ),
    0,
    50,
  )

  useEffect(() => {
    GetToanBoTaiSanData(state.DvqlDataFilter, state.tab);
  }, []);

  function LoaderComponentByTab() {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
        return LoaderComponent(state.toanbotaisanData, state);
      case tabs.tai_san_mat:
        return LoaderComponent(state.taisanmatData, state);
      case tabs.tai_san_hong:
        return LoaderComponent(state.taisanhongData, state);
      case tabs.tai_san_thanh_ly:
        return LoaderComponent(state.taisanthanhlyData, state);
      case tabs.tai_san_chua_su_dung:
        return LoaderComponent(state.taisanchuasudungData, state);
      case tabs.tai_san_dang_su_dung:
        return LoaderComponent(state.taisandangsudungData, state);
      default:
        break;
    }
  }

  return (
    <Animated.View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchComponent clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            margin: 10,
            paddingTop: 55,
            paddingBottom: 15,
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            paddingBottom: 55,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => { },          // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic"
        >
          {LoaderComponentByTab()}
        </Animated.ScrollView>
      </SafeAreaView>
      <FilterComponent />
    </Animated.View>
  );
};

const mapStateToProps = state => ({
  toanbotaisanData: state.toanbotaisanReducer.toanbotaisanData,
  taisanthanhlyData: state.taisanthanhlyReducer.taisanthanhlyData,
  taisanmatData: state.taisanmatReducer.taisanmatData,
  taisanhongData: state.taisanhongReducer.taisanhongData,
  taisanchuasudungData: state.taisanchuasudungReducer.taisanchuasudungData,
  taisandangsudungData: state.taisandangsudungReducer.taisandangsudungData,

  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  tab: state.currentTabReducer.tabName,
});

export default connect(mapStateToProps)(QuanLyTaiSan);