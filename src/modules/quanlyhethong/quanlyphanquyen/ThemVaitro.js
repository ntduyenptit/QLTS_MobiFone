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
import { endPoint } from '../../../api/config';
import { createGetMethod, createPostMethodWithToken } from '../../../api/Apis';
import { colors, fonts } from '../../../styles';
import { deviceWidth } from '../../global/LoaderComponent';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';

class ThemmoiVaitroScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenVaitro: '',
            tenHienthi: '',
            chucVu: '',
            ghiChu: '',
            roleListID: [],
            roleList: [],
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => this.saveNewVaitro()}
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
        this.getAllPermissions();
    }

    getAllPermissions() {
        let url = `${endPoint.getAllPermissions}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        roleList: res.result.items
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));
    }
    saveNewVaitro() {
        const {
            tenVaitro,
            tenHienthi,
            chucVu,
            ghiChu,
            roleListID,
            roleList,
        } = this.state;
        let s = '';
        let check = false;
        switch ("") {
            case tenVaitro:
                {
                    s = "tên vai trò";
                    check = true;
                    break;
                }
            case tenHienthi: {
                s = "tên hiển thị";
                check = true;
                break;
            }

        }
        if (check) {
            Alert.alert(
                '',
                'Hãy nhập ' + s,
                [
                    { text: 'OK', style: "cancel" },
                ],

            );
            return;
        }
        const url = `${endPoint.CreateVaitro}`;
        const params = {
            description: ghiChu,
            displayName: tenHienthi,
            grantedPermissions: roleListID,
            name: tenVaitro,
        }
        const urlCheck = `${endPoint.checkExitVaitro}?` + 'roleName=' + tenVaitro + '&displayRoleName=' + tenHienthi + '&id=0';
        createPostMethodWithToken(urlCheck, null).then((res) => {
            if (!res.success) {
                Alert.alert(
                    '',
                    'Người dùng đã tồn tại',
                    [
                        { text: 'OK', style: "cancel", },
                    ],

                );
                return;
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

            }
        })
    }

    render() {
        const {
            tenVaitro,
            tenHienthi,
            chucVu,
            ghiChu,
            roleListID,
            roleList,
        } = this.state;
        return (
            <Animated.View>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <Animated.ScrollView
                    >
                        <View style={styles.container}>
                            <Text style={styles.boldText}>Tên vai trò*</Text>
                            <TextInput
                                placeholderTextColor="black"
                                placeholder="Nhập tên"
                                style={styles.bordered}
                                onChangeText={(tenVaitro) => {
                                    this.setState({
                                        tenVaitro,
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Tên hiển thị*</Text>
                            <TextInput
                                placeholderTextColor="black"
                                style={styles.bordered}
                                onChangeText={(tenHienthi) => {
                                    this.setState({
                                        tenHienthi
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Phân quyền</Text>
                            <MultiSelect
                                ref={(component) => { this.multiSelect = component }}
                                getCollapsedNodeHeight={{ height: 200 }}
                                items={roleList}
                                single={false}
                                IconRenderer={Icon}
                                searchInputPlaceholderText="Tìm kiếm..."
                                styleListContainer={roleList && roleList.length > 9 ? { height: 200 } : null}
                                uniqueKey="name"
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
                                style={styles.borderedGhichu}
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
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        height: 40,
        marginLeft: 5,
    },
    borderedGhichu: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        height: 60,
        marginLeft: 5,
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
    button: {
        width: 150,
        height: 30,
        marginLeft: 50,
        backgroundColor: '#1273DE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginBottom: 12
    },
    button2: {
        width: 150,
        height: 60,
        backgroundColor: '#1273DE',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: 12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
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

export default ThemmoiVaitroScreen;