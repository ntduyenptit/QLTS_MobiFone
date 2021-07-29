/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';
import { createGetMethod } from '../../api/Apis';
import { endPoint, screens } from '../../api/config';
import LoaderComponent from '../global/LoaderComponent';
import getParameters from './filter/GetParameters';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

let isSearch = false;
class QuanlyCanhbaoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      toanboData: [],
      total: '',
    }
  }

  componentDidMount() {
    this.getdsCanhbao();
  }

  componentDidUpdate(prevProps){
    if ( prevProps.searchText !== this.props.searchText ) {
      isSearch = true;
      this.getdsCanhbao();
    }
    if (prevProps.isShowFilter !== this.props.isShowFilter) {
      isSearch = true;
      this.getdsCanhbao();
    } else {
      isSearch = false;
    }
  }

  getdsCanhbao() {
    const { datas, startdate, enddate, hoatdong, nguoiguithongbao } = getParameters();
    if (datas && datas.length > 0) {
      let url = `${endPoint.getAllDanhsachCanhbao}?`;

      const textState = this.props.searchText;
      const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao)
        && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao).data;
      if (textFilter) {
        url += `NoiDung=${textFilter}&`
      }

      if (startdate) {
        url += `ThoiGianFrom=${encodeURIComponent(`${startdate.dateString}`)}&`;
    }

    if (enddate) {
      url += `ThoiGianTo=${encodeURIComponent(`${enddate.dateString}`)}&`;
  }

  if (hoatdong) {
    url += `HoatDong=${encodeURIComponent(`${hoatdong}`)}&`;
  }

  if (nguoiguithongbao) {
    url += `TaiKhoanId=${encodeURIComponent(`${nguoiguithongbao}`)}&`;
  }

      url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;

      createGetMethod(url)
        .then(res => {
          if (res) {
            this.setState({
              toanboData: res.result.items,
              total: res.result.totalCount
            });
          }
        })
    }
  }

  render() {
    const {
      scrollYValue,
      toanboData,
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
      <Animated.View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <SearchComponent
            clampedScroll={clampedScroll}
            screen={screens.quan_ly_canh_bao}
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
            {LoaderComponent(toanboData, this.props, screens.quan_ly_canh_bao)}
          </Animated.ScrollView>
        </SafeAreaView>
        <Text
          style={{
            bottom: 20,
            right: 20,
            position: 'absolute',
          }}
        >Hiển thị: {toanboData ? toanboData.length : 0}/{total}
        </Text>
        <FilterComponent />
      </Animated.View>
    );
  }

}

const mapStateToProps = state => ({
  isShowFilter: state.filterReducer.isShowFilter,
  searchText: state.SearchReducer.searchData,
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
});

export default connect(mapStateToProps)(QuanlyCanhbaoScreen);