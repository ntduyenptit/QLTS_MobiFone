import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Dimensions,
} from 'react-native';
import { convertTimeFormatToLocaleDate } from '../../global/Helper';

const deviceWidth = Dimensions.get("window").width;

const renderItemComponent = (data) => {
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
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'flex-start', marginHorizontal: 30, flex: 1 }}>
          <Text style={styles.title}>Thông tin chi tiết:</Text>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <FlatList
              data={paramKey}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{height:300}}
              renderItem={item => renderItemComponent(item)}
            />
          </View>
        </View>
      </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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