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
class QuanLyNhaCungCapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            nhacungcapData: [],
            total: 0,
        }

    }

    componentDidMount() {
        this.getAllNhacungcapData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchText !== this.props.searchText) {
          this.getAllNhacungcapData();
        }
      }

    getAllNhacungcapData() {
        let url = `${endPoint.getNhaCungcap}?`;
        const linhVucKinhDoanh = getParameters()?.linhVucKinhDoanh;
        const textState = this.props?.searchText;
        const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_nha_cung_cap)
          && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_nha_cung_cap).data;
        if (textFilter) {
          url += `Keyword=${textFilter}&`
        }
        if (linhVucKinhDoanh && linhVucKinhDoanh.length > 0) {
          url += `LinhVuc=${linhVucKinhDoanh[0]}&`
        }
        url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
        url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
        url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res.success) {
                    this.setState({
                        nhacungcapData: res.result.items,
                        total: res.result.totalCount
                    });
                }
            })
            .catch();
    }

    refresh = () => {
      isSearch = false;
         this.getAllNhacungcapData();
    }

    handleFilter = () => {
      isSearch = true;
      this.getAllNhacungcapData();
    };


    render() {
        const {
            scrollYValue,
            nhacungcapData,
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
                  screen={screens.quan_ly_nha_cung_cap}
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
                  {LoaderComponent(nhacungcapData, this.props, screens.chi_tiet_nha_cung_cap, this.refresh)}
                </Animated.ScrollView>
              </SafeAreaView>
              <Text
                style={{
                            bottom: 5,
                            right: 5,
                            position: 'absolute',
                        }}
              >Hiển thị: {nhacungcapData.length}/{total}
              </Text>
              <FilterComponent action={this.handleFilter} />
            </Animated.View>
            <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_nha_cung_cap, { screen: "Thêm mới nhà cung cấp" , onGoBack: () => this.refresh()})} />
          </View>
        );
    }

}

const mapStateToProps = state => ({
    searchText: state.SearchReducer.searchData,
    NCCDataFilter: state.filterNCCDataReducer.nccDataFilter,
});

export default connect(mapStateToProps)(QuanLyNhaCungCapScreen);