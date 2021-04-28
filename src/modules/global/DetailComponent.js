import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

function DetailComponent()  {
       // const { item } = route.params.paramKey;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ alignItems: 'flex-start', marginHorizontal: 30 }}>
                        <Image  style={styles.productImg} source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
                        <Text style={styles.name}>{"Mã tài sản: 2403000060000000000002F5"}</Text>
                        <Text style={styles.price}>{"Tên tài sản: Bộ Micro hội thảo LHY-530 (2)"}</Text>
                        <Text style={styles.price}>{"Loại tài sản: CCDC QLHC"}</Text>
                        <Text style={styles.price}>{"Nhà cung cấp: Viettel"}</Text>
                        <Text style={styles.price}>{"Ngày mua: 	23/12/2020"}</Text>
                        <Text style={styles.price}>{"Nguyên giá: Bộ Micro hội thảo LHY-530 (2)"}</Text>
                        <Text style={styles.price}>
                                {"Đơn vị quản lý: MobiFone R&D - Kế toán"}
                        </Text>
                        <Text style={styles.price}>{"Trạng thái: Chưa sử dụng"}</Text>
                        <Text style={styles.price}>{"Mã sử dụng: RFID"}</Text>
                        <Text style={styles.price}>{"Vị trí tài sản: Tầng 8"}</Text>
                    </View>
                  
                    <View style={styles.separator}></View>
                    <View style={styles.addToCarContainer}>
                        <TouchableOpacity style={styles.shareButton} >
                            <Text style={styles.shareButtonText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    productImg: {
        width: 200,
        height: 200,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: 'bold'
    },
    price: {
        marginTop: 10,
        alignItems:'flex-start',
        fontSize: 18,
        color: "green",
        fontWeight: 'bold'
    },
    description: {
        textAlign: 'center',
        marginTop: 10,
        color: "#696969",
    },
    star: {
        width: 40,
        height: 40,
    },
    btnColor: {
        height: 30,
        width: 30,
        borderRadius: 30,
        marginHorizontal: 3
    },
    btnSize: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: '#778899',
        borderWidth: 1,
        marginHorizontal: 3,
        backgroundColor: 'white',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    starContainer: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20
    },
    contentColors: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20
    },
    contentSize: {
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20
    },
    separator: {
        height: 2,
        backgroundColor: "#eeeeee",
        marginTop: 20,
        marginHorizontal: 30
    },
    shareButton: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    shareButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    addToCarContainer: {
        marginHorizontal: 30
    }
});

export default DetailComponent;