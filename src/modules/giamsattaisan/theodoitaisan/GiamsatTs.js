import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';
import getParameters from '../filter/GetGiamSatParameters';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

let isSearch = false;
class GiamSatTaiSanScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      toanboTaiSanData: [],
      total: 0,
      skipCount: 0,
    }
    this.getToanTaisan = this.getToanTaisan.bind(this);
    this.isCloseToBottom = this.isCloseToBottom.bind(this);
  }

  componentDidMount() {
    this.getToanTaisan({ datas: this.props.DvqlDataFilter });
  }

  componentDidUpdate(prevProps){
    if ( prevProps.searchText !== this.props.searchText ) {
      isSearch = true;
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
    const { toanboTaiSanData, skipCount } = this.state;
    const { datas, startdate, enddate, chieudichuyen, phanloaitaisan } = getParameters();
    if (datas && datas.length > 0) {
      let url = `${endPoint.getLichsuRavaoAngten}?`;
      const textState = this.props.searchText;
      const textFilter = find(textState, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
        && find(textState, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
      if (textFilter) {
        url += `Keyword=${textFilter}&`
      }

      if (startdate) {
          url += `StartDate=${encodeURIComponent(`${startdate.dateString}`)}&`;
      }
  
      if (enddate) {
          url += `EndDate=${encodeURIComponent(`${enddate.dateString}`)}&`;
      }
  
      if (chieudichuyen) {
        url += `ChieuDiChuyen=${encodeURIComponent(`${chieudichuyen}`)}&`;
      }
  
      if (phanloaitaisan) {
        url += `PhanLoaiId=${encodeURIComponent(`${phanloaitaisan}`)}&`;
      }
  
      datas.forEach(e => {
        if (e.id) {
          url += `BoPhanId=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `BoPhanId=${encodeURIComponent(`${e}`)}&`;
        }
      });
  
      url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${this.state.skipCount}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
      createGetMethod(url)
        .then(res => {
          if (res.success) {
            if (isSearch || toanboTaiSanData !== []) {
              this.setState({
                skipCount: 0,
                toanboTaiSanData: res.result.items,
                total: res.result.totalCount
              });
            }
            if (skipCount > 0) {
              this.setState({
                toanboTaiSanData: [...toanboTaiSanData ,...res.result.items],
                total: res.result.totalCount
              });
            }
          } 
        })
        .catch();
    }
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  refresh = () => {
    isSearch = false;
    this.getToanTaisan();
  }

  isLoadMore = () => {
    const { toanboTaiSanData, total } = this.state;
    if (toanboTaiSanData.length < total) {
        return true;
      }
      return false;
  }

  getSkipCount = () => {
    const { toanboTaiSanData, skipCount } = this.state;
    if (skipCount !== toanboTaiSanData.length) {
      this.setState({
        skipCount: toanboTaiSanData.length,
      }, () => this.getToanTaisan());
    }
  }

  render() {
    const {
      scrollYValue,
      toanboTaiSanData,
      total,
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
            screen={screens.giam_sat_tai_san}
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
                  if (this.isCloseToBottom(event.nativeEvent) && this.isLoadMore()) {
                      this.getSkipCount();
                  }
                },
              }
            )}
            contentInsetAdjustmentBehavior="automatic"
          >
            {LoaderComponent(toanboTaiSanData, this.props, screens.giam_sat_tai_san)}
          </Animated.ScrollView>
        </SafeAreaView>
        <Text
          style={{
            bottom: 20,
            right: 20,
            position: 'absolute',
          }}
        >Hiển thị: {toanboTaiSanData.length}/{total}
        </Text>
        <FilterComponent />
      </Animated.View>
    );
  }

}

const mapStateToProps = state => ({
  searchText: state.SearchReducer.searchData,
  isShowFilter: state.filterReducer.isShowFilter,
});

export default connect(mapStateToProps)(GiamSatTaiSanScreen);