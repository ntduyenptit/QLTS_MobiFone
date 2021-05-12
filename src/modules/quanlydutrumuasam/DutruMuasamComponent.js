/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';
import QuanLyKiemkeFilter from './QuanlyMuaSamFilter';
import { createGetMethod } from '../../api/Apis';
import { endPoint, screens } from '../../api/config';
import LoaderComponent from '../global/LoaderComponent';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

class QuanlyDutruMuaSamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      toanboTaiSanData: [],
      total: '',
    }
  }

  componentDidMount() {
    this.getToanTaisan(this.props.DvqlDataFilter);
  }

  getToanTaisan(datas) {
    if (datas && datas.length > 0) {
      let url;
      url = `${endPoint.getAllPhieuMuasam}?`;

      datas.forEach(e => {
        url += `PhongBan=${encodeURIComponent(`${e.id}`)}&`;
      });

      url += `IsSearch=${encodeURIComponent(`${true}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
      createGetMethod(url)
        .then(res => {
            console.log("muasam: " + res.result);
          if (res) {
            this.setState({
              toanboTaiSanData: res.result.items,
              total: `${res.result.items.length}/${res.result.totalCount}`
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
            total={total}
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
            {LoaderComponent(toanboTaiSanData, this.props, screens.chi_tiet_du_tru_mua_sam)}
          </Animated.ScrollView>
        </SafeAreaView>
        <FilterComponent filter={<QuanLyKiemkeFilter />} />
      </Animated.View>
    );
  }

}

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  tab: 'Quan ly du tru mua sam'
});

export default connect(mapStateToProps)(QuanlyDutruMuaSamScreen);