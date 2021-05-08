/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import QuanLyDauDocFilter from '../filter/QuanLyDauDocFilter';
import { createGetMethod } from '../../../api/Apis';
import { endPoint } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';

class QuanLyDauDocDiDongScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      daudocdidongData: [],
      total: '',
    }
  }

  componentDidMount() {
    this.getToanBoDauDocDiDongData(this.props.DvqlDataFilter);
  }

  getToanBoDauDocDiDongData(datas) {
    if (datas && datas.length > 0) {
      let url;
      url = `${endPoint.getDaudocDidong}?`;
     
  
      datas.forEach(e => {
        url += `PhongBanSuDung=${encodeURIComponent(`${e.id}`)}&`;
      });
  
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
            total={`${daudocdidongData.length}/${total}`}
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
            {LoaderComponent(daudocdidongData, this.props)}
          </Animated.ScrollView>
        </SafeAreaView>
        <FilterComponent filter={<QuanLyDauDocFilter />} />
      </Animated.View>
    );

  }
};

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
});

export default connect(mapStateToProps)(QuanLyDauDocDiDongScreen);