/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';
import getParameters from '../filter/GetTheoDoiKetNoiParameters';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

let isSearch = false;
class TheoDoiKetNoiScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      toanboTaiSanData: [],
      total: 0,
      skipCount: 0
    }
    this.getToanTaisan = this.getToanTaisan.bind(this);
  }

  componentDidMount() {
    this.getToanTaisan();
  }

  componentDidUpdate(prevProps){
    if (prevProps.searchText !== this.props.searchText) {
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
    const { datas, startdate, enddate } = getParameters();
    if (datas && datas.length > 0) {
      let url = `${endPoint.getToanboThietbi}?`;

      if (startdate) {
        url += `StartDate=${encodeURIComponent(`${startdate.dateString}`)}&`;
      }
      if (enddate) {
        url += `EndDate=${encodeURIComponent(`${enddate.dateString}`)}&`;
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
            this.setState({
              toanboTaiSanData: res.result.items,
              total: res.result.totalCount
            });
          }
        });
    }
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  render() {
    const {
      scrollYValue,
      toanboTaiSanData,
      total,
      skipCount
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
            screen={screens.theo_doi_ket_noi_thiet_bi}
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
                  if (this.isCloseToBottom(event.nativeEvent)) {
                    setTimeout(() => {
                      this.setState({
                        skipCount: skipCount + 1,
                      })
                    }, 2000)
                  }
                },
              }
            )}
            contentInsetAdjustmentBehavior="automatic"
          >
            {LoaderComponent(toanboTaiSanData, this.props, screens.theo_doi_ket_noi_thiet_bi)}
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
    );
  }

}

const mapStateToProps = state => ({
  isShowFilter: state.filterReducer.isShowFilter,
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  searchText: state.SearchReducer.searchData
});

export default connect(mapStateToProps)(TheoDoiKetNoiScreen);