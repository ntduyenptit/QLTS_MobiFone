import React from 'react'
import { View, ScrollView, Text } from 'react-native';
import { PieChart } from 'react-minimal-pie-chart';

export default class DashBoard extends React.PureComponent {

    render() {
        return (
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.chart_title}>Thông tin toàn bộ tài sản</Text>
              <PieChart
                data={[
                            { title: 'One', value: 10, color: '#E38627' },
                            { title: 'Two', value: 15, color: '#C13C37' },
                            { title: 'Three', value: 20, color: '#6A2135' },
                        ]}
              />;
            </View>
          </ScrollView>
        );
    }
}

const styles = {
    container: {
        backgroundColor: 'whitesmoke',
        marginTop: 21,
    },
    chart_title: {
        paddingTop: 15,
        textAlign: 'center',
        paddingBottom: 5,
        paddingLeft: 5,
        fontSize: 18,
        backgroundColor: 'white',
        color: 'grey',
        fontWeight: 'bold',
    }
}