/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LoaderComponent from '../global/LoaderComponent';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';
import { createGetMethod } from '../../api/Apis';
import getParameter from './filter/FilterParameters';
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

  removeToanbotaisanData,
  removeTaisanhongData,
  removeTaisanhuyData,
  removeTaisanmatData,
  removeTaisanthanhlyData,
  removeTaisandangsudungData,
  removeTaisanchuasudungData,
  removeTaisanbaoduongsuachuaData,
  removeKhaibaohongmatData,

  toanbotaisanLoading,
  khaibaohongmatGetData
} from '../../redux/actions/quanlytaisan.actions';

let skipNumber = 0;
let isSearch = false;

export function GetToanBoTaiSanData() {
  const { datas, loaitaisan, nhacungcap, masudung, trangthai, hinhthuc, khaibao } = getParameter();
  const maxCount = 10;
  const state = store.getState();
  const tab = state.currentTabReducer.tabName;
  store.dispatch(toanbotaisanLoading());
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
      case tabs.tai_san_sua_chua_bao_duong:
        url = `${endPoint.getTaiSanSuaChuaBaoDuong}?`;
        break;
      case tabs.tai_san_huy:
        url = `${endPoint.getTaiSanHuy}?`;
        break;
      case tabs.bao_hong_mat_tai_san:
        url = `${endPoint.getAllKhaibaoHongmat}?`;
        break;
      default:
        url = `${endPoint.getToanBoTaiSan}?`;
        break;
    }

    const textState = state.SearchReducer.searchData;
    const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tab)
      && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tab).data;
    if (textFilter) {
      switch (tab) {
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

    if (tab === tabs.tai_san_dang_su_dung || tab === tabs.tai_san_chua_su_dung) {
      datas.forEach(e => {
        if (e.id) {
          url += `PhongBanQuanLyId=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `PhongBanQuanLyId=${encodeURIComponent(`${e}`)}&`;
        }
      });
    } else {
      datas.forEach(e => {
        if (e.id) {
          url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `PhongBanqQL=${encodeURIComponent(`${e}`)}&`;
        }
      });
    }

    if (loaitaisan) {
      if (tab === tabs.tai_san_dang_su_dung || tab === tabs.tai_san_chua_su_dung) {
        url += `LoaiTaiSanId=${encodeURIComponent(`${loaitaisan}`)}&`;
      }
      if (tab === tabs.tai_san_mat) {
        url += `LoaiTaiSan=${encodeURIComponent(`${loaitaisan}`)}&`;
      } else {
        url += `LoaiTS=${encodeURIComponent(`${loaitaisan}`)}&`;
      }
    }
    if (nhacungcap) {
      if (tab === tabs.tai_san_dang_su_dung || tab === tabs.tai_san_chua_su_dung) {
        url += `NhaCungCapId=${encodeURIComponent(`${nhacungcap}`)}&`;
      } else {
        url += `NhaCungCap=${encodeURIComponent(`${nhacungcap}`)}&`;
      }
    }
    if (masudung) {
      url += `MaSD=${encodeURIComponent(`${masudung}`)}&`;
    }
    if (trangthai) {
      url += `TrangThai=${encodeURIComponent(`${trangthai}`)}&`
    }
    if (hinhthuc) {
      url += `HinhThuc=${encodeURIComponent(`${hinhthuc}`)}&`
    }
    if (khaibao) {
      url += `KhaiBao=${encodeURIComponent(`${khaibao}`)}&`
    }

    url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
    url += `SkipCount=${encodeURIComponent(`${skipNumber}`)}&`;
    url += `MaxResultCount=${encodeURIComponent(`${maxCount}`)}`;

    console.log('123_url: ', url);

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
              case tabs.bao_hong_mat_tai_san:
                store.dispatch(khaibaohongmatGetData(res));
                break;
              default:
                break;
            }
        } else {
          // Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch();
  }
}

const QuanLyTaiSan = (state) => {
  const [scrollYValue] = useState(new Animated.Value(0));
  const [skipCount, setSkipCount] = useState(0);
  const props = state;
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
      skipNumber = skipCount;
      GetToanBoTaiSanData();
    }
  }, [skipCount]);

  useEffect(() => {
    if (state.searchText && state.searchText.length > 0) {
      resetData();
      skipNumber = 0;
      GetToanBoTaiSanData();
    }
  }, [state.searchText]);

  const resetData = () => {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
        store.dispatch(removeToanbotaisanData());
        break;
      case tabs.tai_san_thanh_ly:
        store.dispatch(removeTaisanthanhlyData());
        break;
      case tabs.tai_san_mat:
        store.dispatch(removeTaisanmatData());
        break;
      case tabs.tai_san_hong:
        store.dispatch(removeTaisanhongData());
        break;
      case tabs.tai_san_huy:
        store.dispatch(removeTaisanhuyData());
        break;
      case tabs.tai_san_dang_su_dung:
        store.dispatch(removeTaisandangsudungData());
        break;
      case tabs.tai_san_chua_su_dung:
        store.dispatch(removeTaisanchuasudungData());
        break;
      case tabs.tai_san_sua_chua_bao_duong:
        store.dispatch(removeTaisanbaoduongsuachuaData());
        break;
      case tabs.bao_hong_mat_tai_san:
        store.dispatch(removeKhaibaohongmatData());
        break;
      default:
        break;
    }
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const refresh = () => {
    resetData();
    GetToanBoTaiSanData();
  }

  const handleFilter = () => {
    isSearch = true;
    refresh();
  }

  function LoaderComponentByTab() {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
        return LoaderComponent(state.toanbotaisanData, state, screens.chi_tiet_tai_san, refresh);
      case tabs.tai_san_mat:
        return LoaderComponent(state.taisanmatData, state, screens.chi_tiet_tai_san, refresh);
      case tabs.tai_san_hong:
        return LoaderComponent(state.taisanhongData, state, screens.chi_tiet_tai_san, refresh);
      case tabs.tai_san_thanh_ly:
        return LoaderComponent(state.taisanthanhlyData, state, screens.chi_tiet_tai_san, refresh);
      case tabs.tai_san_chua_su_dung:
        return LoaderComponent(state.taisanchuasudungData, state, screens.chi_tiet_tai_san, refresh);
      case tabs.tai_san_dang_su_dung:
        return LoaderComponent(state.taisandangsudungData, state, screens.chi_tiet_tai_san, refresh);
      case tabs.tai_san_huy:
        return LoaderComponent(state.taisanhuyData, state, screens.chi_tiet_tai_san, refresh);
      case tabs.tai_san_sua_chua_bao_duong:
        return LoaderComponent(state.taisansuachuabaoduongData, state, screens.chi_tiet_tai_san, refresh);
      case tabs.bao_hong_mat_tai_san:
        return LoaderComponent(state.baohongmatData, state, screens.chi_tiet_bao_hongmat_tai_san, refresh);
      default:
        break;
    }
  }

  const isLoadMore = () => {
    const {
      tab,
      toanbotaisanData,
      taisanmatData,
      taisanhongData,
      taisanhuyData,
      taisanthanhlyData,
      taisanchuasudungData,
      taisandangsudungData,
      taisansuachuabaoduongData,
      baohongmatData,

      toanbotaisanTotal,
      taisanthanhlyTotal,
      taisanmatTotal,
      taisanhongTotal,
      taisanhuyTotal,
      taisanchuasudungTotal,
      taisandangsudungTotal,
      taisansuachuabaoduongTotal,
      baohongmatTotal,
     } = state;
    switch (tab) {
      case tabs.toan_bo_tai_san:
        if (toanbotaisanData.length === toanbotaisanTotal) {
          return false;
        }
        break;
      case tabs.tai_san_mat:
        if (taisanmatData.length === taisanmatTotal) {
          return false;
        }
        break;
      case tabs.tai_san_hong:
        if (taisanhongData.length === taisanhongTotal) {
          return false;
        }
        break;
      case tabs.tai_san_huy:
        if (taisanhuyData.length === taisanhuyTotal) {
          return false;
        }
        break;
      case tabs.tai_san_thanh_ly:
        if (taisanthanhlyData.length === taisanthanhlyTotal) {
          return false;
        }
        break;
      case tabs.tai_san_chua_su_dung:
        if (taisanchuasudungData.length === taisanchuasudungTotal) {
          return false;
        }
        break;
      case tabs.tai_san_dang_su_dung:
        if (taisandangsudungData.length === taisandangsudungTotal) {
          return false;
        }
        break;
      case tabs.tai_san_sua_chua_bao_duong:
        if (taisansuachuabaoduongData.length === taisansuachuabaoduongTotal) {
          return false;
        }
        break;
      case tabs.bao_hong_mat_tai_san:
        if (baohongmatData.length === baohongmatTotal) {
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  }

  const getSkipCount = () => {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
        return state.toanbotaisanData.length;
      case tabs.tai_san_mat:
        return state.taisanmatData.length;
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
      case tabs.bao_hong_mat_tai_san:
        return state.baohongmatData.length;
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
      case tabs.bao_hong_mat_tai_san:
        return <Text>Hiển thị: {state.baohongmatData.length}/{state.baohongmatTotal}</Text>;
      default:
        return null;
    }
  }
  const displayCreateForTab = () => {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
      case tabs.tai_san_mat:
      case tabs.tai_san_hong:
      case tabs.tai_san_huy:
      case tabs.tai_san_thanh_ly:
      case tabs.tai_san_sua_chua_bao_duong:
        return (
          <ActionButton buttonColor="rgba(231,76,60,1)" position='right'>
            <ActionButton.Item buttonColor='#9b59b6' title="Thêm mới" onPress={() => LoadScreenThemmoi()}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
);
      case tabs.tai_san_chua_su_dung:
      case tabs.tai_san_dang_su_dung:
      case tabs.bao_hong_mat_tai_san:
      default:
        return null;
    }
  }
  const LoadScreenThemmoi = () => {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
        return props.navigation.navigate(screens.them_moi_tai_san, { screen: "toàn bộ tài sản", onGoBack: () => refresh() });
      case tabs.tai_san_mat:
        return props.navigation.navigate(screens.khai_bao_tai_san, { screen: "tài sản mất", onGoBack: () => refresh() });
      case tabs.tai_san_hong:
        return props.navigation.navigate(screens.khai_bao_tai_san, { screen: "tài sản hỏng", onGoBack: () => refresh() });
      case tabs.tai_san_huy:
        return props.navigation.navigate(screens.khai_bao_tai_san, { screen: "tài sản hủy", onGoBack: () => refresh() });
      case tabs.tai_san_thanh_ly:
        return props.navigation.navigate(screens.khai_bao_tai_san, { screen: "tài sản thanh lý", onGoBack: () => refresh() });
      case tabs.tai_san_sua_chua_bao_duong:
        return props.navigation.navigate(screens.khai_bao_tai_san, { screen: "tài sản sửa chữa/bảo dưỡng", onGoBack: () => refresh() });
      default:
        return null;
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      {/* Rest of the app comes ABOVE the action button component ! */}
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
                  if (isCloseToBottom(event.nativeEvent) && !state.isLoading && isLoadMore()) {
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
          right: 15,
          position: 'absolute',
        }}
        >
          {totalDisplayForTab()}
        </View>

        <FilterComponent
          action={handleFilter}
        />
      </Animated.View>
      {displayCreateForTab()}
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

const mapStateToProps = state => ({
  toanbotaisanData: state.toanbotaisanReducer.toanbotaisanData,
  taisanthanhlyData: state.taisanthanhlyReducer.taisanthanhlyData,
  taisanmatData: state.taisanmatReducer.taisanmatData,
  taisanhongData: state.taisanhongReducer.taisanhongData,
  taisanhuyData: state.taisanhuyReducer.taisanhuyData,
  taisanchuasudungData: state.taisanchuasudungReducer.taisanchuasudungData,
  taisandangsudungData: state.taisandangsudungReducer.taisandangsudungData,
  taisansuachuabaoduongData: state.taisansuachuabaoduongReducer.taisansuachuabaoduongData,
  baohongmatData: state.khaibaohongmatReducer.khaibaohongmatData,

  toanbotaisanTotal: state.toanbotaisanReducer.toanbotaisanTotal,
  taisanthanhlyTotal: state.taisanthanhlyReducer.taisanthanhlyTotal,
  taisanmatTotal: state.taisanmatReducer.taisanmatTotal,
  taisanhongTotal: state.taisanhongReducer.taisanhongTotal,
  taisanhuyTotal: state.taisanhuyReducer.taisanhuyTotal,
  taisanchuasudungTotal: state.taisanchuasudungReducer.taisanchuasudungTotal,
  taisandangsudungTotal: state.taisandangsudungReducer.taisandangsudungTotal,
  taisansuachuabaoduongTotal: state.taisansuachuabaoduongReducer.taisansuachuabaoduongTotal,
  baohongmatTotal: state.khaibaohongmatReducer.khaibaohongmatTotal,

  isLoading: state.toanbotaisanReducer.isLoading,

  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  tab: state.currentTabReducer.tabName,
  searchText: state.SearchReducer.searchData
});

export default connect(mapStateToProps)(QuanLyTaiSan);