/* eslint-disable import/no-cycle */
import React from 'react';
import moment from 'moment';
import {
    Animated,
    SafeAreaView,
    StatusBar,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiSelect from '@app/libs/react-native-multiple-select/lib/react-native-multi-select';
import { endPoint, screens } from '@app/api/config';
import { createGetMethod, createPostMethodWithToken } from '../../../../api/Apis';
import { colors, fonts } from '../../../../styles';
import { deviceWidth } from '../../../global/LoaderComponent';

class UpdateNhaCungCapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            maNhaCC: this.props.route.params.paramKey?.maNhaCungCap,
            tenNhaCC: this.props.route.params.paramKey?.tenNhaCungCap,
            linhVucKinhdoanh: [this.props.route.params.paramKey?.linhVucKinhDoanhId] || [],
            maSothue: this.props.route.params.paramKey?.maSoThue,
            diachi: this.props.route.params.paramKey?.diaChi,
            sodienthoai: this.props.route.params.paramKey?.soDienThoai,
            email: this.props.route.params.paramKey?.email,
            ghiChu: this.props.route.params.paramKey?.ghiChu,
            linhvucKDList: [],
            id: this.props.route.params?.idTs,
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.saveNewNhaCC()}
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
        this.getAllLinhvucKinhDoanh();
    }

    getAllLinhvucKinhDoanh() {
        const url = `${endPoint.getAllLinhvucKD}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        linhvucKDList: res.result,
                    });
                }
            })
    }

    saveNewNhaCC() {
        const {
            maNhaCC,
            tenNhaCC,
            linhVucKinhdoanh,
            maSothue,
            diachi,
            sodienthoai,
            email,
            ghiChu,
            id,
        } = this.state;

        let s = '';
        let check = false;
        switch ("") {
            case tenNhaCC:
                {
                    s = "tên nhà cung cấp";
                    check = true;
                    break;
                }
            case maNhaCC: {
                s = "mã nhà cung cấp";
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
        const url = `${endPoint.CreatNhaCungcap}`;
        const params = {
            diaChi: diachi,
            email,
            id,
            ghiChu,
            linhVucKinhDoanhId: linhVucKinhdoanh[0],
            listFile: [],
            maNhaCungCap: maNhaCC,
            maSoThue: maSothue,
            soDienThoai: sodienthoai,
            tenNhaCungCap: tenNhaCC,
        }


        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    '',
                    'Cập nhật nhà cung cấp thành công',
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
            linhVucKinhdoanh,
            linhvucKDList,
            maNhaCC,
            tenNhaCC,
        } = this.state;
        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView>
                <View style={styles.container}>
                  <Text style={styles.boldText}>Mã nhà cung cấp*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Nhập mã"
                    style={styles.bordered}
                    defaultValue={maNhaCC}
                    onChangeText={(text) => {
                                    this.setState({
                                        maNhaCC: text,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Tên nhà cung cấp*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Nhập tên"
                    style={styles.bordered}
                    defaultValue={tenNhaCC}
                    onChangeText={(text) => {
                                    this.setState({
                                        tenNhaCC: text,
                                    });
                                }}
                  />

                  <Text style={styles.boldText}>Lĩnh vực kinh doanh</Text>
                  <MultiSelect
                    ref={(component) => { this.multiSelect = component }}
                    getCollapsedNodeHeight={{ height: 200 }}
                    items={linhvucKDList}
                    single
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleListContainer={linhvucKDList && linhvucKDList.length > 9 ? { height: 200 } : null}
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText="Chọn lĩnh vực kinh doanh..."
                    onSelectedItemsChange={(item) => {
                                    this.setState({
                                        linhVucKinhdoanh: item,
                                    });
                                }}
                    selectedItems={linhVucKinhdoanh}
                    submitButtonColor="#2196F3"
                  />
                  <Text style={styles.boldText}>Mã số thuế</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(maSothue) => {
                                    this.setState({
                                        maSothue
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Địa chỉ</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(diachi) => {
                                    this.setState({
                                        diachi
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Số điện thoại</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(sodienthoai) => {
                                    this.setState({
                                        sodienthoai
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Email</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(email) => {
                                    this.setState({
                                        email
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Ghi chú</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
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
    }
});

export default UpdateNhaCungCapScreen;