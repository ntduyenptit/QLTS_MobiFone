import React from 'react'
import { YAxis, XAxis, Grid, BarChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { Animated, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as scale from 'd3-scale'
import FilterComponent from '../../global/FilterComponent';
import BaocaoCanhbaoFilter from './BaocaoCanhbaoFilter';
import DetailBaocaoCanhbao from './DetailBaocaoCanhbao';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import { fonts } from '../../../styles';

export default class BaocaoCanhbaoScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toanboData: [],
            totalData1: '',
            totalData2: '',
            totalData3: '',
            totalData4: '',
        }
    }

    componentDidMount() {
        this.getdsBaocao();
    }

    getdsBaocao(skipCount) {
        const datas = this.props.DvqlDataFilter
        if (datas && datas.length > 0) {
            let url;
            url = `${endPoint.getAllBaocaoCanhBao}?`;
            datas.forEach(e => {
                url += `phongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
            });
            url += `tuNgay=${encodeURIComponent(`${'2021-01-01'}`)}&`;
            url += `denNgay=${encodeURIComponent(`${'2021-05-11'}`)}&`;
            url += `isSearch=${encodeURIComponent(`${false}`)}`;

            // console.log('url: ', url);
            createGetMethod(url)
                .then(res => {
                    if (res) {
                        this.setState({
                            toanboData: res.result,
                        });
                        const arr = res.result;
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].isCheck) {
                                this.setState({
                                    totalData1: arr[i].taiSanRa,
                                    totalData2: arr[i].taiSanVao,
                                    totalData3: arr[i].batDauKiemKe,
                                    totalData4: arr[i].ketThucKiemKe,
                                });
                            }
                        }
                    } else {
                    }
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        const { toanboData, totalData1, totalData2, totalData3, totalData4 } = this.state;
        const dataY = [totalData1, totalData2, totalData3, totalData4];
        const data = [
            {
                value: totalData1,
                label: 'Tài sản ra',
                svg: { fill: '#600080' },
            },
            {
                value: totalData2,
                label: 'Tài sản vào',
                svg: {
                    fill: '#FF0000',
                },
            },
            {
                value: totalData3,
                label: 'Bắt đầu kiểm kê',
                svg: {
                    fill: '#FFBF00',
                },
            },
            {
                value: totalData4,
                label: 'Kết thúc kiểm kê',
                svg: {
                    fill: '#0000FF',
                },
            },

        ]
        const axesSvg = { fontSize: 10, fill: 'blue' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30
        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
              <Text
                key={index}
                x={x(index) + (bandwidth / 2)}
                y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                fontSize={14}
                fill={value >= CUT_OFF ? 'white' : 'black'}
                alignmentBaseline="middle"
                textAnchor="middle"
              >
                {value}
              </Text>
            ))
        )
        return (
          <Animated.View>
            <View style={{ height: 300, padding: 10, flexDirection: 'row' }}>
              <YAxis
                data={dataY}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
              />
              <View style={{ flex: 1, marginLeft: 5 }}>

                <BarChart
                  style={{ flex: 1 }}
                  data={dataY}
                  svg={{ fill: 'rgb(134, 65, 244)' }}
                  contentInset={{ top: 20, bottom: 20 }}
                >
                  <Grid />
                  <Labels />
                </BarChart>
                <XAxis
                  style={{ marginHorizontal: -10, height: xAxisHeight }}
                  data={data}
                  scale={scale.scaleBand}
                  formatLabel={(_, index) => data[index].label}
                  labelStyle={{ color: 'black' }}
                />
              </View>
            </View>
               
            <Animated.ScrollView>
              {DetailBaocaoCanhbao(toanboData)}
            </Animated.ScrollView>

            <FilterComponent action={this.getdsBaocao} />
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

    infoText: {
        paddingBottom: 3,
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 14,
        fontFamily: fonts.primaryRegular,
    }
});