/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import LoaderComponent from '../global/LoaderComponent';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';
import { createGetMethod } from '../../api/Apis';
import { endPoint, screens, tabs } from '../../api/config';
import { store } from '../../redux/store';
import {
  taisanhongGetData,
  taisanhuyGetData,
  taisanmatGetData,
  taisanthanhlyGetData,
  toanbotaisanGetData,
  taisandangsudungGetData,
  taisanchuasudungGetData,
  taisanbaoduongsuachuaGetData,

  taisanhongSearchData,
  taisanhuySearchData,
  taisanmatSearchData,
  taisanthanhlySearchData,
  toanbotaisanSearchData,
  taisandangsudungSearchData,
  taisanchuasudungSearchData,
  taisanbaoduongsuachuaSearchData,

  toanbotaisanLoading
} from '../../redux/actions/quanlytaisan.actions';
import QuanLyTaiSanFilter from './filter/QuanLyTaiSanFilter';

export function GetToanBoTaiSanData(parameters) {
  const { datas, tab, skipCount, maxResultCount, loaitaisan, nhacungcap, masudung, isFilter } = parameters;
  const phongbanquanly = datas !== undefined ? datas : store.getState().filterDVQLDataReducer.dvqlDataFilter;
  const maxCount = maxResultCount !== undefined ? maxResultCount : 10;
  const skipTotal = skipCount !== undefined ? skipCount : 0;
  const tabChosen = tab || store.getState().currentTabReducer.tabName;

  store.dispatch(toanbotaisanLoading());
  if (phongbanquanly && phongbanquanly.length > 0) {
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
      case tabs.tai_san_huy:
        url = `${endPoint.getTaiSanHuy}?`;
        break;
      default:
        url = `${endPoint.getToanBoTaiSan}?`;
        break;
    }

    const textState = store.getState().SearchReducer.searchData;
    const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === store.getState().currentTabReducer.tabName)
      && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === store.getState().currentTabReducer.tabName).data;
    if (textFilter) {
      switch (tabChosen) {
        case tabs.tai_san_dang_su_dung:
        case tabs.tai_san_chua_su_dung: {
          url += `KeyWord=${textFilter}&`;
          break;
        }
        case tabs.tai_san_mat:
        case tabs.tai_san_hong:
        case tabs.tai_san_thanh_ly:
        case tabs.tai_san_huy:
        case tabs.tai_san_sua_chua_bao_duong: {
          url += `TenTaiSan=${textFilter}&`;
          break;
        }
        case tabs.bao_hong_mat_tai_san: {
          url += `TimKiemKhaiBao=${textFilter}&`;
          break;
        }
        default:
          url += `Fillter=${textFilter}&`
          break;
      }
    }

    phongbanquanly.forEach(e => {
      if (e.id) {
        url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
      } else {
        url += `PhongBanqQL=${encodeURIComponent(`${e}`)}&`;
      }
    });

    if (tabChosen === tabs.tai_san_dang_su_dung || tabChosen === tabs.tai_san_chua_su_dung) {
      phongbanquanly.forEach(e => {
        url += `PhongBanQuanLyId=${encodeURIComponent(`${e.id}`)}&`;
      });
    }

    if (loaitaisan) {
      url += `LoaiTS=${encodeURIComponent(`${loaitaisan}`)}&`;
      if (tabChosen === tabs.tai_san_dang_su_dung || tabChosen === tabs.tai_san_chua_su_dung) {
        url += `LoaiTaiSanId=${encodeURIComponent(`${loaitaisan}`)}&`;
      }
    }
    if (nhacungcap) {
      url += `NhaCungCap=${encodeURIComponent(`${nhacungcap}`)}&`;
      if (tabChosen === tabs.tai_san_dang_su_dung || tabChosen === tabs.tai_san_chua_su_dung) {
        url += `NhaCungCapId=${encodeURIComponent(`${nhacungcap}`)}&`;
      }
    }
    if (masudung) {
      url += `MaSD=${encodeURIComponent(`${masudung}`)}&`;
    }

    url += `IsSearch=${encodeURIComponent(`${textFilter !== undefined}`)}&`;
    url += `SkipCount=${encodeURIComponent(`${maxCount * skipTotal}`)}&`;
    url += `MaxResultCount=${encodeURIComponent(`${maxCount}`)}`;
    createGetMethod(url)
      .then(res => {
        if (res) {
          if (textFilter || isFilter) {
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
              case tabs.tai_san_huy:
                store.dispatch(taisanhuySearchData(res));
                break;
              case tabs.tai_san_dang_su_dung:
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
              case tabs.tai_san_huy:
                store.dispatch(taisanhuyGetData(res));
                break;
              case tabs.tai_san_dang_su_dung:
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

const QuanLyTaiSan = (state) => {
  const [scrollYValue] = useState(new Animated.Value(0));
  const [skipCount, setSkipCount] = useState(0);
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
    if (!state.isLoading && skipCount > 0) {
      GetToanBoTaiSanData({ datas: state.DvqlDataFilter, tab: state.tab, skipCount });
    }
  }, [skipCount]);

  useEffect(() => {
    if (state.searchText && state.searchText.length > 0) {
      GetToanBoTaiSanData({ datas: state.DvqlDataFilter, tab: state.tab, isFilter: true });
    }
  }, [state.searchText]);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  function LoaderComponentByTab() {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
        return LoaderComponent(state.toanbotaisanData, state, screens.chi_tiet_tai_san);
      case tabs.tai_san_mat:
        return LoaderComponent(state.taisanmatData, state, screens.chi_tiet_tai_san);
      case tabs.tai_san_hong:
        return LoaderComponent(state.taisanhongData, state, screens.chi_tiet_tai_san);
      case tabs.tai_san_thanh_ly:
        return LoaderComponent(state.taisanthanhlyData, state, screens.chi_tiet_tai_san);
      case tabs.tai_san_chua_su_dung:
        return LoaderComponent(state.taisanchuasudungData, state, screens.chi_tiet_tai_san);
      case tabs.tai_san_dang_su_dung:
        return LoaderComponent(state.taisandangsudungData, state, screens.chi_tiet_tai_san);
      case tabs.tai_san_huy:
        return LoaderComponent(state.taisanhuyData, state, screens.chi_tiet_tai_san);
      case tabs.tai_san_sua_chua_bao_duong:
        return LoaderComponent(state.taisansuachuabaoduongData, state, screens.chi_tiet_tai_san);
      default:
        break;
    }
  }

  const getSkipCount = () => {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
        return state.toanbotaisanData.length;
      case tabs.tai_san_mat:
        return state.taisanmatData.length
      case tabs.tai_san_hong:
        return state.taisanhongData.length;
      case tabs.tai_san_huy:
        return state.taisanhuyData.length;
      case tabs.tai_san_thanh_ly:
        return state.taisanthanhlyData.length;
      case tabs.tai_san_chua_su_dung:
        return state.taisanchuasudungData.length;
      case tabs.tai_san_dang_su_dung:
        return state.taisandangsudungData.length;
      case tabs.tai_san_sua_chua_bao_duong:
        return state.taisansuachuabaoduongData.length;
      default:
        return 0;
    }
  }

  const totalDisplayForTab = () => {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
        return <Text>Hiển thị: {state.toanbotaisanData.length}/{state.toanbotaisanTotal}</Text>;
      case tabs.tai_san_mat:
        return <Text>Hiển thị: {state.taisanmatData.length}/{state.taisanmatTotal}</Text>;
      case tabs.tai_san_hong:
        return <Text>Hiển thị: {state.taisanhongData.length}/{state.taisanhongTotal}</Text>;
      case tabs.tai_san_huy:
        return <Text>Hiển thị: {state.taisanhuyData.length}/{state.taisanhuyTotal}</Text>;
      case tabs.tai_san_thanh_ly:
        return <Text>Hiển thị: {state.taisanthanhlyData.length}/{state.taisanthanhlyTotal}</Text>;
      case tabs.tai_san_chua_su_dung:
        return <Text>Hiển thị: {state.taisanchuasudungData.length}/{state.taisanchuasudungTotal}</Text>;
      case tabs.tai_san_dang_su_dung:
        return <Text>Hiển thị: {state.taisandangsudungData.length}/{state.taisandangsudungTotal}</Text>;
      case tabs.tai_san_sua_chua_bao_duong:
        return <Text>Hiển thị: {state.taisansuachuabaoduongData.length}/{state.taisansuachuabaoduongTotal}</Text>;
      default:
        return null;
    }
  }


  return (
    <Animated.View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchComponent
          clampedScroll={clampedScroll}
          screen={screens.quan_ly_tai_san}
          tab={state.tab}
        />
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
            {
              useNativeDriver: true,
              listener: event => {
                if (isCloseToBottom(event.nativeEvent) && !state.isLoading) {
                  setTimeout(() => {
                    setSkipCount(getSkipCount());
                  }, 2000)
                }
              },
            },
          )}
          scrollEventThrottle={500}
          contentInsetAdjustmentBehavior="automatic"
        >
          {LoaderComponentByTab()}
        </Animated.ScrollView>
      </SafeAreaView>
      <View style={{
        bottom: 5,
        right: 5,
        position: 'absolute',
      }}
      >
        {totalDisplayForTab()}
      </View>
      <FilterComponent
        screen={screens.quan_ly_tai_san}
        filter={<QuanLyTaiSanFilter screen={screens.quan_ly_tai_san} />}
        action={GetToanBoTaiSanData}
      />
    </Animated.View>
  );
};

