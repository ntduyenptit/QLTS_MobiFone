/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions,View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

class LichXuatBaoCaoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            toanboData: [],
            total: '',
        }
    }

    componentDidMount() {
        this.getdsData();
    }

    getdsData() {
        let url;
        url = `${endPoint.getAllLichXuatBaoCao}?`;

        url += `IsSearch=${encodeURIComponent(`${true}`)}&`;
        url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
        url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    console.log("lichbaocao: " + res.result.items);
                    this.setState({
                        toanboData: res.result.items,
                        total: `${res.result.items.length}/${res.result.totalCount}`
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

        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <Animated.View>
                    <StatusBar barStyle="dark-content" />
                    <SafeAreaView>
                        <Animated.ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{
                                margin: 10,
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
                            {LoaderComponent(toanboData, this.props, screens.chi_tiet_lich_xuat_bao_cao)}
                        </Animated.ScrollView>
                    </SafeAreaView>
                </Animated.View>
                <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_cai_dat_lich_xuat_bao_cao, { screen: "Thêm mới cài đặt" })}></ActionButton>
            </View>

        );
    }

}


export default LichXuatBaoCaoScreen;