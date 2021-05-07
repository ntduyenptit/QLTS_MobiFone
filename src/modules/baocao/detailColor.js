import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../../styles';

function detailColor() {
    return (
      <View style={styles.container}>
        <View style={styles.listItem,{ marginLeft: 15}}>
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#600080' size={35} />
            <Text style={[{ fontWeight: "bold" }, styles.infoText]}>TS chưa sử dụng</Text>
          </View>
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#FF0000' size={35} />
            <Text style={styles.infoText}>TS mất</Text>
          </View>
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#FFBF00' size={35} />
            <Text style={styles.infoText}>TS hủy</Text>
          </View>
                
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#0000FF' size={35} />
            <Text style={styles.infoText}>TS sửa chữa/bảo dưỡng</Text>
          </View>
               
        </View>
        <View style={styles.listItem,{ marginLeft: 10}}>
               
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#9900cc' size={35} />
            <Text style={styles.infoText}>TS đang sử dụng</Text>
          </View>
            
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#8A2908' size={35} />
            <Text style={styles.infoText}>TS thanh lý</Text>
          </View>
            
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#29088A' size={35} />
            <Text style={styles.infoText}>TS hỏng</Text>
          </View>
        </View>
      </View>

    )
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'row',
    },
    listItem: {
        width: '40%',
        flexDirection: 'column',
        alignContent: 'center',
        alignSelf: 'center'

    },
    infor: {
        marginLeft: 3,
        flexDirection: 'row',
        alignItems: 'center'

    },
    infoText: {
        paddingBottom: 3,
        fontWeight: "bold",
        fontSize: 14,
        fontFamily: fonts.primaryRegular,
    }
});
export default detailColor;