import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import BulletView from '@app/modules/global/BulletView';
import { connect } from 'react-redux';
import { endPoint } from '../../../api/config';
import { createGetMethod } from '../../../api/Apis';

const deviceWidth = Dimensions.get("window").width;

class NguoidungDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idNguoidung: this.props.route.params.paramKey?.id,
            chitietData: [],
            phongBan: '',
        }
        this.param = {
            param: props.route.params,
        }
    }

    componentDidMount() {
        this.getchitietNguoidung();
    }
 
    getchitietNguoidung() {
        const { idNguoidung } = this.state;
        const array = this.props.DvqlDataFilter;
        let url = `${endPoint.getDetailNguoidung}?`;
        url += `Id=${encodeURIComponent(`${idNguoidung}`)}&`;
        url += `isView=${encodeURIComponent(`${true}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        chitietData: res.result,
                    });
                    array.forEach(e => {
                        if (e.id === res.result.toChucId) {
                            this.setState({
                                phongBan: e.displayName,
                            });
                        }
                    });
                }
            })
            .catch();
    }

    convertActiveData = (data) => {
        if (data) {
            return "Đã kích hoạt";
        } return "Chưa kích hoạt";
    }

    render() {
        const { chitietData, phongBan, idNguoidung } = this.state;
        return (
          <View style={styles.container}>
            <View style={{ alignItems: 'flex-start', width: deviceWidth, height: 'auto', padding: 10, flex: 1 }}>
              <Text style={styles.title}>Thông tin chi tiết người dùng</Text>
              <BulletView title='Họ tên' text={chitietData.name} />
              <BulletView title='Chức vụ' text={chitietData.chucVu} />
              <BulletView title='Đơn vị' text={phongBan} />
              <BulletView title='Tên đăng nhập' text={chitietData.userName} />
              <BulletView title='Email' text={chitietData.emailAddress} />
              <BulletView title='Số điện thoại' text={chitietData.phoneNumber} />
              <BulletView title='Kích hoạt' text={this.convertActiveData(chitietData.isActive)} />
              <BulletView title='Vai trò' text={chitietData.roleNames} />
              <BulletView title='Ghi chú' text={chitietData.ghiChu} />
            </View>
            <View style={styles.separator} />
            <View style={styles.addToCarContainer}>
              <TouchableOpacity
                onPress={() => this.delete(idNguoidung)}
                style={styles.shareButton}
              >
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
        backgroundColor: 'white'
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
        paddingBottom: 30
    }
});
const mapStateToProps = state => ({
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
    tab: 'Chi tiet lich xuat bao cao'
});

export default connect(mapStateToProps)(NguoidungDetailScreen);