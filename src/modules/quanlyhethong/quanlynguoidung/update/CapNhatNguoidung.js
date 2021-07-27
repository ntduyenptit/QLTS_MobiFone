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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { endPoint } from '@app/api/config';
import { createGetMethod, createUpdateMethod } from '@app/api/Apis';
import { colors, fonts } from '../../../../styles';
import { deviceWidth } from '../../../global/LoaderComponent';
import MultiSelect from '../../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { buildTree } from '../../../global/Helper';

class CapNhatNguoidungScreen extends React.Component {
    constructor(props) {
        super(props);
        const data = this.props.route.params?.paramKey;
        const id = this.props.route.params?.userId;
        this.state = {
            id,
            hoten: data?.name || '',
            donviID: data?.toChucId ? [data?.toChucId] : [],
            chucVu: data?.chucVu || '',
            email: data?.emailAddress || '',
            tendangnhap: data?.userName || '',
            sdt: data?.phoneNumber || '',
            kichHoat: data?.isActive || false,
            ghiChu: data?.ghiChu || '',
            roleListID: [],
            dvList: [],
            roleList: [],
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.updateNewNguoidung()}
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

    updateNewNguoidung() {
        const {
            id,
            hoten,
            donviID,
            chucVu,
            email,
            tendangnhap,
            sdt,
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
            default:
                break;
        }
        if (check) {
            Alert.alert(
                '',
                `Hãy nhập ${  s}`,
                [
                    { text: 'OK', style: "cancel" },
                ],

            );
            return;
        }
        const url = `${endPoint.updateUser}`;
        const params = {
            id,
            chucVu,
            emailAddress: email,
            ghiChu,
            isActive: kichHoat,
            name: hoten,
            phoneNumber: sdt,
            roleNames: roleListID,
            surname: hoten,
            toChucId: donviID[0],
            userName: tendangnhap,
        }
        createUpdateMethod(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    '',
                    'Cập nhật thành công',
                    [
                        { text: 'OK', onPress: this.goBack() },
                    ],

                );

            }
        })
    }

    goBack() {
        const { navigation, route } = this.props;
        route.params.onGoBack();
        navigation.goBack();
    }

    render() {
        const {
            hoten,
            chucVu,
            email,
            kichHoat,
            tendangnhap,
            sdt,
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
                    defaultValue={hoten}
                    onChangeText={(text) => {
                                    this.setState({
                                        hoten: text,
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
                    onSelectedItemsChange={(item) => this.setState({
                                    donviID: item
                                })}
                    selectedItems={donviID}
                    submitButtonColor="#2196F3"
                  />
                  <Text style={styles.boldText}>Chức vụ</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    defaultValue={chucVu}
                    onChangeText={(text) => {
                                    this.setState({
                                        chucVu: text,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Địa chỉ Email*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    defaultValue={email}
                    onChangeText={(text) => {
                                    this.setState({
                                        email: text
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Tên đăng nhập*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    editable={false}
                    defaultValue={tendangnhap}
                    onChangeText={(text) => {
                                    this.setState({
                                        tendangnhap: text
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Số điện thoại</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    defaultValue={sdt}
                    onChangeText={(text) => {
                                    this.setState({
                                        sdt: text
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
                    style={[styles.bordered, {height: 60}]}
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
export default connect(mapStateToProps)(CapNhatNguoidungScreen);