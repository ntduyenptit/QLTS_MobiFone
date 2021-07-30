import React from 'react'
import { tabs } from '@app/api/config';
import { View } from 'react-native';
import PieChartView from '@app/modules/dashboard/PieChartView';
import { getPercent } from '@app/modules/global/Helper';
import { connect } from 'react-redux';
import colorDetail from './detailColor';
import { GetToanBoTaiSanData } from '../global/GlobalApis';

class BaoCaoThongTinTS extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toanbotaisanTotal: 0,
      taisanthanhlyTotal: 0,
      taisanmatTotal: 0,
      taisanhongTotal: 0,
      taisanhuyTotal: 0,
      taisanchuasudungTotal: 0,
      taisandangsudungTotal: 0,
      taisansuachuabaoduongTotal: 0,
    }
  }

  componentDidMount() {
    Promise.all([
      this.getTaiSanData({ datas: this.props.donViQuanLy, tab: tabs.toan_bo_tai_san }).then(response => this.setState({ toanbotaisanTotal: response.result.totalCount })),
      this.getTaiSanData({ datas: this.props.donViQuanLy, tab: tabs.tai_san_chua_su_dung }).then(response => this.setState({ taisanchuasudungTotal: response.result.totalCount })),
      this.getTaiSanData({ datas: this.props.donViQuanLy, tab: tabs.tai_san_dang_su_dung }).then(response => this.setState({ taisandangsudungTotal: response.result.totalCount })),
      this.getTaiSanData({ datas: this.props.donViQuanLy, tab: tabs.tai_san_hong }).then(response => this.setState({ taisanhongTotal: response.result.totalCount })),
      this.getTaiSanData({ datas: this.props.donViQuanLy, tab: tabs.tai_san_huy }).then(response => this.setState({ taisanhuyTotal: response.result.totalCount })),
      this.getTaiSanData({ datas: this.props.donViQuanLy, tab: tabs.tai_san_mat }).then(response => this.setState({ taisanmatTotal: response.result.totalCount })),
      this.getTaiSanData({ datas: this.props.donViQuanLy, tab: tabs.tai_san_sua_chua_bao_duong }).then(response => this.setState({ taisansuachuabaoduongTotal: response.result.totalCount })),
      this.getTaiSanData({ datas: this.props.donViQuanLy, tab: tabs.tai_san_thanh_ly }).then(response => this.setState({ taisanthanhlyTotal: response.result.totalCount })),
    ]);
  }

  getTaiSanData = async (parameters) => {
    try {
      const response = await GetToanBoTaiSanData(parameters);
      return response
    }
    catch (error) {
      return null;
    }
  }

  render() {
    const { taisanthanhlyTotal, taisanmatTotal, taisanhuyTotal, taisanhongTotal, taisanchuasudungTotal, taisandangsudungTotal, taisansuachuabaoduongTotal, toanbotaisanTotal } = this.state;
    const data = [
      {
        key: 1,
        value: getPercent(taisanchuasudungTotal, toanbotaisanTotal) || 0,
        fill: '#600080',

      },
      {
        key: 2,
        value: getPercent(taisanmatTotal, toanbotaisanTotal) || 0,
        fill: '#9900cc'
      },
      {
        key: 3,
        value: getPercent(taisanhuyTotal, toanbotaisanTotal),
        fill: '#0000FF'
      },
      {
        key: 4,
        value: getPercent(taisandangsudungTotal, toanbotaisanTotal) || 0,
        fill: '#FF0000'
      },
      {
        key: 5,
        value: getPercent(taisanhongTotal, toanbotaisanTotal) || 0,
        fill: '#29088A'
      },
      {
        key: 6,
        value: getPercent(taisansuachuabaoduongTotal, toanbotaisanTotal) || 0,
        fill: '#8A2908'
      },
      {
        key: 7,
        value: getPercent(taisanthanhlyTotal, toanbotaisanTotal) || 0,

        fill: '#FFBF00'
      }
    ];


    return (
      <View style={{ backgroundColor: '#DADDE7', flex: 1 }}>
        <PieChartView
          chartStyle={{left: 40}}
          data={data}
          clickChartPart={() => {}}
        />
        <View style={{ marginTop: 5 }}>
          {colorDetail(toanbotaisanTotal, taisanchuasudungTotal, taisanmatTotal, taisanhuyTotal, taisansuachuabaoduongTotal, taisanthanhlyTotal, taisandangsudungTotal, taisanhongTotal)}
        </View>

      </View>

    )
  }

}

const mapStateToProps = state => ({
  donViQuanLy: state.filterDVQLDataReducer.dvqlDataFilter,
});

export default connect(mapStateToProps)(BaoCaoThongTinTS);