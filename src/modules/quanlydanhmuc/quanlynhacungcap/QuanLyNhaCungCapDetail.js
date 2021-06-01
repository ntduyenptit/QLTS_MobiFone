import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity, FlatList, ScrollView, Alert,
} from 'react-native';
import { createGetMethod, deleteMethod } from '../../../api/Apis';
import { endPoint } from '../../../api/config';
const deviceWidth = Dimensions.get("window").width;
var idNhacungcap;

const bullet = (title, text) => (
    <View style={styles.row}>
        <View style={styles.bullet}>
            <Text>{'\u2022' + " "}</Text>
        </View>
        <View style={styles.bulletText}>
            <Text styles={styles.text}>
                <Text style={styles.boldText}>{`${title}: `}</Text>
            </Text>
        </View>
        <View style={styles.bulletTextNormal}>
            <Text styles={styles.text}>
                <Text style={styles.normalText}>{text}</Text>
            </Text>
        </View>
    </View>
);

class NhaCungcapDetail extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            chitietData: [],
        }
        this.param = {
            param: props.route.params,
        }
    }

    componentDidMount() {
        this.getchitietNCC();
    }

    getchitietNCC() {
        let url;
        url = `${endPoint.getViewNhacungcap}?`;
        url += `Id=${encodeURIComponent(`${idNhacungcap}`)}&`;
        url += `isView=${encodeURIComponent(`${true}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        chitietData: res.result,
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));
    }

    delete(id) {
        console.log("id: " + id);
        Alert.alert('Bạn có chắc chắn muốn xóa không?',
            '',
            [
                {
                    text: 'OK', onPress: () => {
                        let url = `${endPoint.deleteNhaCC}?`;
                        url += `Id=${id}`;

                        deleteMethod(url).then(res => {
                            if (res.success) {
                                Alert.alert('Xóa nhà cung cấp thành công',
                                    '',
                                    [
                                        { text: 'OK', onPress: this.goBack() },
                                    ],
                                    { cancelable: false }
                                );
                            }
                        });
                    }
                },
                { text: 'Hủy' },
            ],
            { cancelable: true }
        );
    }
    
    goBack() {
        const { navigation, route } = this.props;
        route.params.onGoBack();
        navigation.goBack();
    }
    render() {
        const { chitietData } = this.state;
        const { paramKey, tabKey, idNCC } = this.props.route.params;
        idNhacungcap = idNCC;
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'flex-start', backgroundColor: 'white', width: deviceWidth, height: 'auto', padding: 10 }}>
                    <Text style={styles.title}>Thông tin nhà cung cấp:</Text>
                    {bullet('Mã nhà cung cấp', chitietData.maNhaCungCap)}
                    {bullet('Tên nhà cung cấp', chitietData.tenNhaCungCap)}
                    {bullet('Lĩnh vực kinh doanh', paramKey.tenLinhVuc)}
                    {bullet('Mã số thuế', chitietData.maSoThue)}
                    {bullet('Địa chỉ', chitietData.diaChi)}
                    {bullet('Số điện thoại', chitietData.soDienThoai)}
                    {bullet('Email', chitietData.email)}
                    {bullet('Ghi chú', chitietData.ghiChu)}
                    {bullet('Tài liệu đính kèm', chitietData.listFile)}
                </View>
                <View style={styles.separator} />
                <View style={styles.addToCarContainer}>
                    <TouchableOpacity
                        onPress={() => this.delete(idNhacungcap)}
                        style={styles.shareButton}>
                        <Text style={styles.shareButtonText}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
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
        paddingTop: 15,
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic'
    },
    bullet: {
        width: 15
    },
    bulletText: {
        flex: 1,
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

    separator: {
        height: 2,
        backgroundColor: "#eeeeee",
        marginTop: 20,
        marginHorizontal: 30
    },
    shareButton: {
        marginTop: 10,
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
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
        paddingBottom: 30,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 5,
    }
});


export default NhaCungcapDetail;