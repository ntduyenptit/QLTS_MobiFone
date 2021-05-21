import React from 'react'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import PieChartView from './PieChartView';
import LineChartView from './LineChartView';
import { getDVQLDataFilter } from '../global/FilterApis'
import { GetToanBoTaiSanData } from '../quanlytaisan/QuanLyTaiSan';
import { tabs } from '../../api/config';
import { getDVQLDataAction } from '../../redux/actions/filter.actions';
import { store } from '../../redux/store';
import { getToanTaisan } from '../giamsattaisan/theodoitaisan/GiamsatTs';
import { currentDate, getDateFromLastMonth, getPercent } from '../global/Helper';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0,
        };
    }

    componentDidMount() {
        this.getData().then(res => {
            store.dispatch(getDVQLDataAction(res.result));
            Promise.all([
                GetToanBoTaiSanData({ datas: res.result, tab: tabs.toan_bo_tai_san }),
                GetToanBoTaiSanData({ datas: res.result, tab: tabs.tai_san_chua_su_dung }),
                GetToanBoTaiSanData({ datas: res.result, tab: tabs.tai_san_dang_su_dung }),
                GetToanBoTaiSanData({ datas: res.result, tab: tabs.tai_san_hong }),
                GetToanBoTaiSanData({ datas: res.result, tab: tabs.tai_san_huy }),
                GetToanBoTaiSanData({ datas: res.result, tab: tabs.tai_san_mat }),
                GetToanBoTaiSanData({ datas: res.result, tab: tabs.tai_san_sua_chua_bao_duong }),
                GetToanBoTaiSanData({ datas: res.result, tab: tabs.tai_san_thanh_ly }),
                getToanTaisan({ datas: res.result, enddate: currentDate(), startdate: getDateFromLastMonth()})
            ]);
        });
    }

     getData = async () => {
         try {
            const response = await getDVQLDataFilter();
            return response
         }
         catch (error) {
             console.log(error);
         }
    }

    clickChartPart = (index) => {
        this.setState({
            key: index
        });
    }

    render() {
        const { key } = this.state;
        const { 
            toanbotaisanTotal, 
            taisanthanhlyTotal,
            taisanmatTotal,
            taisanhongTotal,
            taisanhuyTotal,
            taisanchuasudungTotal,
            taisandangsudungTotal,
            taisansuachuabaoduongTotal,
          } = this.props;
        const data = [
            {
                key: 1,
                value: getPercent(taisanchuasudungTotal,toanbotaisanTotal),
                fill: '#600080',

            },
            {
                key: 2,
                value: getPercent(taisanmatTotal,toanbotaisanTotal),
                fill: '#9900cc'
            },
            {
                key: 3,
                value: getPercent(taisanhuyTotal,toanbotaisanTotal),
                fill: '#0000FF'
            },
            {
                key: 4,
                value: getPercent(taisansuachuabaoduongTotal,toanbotaisanTotal),
                fill: '#FF0000'
            },
            {
                key: 5,
                value: getPercent(taisandangsudungTotal,toanbotaisanTotal),
                fill: '#29088A'
            },
            {
                key: 6,
                value: getPercent(taisanthanhlyTotal,toanbotaisanTotal),
                fill: '#8A2908'
            },
            {
                key: 7,
                value: getPercent(taisanhongTotal,toanbotaisanTotal),
                fill: '#FFBF00'
            },

        ]


        return (
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.chart_title, {flex: 1}]}>Thông tin tài sản</Text>
              <Text style={{alignItems: 'flex-end', paddingRight: 10}}>Toàn bộ tài sản: {toanbotaisanTotal}</Text>
            </View>
            <View style={styles.pieChart}>
              <PieChartView data={data} clickChartPart={this.clickChartPart} />
              <View style={styles.infor}>
                {key === 1 ? (
                  <View style={styles.item}>
                    <Text style={[styles.infoText, styles.selectedText, {color: '#600080'}]}>TS chưa sử dụng: {taisanchuasudungTotal}</Text>
                  </View>
                        ) : (
                          <View style={styles.item}>
                            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#600080' size={15} />
                            <Text style={styles.infoText}>TS chưa sử dụng</Text>
                          </View>
                        )}

                {key === 2 ? (
                  <View style={styles.item}>
                    <Text style={[styles.infoText, styles.selectedText, {color: '#9900cc'}]}>TS mất: {taisanmatTotal}</Text>
                  </View>
                        ) : (
                          <View style={styles.item}>
                            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#9900cc' size={15} />
                            <Text style={styles.infoText}>TS mất</Text>
                          </View>
                        )}
                {key === 3 ? (
                  <View style={styles.item}>
                    <Text style={[styles.infoText, styles.selectedText, {color: '#0000FF'}]}>TS hủy: {taisanhuyTotal}</Text>
                  </View>
                        ) : (
                          <View style={styles.item}>
                            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#0000FF' size={15} />
                            <Text style={styles.infoText}>TS hủy</Text>
                          </View>
                        )}
                {key === 4 ? (
                  <View style={styles.item}>
                    <Text style={[styles.infoText, styles.selectedText, {color: '#FF0000'}]}>TS sửa chữa/bảo dưỡng: {taisansuachuabaoduongTotal}</Text>
                  </View>
                        ) : (
                          <View style={styles.item}>
                            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#FF0000' size={15} />
                            <Text style={styles.infoText}>TS sửa chữa/bảo dưỡng</Text>
                          </View>
                        )}
                {key === 5 ? (
                  <View style={styles.item}>
                    <Text style={[styles.infoText, styles.selectedText, {color: '#29088A'}]}>TS đang sử dụng: {taisandangsudungTotal}</Text>
                  </View>
                        ) : (
                          <View style={styles.item}>
                            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#29088A' size={15} />
                            <Text style={styles.infoText}>TS đang sử dụng</Text>
                          </View>
                        )}
                {key === 6 ? (
                  <View style={styles.item}>
                    <Text style={[styles.infoText, styles.selectedText, {color: '#8A2908'}]}>TS thanh lý: {taisanthanhlyTotal}</Text>
                  </View>
                        ) : (
                          <View style={styles.item}>
                            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#8A2908' size={15} />
                            <Text style={styles.infoText}>TS thanh lý</Text>
                          </View>
                        )}
                {key === 7 ? (
                  <View style={styles.item}>
                    <Text style={[styles.infoText, styles.selectedText, {color: '#FFBF00'}]}>TS hỏng: {taisanhongTotal}</Text>
                  </View>
                        ) : (
                          <View style={styles.item}>
                            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#FFBF00' size={15} />
                            <Text style={styles.infoText}>TS hỏng</Text>
                          </View>
                        )}
              </View>
            </View>
            <Text style={styles.chart_title}>Lịch sử ra vào của tài sản gần nhất</Text>
            <LineChartView />
          </View>
        );
    }
}

