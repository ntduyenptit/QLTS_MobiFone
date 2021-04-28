import React, { useState } from 'react';
import { Animated, SafeAreaView, StatusBar, Alert, Text } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoaderComponent from '../global/LoaderComponent';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';
import { createGetMethod } from '../../api/Apis';
import { endPoint, tabs } from '../../api/config';
import { store } from '../../redux/store';
import { toanbotaisanGetData } from '../../redux/actions/toanbotaisan.actions';

export function GetToanBoTaiSanData(datas) {
  if (datas && datas.length > 0) {
    let url = `${endPoint.getToanBoTaiSan}?`;
    datas.forEach(e => {
      url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
    });
    url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
    url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
    url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
    createGetMethod(url)
      .then(res => {
        if (res) {
          store.dispatch(toanbotaisanGetData(res));
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

  function LoaderComponentByTab() {
    switch (state.tab) {
      case tabs.toan_bo_tai_san:
        return LoaderComponent(state.toanbotaisanData, state);
      default:
        return (<TouchableOpacity onPress={() => GetToanBoTaiSanData(state.DvqlDataFilter)}><Text>Không có dữ liệu</Text></TouchableOpacity>);
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
            margin: 20,
            paddingTop: 55
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
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
  toanbotaisanData: state.toanbotaisanReducer.data,
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  tab: state.currentTabReducer.tabName,
});

export default connect(mapStateToProps)(QuanLyTaiSan);
