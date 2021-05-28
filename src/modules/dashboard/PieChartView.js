/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Text } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts'
import PropTypes from 'prop-types';

export default class PieChartView extends React.PureComponent {
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
        const { key } = this.state;
        const pieData = this.props.data
        .filter((datas) => datas.value > 0.9)
        .map((e, index) => ({
            value: e.value,
            svg: {
                fill: e.fill,
                onPressIn: () => this.setState({ key: e.key }, () => {
                    this.props.clickChartPart(e.key);
                }),
            },
            arc: key === e.key ? { outerRadius: '115%', cornerRadius: 10,  } : null,
            key: `pie-${index}`,
        }));

        const Labels = ({ slices }) => slices.map((slice, index) => {
            const { pieCentroid, data } = slice;
            if (data.value > 0) {
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
            }
            return null;
          });

          return(
            <PieChart
              style={{ height: 300, width: 300 }}
              outerRadius="70%"
              valueAccessor={({ item }) => item.value}
              innerRadius={10}
              spacing={0}
              data={pieData}
            >
              <Labels />
            </PieChart>
          );
    }
}