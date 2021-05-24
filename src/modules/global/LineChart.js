import React from 'react';
import PropTypes from 'prop-types';
import * as shape from 'd3-shape'
import { LineChart, Grid } from 'react-native-svg-charts';
import { Circle, G, Line, Rect, Text } from 'react-native-svg'

export default class LineChartGlobal extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
    }

    constructor(props) {
        super(props);
        this.state = {
          inKey: -1,
          outKey: -1,
          type: '',
        };
      }

      render() {
        const { inKey, outKey, type }= this.state;
        const { data }= this.props;

        const InDecorator = ({ x, y }) => data[0].data.map((value, index) => (
          <Circle
            key={index}
            onPress={() => this.setState({
                type: 'Vào',
                inKey: index
              })}
            cx={x(index)}
            cy={y(value)}
            r={4}
            stroke="rgb(134, 65, 244)"
            fill="white"
          />
             ));

             const OutDecorator = ({ x, y }) => data[1].data.map((value, index) => (
               <Circle
                 key={index}
                 onPress={() => this.setState({
                    type: 'Ra',
                    outKey: index
                    })}
                 cx={x(index)}
                 cy={y(value)}
                 r={4}
                 stroke="#FF6347"
                 fill="white"
               />
                   ))
 
 
         const InTooltip = ({ x, y }) => (
           <G
             x={x(inKey) - (75 / 2)}
             key="tooltip"
           >
             <G y={y(data[0].data[inKey]) - 40}>
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
                 { `TS Vào: ${data[0].data[inKey]} ts` }
               </Text>
             </G>
             <G x={75 / 2}>
               <Circle
                 cy={y(data[0].data[inKey])}
                 r={6}
                 stroke="rgb(134, 65, 244)"
                 strokeWidth={2}
                 fill="white"
               />
             </G>
           </G>
         )

         const OutTooltip = ({ x, y }) => (
           <G
             x={x(outKey) - (75 / 2)}
             key="tooltip"
           >
             <G y={y(data[1].data[outKey]) - 40}>
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
                 { `TS Ra: ${data[1].data[outKey]}` }
               </Text>
             </G>
             <G x={75 / 2}>
               <Circle
                 cy={y(data[1].data[outKey])}
                 r={6}
                 stroke="#FF6347"
                 strokeWidth={2}
                 fill="white"
               />
             </G>
           </G>
          )

         return(
           <LineChart
             style={{ height: 250 }}
             data={data}
             contentInset={{ top: 40, bottom: 20, left: 20, right: 20 }}
             curve={shape.curveLinear}
           >
             <Grid />
             <InDecorator />
             <OutDecorator />
             {type === 'Ra' && outKey !== -1 && <OutTooltip />}
             {type === 'Vào' && inKey !== -1 &&  <InTooltip />}
           </LineChart>
         );

      }
}