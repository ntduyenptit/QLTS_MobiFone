/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import find from 'lodash/find';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';
import getParameters from './filter/GetParameters';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
let isSearch = false;
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
    this.getNguoidung();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchText !== this.props.searchText) {
      isSearch = true;
      this.getNguoidung();
    }
  }

  getNguoidung() {
    const { datas } = getParameters();
    if (datas && datas.length > 0) {
      let url = `${endPoint.getAllNguoidung}?`;
      const textState = this.props.searchText;
      const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_nguoi_dung)
        && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_nguoi_dung).data;
      if (textFilter) {
        url += `Keyword=${textFilter}&`
      }

      datas.forEach(e => {
        url += `ToChucIdList=${encodeURIComponent(`${e.id || e}`)}&`;
      });

      url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${30}`)}`;
      createGetMethod(url)
        .then(res => {
          if (res.success) {
            this.setState({
              toanboNguoidungData: res.result.items,
              total: res.result.totalCount
            });
          }
        })
        .catch();
    }
  }

  refresh = () => {
    isSearch = false;
    this.getNguoidung();
  }

  handleFilter = () => {
    isSearch = true;
    this.getNguoidung();
  };

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
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <Animated.View>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <SearchComponent
              clampedScroll={clampedScroll}
              screen={screens.quan_ly_nguoi_dung}
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
          <FilterComponent action={this.handleFilter} />
        </Animated.View>
        <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_nguoi_dung, { screen: "Thêm mới người dùng" })} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  searchText: state.SearchReducer.searchData
});

export default connect(mapStateToProps)(QuanlyNguoidungScreen);