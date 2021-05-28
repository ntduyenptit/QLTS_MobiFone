/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../../global/SearchComponent';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';
import ActionButton from 'react-native-action-button';
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
  }

  getNguoidung(datas) {
    let url;
    url = `${endPoint.getALLRoleName}?`;
    url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
    url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
    url += `MaxResultCount=${encodeURIComponent(`${30}`)}`;
    createGetMethod(url)
      .then(res => {
        if (res) {
          console.log("Res:" + res.result.items);
          this.setState({
            toanboData: res.result.items,
            total: res.result.totalCount
          });
        } else {
          // Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch(err => console.log(err));
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
              {LoaderComponent(toanboData, this.props, screens.quan_ly_phan_quyen)}
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
        <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_vai_tro, { screen: "Thêm mới vai trò" })}></ActionButton>
      </View>

    );
  }

}


export default QuanlyPhanQuyenScreen;