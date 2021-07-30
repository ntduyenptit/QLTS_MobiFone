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

let skipNumber = 0;
let isSearch = false;

const QuanLyTaiSan = (state) => {
  const [taisan, setTaiSan] = useState([]);
  const [total, setTotal] = useState(0);
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
    GetToanBoTaiSanData();
  }, []);

  useEffect(() => {
    if (!state.isLoading && skipCount > 0) {
      skipNumber = skipCount;
      GetToanBoTaiSanData();
    }
  }, [skipCount]);

  useEffect(() => {
    if (state.searchText && state.searchText.length > 0) {
      isSearch = true;
      GetToanBoTaiSanData();
    }
  }, [state.searchText]);

  useEffect(() => {
    if (!state.isShowFilter) {
      isSearch = true;
      GetToanBoTaiSanData();
    }
  }, [state.isShowFilter]);

  const GetToanBoTaiSanData = () => {
    const { datas, loaitaisan, nhacungcap, masudung } = getParameter();
    const maxCount = 10;
    const State = store.getState();
    if (datas && datas.length > 0) {
      let url = `${endPoint.getToanBoTaiSan}?`;

      const textState = State.SearchReducer.searchData;
      const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tabs.toan_bo_tai_san)
        && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tabs.toan_bo_tai_san).data;
      if (textFilter) {
        url += `Fillter=${textFilter}&`
      }

      datas.forEach(e => {
        if (e.id) {
          url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `PhongBanqQL=${encodeURIComponent(`${e}`)}&`;
        }
      });

      if (loaitaisan) {
        url += `LoaiTS=${encodeURIComponent(`${loaitaisan}`)}&`;
      }
      if (nhacungcap) {
        url += `NhaCungCap=${encodeURIComponent(`${nhacungcap}`)}&`;
      }
      if (masudung) {
        url += `MaSD=${encodeURIComponent(`${masudung}`)}&`;
      }

      url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${skipNumber}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${maxCount}`)}`;

      createGetMethod(url)
        .then(res => {
          if (res.success) {
            if (isSearch || taisan === []) {
              setSkipCount(0);
              setTaiSan(res.result.items);
              setTotal(res.result.totalCount);
            }
            if (skipCount > 0) {
              setTaiSan([...taisan, ...res.result.items]);
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
    GetToanBoTaiSanData();
  }

  const isLoadMore = () => {
    if (taisan.length < total) {
      return true;
    }
    return false;
  }

  const getSkipCount = () => taisan.length
  const totalDisplayForTab = () => <Text>Hiển thị: {taisan ? taisan.length : 0}/{total}</Text>
  const displayCreateForTab = () => (
    <ActionButton buttonColor="rgba(231,76,60,1)" position='right'>
      <ActionButton.Item buttonColor='#9b59b6' title="Thêm mới" onPress={() => LoadScreenThemmoi()}>
        <Icon name="md-create" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  )
  const LoadScreenThemmoi = () => props.navigation.navigate(screens.them_moi_tai_san, { screen: "toàn bộ tài sản", onGoBack: () => refreshData() })
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
                      setSkipCount(getSkipCount());
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
          {totalDisplayForTab()}
        </View>

        <FilterComponent />
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
  isLoading: state.loadingReducer.isLoading,
  isShowFilter: state.filterReducer.isShowFilter,

  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  searchText: state.SearchReducer.searchData,
  tab: tabs.toan_bo_tai_san,
});

export default connect(mapStateToProps)(QuanLyTaiSan);