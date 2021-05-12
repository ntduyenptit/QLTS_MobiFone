/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions } from 'react-native';
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
        );
    }

}


export default LichXuatBaoCaoScreen;