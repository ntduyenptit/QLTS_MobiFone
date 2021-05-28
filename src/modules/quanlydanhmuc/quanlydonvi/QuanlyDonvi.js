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

class QuanLyLoaiTSScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            TCTData: [],
            donviData: [],
            total: 0,
        }
    }

    componentDidMount() {
        this.getAllDonviData();
    }

    getAllDonviData() {
        let url;
        url = `${endPoint.getAllDonvi}?`;

        url += `IsSearch=${encodeURIComponent(`${false}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    console.log("donviData: " + res.result[0].children);
                    this.setState({
                        donviData: res.result[0].children,
                        total: res.result[0].children.length
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
            donviData,
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
                            {LoaderComponent(donviData, this.props, screens.quan_ly_don_vi)}
                        </Animated.ScrollView>
                    </SafeAreaView>
                    <Text
                        style={{
                            bottom: 5,
                            right: 5,
                            position: 'absolute',
                        }}
                    >Hiển thị: {donviData.length}/{total}
                    </Text>
                </Animated.View>
                <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_don_vi, { screen: "Thêm mới đơn vị" })}></ActionButton>
            </View>

        );
    }

}

export default QuanLyLoaiTSScreen;