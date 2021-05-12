import React from 'react'
import { YAxis, XAxis, Path, Grid, BarChart } from 'react-native-svg-charts'
import { Animated, View, StatusBar, Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import FilterComponent from '../../global/FilterComponent';
import BaocaoCanhbaoFilter from './BaocaoCanhbaoFilter';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../../../styles';

class BaocaoCanhbaoScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toanboData: [],
            total: ''
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
                        console.log("Baocaonguoidung: " + res.result);
                        this.setState({
                            toanboData: res.result,
                            total: res.result.length,
                        });
                    } else {
                        // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                    }
                })
                .catch(err => console.log(err));
        }
    }
    createData(datas, total) {
        for (let i = 0; i < total; i++) {
            // console.log("Baocaonguoidung: " +datas.listKhaiBaoSuDung);
        }

    }

    render() {

        const data1 = [30, 17, 18, 4, 2, 59, 6, 1, 24, 8, 3, 7, 2, 0]
        const data2 = [0, 2, 0, 12, 0, 2, 0, 0, 0, 0, 4, 7, 9, 0, 8]
        const data3 = [-10, 20, 30, 40, 30, 23, 16, 62, 20, 23, 14, 27, 19, 34, 28]
        const data4 = [0, 20, 0, 4, 3, 2, 16, 6, 2, 3, 4, 7, 9, 3, 8]
        //Array of datasets, following this syntax:
        const contentInset = { top: 20, bottom: 20 }
        const { danhsachbaocao, total } = this.state;
        this.createData(danhsachbaocao, total);

        const data = [
            {
                value: 50,
                label: 'Tài sản ra',
                svg : {fill :'#600080'},
            },
            {
                value: 10,
                label: 'Tài sản vào',
                svg: {
                    fill: '#FF0000',
                },
            },
            {
                value: 40,
                label: 'Bắt đầu kiểm kê',
                svg: {
                    fill: '#FFBF00',
                },
            },
            {
                value: 95,
                label: 'Kết thúc kiểm kê',
                svg: {
                    fill: '#0000FF',
                },
            },

        ]

        return (
            <Animated.View>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', height: 400, paddingVertical: 10, marginLeft: 10 }}>
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
                        <BarChart
                            style={{ flex: 1, marginLeft: 8 }}
                            data={data}
                            horizontal={false}
                            yAccessor={({ item }) => item.value}
                            svg={{
                                fill: 'blue',
                            }}
                            contentInset={{ top: 10, bottom: 10 }}
                            spacingInner={0.2}
                            gridMin={0}
                        >
                            <Grid direction={Grid.Direction.VERTICAL} />
                        </BarChart>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.listItem}>
                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#600080' size={35} />
                                <Text style={[{ fontWeight: "bold" }, styles.infoText]}>Tài sản ra</Text>
                            </View>
                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#FF0000' size={35} />
                                <Text style={styles.infoText}>Tài sản vào</Text>
                            </View>
                        </View>
                        <View style={styles.listItem, { marginLeft: 40 }}>

                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#FFBF00' size={35} />
                                <Text style={styles.infoText}>Bắt đầu kiểm kê</Text>
                            </View>
                            <View style={styles.infor}>
                                <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="ellipsis-h" color='#0000FF' size={35} />
                                <Text style={styles.infoText}>Kết thúc kiểm kê</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
                <FilterComponent filter={<BaocaoCanhbaoFilter />} />
            </Animated.View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginTop: 60,
        flexDirection: 'row',
        alignContent: 'center',
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

export default connect(mapStateToProps)(BaocaoCanhbaoScreen);