import React from 'react';
import { LineChart, Grid, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View } from 'react-native';
import { Circle, G, Line, Rect, Text } from 'react-native-svg'
import PropTypes from 'prop-types';
import { deviceWidth } from '../global/LoaderComponent';
import { currentDate, getDateFromLastMonth, getDates } from '../global/Helper';

export default class LineChartView extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
    }

    constructor(props) {
        super(props);
        this.state = {
          key: 0,
        };
      }

      render() {
        const { key }= this.state;
        const { data }= this.props;
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const xAxisHeight = 30
        const dataLines = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const dataX = getDates(new Date().setMonth(new Date().getMonth()-1) ,new Date(), 5);

        /**
         * Both below functions should preferably be their own React Components
         */

         console.log('data_line_chart: ', data);
         const Decorator = ({ x, y, data }) => dataLines.map((value, index) => (
           <Circle
             key={index}
             onPress={() => this.setState({
                 key: index
             })}
             cx={x(index)}
             cy={y(value)}
             r={4}
             stroke="rgb(134, 65, 244)"
             fill="white"
           />
            ))

        const HorizontalLine = (({ y }) => (
          <Line
            key="zero-axis"
            x1="0%"
            x2="100%"
            y1={y(50)}
            y2={y(50)}
            stroke="grey"
            strokeDasharray={[ 4, 8 ]}
            strokeWidth={2}
          />
        ))

        const Tooltip = ({ x, y }) => (
          <G
            x={x(key) - (75 / 2)}
            key="tooltip"
          >
            <G y={y(key) - 30}>
              <Rect
                height={40}
                width={75}
                stroke="grey"
                fill="white"
                ry={10}
                rx={10}
              />
              <Text
                x={75 / 2}
                dy={20}
                alignmentBaseline="middle"
                textAnchor="middle"
                stroke="rgb(134, 65, 244)"
              >
                { `${dataLines[key]} ts` }
              </Text>
            </G>
            <G x={75 / 2}>
              <Line
                y1={50 + 40}
                y2={y(dataLines[ key ])}
                stroke="grey"
                strokeWidth={2}
              />
              <Circle
                cy={y(dataLines[ key ])}
                r={6}
                stroke="rgb(134, 65, 244)"
                strokeWidth={2}
                fill="white"
              />
            </G>
          </G>
        )

        return(
          <View style={{ height: 300, width: deviceWidth, padding: 20 }}>
            <LineChart
              style={{ height: 250 }}
              data={dataLines}
              svg={{
                stroke: 'rgb(134, 65, 244)',
                strokeWidth: 2,
            }}
              contentInset={{ top: 20, bottom: 20, left: 20, right: 20 }}
              curve={shape.curveLinear}
            >
              <Grid />
              <HorizontalLine />
              <Decorator />
              <Tooltip />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10, height: xAxisHeight }}
              data={dataX}
              formatLabel={(value, index) => dataX[index]}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
            />
          </View>
        );
      }

}