const mapStateToProps = state => ({
    toanbotaisanTotal: state.toanbotaisanReducer.toanbotaisanTotal,
    taisanthanhlyTotal: state.taisanthanhlyReducer.taisanthanhlyTotal,
    taisanmatTotal: state.taisanmatReducer.taisanmatTotal,
    taisanhongTotal: state.taisanhongReducer.taisanhongTotal,
    taisanhuyTotal: state.taisanhuyReducer.taisanhuyTotal,
    taisanchuasudungTotal: state.taisanchuasudungReducer.taisanchuasudungTotal,
    taisandangsudungTotal: state.taisandangsudungReducer.taisandangsudungTotal,
    taisansuachuabaoduongTotal: state.taisansuachuabaoduongReducer.taisansuachuabaoduongTotal,
  });
  
  export default connect(mapStateToProps)(DashBoard);

const styles = {
    container: {
        marginTop: 21,
        flex: 1
    },
    chart_title: {
        paddingLeft: 20,
        fontSize: 15,
        color: '#585858',
        fontWeight: 'bold',
    },
    pieChart: {
        flexDirection: 'row',
        left: -25
    },
    infor: {
        top: 60,
        alignItems: "flex-start",
        flex: 3,
        paddingRight: 5,
        left: -20
    },
    item: {
        marginLeft: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 7,
    },
    infoText: {
        fontSize: 12
    },
    selectedText: {
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
}