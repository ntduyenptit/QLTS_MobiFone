import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, Animated, SafeAreaView, FlatList, KeyboardAvoidingView, TouchableOpacity, ScrollView, Modal, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { endPoint } from '../../api/config';
import { createGetMethod, createPostMethodWithToken } from '../../api/Apis';
import { convertHinhthucTaisan } from '../global/Helper';
import { fonts, colors } from '../../styles';
import AsyncStorage from '@react-native-community/async-storage';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
let tab = '';
const keyboardVerticalOffset = -40;

const placeholder = {
    label: 'Chọn ...',
    value: null,
    color: '#9EA0A4',
};
const toanboTaisan = [];

class ThemMoiDuTruMuaSam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maPhieu: '',
            tenPhieu: '',
            donVi: '',
            userLapPhieu: "",
            userId: '',
            listTaisanMuaSam: [],
            listDonvi: [],
            modalVisible: false,
            donGia: '',
            ghiChu: '',
            hangSanXuat: '',
            nhaCungCap: '',
            productNumber: '',
            soLuong: '',
            tenTaiSan: '',
        }
        this.screen = {
            param: props.route.params
        }
        this.taiSan = {
            donGia: '',
            ghiChu: '',
            hangSanXuat: '',
            nhaCungCap: '',
            productNumber: '',
            soLuong: '',
            tenTaiSan: '',
        }

    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => this.saveNewDutruMuasam()}
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
        this.getUserDangnhap();
        this._retrieveData();
        this.rederDataList(this.props.DvqlDataFilter);
    }

    saveNewDutruMuasam() {
        const {
            maPhieu,
            tenPhieu,
            donVi,
            userId,
            listTaisanMuaSam,
            donGia,
            ghiChu,
            hangSanXuat,
            nhaCungCap,
            productNumber,
            soLuong,
            tenTaiSan,
        } = this.state;
        const url = `${endPoint.CreatPhieuMuasam}`;
        let s = '';
        let check = false;
        switch ("") {
            case maPhieu:
                {
                    s = "mã phiếu";
                    check = true;
                    break;
                }
            case tenPhieu: {
                s = "tên phiếu";
                check = true;
                break;
            }
            case donVi: {
                s = "đơn vị";
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
        const params = {
            listDinhKem: [],
            listPhieuChiTiet: listTaisanMuaSam,
            maPhieu: maPhieu,
            nguoiLapPhieuId: userId,
            tenPhieu: tenPhieu,
            toChucId: donVi,
        }

        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {

            if (res.success) {
                Alert.alert(
                    "Thêm mới phiếu thành công",
                    "",
                    [
                        { text: "OK", onPress: () => this.props.navigation.goBack() }
                    ]
                );
            }
        })
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@userId');
          if (value !== null) {
            this.setState({
                userId: value,

            })
            console.log("userId"+value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    getUserDangnhap() {
        let url;
        url = `${endPoint.getuserDangnhap}`;
        createGetMethod(url)
            .then(res => {
                this.setState({
                    userLapPhieu: res.result,

                })
            });
            
    }

    rederDataList(data) {
        const list = [];
        for (let i = 0; i < data.length; i++) {
            const item = {
                label: data[i].displayName,
                value: data[i].id,
            }
            list.push(item);
        }
        this.setState({
            listDonvi: list,
        })
    }

    renderItemComponent = (data) => (
        <View style={styles.listItem}>
            <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color="#0080FF" size={15} />
            <View style={styles.infor}>
                <Text numberOfLines={1} style={[{ fontWeight: "bold", paddingBottom: 3 }]}>Product Number: {data.item.productNumber}</Text>
                <Text numberOfLines={1} style={{ paddingBottom: 3 }}>Tên: {data.item.tenTaiSan}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Hãng sản xuất: {data.item.hangSanXuat}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Nhà cung cấp: {data.item.nhaCungCap}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Số lượng: {data.item.soLuong}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Đơn giá: {data.item.donGia}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Tổng giá: {((data.item.soLuong) * (data.item.donGia))}</Text>
            </View>
        </View>
    )

    addTaisan(donGia, ghiChu, hangSanXuat, nhaCungCap, productNumber, soLuong, tenTaiSan, modalVisible) {
        if (tenTaiSan == '') {
            Alert.alert(
                "Chú ý",
                "Hãy nhập Tên tài sản",
                [
                    {
                        text: "OK", onPress: () => this.setState({
                            modalVisible,
                        })
                    }
                ]);
            return;
        }
        if (donGia == '') {
            Alert.alert(
                "Chú ý",
                "Hãy nhập đơn giá",
                [
                    {
                        text: "OK", onPress: () => this.setState({
                            modalVisible,
                        })
                    }
                ]);
            return;
        }

        if (ghiChu == '') {
            Alert.alert(
                "Chú ý",
                "Hãy nhập Mục đích sử dụng",
                [
                    {
                        text: "OK", onPress: () => this.setState({
                            modalVisible,
                        })
                    }
                ]);
            return;
        }
        if (hangSanXuat == '') {
            Alert.alert(
                "Chú ý",
                "Hãy nhập hãng sản xuất",
                [
                    {
                        text: "OK", onPress: () => this.setState({
                            modalVisible,
                        })
                    }
                ]);
            return;
        }

        if (nhaCungCap == '') {
            Alert.alert(
                "Chú ý",
                "Hãy nhập nhà cung cấp",
                [
                    {
                        text: "OK", onPress: () => this.setState({
                            modalVisible,
                        })
                    }
                ]);
            return;
        }

        if (productNumber == '') {
            Alert.alert(
                "Chú ý",
                "Hãy nhập product number",
                [
                    {
                        text: "OK", onPress: () => this.setState({
                            modalVisible,
                        })
                    }
                ]);
            return;
        }

        if (soLuong == '') {
            Alert.alert(
                "Chú ý",
                "Hãy nhập số lượng tài sản",
                [
                    {
                        text: "OK", onPress: () => this.setState({
                            modalVisible,
                        })
                    }
                ]);
            return;
        }



        if (donGia != null && ghiChu != null && hangSanXuat != null && nhaCungCap != null && soLuong != null && tenTaiSan != null) {
            const item = {
                tenTaiSan,
                ghiChu,
                hangSanXuat,
                nhaCungCap,
                productNumber,
                soLuong,
                donGia,
            }
            toanboTaisan.push(item);
            this.setState({
                listTaisanMuaSam: toanboTaisan,
            })
        }
        this.setState({
            modalVisible: !modalVisible,
        })
    }

    render() {
        const { maPhieu,
            tenPhieu,
            donVi,
            userLapPhieu,
            toanboTaisan,
            listTaisanMuaSam,
            listDonvi,
            checkBoxChecked, modalVisible, donGia,
            ghiChu,
            hangSanXuat,
            nhaCungCap,
            productNumber,
            soLuong,
            tenTaiSan, } = this.state;
        const { screen } = this.props.route.params;
        tab = screen;
        console.log(`{screen} ${tab}`);

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.title}>Thêm mới phiếu dự trù mua sắm </Text>
                    <Text style={styles.boldText}>Mã phiếu*: </Text>
                    <TextInput
                        placeholderTextColor="black"
                        style={styles.bordered}
                        onChangeText={(text) => {
                            this.setState({
                                maPhieu: text,
                            });
                        }}
                    />
                    <Text style={styles.boldText}>Tên phiếu*: </Text>
                    <TextInput
                        placeholderTextColor="black"
                        style={styles.bordered}
                        onChangeText={(text) => {
                            this.setState({
                                tenPhieu: text,
                            });
                        }}
                    />
                    <Text style={styles.boldText}>Đơn vị*: </Text>
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={listDonvi}
                        onValueChange={value => {
                            this.setState({
                                donVi: value,
                            });
                        }}

                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 10,
                                right: 12,
                            },
                        }}
                        value={this.state.donVi}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{ underlineColor: 'yellow' }}
                        Icon={() => <Icon name="caret-down" size={25} color="black" />}
                    />
                </View>
                <Text style={styles.boldText}>Người lập phiếu: </Text>
                <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    placeholder={userLapPhieu}
                    editable={false}
                    selectTextOnFocus={false}
                />
                <View style={styles.containerButton}>
                    <Text style={styles.boldText}>Danh sách tài sản đề xuất mua sắm: </Text>
                    <Icon
                        style={{ alignContent: "flex-end", paddingLeft: 90 }}
                        name="plus"
                        color="black"
                        size={27}
                        onPress={() => this.setState({
                            modalVisible: true,
                        })}
                    />
                </View>
                <View>
                    <Modal
                        animationType="fade"
                        transparent
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setState({
                                modalVisible: !modalVisible,
                            });
                        }}
                    >
                        <View>
                            <KeyboardAvoidingView
                                behavior='position'
                                keyboardVerticalOffset={keyboardVerticalOffset}
                                style={styles.modalView}
                            >
                                <Text style={styles.modalText}>Thêm tài sản vào phiếu</Text>
                                <ScrollView style={{ padding: 5, height: deviceHeight - 300, marginBottom: 5 }}>
                                    <Text style={styles.boldText}>Tên tài sản*: </Text>
                                    <TextInput
                                        placeholderTextColor="black"
                                        style={styles.bordered}
                                        onChangeText={(text) => {
                                            this.setState({
                                                tenTaiSan: text,
                                            });
                                        }}
                                    />
                                    <Text style={styles.boldText}>Product number*: </Text>
                                    <TextInput
                                        placeholderTextColor="black"
                                        style={styles.bordered}
                                        onChangeText={(text) => {
                                            this.setState({
                                                productNumber: text,
                                            });
                                        }}
                                    />
                                    <Text style={styles.boldText}>Hãng sản xuất*: </Text>
                                    <TextInput
                                        placeholderTextColor="black"
                                        style={styles.bordered}
                                        onChangeText={(text) => {
                                            this.setState({
                                                hangSanXuat: text,
                                            });
                                        }}
                                    />
                                    <Text style={styles.boldText}>Nhà cung cấp*: </Text>
                                    <TextInput
                                        placeholderTextColor="black"
                                        style={styles.bordered}
                                        onChangeText={(text) => {
                                            this.setState({
                                                nhaCungCap: text,
                                            });
                                        }}
                                    />
                                    <Text style={styles.boldText}>Số lượng*: </Text>
                                    <TextInput
                                        placeholderTextColor="black"
                                        style={styles.bordered}
                                        onChangeText={(text) => {
                                            this.setState({
                                                soLuong: text,
                                            });
                                        }}
                                    />
                                    <Text style={styles.boldText}>Đơn giá*: </Text>
                                    <TextInput
                                        placeholderTextColor="black"
                                        style={styles.bordered}
                                        onChangeText={(text) => {
                                            this.setState({
                                                donGia: text,
                                            });
                                        }}
                                    />
                                    <Text style={styles.boldText}>Mục đích sử dụng*: </Text>
                                    <TextInput
                                        placeholderTextColor="black"
                                        style={styles.bordered}
                                        onChangeText={(text) => {
                                            this.setState({
                                                ghiChu: text,
                                            });
                                        }}
                                    />
                                </ScrollView>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.addTaisan(donGia, ghiChu, hangSanXuat, nhaCungCap, productNumber, soLuong, tenTaiSan, modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Thêm </Text>
                                </Pressable>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                </View>

                <SafeAreaView>
                    <Animated.ScrollView>
                        <FlatList
                            scrollEnabled={false}
                            data={listTaisanMuaSam}
                            renderItem={item => this.renderItemComponent(item)}
                        />
                    </Animated.ScrollView>
                </SafeAreaView>

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },

    containerInfor: {
        padding: 0,
    },

    containerButton: {
        marginTop: 5,
        flexDirection: 'row',
    },
    containerListTaisan: {
        padding: 5,
    },
    title: {
        paddingBottom: 10,
        fontSize: 18,
        fontStyle: 'italic',
        alignSelf: 'center',

    },
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
        padding: 3,
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingBottom: 3,
    },
    borderedContent: {
        borderWidth: 0.5,
        height: 50,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    borderedContentSuachuabaoduong: {
        borderWidth: 0.5,
        height: 50,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    button2: {
        padding: 5,
        marginRight: 5,
        height: 20,
        borderRadius: 5,
        backgroundColor: "red",
    },
    listItem: {
        padding: 5,
        flex: 1,
        width: deviceWidth,
        backgroundColor: "#FFF",
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        height: 150,
    },
    infor: {
        marginLeft: 30,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        paddingBottom: 10,
    },
    datePickerStyle: {
        width: '100%',
        marginTop: 0,

    },
    // //
    modalView: {
        margin: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: deviceHeight - 150,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        alignSelf: 'center'
    },

    buttonClose: {
        width: 100,
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        textAlign: "center"
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 10,
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 10, // to ensure the text is never behind the icon
    },
});

const mapStateToProps = state => ({
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
    tokenUser: state.userReducer.token,
});

export default connect(mapStateToProps)(ThemMoiDuTruMuaSam);