/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Text,View } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import ActionButton from 'react-native-action-button';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';
import { createGetMethod } from '../../api/Apis';
import { endPoint, screens } from '../../api/config';
import LoaderComponent from '../global/LoaderComponent';
import getParameters from './filter/GetParameters';

let isSearch = false;
class QuanlyKiemkeTaiSanScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      toanboTaiSanData: [],
      total: 0,
    }
    this.getToanTaisan = this.getToanTaisan.bind(this);
  }

  componentDidMount() {
    this.getToanTaisan();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchText !== this.props.searchText) {
      this.getToanTaisan();
    }
    if (prevProps.isShowFilter !== this.props.isShowFilter) {
      isSearch = true;
      this.getToanTaisan();
    } else {
      isSearch = false;
    }
  }

  getToanTaisan() {
    const { datas, startdate, enddate, tinhtrangkiemke } = getParameters();
    if (datas && datas.length > 0) {
      let url;
      url = `${endPoint.getdanhsachKiemke}?`;

      const textState = this.props.searchText;
      const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
        && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;
      if (textFilter) {
        url += `Keyword=${textFilter}&`
      }

      if (startdate) {
        url += `StartDate=${encodeURIComponent(`${startdate.dateString}`)}&`;
      }

      if (enddate) {
        url += `EndDate=${encodeURIComponent(`${enddate.dateString}`)}&`;
      }
      datas.forEach(e => {
        if (e.id) {
          url += `BoPhanDuocKiemKeId=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `BoPhanDuocKiemKeId=${encodeURIComponent(`${e}`)}&`;
        }
      });

      if (tinhtrangkiemke) {
          url += `TrangThaiId=${encodeURIComponent(`${tinhtrangkiemke}`)}&`;
      }

      url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;

      createGetMethod(url)
        .then(res => {
          if (res) {
            this.setState({
              toanboTaiSanData: res.result.items,
              total: res.result.totalCount
            }, () => {
              isSearch = false;
            });
          }
        })
        .catch();
    }
  }

  refresh = () => {
    isSearch = false;
    this.getToanTaisan();
  }

  render() {
    const {
      scrollYValue,
      toanboTaiSanData,
      total
    } = this.state;
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
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <Animated.View>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <SearchComponent
              clampedScroll={clampedScroll}
              screen={screens.quan_ly_kiem_ke_tai_san}
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
                { useNativeDriver: true },
                () => { },          // Optional async listener
              )}
              contentInsetAdjustmentBehavior="automatic"
            >
              {LoaderComponent(toanboTaiSanData, this.props, screens.chi_tiet_kiem_ke_tai_san, this.refresh)}
            </Animated.ScrollView>
          </SafeAreaView>
          <Text
            style={{
              bottom: 5,
              right: 5,
              position: 'absolute',
            }}
          >Hiển thị: {toanboTaiSanData.length}/{total}
          </Text>
          <FilterComponent />
        </Animated.View>
        <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_kiem_ke, { screen: "Thêm mới đợt kiểm kê", onGoBack: () => this.refresh() })} />
      </View>

    );
  }

}

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,

  searchText: state.SearchReducer.searchData
});

export default connect(mapStateToProps)(QuanlyKiemkeTaiSanScreen);