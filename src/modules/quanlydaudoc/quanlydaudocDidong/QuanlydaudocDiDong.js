/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import QuanLyDauDocFilter from '../filter/QuanLyDauDocFilter';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';
import { getTTSDDataFilter } from '../../global/FilterApis';
import {
  getTTSDDataAction
} from '../../../redux/actions/filter.actions';

class QuanLyDauDocDiDongScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      daudocdidongData: [],
      total: 0,
    }
  }

  componentDidMount() {
    this.getToanBoDauDocDiDongData({datas: this.props.DvqlDataFilter});
    if (this.props.TtsdDataFilter.length === 0) {
      getTTSDDataFilter().then(res => {
        this.props.getTTSDData(res.result);
      });
    }
  }

  getToanBoDauDocDiDongData(parameters) {
    const { datas, tinhtrangsudung } = parameters;
    if (datas && datas.length > 0) {
      let url;
      url = `${endPoint.getDaudocDidong}?`;
     
  
      datas.forEach(e => {
        if (e.id) {
          url += `PhongBanSuDung=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `PhongBanSuDung=${encodeURIComponent(`${e}`)}&`;
        }
      });

      if (tinhtrangsudung) {
        const tinhTrangSuDung = find(tinhtrangsudung, itemSelected => itemSelected.screen === screens.quan_ly_dau_doc_di_dong)
        && find(tinhtrangsudung, itemSelected => itemSelected.screen === screens.quan_ly_dau_doc_di_dong).data;
        if (tinhTrangSuDung) {
          url += `TinhTrangSuDung=${encodeURIComponent(`${tinhTrangSuDung}`)}&`;
        }
      }
  
      url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
      createGetMethod(url)
        .then(res => {
          if (res) {
            this.setState({
              daudocdidongData: res.result.items,
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
      daudocdidongData,
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
            screen={screens.quan_ly_dau_doc_di_dong}
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
            {LoaderComponent(daudocdidongData, this.props, screens.chi_tiet_dau_doc)}
          </Animated.ScrollView>
        </SafeAreaView>
        <Text
          style={{
          bottom: 5,
          right: 5,
          position: 'absolute',
        }}
        >Hiển thị: {daudocdidongData.length}/{total}
        </Text>
        <FilterComponent 
          filter={<QuanLyDauDocFilter screen={screens.quan_ly_dau_doc_di_dong} />}
          screen={screens.quan_ly_dau_doc_di_dong}
          action={this.getToanBoDauDocDiDongData}
        />
      </Animated.View>
    );

  }
};

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  TtsdDataFilter: state.filterTTSDDataReducer.ttsdDataFilter,
});

function mapDispatchToProps(dispatch) {
  return {
    getTTSDData: (item) => dispatch(getTTSDDataAction(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDauDocDiDongScreen);