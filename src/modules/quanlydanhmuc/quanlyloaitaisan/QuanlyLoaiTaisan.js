/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import find from 'lodash/find';
import SearchComponent from '../../global/SearchComponent';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

class QuanLyLoaiTSScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            loaiTaisanData: [],
            total: 0,
        }
    }

    componentDidMount() {
        this.getAllLoaiTaisanData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchText !== this.props.searchText) {
          this.getAllLoaiTaisanData();
        }
      }

    getAllLoaiTaisanData() {
        let url = `${endPoint.getAllLoaiTaiSan}?`;
        const textState = this.props?.searchText;
        const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_loai_tai_san)
          && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_loai_tai_san).data;
        if (textFilter) {
          url += `Keyword=${textFilter}&`
          url += `IsSearch=${encodeURIComponent(`${true}`)}`;
        } else {
            url += `IsSearch=${encodeURIComponent(`${false}`)}`;
        }

        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        loaiTaisanData: res.result,
                        total: res.result.length
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch();
    }

    refresh = () => {
        this.getAllLoaiTaisanData();
   }

    render() {
        const {
            scrollYValue,
            loaiTaisanData,
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
                  screen={screens.quan_ly_loai_tai_san}
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
                  {LoaderComponent(loaiTaisanData, this.props, screens.chi_tiet_quan_ly_loai_tai_san, this.refresh)}
                </Animated.ScrollView>
              </SafeAreaView>
              <Text
                style={{
                            bottom: 5,
                            right: 5,
                            position: 'absolute',
                        }}
              >Hiển thị: {loaiTaisanData.length}/{total}
              </Text>
            </Animated.View>
            <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_loai_tai_san, { screen: "Thêm mới loại tài sản", onGoBack: () => this.refresh()})} />
          </View>
        );
    }
}

const mapStateToProps = state => ({
    searchText: state.SearchReducer.searchData
  });
  

export default connect(mapStateToProps)(QuanLyLoaiTSScreen);