/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../global/SearchComponent';
import FilterComponent from './KiemkeFilterComponent';
import { createGetMethod } from '../../api/Apis';
import { endPoint, tabs } from '../../api/config';
import { store } from '../../redux/store';
import {
    toanbokiemkeGetData,
} from '../../redux/actions/kiemkeTS.action';
import Icon from 'react-native-vector-icons/FontAwesome';
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export function GetData(datas) {
    console.log('co vao day k e');
    if (datas && datas.length > 0) {
        let url;
        url = `${endPoint.getdanhsachKiemke}?`;

        url += `StartDate=${encodeURIComponent(`${'2021-01-01'}`)}&`;
        url += `EndDate=${encodeURIComponent(`${''}`)}&`;
        datas.forEach(e => {
            url += `BoPhanDuocKiemKeId=${encodeURIComponent(`${e.id}`)}&`;
        });
        //StartDate=&EndDate=
        url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
        url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
        url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    console.log(res);
                    store.dispatch(toanbokiemkeGetData(res));
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));
    }
}
function trangThaiKiemke(id) {
    switch (id) {
        case 0:
            return "Chưa bắt đầu";
        case 1:
            return "Đang kiểm kê";
        case 2:
            return "Đã kết thúc"

    }
}

function LoaderComponent(array, props) {

    //const list = array.;
    console.log("Kiem ke: " + array);
    if (array && array.length > 0) {


        const items = () => array.map((item, index) => (

            <View key={`loader-component-${index + 2}`} style={styles.listItem}>
                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#0080FF' size={15} />
                <View style={styles.infor}>
                    <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Mã kiểm kê: {item.kiemKeTaiSan.maKiemKe}</Text>
                    <Text numberOfLines={1} style={styles.infoText}>Tên kiểm kê: {item.kiemKeTaiSan.tenKiemKe}</Text>
                    <Text numberOfLines={1}>{trangThaiKiemke(item.kiemKeTaiSan.trangThaiId)}</Text>
                </View>
                <TouchableOpacity
                    style={{ height: 40, width: 20, alignItems: "flex-end" }}
                    onPress={() => props.navigation.navigate('Chi tiết đợt kiểm kê', { paramKey: item })}
                >
                    <Icon name="chevron-right" color='#0080FF' size={15} />
                </TouchableOpacity>
            </View>
        ))

        return (
            <View>{items()}</View>
        );
    }
    return (
        <TouchableOpacity onPress={() => GetData(props.DvqlDataFilter)}><Text>Không có dữ liệu</Text></TouchableOpacity>
    );
}

const KiemkeTs = (state) => {
    const [scrollYValue] = useState(new Animated.Value(0));
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

    useEffect(() => {
        GetData(state.DvqlDataFilter);
    }, []);


    return (
        <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <SearchComponent clampedScroll={clampedScroll} />
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
                    {/* {LoaderComponent(state.toanbotaisanData, state)} */}
                </Animated.ScrollView>
            </SafeAreaView>
            <FilterComponent />
        </Animated.View>
    );
};

const mapStateToProps = state => ({
    toanbotaisanData: state.toanbokiemkeReducer.toanbotaisanData,

    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
});


const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        flex: 1,
        width: deviceWidth - 50,
        backgroundColor: "#FFF",
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        height: 95,
    },
    infor: {
        marginLeft: 10,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        height: 50,
        width: "85%",

    },
    infoText: {
        paddingBottom: 3,

    }
});

export default connect(mapStateToProps)(KiemkeTs);