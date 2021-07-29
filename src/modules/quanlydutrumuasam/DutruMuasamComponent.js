/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, View, Text } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import find from 'lodash/find';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from '../global/FilterComponent';
import { createGetMethod } from '../../api/Apis';
import { endPoint, screens } from '../../api/config';
import LoaderComponent from '../global/LoaderComponent';
import getParameters from './filter/GetParameters';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

let isSearch = false;
class QuanlyDutruMuaSamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      toanboTaiSanData: [],
      total: 0,
    }
  }

  componentDidMount() {
    this.getToanTaisan();
  }

  componentDidUpdate(prevProps) {
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
    const { datas } = getParameters(screens.quan_ly_du_tru_mua_sam);
    if (datas && datas.length > 0) {
      let url = `${endPoint.getAllPhieuMuasam}?`;

      const textState = this.props?.searchText;
      const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_du_tru_mua_sam)
        && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_du_tru_mua_sam).data;
      if (textFilter) {
        url += `Keyword=${textFilter}&`
      }

      datas.forEach(e => {
        if (e.id) {
          url += `PhongBan=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `PhongBan=${encodeURIComponent(`${e}`)}&`;
        }
      });

      url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;

      createGetMethod(url)
        .then(res => {
          if (res) {
            this.setState({
              toanboTaiSanData: res.result.items,
              total: res.result.totalCount,
            });
          }
        })
        .catch();
    }
  }

  refresh = () => {
    isSearch = false;
    this.getToanTaisan();
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
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <Animated.View>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <SearchComponent
              clampedScroll={clampedScroll}
              screen={screens.quan_ly_du_tru_mua_sam}
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
              {LoaderComponent(toanboTaiSanData, this.props, screens.chi_tiet_du_tru_mua_sam, this.refresh)}
            </Animated.ScrollView>
          </SafeAreaView>
          <FilterComponent />
        </Animated.View>
        <Text
          style={{
              bottom: 20,
              right: 20,
              position: 'absolute',
            }}
        >Hiển thị: {toanboTaiSanData ? toanboTaiSanData.length : 0}/{total}
        </Text>
        <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_du_tru_mua_sam, { screen: "Thêm mới Phiếu dự trù mua sắm", onGoBack: () => this.refresh() })} />
      </View>

    );
  }
}

const mapStateToProps = state => ({
  isShowFilter: state.filterReducer.isShowFilter,
  searchText: state.SearchReducer.searchData
});


export default connect(mapStateToProps)(QuanlyDutruMuaSamScreen);