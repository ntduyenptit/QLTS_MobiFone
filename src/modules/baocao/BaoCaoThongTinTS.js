import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { View } from 'react-native';
import PieChartView from '@app/modules/dashboard/PieChartView';
import { getPercent } from '@app/modules/global/Helper';
import { connect } from 'react-redux';
import colorDetail from './detailColor';

class BaoCaoThongTinTS extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taisanthanhlyTotal: 0,
      taisanmatTotal: 0,
      taisanhongTotal: 0,
      taisanhuyTotal: 0,
      taisanchuasudungTotal: 0,
      taisandangsudungTotal: 0,
      taisansuachuabaoduongTotal: 0,
    }
  }

  setData() {
    const total = this.props.toanbotaisanTotal;
    const tsdangsd =  getPercent(this.props.taisandangsudungTotal, total);
    const tschuasd = getPercent(this.props.taisanchuasudungTotal, total);
    const tsmat = getPercent(this.props.taisanmatTotal, total);
    const tshong = getPercent(this.props.taisanhongTotal, total);
    const tssuachua = getPercent(this.props.taisansuachuabaoduongTotal, total);
    const tsthanhly = getPercent(this.props.taisanthanhlyTotal, total);
    const tshuy = getPercent(this.props.taisanhuyTotal, total);
    this.setState({
      toanbotaisanTotal: this.props.toanbotaisanTotal,
      taisanthanhlyTotal: tsthanhly,
      taisanmatTotal: tsmat,
      taisanhongTotal: tshong,
      taisanhuyTotal: tshuy,
      taisanchuasudungTotal: tschuasd,
      taisandangsudungTotal: tsdangsd,
      taisansuachuabaoduongTotal: tssuachua,
    })
  }

  componentDidMount() {
    this.setData();
  }

  render() {
    const { taisanthanhlyTotal, taisanmatTotal, taisanhuyTotal, taisanhongTotal, taisanchuasudungTotal, taisandangsudungTotal, taisansuachuabaoduongTotal } = this.state;
    const data = [
      {
        key: 1,
        value: taisanchuasudungTotal || 0,
        fill: '#600080',

      },
      {
        key: 2,
        value: taisanmatTotal || 0,
        fill: '#9900cc'
      },
      {
        key: 3,
        value: taisanhuyTotal,
        fill: '#0000FF'
      },
      {
        key: 4,
        value: taisandangsudungTotal || 0,
        fill: '#FF0000'
      },
      {
        key: 5,
        value: taisanhongTotal || 0,
        fill: '#29088A'
      },
      {
        key: 6,
        value: taisansuachuabaoduongTotal || 0,
        fill: '#8A2908'
      },
      {
        key: 7,
        value: taisanthanhlyTotal || 0,

        fill: '#FFBF00'
      }

    ];
    const Labels = ({ slices, height, width }) => slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      if (data.value > 0)
        return (
          <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={15}
            stroke="black"
            strokeWidth={0.2}
          >
            {`${data.value}%`}
          </Text>
        )
    })


    return (
      <View style={{ backgroundColor: '#DADDE7', flex: 1 }}>
        <PieChartView
          chartStyle={{left: 40}}
          data={data}
          clickChartPart={() => {}}
        />
        <View style={{ marginTop: 5 }}>
          {colorDetail(this.props.toanbotaisanTotal,this.props.taisanchuasudungTotal,this.props.taisanmatTotal,this.props.taisanhuyTotal,this.props.taisansuachuabaoduongTotal,this.props.taisanthanhlyTotal,this.props.taisandangsudungTotal,this.props.taisanhongTotal)}
        </View>

      </View>

    )
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

export default connect(mapStateToProps)(BaoCaoThongTinTS);