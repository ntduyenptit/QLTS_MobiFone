import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity, FlatList, ScrollView,
} from 'react-native';
import BulletView from '@app/modules/global/BulletView';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { endPoint } from '../../../api/config';
import { createGetMethod } from '../../../api/Apis';

const deviceWidth = Dimensions.get("window").width;
let idNguoidung;

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
        const array = this.props.DvqlDataFilter;
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
                            console.log(`phongBan: ${  array[i].displayName}`);
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
        } return "Chưa kích hoạt";
    }

    render() {
        const { chitietData, phongBan } = this.state;
        const { paramKey, tabKey } = this.props.route.params;
        idNguoidung = paramKey.id;
        return (
          <View style={{ alignItems: 'flex-start', backgroundColor: 'white', width: deviceWidth }}>
            <Text style={styles.title}>Thông tin chi tiết</Text>
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