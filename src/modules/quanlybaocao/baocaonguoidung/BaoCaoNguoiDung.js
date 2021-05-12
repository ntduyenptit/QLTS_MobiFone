import React from 'react'
import { LineChart, YAxis, XAxis, Path, Grid } from 'react-native-svg-charts'
import { Animated, View, StatusBar, Dimensions, SafeAreaView , StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import FilterComponent from '../../global/FilterComponent';
import BaocaoNguoidungFilter from './BaocaoNguoidungFilter';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../../../styles';
class BaocaonguoidungScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            toanboData: [],
        }
    }

    componentDidMount() {
        this.getdsBaocao(this.props.DvqlDataFilter);
    }

    getdsBaocao(datas) {
        if (datas && datas.length > 0) {
            let url;
            url = `${endPoint.getAllBaocaoNguoidung}?`;
            datas.forEach(e => {
                url += `phongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
            });
            url += `tuNgay=${encodeURIComponent(`${'2020-12-31'}`)}&`;
            url += `denNgay=${encodeURIComponent(`${'2021-05-11'}`)}&`;
            url += `isSearch=${encodeURIComponent(`${false}`)}`;

            createGetMethod(url)
                .then(res => {
                    if (res) {
                        this.setState({
                            toanboData: res.result,
                        });
                    } else {
                        // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                    }
                })
                .catch(err => console.log(err));
        }
    }
    render() {

        const data1 = [30, 17, 18, 4, 2, 59, 6, 1, 24, 8, 3, 7, 2, 0]
        const data2 = [0, 2, 0, 12, 0, 2, 0, 0, 0, 0, 4, 7, 9, 0, 8]
        const data3 = [-10, 20, 30, 40, 30, 23, 16, 62, 20, 23, 14, 27, 19, 34, 28]
        //Array of datasets, following this syntax:
        const contentInset = { top: 20, bottom: 20 }
        const data = [
            {
                data: data1,
                svg: { stroke: 'purple' },
            },
            {
                data: data2,
                svg: { stroke: 'green' },
            },
            {
                data: data3,
                svg: { stroke: 'red' },
            },

        ]

        return (
            <Animated.View>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>


                    <View style={{ height: 400, flexDirection: 'row' }}>
                        <YAxis
                            data={data1}
                            contentInset={contentInset}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={10}
                            formatLabel={(value) => `${value}`}
                        />
                        <XAxis
                            data={data2}
                            contentInset={contentInset}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={10}
                            formatLabel={(value) => `${value}`}
                        />
                        <LineChart
                            style={{ flex: 1, marginLeft: 16 }}
                            data={data}
                            svg={{ stroke: 'rgb(134, 65, 244)' }}
                            contentInset={contentInset}
                        >
                            <Grid />
                        </LineChart>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.listItem}>
                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#600080' size={35} />
                                <Text style={[{ fontWeight: "bold" }, styles.infoText]}>Đăng nhập</Text>
                            </View>
                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#FF0000' size={35} />
                                <Text style={styles.infoText}>Đăng xuất</Text>
                            </View>
                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#FFBF00' size={35} />
                                <Text style={styles.infoText}>Xem</Text>
                            </View>

                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#0000FF' size={35} />
                                <Text style={styles.infoText}>Tìm kiếm</Text>
                            </View>

                        </View>
                        <View style={styles.listItem, { marginLeft: 40 }}>

                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#9900cc' size={35} />
                                <Text style={styles.infoText}>Thêm mới</Text>
                            </View>

                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#8A2908' size={35} />
                                <Text style={styles.infoText}>Xóa</Text>
                            </View>

                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#29088A' size={35} />
                                <Text style={styles.infoText}>Sửa</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
                <FilterComponent filter={<BaocaoNguoidungFilter />} />
            </Animated.View>
        )
    }
    
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginTop: 40,
        flexDirection: 'row',
        alignContent:'center',
        alignSelf: 'center',
    },
    listItem: {
        width: '40%',
        flexDirection: 'column',
        alignContent: 'center',
        alignSelf: 'center'

    },
    infor: {
        marginLeft: 3,
        flexDirection: 'row',
        alignItems: 'center'

    },
    infoText: {
        paddingBottom: 3,
        fontWeight: "bold",
        fontSize: 14,
        fontFamily: fonts.primaryRegular,
    }
});
const mapStateToProps = state => ({
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
    tab: 'Quan ly canh bao'
});

export default connect(mapStateToProps)(BaocaonguoidungScreen);