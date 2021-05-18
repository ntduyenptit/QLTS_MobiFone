import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../../styles';

function detailColor(data1,data2,data3,data4,data5,data6,data7,data8) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.listItem, { marginLeft: 15 }}>
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#600080' size={25} />
            <Text style={[{ fontWeight: "bold" }, styles.infoText]}>TS chưa sử dụng</Text>
          </View>
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#9900cc' size={25} />
            <Text style={styles.infoText}>TS mất</Text>
          </View>
          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#0000FF' size={25} />
            <Text style={styles.infoText}>TS hủy</Text>
          </View>

          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#8A2908' size={25} />
            <Text style={styles.infoText}>TS sửa chữa/bảo dưỡng</Text>
          </View>

        </View>
        <View style={styles.listItem, { marginLeft: 10 }}>

          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#FF0000' size={25} />
            <Text style={styles.infoText}>TS đang sử dụng</Text>
          </View>

          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#FFBF00' size={25} />
            <Text style={styles.infoText}>TS thanh lý</Text>
          </View>

          <View style={styles.infor}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#29088A' size={25} />
            <Text style={styles.infoText}>TS hỏng</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          width: "85%",
          alignSelf: 'center',
        }}
      />
      <Text style={styles.title}>Chi tiết tài sản</Text>
      <View style={styles.listItem, { marginLeft: 25, marginTop: 5 }}>
        <Text style={[styles.detailText],{fontWeight: "bold"}}>Tổng tài sản: {data1} </Text>
        <Text style={[styles.detailText]}>Tài sản chưa sử dụng: {data2} </Text>
        <Text style={styles.detailText}>Tài sản mất: {data3}</Text>
        <Text style={styles.detailText}>Tài sản hủy: {data4}</Text>
        <Text style={styles.detailText}>Tài sản sửa chữa/bảo dưỡng: {data5}</Text>
        <Text style={styles.detailText}>Tài thanh lý: {data6}</Text>
        <Text style={styles.detailText}>Tài đang sử dụng: {data7}</Text>
        <Text style={styles.detailText}>Tài sản hỏng: {data8}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
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
    paddingBottom: 0,
    fontWeight: "bold",
    fontSize: 13,
    paddingBottom: 3,
    fontFamily: fonts.primaryRegular,
  },
  detailText: {
    fontSize: 15,
    paddingBottom: 3,
    fontFamily: fonts.primaryRegular,
  },
  title: {
    paddingBottom: 10,
    alignSelf: 'center',
    fontSize: 18,
    fontStyle: 'italic'
  },
});
export default detailColor;