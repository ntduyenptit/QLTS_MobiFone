import React from 'react'
import { YAxis, XAxis, Grid, BarChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { Animated, View } from 'react-native';
import { connect } from 'react-redux';
import * as scale from 'd3-scale'
import FilterComponent from '../../global/FilterComponent';
import DetailBaocaoCanhbao from './DetailBaocaoCanhbao';
import { createGetMethod } from '../../../api/Apis';
import { endPoint } from '../../../api/config';
import getParameters from './filter/GetParameters';

let isSearch = false;
class BaocaoCanhbaoScreen extends React.PureComponent {
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

    componentDidUpdate(prevProps) {
      if (prevProps.isShowFilter !== this.props.isShowFilter) {
        isSearch = true;
        this.getdsBaocao();
      } else {
        isSearch = false;
      }
    }

    getdsBaocao() {
        const { datas, startdate, enddate } = getParameters();
        if (datas && datas.length > 0) {
            let url;
            url = `${endPoint.getAllBaocaoCanhBao}?`;
            datas.forEach(e => {
                url += `phongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
            });
            if (startdate) {
                url += `tuNgay=${encodeURIComponent(`${startdate.dateString}`)}&`;
            } 
            if (enddate) {
                url += `denNgay=${encodeURIComponent(`${enddate.dateString}`)}&`;
            }
            url += `isSearch=${encodeURIComponent(`${isSearch}`)}`;
            createGetMethod(url)
                .then(res => {
                    if (res.success) {
                        this.setState({
                            toanboData: res.result,
                        });
                        res.result.forEach(e => {
                          if (e.isCheck) {
                            this.setState({
                                totalData1: e.taiSanRa,
                                totalData2: e.taiSanVao,
                                totalData3: e.batDauKiemKe,
                                totalData4: e.ketThucKiemKe,
                            });
                        }
                        });
                    }
                })
                .catch();
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
                label: 'Bắt đầu kk',
                svg: {
                    fill: '#FFBF00',
                },
            },
            {
                value: totalData4,
                label: 'Kết thúc kk',
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

            <FilterComponent />
          </Animated.View>
        )
    }

}

const mapStateToProps = state => ({
  isShowFilter: state.filterReducer.isShowFilter,
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  });

  export default connect(mapStateToProps)(BaocaoCanhbaoScreen);