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

class GiamSatTaiSanScreen extends React.Component {
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
    this.getToanTaisan({ datas: this.props.DvqlDataFilter });
  }

  getToanTaisan(parameters) {
    const { datas, startdate, enddate } = parameters;
    if (datas && datas.length > 0) {
      let url;
      url = `${endPoint.getLichsuRavaoAngten}?`;
      const StartDate = find(startdate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
      && find(startdate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
      if (StartDate) {
        url += `StartDate=${encodeURIComponent(`${StartDate.dateString}`)}&`;
      }

      const EndDate = find(enddate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
      && find(enddate, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
      if (EndDate) {
        url += `EndDate=${encodeURIComponent(`${EndDate.dateString}`)}&`;
      }

      datas.forEach(e => {
        url += `BoPhanId=${encodeURIComponent(`${e.id}`)}&`;
      });

      url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
      createGetMethod(url)
        .then(res => {
          if (res) {
            console.log(res);
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
              { useNativeDriver: true },
              () => { },          // Optional async listener
            )}
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
          screens={screens.giam_sat_tai_san}
          filter={(
            <QuanLyGiamSatFilter
              screen={screens.giam_sat_tai_san}
            />
          )}
          action={this.getToanTaisan}
        />
      </Animated.View>
    );
  }

}

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  tab: 'giam sat tai san'
});

export default connect(mapStateToProps)(GiamSatTaiSanScreen);