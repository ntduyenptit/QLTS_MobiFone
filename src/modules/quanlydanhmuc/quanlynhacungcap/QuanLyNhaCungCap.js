/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import QuanLyNCCFilter from './QuanlyNhaCungCapFilter';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

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

    getAllNhacungcapData() {
            let url;
            url = `${endPoint.getNhaCungcap}?`;

            url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
            url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
            url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
            console.log("url "+ url);
            createGetMethod(url)
                .then(res => {
                    if (res) {
                        console.log("NCC,total: "+ res.result.items +" " +res.result.totalCount);
                        this.setState({
                            nhacungcapData: res.result.items,
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
                        {LoaderComponent(nhacungcapData, this.props, screens.chi_tiet_nha_cung_cap)}
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
                <FilterComponent filter={<QuanLyNCCFilter />} />
            </Animated.View>
        );
    }

}

const mapStateToProps = state => ({
    NCCDataFilter: state.filterNCCDataReducer.nccDataFilter,    
    tab: 'Quản lý nhà cung cấp'
});

export default connect(mapStateToProps)(QuanLyNhaCungCapScreen);