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
let idphongBan = [];
let idNguoiNhan = [];

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

class LichXuatBaocaoDetail extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            chitietData: [],
            phongBan: [],
            nguoiNhan: [],
        }
        this.param = {
            param: props.route.params,
        }
    }

    componentDidMount() {
        this.getchitietLichBaocao(this.props.DvqlDataFilter);
    }

    getchitietLichBaocao(array) {
        let url;
        url = `${endPoint.getChitietLichXuatBaoCao}?`;
        url += `input=${encodeURIComponent(`${1}`)}&`;
        url += `isView=${encodeURIComponent(`${true}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    idphongBan = res.result.phongBanNhan;
                    idNguoiNhan = res.result.nguoiNhan;
                    this.setState({
                        chitietData: res.result,
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));

        let url1 = 'services/app/LookupTable/GetAllNguoiDungTheoPBLookupTable?phongBan=' + idphongBan;
        createGetMethod(url1)
            .then(res => {
                if (res) {
                    let arr = res.result;
                    let arraynguoiNhanID = {idNguoiNhan};
                    console.log("idNguoiNhan "+ arraynguoiNhanID.length);

                    for (let i = 0; i < arr.length; i++) {
                        for (let j = 0; j < arraynguoiNhanID.length; j++)
                            if (arr[i].id == arraynguoiNhanID[j]) {
                                console.log("nguoiNhan: " + arr[i].displayName);
                                this.setState({
                                    nguoiNhan: arr[i].displayName,
                                });
                            }
                    }

                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));

        console.log("phongBan: " + array);
        for (let i = 0; i < array.length; i++) {
            if (array[i].id == idphongBan) {
                console.log("phongBan: " + array[i].displayName);
                this.setState({
                    phongBan: array[i].displayName,
                });
            }
        }

    }

    render() {
        const { chitietData, nguoiNhan, phongBan } = this.state;
        const { paramKey, tabKey } = this.props.route.params;

        return (
            <View style={{ alignItems: 'flex-start', backgroundColor: 'white', width: deviceWidth }}>
                <Text style={styles.title}>Thông tin lịch xuất báo cáo:</Text>
                {bullet('Tên báo cáo', paramKey.tenBaoCao)}
                {bullet('Giờ gửi báo cáo', paramKey.ngayGio)}
                {bullet('Lặp lại', paramKey.lapLai)}
                {bullet('Người nhận báo cáo', nguoiNhan)}
                {bullet('Phòng ban nhận báo cáo', phongBan)}
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

export default connect(mapStateToProps)(LichXuatBaocaoDetail);