const mapStateToProps = state => ({
  toanbotaisanData: state.toanbotaisanReducer.toanbotaisanData,
  taisanthanhlyData: state.taisanthanhlyReducer.taisanthanhlyData,
  taisanmatData: state.taisanmatReducer.taisanmatData,
  taisanhongData: state.taisanhongReducer.taisanhongData,
  taisanhuyData: state.taisanhuyReducer.taisanhuyData,
  taisanchuasudungData: state.taisanchuasudungReducer.taisanchuasudungData,
  taisandangsudungData: state.taisandangsudungReducer.taisandangsudungData,
  taisansuachuabaoduongData: state.taisansuachuabaoduongReducer.taisansuachuabaoduongData,

  toanbotaisanTotal: state.toanbotaisanReducer.toanbotaisanTotal,
  taisanthanhlyTotal: state.taisanthanhlyReducer.taisanthanhlyTotal,
  taisanmatTotal: state.taisanmatReducer.taisanmatTotal,
  taisanhongTotal: state.taisanhongReducer.taisanhongTotal,
  taisanhuyTotal: state.taisanhuyReducer.taisanhuyTotal,
  taisanchuasudungTotal: state.taisanchuasudungReducer.taisanchuasudungTotal,
  taisandangsudungTotal: state.taisandangsudungReducer.taisandangsudungTotal,
  taisansuachuabaoduongTotal: state.taisansuachuabaoduongReducer.taisansuachuabaoduongTotal,

  isLoading: state.toanbotaisanReducer.isLoading,

  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  tab: state.currentTabReducer.tabName,
  searchText: state.SearchReducer.searchData
});

export default connect(mapStateToProps)(QuanLyTaiSan);