/* eslint-disable import/no-cycle */
import React from 'react';
import {
    Animated,
    SafeAreaView,
    StatusBar,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Switch,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box'
import { connect } from 'react-redux';
import { endPoint } from '../../../api/config';
import { createGetMethod, createPostMethodWithoutToken, createPostMethodWithToken } from '../../../api/Apis';
import { colors, fonts } from '../../../styles';
import { deviceWidth } from '../../global/LoaderComponent';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { buildTree } from '../../global/Helper';

class ThemmoiNguoidungScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoten: '',
            donviID: '',
            chucVu: '',
            email: '',
            tendangnhap: '',
            sdt: '',
            matkhau: '',
            xacnhanMk: '',
            kichHoat: false,
            ghiChu: '',
            roleListID: [],
            dvList: [],
            roleList: [],
            checkBoxChecked: [],
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.saveNewNguoidung()}
                style={{
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                    }
                    }
              >
                <View style={{ marginLeft: 15, backgroundColor: 'transparent' }}>
                  {/* <Icon name="save" color="white" size={20} /> */}
                  <Text style={{
                            fontFamily: fonts.primaryRegular,
                            color: colors.white,
                            fontSize: 18,
                            alignSelf: 'center'
                        }}
                  > Lưu
                  </Text>

                </View>
              </TouchableOpacity>
            )
        })
        this.buildTreedvlist(this.props.DvqlData);
        this.getAllRoleUser();
    }

    getAllRoleUser() {
        const url = `${endPoint.getRoleUser}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        roleList: res.result.items
                    });
                }
            })
            .catch();
    }

    buildTreedvlist(data) {
        const list = buildTree(data);
        if (list) {
            this.setState({
                dvList: list,
            });
        }
    }

    saveNewNguoidung() {
        const {
            hoten,
            donviID,
            chucVu,
            email,
            tendangnhap,
            sdt,
            matkhau,
            xacnhanMk,
            kichHoat,
            ghiChu,
            roleListID
        } = this.state;
        let s = '';
        let check = false;
        switch ("") {
            case hoten:
                {
                    s = "họ và tên";
                    check = true;
                    break;
                }
            case donviID: {
                s = "tên đơn vị";
                check = true;
                break;
            }
            case email:
                {
                    s = "địa chỉ email";
                    check = true;
                    break;
                }
            case tendangnhap: {
                s = "tên đăng nhập";
                check = true;
                break;
            }
            case matkhau:
                {
                    s = "mật khẩu";
                    check = true;
                    break;
                }
            case xacnhanMk: {
                s = "xác nhận mật khẩu";
                check = true;
                break;
            }
            default:
                break;
        }
        if (check) {
            Alert.alert(
                '',
                `Hãy nhập ${s}`,
                [
                    { text: 'OK', style: "cancel" },
                ],

            );
            return;
        }
        const url = `${endPoint.creatUser}`;
        const params = {
            chucVu,
            emailAddress: email,
            ghiChu,
            isActive: kichHoat,
            name: hoten,
            password: matkhau,
            phoneNumber: sdt,
            roleNames: roleListID,
            surname: hoten,
            toChucId: donviID[0],
            userName: tendangnhap,
        }
        const urlCheck = `${`${endPoint.checkExitUser}?` + 'userName='}${tendangnhap}&emailAddress=${email}`;
        createPostMethodWithToken(urlCheck, null).then((res) => {
            if (!res.success) {
                Alert.alert(
                    '',
                    'Người dùng đã tồn tại',
                    [
                        { text: 'OK', style: "cancel", },
                    ],

                );

            }
        })
        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    '',
                    'Thêm mới thành công',
                    [
                        { text: 'OK', onPress: this.props.navigation.goBack() },
                    ],

                );

            } else if (res.error) {
                if (res.error.details) {
                    Alert.alert(
                        'Không thành công',
                        res.error.details,
                    );
                }
                else if (res.error.message) {
                    Alert.alert(
                        'Không thành công',
                        res.error.message,
                    );
                }
            }
        })
    }

    render() {
        const {
            kichHoat,
            donviID,
            dvList,
            roleList,
            roleListID,
        } = this.state;
        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView>
                <View style={styles.container}>
                  <Text style={styles.boldText}>Họ và tên*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Nhập tên"
                    style={styles.bordered}
                    onChangeText={(hoten) => {
                                    this.setState({
                                        hoten,
                                    });
                                }}
                  />

                  <Text style={styles.boldText}>Đơn vị quản lý</Text>
                  <MultiSelect
                    ref={(component) => { this.multiSelect = component }}
                    getCollapsedNodeHeight={{ height: 200 }}
                    isTree
                    items={dvList}
                    single
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    styleListContainer={dvList && dvList.length > 9 ? { height: 200 } : null}
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText="Chọn ..."
                    onSelectedItemsChange={(donviID) => this.setState({
                                    donviID
                                })}
                    selectedItems={donviID}
                    submitButtonColor="#2196F3"
                  />
                  <Text style={styles.boldText}>Chức vụ</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(chucVu) => {
                                    this.setState({
                                        chucVu
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Địa chỉ Email*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(email) => {
                                    this.setState({
                                        email
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Tên đăng nhập*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(tendangnhap) => {
                                    this.setState({
                                        tendangnhap
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Số điện thoại</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(sdt) => {
                                    this.setState({
                                        sdt
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Mật khẩu*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    secureTextEntry
                    style={styles.bordered}
                    onChangeText={(matkhau) => {
                                    this.setState({
                                        matkhau
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Xác nhận mật khẩu*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    secureTextEntry
                    style={styles.bordered}
                    onChangeText={(xacnhanMk) => {
                                    this.setState({
                                        xacnhanMk
                                    });
                                }}
                  />

                  <View style={styles.containerButton}>
                    <Text style={styles.boldText}>Kích hoạt: </Text>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={kichHoat ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      marginLeft={30}
                      onValueChange={(kichHoat) => {
                                        this.setState({
                                            kichHoat
                                        });
                                    }}
                      value={kichHoat}
                    />
                  </View>
                  <Text style={styles.boldText}>Vai trò</Text>
                  <MultiSelect
                    ref={(component) => { this.multiSelect = component }}
                    getCollapsedNodeHeight={{ height: 200 }}
                    items={roleList}
                    single={false}
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    styleListContainer={roleList && roleList.length > 9 ? { height: 200 } : null}
                    uniqueKey="displayName"
                    displayKey="displayName"
                    selectText="Chọn ..."
                    onSelectedItemsChange={(roleListID) => this.setState({
                                    roleListID
                                })}
                    selectedItems={roleListID}
                    submitButtonColor="#2196F3"
                  />
                  <Text style={styles.boldText}>Ghi chú</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={[styles.bordered, { height: 60 }]}
                    multiline
                    onChangeText={(ghiChu) => {
                                    this.setState({
                                        ghiChu
                                    });
                                }}
                  />
                </View>

              </Animated.ScrollView>
            </SafeAreaView>

          </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerModal: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderRadius: 5,
    },
    containerButton: {
        marginTop: 5,
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: deviceWidth,
        paddingBottom: 5,
        paddingLeft: 10
    },
    title: {
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic'
    },
    searchText: {
        backgroundColor: 'transparent',
        height: 50,
        paddingLeft: 15
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
        padding: 5,
    },
    selectContainer: {
        flexDirection: "row",
        padding: 5,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    datePickerStyle: {
        width: '100%',
        marginTop: 0,

    },
    listItem: {
        padding: 10,
        flex: 1,
        width: deviceWidth - 30,
        backgroundColor: "#FFF",
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,

        flexGrow: 0,
        minHeight: 70,
    },
    infor: {
        marginLeft: 10,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        height: 'auto',
        paddingBottom: 10,
    },
    itemInfor: {
        flex: 1,
        paddingBottom: 3,
        flexDirection: 'row',
    },
});
const mapStateToProps = state => ({
    DvqlData: state.filterDVQLDataReducer.dvqlDataFilter,
});
export default connect(mapStateToProps)(ThemmoiNguoidungScreen);