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
var idNguoidung;

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

class NguoidungDetailScreen extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            chitietData: [],
            phongBan:'',
        }
        this.param = {
            param: props.route.params,
        }
    }

    componentDidMount() {
        this.getchitietNguoidung();
    }
 
    getchitietNguoidung() {
        let url;
        let array = this.props.DvqlDataFilter;
        url = `${endPoint.getDetailNguoidung}?`;
        url += `Id=${encodeURIComponent(`${idNguoidung}`)}&`;
        url += `isView=${encodeURIComponent(`${true}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        chitietData: res.result,
                    });
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].id == res.result.toChucId) {
                            console.log("phongBan: " + array[i].displayName);
                            this.setState({
                                phongBan: array[i].displayName,
                            });
                        }
                    }

                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));
    }
    convertActiveData(data) {
        if (data == true) {
            return "Đã kích hoạt";
        } else return "Chưa kích hoạt";
    }

    render() {
        const { chitietData, phongBan } = this.state;
        const { paramKey, tabKey } = this.props.route.params;
        idNguoidung = paramKey.id;
        return (
            <View style={{ alignItems: 'flex-start', backgroundColor: 'white', width: deviceWidth }}>
                <Text style={styles.title}>Thông tin chi tiết</Text>
                {bullet('Họ tên', chitietData.name)}
                {bullet('Chức vụ', chitietData.chucVu)}
                {bullet('Đơn vị', phongBan)}
                {bullet('Tên đăng nhập', chitietData.userName)}
                {bullet('Email', chitietData.emailAddress)}
                {bullet('Số điện thoại', chitietData.phoneNumber)}
                {bullet('Kích hoạt', this.convertActiveData(chitietData.isActive))}
                {bullet('Vai trò', chitietData.roleNames)}
                {bullet('Ghi chú', chitietData.ghiChu)}
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
const mapStateToProps = state => ({
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
    tab: 'Chi tiet lich xuat bao cao'
});

export default connect(mapStateToProps)(NguoidungDetailScreen);