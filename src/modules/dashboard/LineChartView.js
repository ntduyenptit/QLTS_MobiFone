/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { XAxis } from 'react-native-svg-charts'
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { deviceWidth } from '../global/LoaderComponent';
import LineChartGlobal from '../global/LineChart';
import { getDates } from '../global/Helper';

export default class LineChartView extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
    }

      render() {
        const { data }= this.props;
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const xAxisHeight = 30
        const outLineChartData = data.map(e => e.tsRaTotal);

        const inLineChartData = data.map(e => e.tsVaoTotal);

        const inTotal = inLineChartData.reduce((a, b) => a + b, 0);

        const outTotal = outLineChartData.reduce((a, b) => a + b, 0);

        const lineChartData = [
          {
            data: inLineChartData,
            svg: { stroke: '#0000CD' },
          },
          {
            data: outLineChartData,
            svg: { stroke: '#FF6347' },
          },
        ];




        const dataX = getDates(new Date().setMonth(new Date().getMonth()-1) ,new Date(), 5);

        /**
         * Both below functions should preferably be their own React Components
         */

        //  console.log('data_line_chart: ', data);
        

        return(
          <View style={{width: deviceWidth, padding: 20 }}>
            <LineChartGlobal 
              data={lineChartData}
            />
            <XAxis
              style={{ marginHorizontal: -10, height: xAxisHeight }}
              data={dataX}
              formatLabel={(value, index) => dataX[index]}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
            />
            <View style={{flexDirection: 'row'}}>
              <View style={styles.total}>
                <Text style={styles.text}>Tổng số tài sản vào</Text>
                <Text style={[styles.textTotal, {color: 'blue'}]}>
                  {inTotal}
                </Text>
              </View>
              <View style={styles.verticleLine} />
              <View style={styles.total}>
                <Text style={styles.text}>Tổng số tài sản ra</Text>
                <Text style={[styles.textTotal, {color: 'red'}]}>
                  {outTotal}
                </Text>
              </View>
            </View>
          </View>
        );
      }
}

const styles = {
  text: {
    fontSize: 15,
    color: '#383838'
  },
  total: {
    alignItems: 'center',
    flex: 1
  },
  textTotal: {
    fontSize: 50,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  }
}