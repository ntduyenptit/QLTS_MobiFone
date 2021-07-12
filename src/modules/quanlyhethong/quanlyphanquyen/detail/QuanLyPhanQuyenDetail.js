import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
    FlatList
} from 'react-native';
import BulletView from '@app/modules/global/BulletView';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import find from 'lodash/find';
import { endPoint, moreMenu, screens } from '@app/api/config';
import { createGetMethod, deleteMethod } from '@app/api/Apis';
import MoreMenu from '../../../global/MoreComponent';

const deviceWidth = Dimensions.get("window").width;

class QuanLyPhanQuyenDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idNguoidung: this.props.route.params.paramKey?.id,
            chitietData: this.props.route.params.paramKey,
            roleList: [],
            granted: this.props.route.params.paramKey?.grantedPermissions || [],
        }
    }

    componentDidMount() {
        console.log('chi tiet: ', this.props.route.params.paramKey);
        this.getAllPermissions();
        this.props.navigation.setOptions({
            headerRight: () => (
              <MoreMenu listMenu={this.showMenu()} />
            )
          });
    }
 
    getAllPermissions() {
        const url = `${endPoint.getAllPermissions}`;
        createGetMethod(url)
            .then(res => {
                if (res.success) {
                    this.setState({
                        roleList: res.result.items
                    });
                }
            })
            .catch();
    }

    getPhanQuyenNguoiDung() {
        const { idNguoidung } = this.state;
        const url = `${endPoint.getRoleDetail}?Id=${idNguoidung}`;
        createGetMethod(url)
            .then(res => {
                if (res.success) {
                    const data = res.result?.role;
                    data.grantedPermissions = res.result?.grantedPermissionNames;
                    this.setState({
                        chitietData: data,
                        granted: res.result?.grantedPermissionNames
                    });
                }
            })
            .catch();
    }

    showMenu = () => (
        [{
          title: moreMenu.cap_nhat,
          action: () => this.capnhat(),
        }]
      )

      refresh = () => {
        this.getPhanQuyenNguoiDung();
      }

  capnhat() {
    const { idNguoidung, chitietData } = this.state;
    this.props.navigation.navigate(screens.cap_nhat_phan_quyen, { paramKey: chitietData, userId: idNguoidung, onGoBack: () => this.refresh() });
  }

  delete(id) {
    Alert.alert('Bạn có chắc chắn muốn xóa không?',
        '',
        [
            {
                text: 'OK', onPress: () => {
                    let url = `${endPoint.deleteRole}?`;
                    url += `Id=${id}`;
                    deleteMethod(url).then(res => {
                        if (res.success) {
                            Alert.alert('Xóa vai trò thành công',
                                '',
                                [
                                    { text: 'OK', onPress: this.goBack() },
                                ],
                                { cancelable: false }
                            );
                        } else {
                            Alert.alert(res.error.message);
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
        const { route, navigation } = this.props;
        route.params.onGoBack();
        navigation.goBack();
    }

    renderPermission = (item) => {
        const { roleList } = this.state;
        const checked = find(roleList, itemSelected => itemSelected.name === item);
        if (checked) {
            return(
              <View style={styles.containerTime}>
                <CheckBox
                  isChecked={checked}
                  onClick={() => {}}
                />
                <Text style={styles.textPermission}>{checked?.displayName}</Text>
              </View>
            )
        }
        return null;
    }

    render() {
        const { chitietData, granted, idNguoidung } = this.state;
        return (
          <View style={styles.container}>
            <View style={{ alignItems: 'flex-start', width: deviceWidth, height: 'auto', padding: 10, flex: 1 }}>
              <Text style={styles.title}>Thông tin phân quyền</Text>
              <BulletView title='Tên vai trò' text={chitietData?.name} />
              <BulletView title='Tên hiển thị' text={chitietData?.displayName} />
              <Text style={styles.description}>Vai trò:</Text>
              <FlatList
                style={{flexGrow: 0}}
                data={granted}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                vert
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => this.renderPermission(item)}
              />
              <BulletView title='Ghi chú' text={chitietData?.description} />
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
    description: {
        fontWeight: 'bold',
        paddingBottom: 10,
        padding: 5,
        fontSize: 15,
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
    containerTime: {
        width: deviceWidth/2 - 10,
        height: 50,
        flexDirection: 'row',
        padding: 3
    },
    textPermission: {
        width: '90%',
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

export default connect(mapStateToProps)(QuanLyPhanQuyenDetailScreen);