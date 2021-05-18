import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';
import { createGetMethod } from '../../../api/Apis';
import { endPoint } from '../../../api/config';
import { connect } from 'react-redux';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

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
            idPhongban: [],
            idNguoiNhan: [],
        }
        this.param = {
            param: props.route.params,
        }
    }

    componentDidMount() {
        this.getchitietLichBaocao();

    }
    getchitietLichBaocao() {
        let url;
        url = `${endPoint.getChitietLichXuatBaoCao}?`;
        url += `input=${encodeURIComponent(`${1}`)}&`;
        url += `isView=${encodeURIComponent(`${true}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    let idPB = res.result.phongBanNhan;
                    let  idNN = res.result.nguoiNhan;
                    let array = this.props.DvqlDataFilter
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].id == idPB) {
                            this.setState({
                                phongBan: array[i].displayName,
                            });
                            break;
                        }
                    }
                    let url1 = 'services/app/LookupTable/GetAllNguoiDungTheoPBLookupTable?phongBan=' + res.result.phongBanNhan;
                    createGetMethod(url1)
                        .then(res => {
                            if (res) {
                                let arr = res.result;
                                let arraynguoiNhanID = idNN.split(',');
                                let element = [];
                                for (let i = 0; i < arr.length; i++) {
                                    for (let j = 0; j < arraynguoiNhanID.length; j++) {
                                        if (arr[i].id == arraynguoiNhanID[j]) {
                                            element.push(arr[i].displayName+", ");

                                        }
                                    }

                                }
                                console.log("element: " + element);
                                this.setState({
                                    nguoiNhan: element,
                                });

                            } else {
                                // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                            }
                        })
                        .catch(err => console.log(err));
                    this.setState({
                        chitietData: res.result,
                        idphongBan: res.result.phongBanNhan,
                        idNguoiNhan: res.result.nguoiNhan,
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { chitietData, nguoiNhan, phongBan, idPhongban, idNguoiNhan } = this.state;
        const { paramKey, tabKey } = this.props.route.params;
        idPB = idPhongban;
        idNN = idNguoiNhan;
        console.log("nguoiNhan: " + nguoiNhan);
        return (
            <View style={ StyleSheet.listItem}>
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
        height: deviceHeight,
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