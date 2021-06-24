/* eslint-disable import/no-cycle */
import React, {useState} from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, StyleSheet, View, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box'
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

class QuanlyMailServerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            toanboData: [],
        }
    }

    componentDidMount() {
        this.getMailServer();
    }

    getMailServer() {
        let url;
        url = `${endPoint.getMailServerEdit}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        toanboData: res.result,
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const {
            scrollYValue,
            toanboData,
        } = this.state;
        
        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                            margin: 10,
                            paddingBottom: 15,
                        }}
                contentContainerStyle={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            paddingBottom: 55,
                        }}
                onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                            { useNativeDriver: true },
                            () => { },          // Optional async listener
                        )}
                contentInsetAdjustmentBehavior="automatic"
              >
                <View style={styles.container}>
                  <Text style={styles.title}>Thông tin cấu hình Mail Server</Text>
                  <Text style={styles.boldText}>Host*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={toanboData.host}
                    style={styles.bordered}
                  />
                  <Text style={styles.boldText}>Port*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={toanboData.port}
                    style={styles.bordered}
                  />
                  <Text style={styles.boldText}>Email*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={toanboData.email}
                    style={styles.bordered}
                  />
                  <Text style={styles.boldText}>Password*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={toanboData.password}
                    style={styles.bordered}
                  />
                  <Text style={styles.boldText}>Chọn các trường hợp gửi email</Text>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={toanboData.capPhat}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Cấp phát</Text>
                    <CheckBox
                      value={toanboData.thuHoi}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Thu hồi</Text>
                    <CheckBox
                      value={toanboData.dieuChuyen}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Điều chuyển</Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={toanboData.baoMat}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Báo mất</Text>
                    <CheckBox
                      value={toanboData.baoHong}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Báo hỏng</Text>
                    <CheckBox
                      value={toanboData.thanhLy}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Thanh lý</Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={toanboData.suaChuaBaoDuong}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Sửa chữa/Bảo dưỡng</Text>
                    <CheckBox
                      value={toanboData.batDauKiemKe}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Bắt đầu kiểm kê</Text>
                              
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={toanboData.ketThucKiemKe}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Kết thúc kiểm kê</Text>
                                
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={toanboData.hoanThanhPhieuDuTruMuaSam}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Hoàn thành phiếu dự trù mua sắm</Text>
                                
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={toanboData.huyBoPhieuDuTruMuaSam}
                      onClick={() => {}}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Huỷ bỏ phiếu dự trù mua sắm</Text>
                                
                  </View>
                </View>

              </Animated.ScrollView>
            </SafeAreaView>

          </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: deviceWidth,
        paddingBottom: 5,
        paddingLeft: 10
    },
    title: {
        paddingBottom: 10,
        paddingTop: 10,
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic'
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
        padding: 5,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});

export default QuanlyMailServerScreen;