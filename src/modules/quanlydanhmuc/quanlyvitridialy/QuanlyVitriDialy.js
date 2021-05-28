/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import QuanLyVitriFilter from './QuanlyVitriDialyFilter';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';
import ActionButton from 'react-native-action-button';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

class QuanLyNhaCungCapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            vitridialyData: [],
            total: 0,
            tinhthanhData: []
        }
    }

    componentDidMount() {
        this.getAllVitriData();
        this.getAllTinhthanhData;
    }
    getAllTinhthanhData() {
        let url;
        url = `${endPoint.getAllTinhthanh}?`;
        console.log("url " + url);
        createGetMethod(url)
            .then(res => {
                if (res) {
                    console.log("tinhthanh: " + res.result);
                    this.setState({
                        tinhthanhData: res.result,
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));
    }

    getAllVitriData() {
        let url;
        url = `${endPoint.getAllVitriDialy}?`;

        url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
        url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
        url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
        console.log("url " + url);
        createGetMethod(url)
            .then(res => {
                if (res) {
                    console.log("vitridialy: " + res.result.items + " " + res.result.totalCount);
                    this.setState({
                        vitridialyData: res.result.items,
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
            vitridialyData,
            total,
            tinhthanhData
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
                            {LoaderComponent(vitridialyData, this.props, screens.quan_ly_vi_tri_dia_ly)}
                        </Animated.ScrollView>
                    </SafeAreaView>
                    <Text
                        style={{
                            bottom: 5,
                            right: 5,
                            position: 'absolute',
                        }}
                    >Hiển thị: {vitridialyData.length}/{total}
                    </Text>
                    <FilterComponent filter={<QuanLyVitriFilter />} />
                </Animated.View>
                <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_vi_tri_dia_ly, { screen: "Thêm mới vị trí địa lý" })}></ActionButton>
            </View>
        );
    }

}

export default QuanLyNhaCungCapScreen;