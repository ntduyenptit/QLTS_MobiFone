import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
} from 'react-native';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import { convertTextToLowerCase, convertTimeFormatToLocaleDate } from '../../global/Helper';

renderItemComponent = (data) => {
    if (!data.item.isCheck) return (
        <View>
            <View style={styles.listItem}>
                <Text> {data.item.ngayKhaiBao && convertTimeFormatToLocaleDate(data.item.ngayKhaiBao)}</Text>
                <View style={styles.infor}>
                    <Text numberOfLines={1} style={[{ paddingBottom: 3 }]}>Tài sản ra: {data.item.taiSanRa}</Text>
                    <Text numberOfLines={1} style={{ paddingBottom: 3 }}>Tài sản vào: {data.item.taiSanVao}</Text>
                    <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Bắt đầu kiểm kê: {data.item.batDauKiemKe}</Text>
                    <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Kết thúc kiểm kê: {data.item.ketThucKiemKe}</Text>
                </View>
            </View>
            <View
                style={styles.separator}
            />
        </View>

    )
    return (
        <View>
            <View style={styles.total}>
                <Text numberOfLines={1} style={styles.row}>Tài sản ra: {data.item.taiSanRa}</Text>
                <Text numberOfLines={1} style={styles.row}>Tài sản vào: {data.item.taiSanVao}</Text>
                <Text numberOfLines={1} style={styles.row}>Bắt đầu kiểm kê: {data.item.batDauKiemKe}</Text>
                <Text numberOfLines={1} style={styles.row}>Kết thúc kiểm kê: {data.item.ketThucKiemKe}</Text>
            </View>
        </View>

    )

}
function BaocaoCanhbaoDetailComponent(paramKey) {
    var heightView = 100 * paramKey.length * 2;
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'flex-start', marginHorizontal: 30 }}>
                    <Text style={styles.title}>Thông tin chi tiết:</Text>
                    <View style={{ height: heightView, backgroundColor: "white" }}>
                        <FlatList
                            scrollEnabled={false}
                            data={paramKey}
                            renderItem={item => this.renderItemComponent(item)}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    row: {
        paddingBottom: 5,
        alignSelf: 'center',
        alignItems: 'flex-start',
        fontSize: 15,
        fontStyle: 'italic',
        fontWeight: "bold"
    },

    total: {
        marginTop: 20,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: 'flex-start',
        height: 100,
        width: "85%",
    },

    infor: {
        marginLeft: 25,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        height: 50,
        width: "85%",

    },
    listItem: {
        padding: 15,
        flex: 1,
        width: deviceWidth - 50,
        backgroundColor: "#FFF",
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 15,
        height: 100,
    },
    title: {
        paddingBottom: 10,
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic',
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: "85%",
        alignSelf: 'center',
        
        paddingTop: 10,
    },
});

export default BaocaoCanhbaoDetailComponent;