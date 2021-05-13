/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
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

    getAllLoaiTaisanData() {
            let url;
            url = `${endPoint.getAllLoaiTaiSan}?`;

            url += `IsSearch=${encodeURIComponent(`${false}`)}`;
            createGetMethod(url)
                .then(res => {
                    if (res) {
                        console.log("loaiTaisanData: "+ res.result.length);
                        this.setState({
                            loaiTaisanData: res.result,
                            total: res.result.length
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
                        {LoaderComponent(loaiTaisanData, this.props, screens.quan_ly_loai_tai_san)}
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
        );
    }

}

export default QuanLyLoaiTSScreen;