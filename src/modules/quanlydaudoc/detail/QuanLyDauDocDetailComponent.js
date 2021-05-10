import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { deviceWidth } from '../../global/LoaderComponent';
import { convertTextToLowerCase, convertTimeFormatToLocaleDate } from '../../global/Helper';

const bullet = (title, text) => (
  <View style={styles.row}>
    <View style={styles.bullet}>
      <Text>{'\u2022' + " "}</Text>
    </View>
    <View style={styles.bulletText}>
      <Text styles={styles.text}>
        <Text style={styles.boldText}>{`${title}: `}</Text>
        {/* <Text style={styles.normalText}>{text}</Text> */}
      </Text>
    </View>
    <View style={styles.bulletTextNormal}>
      <Text styles={styles.text}>
        {/* <Text style={styles.boldText}>{`${title}: `}</Text> */}
        <Text style={styles.normalText}>{text}</Text>
      </Text>
    </View>
  </View>
);

function QuanLyDauDocDetailComponent({ route }) {
    const { paramKey, tabKey } = route.params;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'flex-start', marginHorizontal: 30 }}>
            <Image style={styles.productImg} source={require('../../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.title}>Thông tin {tabKey && convertTextToLowerCase(tabKey)}:</Text>
            {/* Tên đầu đọc */}
            {bullet('Tên đầu đọc',paramKey.tenTS ? paramKey.tenTS : paramKey.tenTaiSan)}
            {/* Loại tài sản */}
            {bullet('Loại tài sản',paramKey.loaiTS ? paramKey.loaiTS : paramKey.loaiTaiSan)}
            {/* Mã tài sản */}
            {bullet('Mã tài sản',paramKey.maEPC ? paramKey.maEPC : paramKey.epcCode)}
            {/* Phòng ban quản lý */}
            {bullet('Phòng ban quản lý',paramKey.phongBanQL ? paramKey.phongBanQL : paramKey.phongBanQuanLy)}
            {/* Vị trí tài sản */}
            {bullet('Vị trí tài sản',paramKey.viTriTS ? paramKey.viTriTS : paramKey.viTriTaiSan)}
            {/* Trạng thái */}
            {bullet('Trạng thái', paramKey.tinhTrangSuDung)}
            {/* Ngày mua */}
            {bullet('Ngày mua', paramKey.ngayMua && convertTimeFormatToLocaleDate(paramKey.ngayMua))}
            {/* Ngày tạo */}
            {bullet('Ngày tạo', paramKey.ngayTao && convertTimeFormatToLocaleDate(paramKey.ngayTao))}
          </View>

        </ScrollView>
        <View style={styles.separator} />
        <View style={styles.addToCarContainer}>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: deviceWidth - 30,
        paddingBottom: 5
    },
    title: {
        paddingBottom: 10, 
        fontSize: 18, 
        fontStyle: 'italic'
    },
    bullet: {
        width: 10
    },
    bulletText: {
        flex: 0.8,
        paddingRight: 5
    },
    bulletTextNormal: {
        flex: 2
    },
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
    },
    normalText: {
        flex: 1,
        alignItems: 'flex-end',
    },
    text: {
        fontSize: 15,
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
        backgroundColor: "red",
    },
    shareButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    addToCarContainer: {
        marginHorizontal: 30,
        paddingBottom: 30
    }
});

export default QuanLyDauDocDetailComponent;