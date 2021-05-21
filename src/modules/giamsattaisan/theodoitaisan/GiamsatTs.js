/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import QuanLyGiamSatFilter from '../filter/QuanlyGiamsatTSFilter';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


export function getToanTaisan(parameters) {
  console.log('parameters: ',parameters.startdate, parameters.enddate);
  const { datas, startdate, enddate, chieuDiChuyen, phanloaitaisan } = parameters;
  if (datas && datas.length > 0) {
    let url;
    url = `${endPoint.getLichsuRavaoAngten}?`;
    const StartDate = find(startdate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
    && find(startdate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
    if (StartDate) {
      if (StartDate.dateString) {
        url += `StartDate=${encodeURIComponent(`${StartDate.dateString}`)}&`;
      } else {
        url += `StartDate=${encodeURIComponent(`${StartDate}`)}&`;
      }
    }

    const EndDate = find(enddate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
    && find(enddate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
    if (EndDate) {
      if (EndDate.dateString) {
        url += `EndDate=${encodeURIComponent(`${EndDate.dateString}`)}&`;
      } else {
        url += `EndDate=${encodeURIComponent(`${EndDate}`)}&`;
      }
    }

    const ChieuDiChuyen = find(chieuDiChuyen, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
    && find(chieuDiChuyen, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
    if (ChieuDiChuyen) {
      url += `ChieuDiChuyen=${encodeURIComponent(`${ChieuDiChuyen}`)}&`;
    }

    const PhanLoaiTaiSan = find(phanloaitaisan, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
    && find(phanloaitaisan, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
    if (PhanLoaiTaiSan) {
      url += `PhanLoaiId=${encodeURIComponent(`${PhanLoaiTaiSan}`)}&`;
    }

    datas.forEach(e => {
      if (e.id) {
        url += `BoPhanId=${encodeURIComponent(`${e.id}`)}&`;
      } else {
        url += `BoPhanId=${encodeURIComponent(`${e}`)}&`;
      }
    });

    url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
    url += `SkipCount=${encodeURIComponent(`${this.state.skipCount}`)}&`;
    url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
    createGetMethod(url)
      .then(res => {
        if (res) {
          this.setState({
            toanboTaiSanData: res.result.items,
            total: res.result.totalCount
          });
        } else {
          // Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch(err => console.log(err));
  }
}
class GiamSatTaiSanScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      toanboTaiSanData: [],
      total: 0,
      skipCount: 0
    }
    this.getToanTaisan = getToanTaisan.bind(this);
    this.isCloseToBottom = this.isCloseToBottom.bind(this);
  }

  componentDidMount() {
    this.getToanTaisan({ datas: this.props.DvqlDataFilter });
  }

  componentDidUpdate(prevProps){
    if ( prevProps.searchText !== this.props.searchText ) {
      this.getToanTaisan({datas: this.props.DvqlDataFilter});
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
                  if (this.isCloseToBottom(event.nativeEvent)) {
                    setTimeout(() => {
                      this.setState({
                        skipCount: skipCount + 1,
                      }, () => {
                        if (toanboTaiSanData.length < total) {
                          this.getToanTaisan({
                            data: this.props.DvqlDataFilter,
                            startdate: this.props.StartDateFilterSelected,
                            enddate: this.props.EndDateFilterSelected,
                          });
                        }
                      })
                    }, 2000)
                  }
                },
              }
            )}
            scrollEventThrottle={500}
            contentInsetAdjustmentBehavior="automatic"
          >
            {LoaderComponent(toanboTaiSanData, this.props, screens.giam_sat_tai_san)}
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
        <FilterComponent
          screen={screens.giam_sat_tai_san}
          filter={(
            <QuanLyGiamSatFilter />
          )}
          action={this.getToanTaisan}
        />
      </Animated.View>
    );
  }

}

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  StartDateFilterSelected: state.filterStartDateSelectedReducer.startdateFilterSelected,
  EndDateFilterSelected: state.filterEndDateSelectedReducer.enddateFilterSelected,
  searchText: state.SearchReducer.searchData
});

export default connect(mapStateToProps)(GiamSatTaiSanScreen);