/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';
import QuanLyKiemkeFilterComponent from './filter/QuanlyKiemkeFilter';
import { createGetMethod } from '../../api/Apis';
import { endPoint, screens } from '../../api/config';
import LoaderComponent from '../global/LoaderComponent';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

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
    this.getToanTaisan({datas: this.props.DvqlDataFilter});
  }

  getToanTaisan(parameters) {
    const { datas, startdate, enddate, tinhtrangkiemke } = parameters;
    if (datas && datas.length > 0) {
      let url;
      url = `${endPoint.getdanhsachKiemke}?`;

      const StartDate = find(startdate, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
      && find(startdate, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;
      if (StartDate) {
        url += `StartDate=${encodeURIComponent(`${StartDate.dateString}`)}&`;
      }

      const EndDate = find(enddate, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
      && find(enddate, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;
      if (EndDate) {
        url += `EndDate=${encodeURIComponent(`${EndDate.dateString}`)}&`;
      }
      datas.forEach(e => {
        if (e.id) {
          url += `BoPhanDuocKiemKeId=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `BoPhanDuocKiemKeId=${encodeURIComponent(`${e}`)}&`;
        }
      });

      if (tinhtrangkiemke) {
        const tinhTrangKiemKe = find(tinhtrangkiemke, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
        && find(tinhtrangkiemke, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;
        if (tinhTrangKiemKe) {
          url += `TrangThaiId=${encodeURIComponent(`${tinhTrangKiemKe}`)}&`;
        }
      }


      url += `IsSearch=${encodeURIComponent(`${true}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;

      console.log('url: ', url);
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
      <Animated.View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <SearchComponent
            clampedScroll={clampedScroll}
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
            {LoaderComponent(toanboTaiSanData, this.props, screens.chi_tiet_kiem_ke_tai_san)}
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
          screen={screens.quan_ly_kiem_ke_tai_san}
          filter={<QuanLyKiemkeFilterComponent />}
          action={this.getToanTaisan}
        />
      </Animated.View>
    );
  }

}

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
});

export default connect(mapStateToProps)(QuanlyKiemkeTaiSanScreen);