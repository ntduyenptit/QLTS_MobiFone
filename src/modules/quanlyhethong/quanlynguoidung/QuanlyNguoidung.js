/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import QuanLyNguoidungFilter from './QuanlyNguoidungFilter';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

class QuanlyNguoidungScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      toanboNguoidungData: [],
      total: 0,
    }
  }

  componentDidMount() {
    this.getNguoidung(this.props.DvqlDataFilter);
  }

  getNguoidung(datas) {
    if (datas && datas.length > 0) {
      let url;
      url = `${endPoint.getAllNguoidung}?`;

      datas.forEach(e => {
        url += `ToChucIdList=${encodeURIComponent(`${e.id}`)}&`;
      });

      url += `IsSearch=${encodeURIComponent(`${true}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${30}`)}`;
      createGetMethod(url)
        .then(res => {
          if (res) {
            this.setState({
                toanboNguoidungData: res.result.items,
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
      toanboNguoidungData,
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
            {LoaderComponent(toanboNguoidungData, this.props, screens.chi_tiet_nguoi_dung)}
          </Animated.ScrollView>
        </SafeAreaView>
        <Text
          style={{
          bottom: 5,
          right: 5,
          position: 'absolute',
        }}
        >Hiển thị: {toanboNguoidungData.length}/{total}
        </Text>
        <FilterComponent filter={<QuanLyNguoidungFilter />} />
      </Animated.View>
    );
  }

}

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  tab: 'kiem ke tai san'
});

export default connect(mapStateToProps)(QuanlyNguoidungScreen);