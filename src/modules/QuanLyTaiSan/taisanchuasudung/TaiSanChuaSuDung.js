import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import LoaderComponent from '../../global/LoaderComponent';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import { createGetMethod } from '../../../api/Apis';
import getParameter from './FilterParameters';
import { endPoint, screens, tabs } from '../../../api/config';

let skipNumber = 0;
let isSearch = false;

const TaiSanChuaSuDung = (state) => {
  const [taisan, setTaiSan] = useState();
  const [total, setTotal] = useState(0);
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
    requestDatas();
  }, []);

  useEffect(() => {
    if (!state.isLoading && skipCount > 0) {
      skipNumber = skipCount;
      requestDatas();
    }
  }, [skipCount]);

  useEffect(() => {
    if (state.searchText && state.searchText.length > 0) {
      isSearch = true;
      requestDatas();
    }
  }, [state.searchText]);

  useEffect(() => {
    if (!state.isShowFilter) {
      isSearch = true;
      requestDatas();
    }
}, [state.isShowFilter]);

  const requestDatas = () => {
    const { datas, loaitaisan, nhacungcap, masudung } = getParameter();
    const maxCount = 10;
    if (datas && datas.length > 0) {
      let url = `${endPoint.getTaiSanChuaSuDung}?`;
  
      const textState = state.searchText;
      const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tabs.tai_san_chua_su_dung)
        && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tabs.tai_san_chua_su_dung).data;
      if (textFilter) {
        url += `KeyWord=${textFilter}&`;
      }

      datas.forEach(e => {
        if (e.id) {
            url += `PhongBanQuanLyId=${encodeURIComponent(`${e.id}`)}&`;
          } else {
            url += `PhongBanQuanLyId=${encodeURIComponent(`${e}`)}&`;
          }
      });
  
      if (loaitaisan) {
        url += `LoaiTaiSanId=${encodeURIComponent(`${loaitaisan}`)}&`;
      }
      if (nhacungcap) {
        url += `NhaCungCapId=${encodeURIComponent(`${nhacungcap}`)}&`;
      }
      if (masudung) {
        url += `TinhTrangSuDung=${encodeURIComponent(`${masudung}`)}&`;
      }
  
      url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${skipNumber}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${maxCount}`)}`;
  
      createGetMethod(url)
        .then(res => {
          if (res.success) {
            if (isSearch || taisan !== []) {
              setSkipCount(0);
              setTaiSan(res.result.items);
              setTotal(res.result.totalCount);
            }
            if (skipCount > 0) {
              setTaiSan([...taisan ,...res.result.items]);
              setTotal(res.result.totalCount);
            }
          }
        })
    }
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const refreshData = () => {
    isSearch = false;
    requestDatas();
  }

  const isLoadMore = () => {
    if (taisan.length === total) {
        return false;
      }
      return true;
  }


  const totalDisplay = () => <Text>Hiển thị: {taisan ? taisan.length : 0}/{total}</Text>
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      {/* Rest of the app comes ABOVE the action button component ! */}
      <Animated.View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <SearchComponent
            clampedScroll={clampedScroll}
            screen={screens.quan_ly_tai_san}
            tab={tabs.tai_san_chua_su_dung}
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
                      setSkipCount(taisan.length);
                  }
                },
              },
            )}
            scrollEventThrottle={500}
            contentInsetAdjustmentBehavior="automatic"
          >
            {LoaderComponent(taisan, state, screens.chi_tiet_tai_san, refreshData)}
          </Animated.ScrollView>

        </SafeAreaView>

        <View style={{
          bottom: 5,
          right: 15,
          position: 'absolute',
        }}
        >
          {totalDisplay()}
        </View>

        <FilterComponent />
      </Animated.View>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.loadingReducer.isLoading,
  isShowFilter: state.filterReducer.isShowFilter,

  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  searchText: state.SearchReducer.searchData,
  tab: tabs.tai_san_chua_su_dung,
});

export default connect(mapStateToProps)(TaiSanChuaSuDung);