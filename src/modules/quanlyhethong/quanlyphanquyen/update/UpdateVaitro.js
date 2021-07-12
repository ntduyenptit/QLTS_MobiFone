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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { endPoint } from '@app/api/config';
import { createGetMethod, createUpdateMethod } from '@app/api/Apis';
import { colors, fonts } from '../../../../styles';
import { deviceWidth } from '../../../global/LoaderComponent';
import MultiSelect from '../../../../libs/react-native-multiple-select/lib/react-native-multi-select';

class UpdateVaitroScreen extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.route.params?.userId;
        const data = this.props.route.params?.paramKey;
        this.state = {
            id: id || null,
            tenVaitro: data?.name || '',
            tenHienthi: data?.displayName || '',
            chucVu: '',
            ghiChu: data?.description || '',
            roleListID: data?.grantedPermissions || [],
            roleList: [],
        };
    }

    componentDidMount() {
        console.log('update 333122: ', this.props.route.params);
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
        const url = `${endPoint.getAllPermissions}`;
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

    saveNewVaitro() {
        const {
            id,
            tenVaitro,
            tenHienthi,
            ghiChu,
            roleListID,
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
        const url = `${endPoint.UpdateVaiTro}`;
        const params = {
            id,
            description: ghiChu,
            displayName: tenHienthi,
            grantedPermissions: roleListID,
            name: tenVaitro,
        }
        createUpdateMethod(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    '',
                    'Cập nhật vai trò thành công',
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
            roleListID,
            roleList,
            tenVaitro,
            tenHienthi,
            ghiChu
        } = this.state;
        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView>
                <View style={styles.container}>
                  <Text style={styles.boldText}>Tên vai trò*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Nhập tên"
                    defaultValue={tenVaitro}
                    style={styles.bordered}
                    onChangeText={(text) => {
                                    this.setState({
                                        tenVaitro: text,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Tên hiển thị*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    defaultValue={tenHienthi}
                    onChangeText={(text) => {
                                    this.setState({
                                        tenHienthi: text
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Phân quyền</Text>
                  <MultiSelect
                    ref={(component) => { this.multiSelect = component }}
                    getCollapsedNodeHeight={{ height: 200 }}
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
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
                    style={[styles.bordered, {height: 80}]}
                    defaultValue={ghiChu}
                    onChangeText={(text) => {
                                    this.setState({
                                        ghiChu: text
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
    label: {
        margin: 8,
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

export default UpdateVaitroScreen;