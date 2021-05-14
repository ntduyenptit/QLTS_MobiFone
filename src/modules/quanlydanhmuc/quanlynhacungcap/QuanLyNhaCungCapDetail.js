import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity, FlatList, ScrollView,
} from 'react-native';
import { createGetMethod } from '../../../api/Apis';
import { endPoint } from '../../../api/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
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

    render() {
        const { chitietData } = this.state;
        const { paramKey, tabKey, idNCC } = this.props.route.params;
        idNhacungcap = idNCC;
        return (
            <View style={{ alignItems: 'flex-start', backgroundColor: 'white', width: deviceWidth }}>
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
    listItem: {
        padding: 10,
        paddingTop: 10,
        width: deviceWidth - 50,
        flex: 1,
        backgroundColor: "#FFF",
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        height: 200,
    },
    infor: {
        marginLeft: 10,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        height: 50,
        width: "85%",
        paddingBottom: 10,
    },
});


export default NhaCungcapDetail;