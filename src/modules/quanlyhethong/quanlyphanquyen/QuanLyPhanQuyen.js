/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import SearchComponent from '../../global/SearchComponent';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

class QuanlyPhanQuyenScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      toanboData: [],
      total: 0,
    }
  }

  componentDidMount() {
    this.getNguoidung();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getNguoidung();
      }
    );
  }

  getNguoidung() {
    let url = `${endPoint.getALLRoleName}?`;
    url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
    url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
    url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
    createGetMethod(url)
      .then(res => {
        if (res) {
          this.setState({
            toanboData: res.result.items,
            total: res.result.totalCount
          });
        }
      })
      .catch();
  }

  refresh = () => {
    this.getNguoidung();
  }

  render() {
    const {
      scrollYValue,
      toanboData,
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
              {LoaderComponent(toanboData, this.props, screens.chi_tiet_quan_ly_phan_quyen, this.refresh)}
            </Animated.ScrollView>
          </SafeAreaView>
          <Text
            style={{
              bottom: 5,
              right: 5,
              position: 'absolute',
            }}
          >Hiển thị: {toanboData.length}/{total}
          </Text>
        </Animated.View>
        <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_vai_tro, { screen: "Thêm mới vai trò", onGoBack: () => this.refresh() })} />
      </View>

    );
  }

}


export default QuanlyPhanQuyenScreen;