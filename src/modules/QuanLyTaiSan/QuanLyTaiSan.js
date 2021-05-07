/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar } from 'react-native';
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
  taisanchuasudungGetData,
  taisanbaoduongsuachuaGetData,

  taisanhongSearchData,
  taisanmatSearchData,
  taisanthanhlySearchData,
  toanbotaisanSearchData,
  taisandangsudungSearchData,
  taisanchuasudungSearchData,
  taisanbaoduongsuachuaSearchData,

  toanbotaisanLoading
} from '../../redux/actions/quanlytaisan.actions';

export function GetToanBoTaiSanData(parameters) {
  //console.log('co vao day k nao e owi: ', parameters);
  const { datas, tab, textFilter, skipCount, maxResultCount } = parameters;
  const maxCount = maxResultCount !== undefined ? maxResultCount : 10;
  const skipTotal = skipCount !== undefined ? skipCount : 0;
  const tabChosen = tab !== undefined ? tab : tabs.toan_bo_tai_san;

  store.dispatch(toanbotaisanLoading());
  if (datas && datas.length > 0) {
    let url;
    switch (tabChosen) {
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
      case tabs.tai_san_sua_chua_bao_duong:
        url = `${endPoint.getTaiSanSuaChuaBaoDuong}?`;
        break;
      default:
        url = `${endPoint.getToanBoTaiSan}?`;
        break;
    }

    if (textFilter) {
      url += `Fillter=${textFilter}&`
      if (tabs.tai_san_dang_su_dung || tabs.tai_san_chua_su_dung) {
        url += `KeyWord=${textFilter}&`
      }
    }

    datas.forEach(e => {
      url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
    });
    if (tabs.tai_san_dang_su_dung || tabs.tai_san_chua_su_dung) {
      datas.forEach(e => {
        url += `PhongBanQuanLyId=${encodeURIComponent(`${e.id}`)}&`;
      });
    }

    url += `IsSearch=${encodeURIComponent(`${textFilter !== undefined}`)}&`;
    url += `SkipCount=${encodeURIComponent(`${maxCount * skipTotal}`)}&`;
    url += `MaxResultCount=${encodeURIComponent(`${maxCount}`)}`;

    createGetMethod(url)
      .then(res => {
        if (res) {
          if (textFilter !== undefined) {
            switch (tabChosen) {
              case tabs.toan_bo_tai_san:
                store.dispatch(toanbotaisanSearchData(res));
                break;
              case tabs.tai_san_thanh_ly:
                store.dispatch(taisanthanhlySearchData(res));
                break;
              case tabs.tai_san_mat:
                store.dispatch(taisanmatSearchData(res));
                break;
              case tabs.tai_san_hong:
                store.dispatch(taisanhongSearchData(res));
                break;
              case tabs.tai_san_dang_su_dung:
                console.log(res);
                store.dispatch(taisandangsudungSearchData(res));
                break;
              case tabs.tai_san_chua_su_dung:
                store.dispatch(taisanchuasudungSearchData(res));
                break;
              case tabs.tai_san_sua_chua_bao_duong:
                store.dispatch(taisanbaoduongsuachuaSearchData(res));
                break;
              default:
                break;
            }
          } else {
            switch (tabChosen) {
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
                //console.log(res);
                store.dispatch(taisandangsudungGetData(res));
                break;
              case tabs.tai_san_chua_su_dung:
                store.dispatch(taisanchuasudungGetData(res));
                break;
              case tabs.tai_san_sua_chua_bao_duong:
                store.dispatch(taisanbaoduongsuachuaGetData(res));
                break;
              default:
                break;
            }
          }
        } else {
          // Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch(err => console.log(err));
  }
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 10;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const QuanLyTaiSan = (state) => {
  const [scrollYValue] = useState(new Animated.Value(0));
  const [skipCount, setSkipCount] = useState(1);
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
    if (!state.isLoading) {
      GetToanBoTaiSanData({ datas: state.DvqlDataFilter, tab: state.tab, skipCount });
    }
  }, [skipCount]);

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
      case tabs.tai_san_sua_chua_bao_duong:
        return LoaderComponent(state.taisansuachuabaoduongData, state);
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
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent) && !state.isLoading) {
              setTimeout(() => {
                setSkipCount(skipCount + 1);
              }, 2000)
            }         // Optional async listener
          }}
          scrollEventThrottle={500}
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
  taisansuachuabaoduongData: state.taisansuachuabaoduongReducer.taisansuachuabaoduongData,

  isLoading: state.toanbotaisanReducer.isLoading,

  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  tab: state.currentTabReducer.tabName,
});

export default connect(mapStateToProps)(QuanLyTaiSan);