import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import BulletView from '@app/modules/global/BulletView';
import { createGetMethod } from '../../../api/Apis';
import { endPoint } from '../../../api/config';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

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
                    const idPB = res.result.phongBanNhan;
                    const  idNN = res.result.nguoiNhan;
                    const array = this.props.DvqlDataFilter
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].id == idPB) {
                            this.setState({
                                phongBan: array[i].displayName,
                            });
                            break;
                        }
                    }
                    const url1 = `services/app/LookupTable/GetAllNguoiDungTheoPBLookupTable?phongBan=${  res.result.phongBanNhan}`;
                    createGetMethod(url1)
                        .then(res => {
                            if (res) {
                                const arr = res.result;
                                const arraynguoiNhanID = idNN.split(',');
                                const element = [];
                                for (let i = 0; i < arr.length; i++) {
                                    for (let j = 0; j < arraynguoiNhanID.length; j++) {
                                        if (arr[i].id == arraynguoiNhanID[j]) {
                                            element.push(`${arr[i].displayName}, `);

                                        }
                                    }

                                }
                                console.log(`element: ${  element}`);
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
        return (
          <View style={StyleSheet.listItem}>
            <Text style={styles.title}>Thông tin lịch xuất báo cáo:</Text>
            <BulletView title='Tên báo cáo' text={paramKey.tenBaoCao} />
            <BulletView title='Giờ gửi báo cáo' text={paramKey.ngayGio} />
            <BulletView title='Lặp lại' text={paramKey.lapLai} />
            <BulletView title='Người nhận báo cáo' text={nguoiNhan} />
            <BulletView title='Phòng ban nhận báo cáo' text={phongBan} />
            <BulletView title='Ghi chú' text={chitietData.ghiChu} />
          </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        paddingBottom: 10,
        paddingTop: 15,
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic'
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