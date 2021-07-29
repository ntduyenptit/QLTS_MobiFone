/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { headerRightComponent } from '@app/modules/navigation/stackNavigationData';
import LoaderComponent from '../../global/LoaderComponent';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import { createGetMethod } from '../../../api/Apis';
import getParameter from './FilterParameters';
import { endPoint, screens, tabs } from '../../../api/config';

let skipNumber = 0;
let isSearch = false;

const TaiSanMat = (state) => {
  const [taisan, setTaiSan] = useState();
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
    const setHeaderOptions=()=> { 
      state.navigation.dangerouslyGetParent().setOptions({headerRight: () => headerRightComponent()}); };
      state.navigation.addListener('focus', setHeaderOptions);
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
    const { datas, loaitaisan, nhacungcap } = getParameter();
    const maxCount = 10;
    if (datas && datas.length > 0) {
      let url = `${endPoint.getTaiSanMat}?`;
  
      const textState = state.searchText;
      const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tabs.tai_san_mat)
        && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tabs.tai_san_mat).data;
      if (textFilter) {
        url += `TenTaiSan=${textFilter}&`;
      }

      datas.forEach(e => {
        if (e.id) {
          url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `PhongBanqQL=${encodeURIComponent(`${e}`)}&`;
        }
      });
  
      if (loaitaisan) {
        url += `LoaiTaiSan=${encodeURIComponent(`${loaitaisan}`)}&`;
      }
      if (nhacungcap) {
        url += `NhaCungCap=${encodeURIComponent(`${nhacungcap}`)}&`;
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
  const displayCreateForTab = () => (
    <ActionButton buttonColor="rgba(231,76,60,1)" position='right'>
      <ActionButton.Item buttonColor='#9b59b6' title="Thêm mới" onPress={() => LoadScreenThemmoi()}>
        <Icon name="md-create" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
)

  const LoadScreenThemmoi = () => props.navigation.navigate(screens.khai_bao_tai_san, { screen: "tài sản mất", onGoBack: () => refreshData() })
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      {/* Rest of the app comes ABOVE the action button component ! */}
      <Animated.View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <SearchComponent
            clampedScroll={clampedScroll}
            screen={screens.quan_ly_tai_san}
            tab={tabs.tai_san_mat}
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
  tab: tabs.tai_san_mat,
});

export default connect(mapStateToProps)(TaiSanMat);