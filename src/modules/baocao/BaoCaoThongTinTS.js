import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { View } from 'react-native';
import colorDetail from './detailColor';
import { connect } from 'react-redux';

class BaoCaoThongTinTS extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toanbotaisanTotal: '',
      taisanthanhlyTotal: '',
      taisanmatTotal: '',
      taisanhongTotal: '',
      taisanhuyTotal: '',
      taisanchuasudungTotal: '',
      taisandangsudungTotal: '',
      taisansuachuabaoduongTotal: '',
    }
  }

  setData() {
    let total = this.props.toanbotaisanTotal;
    let tsdangsd = (Math.round(this.props.taisandangsudungTotal * 100) / total).toFixed(2);
    let tschuasd = (Math.round(this.props.taisanchuasudungTotal * 100) / total).toFixed(2);
    let tsmat = (Math.round(this.props.taisanmatTotal * 100) / total).toFixed(2);
    let tshong = (Math.round(this.props.taisanhongTotal * 100) / total).toFixed(2);
    let tssuachua = (Math.round(this.props.taisansuachuabaoduongTotal * 100) / total).toFixed(2);
    let tsthanhly = (Math.round(this.props.taisanthanhlyTotal * 100) / total).toFixed(2);
    let tshuy = (Math.round(this.props.taisanhuyTotal * 100) / total).toFixed(2);
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
    const { toanbotaisanTotal, taisanthanhlyTotal, taisanmatTotal, taisanhuyTotal, taisanhongTotal, taisanchuasudungTotal, taisandangsudungTotal, taisansuachuabaoduongTotal } = this.state;
    const data = [
      {
        key: 1,
        value: taisanchuasudungTotal,
        svg: { fill: '#600080' },

      },
      {
        key: 2,
        value: taisanmatTotal,
        svg: { fill: '#9900cc' }
      },
      {
        key: 3,
        value: taisanhuyTotal,
        svg: { fill: '#0000FF' }
      },
      {
        key: 4,
        value: taisandangsudungTotal,
        svg: { fill: '#FF0000' }
      },
      {
        key: 5,
        value: taisanhongTotal,
        svg: { fill: '#29088A' }
      },
      {
        key: 6,
        value: taisansuachuabaoduongTotal,
        svg: { fill: '#8A2908' }
      },
      {
        key: 7,
        value: taisanthanhlyTotal,

        svg: { fill: '#FFBF00' }
      }

    ]
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
        <PieChart
          style={{ height: 300 }}
          outerRadius="80%"
          innerRadius={15}
          data={data}
        >
          <Labels />

        </PieChart>
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