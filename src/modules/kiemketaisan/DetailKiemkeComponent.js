import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

const bullet = (title, text) => (
  <View style={styles.row}>
    <View style={styles.bullet}>
      <Text>{'\u2022' + " "}</Text>
    </View>
    <View style={styles.bulletText}>
      <Text>
        <Text style={styles.boldText}>{`${title}: `}</Text>
        <Text style={styles.normalText}>{text}</Text>
      </Text>
    </View>
  </View>
);
function trangThaiKiemke(id) {
    switch (id) {
        case 0:
            return "Chưa bắt đầu";
        case 1:
            return "Đang kiểm kê";
        case 2:
            return "Đã kết thúc"

    }
}

function DetailKiemkeComponent({ route, navigation }) {
    const { paramKey } = route.params;
    console.log(paramKey);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'flex-start', marginHorizontal: 20}}>
            <Text style={styles.title}>Thông tin đợt kiểm kê:</Text>
            {bullet('Mã kiểm kê',paramKey.kiemKeTaiSan.maKiemKe)}
            {bullet('Tên đợt kiểm kê',paramKey.kiemKeTaiSan.tenKiemKe)}
            {bullet('Thời gian bắt đầu dự kiến:',paramKey.kiemKeTaiSan.thoiGianBatDauDuKien)}
            {bullet('Thời gian bắt đầu thực tế',paramKey.kiemKeTaiSan.thoiGianBatDauThucTe)}

            {bullet('Thời gian kết thúc dự kiến:',paramKey.kiemKeTaiSan.thoiGianKetThucDuKien)}
            {bullet('Thời gian kết thúc thực tế',paramKey.kiemKeTaiSan.thoiGianKetThucThucTe)}
            {bullet('Bộ phận được kiêm kê',paramKey.phongBan)}
            {bullet('Trạng thái',paramKey.kiemKeTaiSan.trangThaiId)}
          </View>
          <Text  style={styles.title}>Danh sách người kiểm kê</Text>
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
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1
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
        flex: 1,
        paddingBottom: 5
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    normalText: {
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

export default DetailKiemkeComponent;