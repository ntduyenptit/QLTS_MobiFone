import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import {    View } from 'react-native';
import colorDetail from './detailColor';

class BaoCaoThongTinTS extends React.PureComponent {

    render() {

        const data = [
            {
                key: 1,
                value: 50,
                svg: { fill: '#600080' },

            },
            {
                key: 2,
                value: 50,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                value: 40,
                svg: { fill: '#0000FF' }
            },
            {
                key: 4,
                value: 95,
                svg: { fill: '#FF0000' }
            },
            {
                key: 5,
                value: 35,
                svg: { fill: '#29088A' }
            },
            {
                key: 6,
                value: 95,
                svg: { fill: '#8A2908' }
            },
            {
                key: 7,
                value: 35,

                svg: { fill: '#FFBF00' }
            }

        ]
        const Labels = ({ slices, height, width }) => slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                  <Text
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill="white"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize={18}
                    stroke="black"
                    strokeWidth={0.2}
                  >
                    {`${data.value  }%`}
                  </Text>
                )
            })


        return (

          <View style={{backgroundColor: '#DADDE7',flex:1}}>
            <PieChart
              style={{ height: 400 }}
              outerRadius="80%"
              innerRadius={10}
              data={data}
            >
              <Labels />

            </PieChart>
            <View style={{marginTop: 50}}>
              {colorDetail()}
            </View>
              
          </View>
          
        )
    }

}


export default BaoCaoThongTinTS