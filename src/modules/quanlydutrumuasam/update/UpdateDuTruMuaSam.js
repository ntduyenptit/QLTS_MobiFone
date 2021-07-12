import React from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, SafeAreaView, FlatList, KeyboardAvoidingView, TouchableOpacity, ScrollView, Modal, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MultiSelect from '@app/libs/react-native-multiple-select/lib/react-native-multi-select';
import { buildTree, currencyFormat } from '@app/modules/global/Helper';
import CurrencyInput from 'react-native-currency-input';
import { endPoint } from '@app/api/config';
import { createGetMethod, createPostMethodWithToken } from '@app/api/Apis';
import { fonts, colors } from '../../../styles';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const keyboardVerticalOffset = -40;

class UpdateDuTruMuaSam extends React.Component {
    constructor(props) {
        super(props);
        const id = this.props.route.params?.idTs;
        const data = this.props.route.params?.paramKey;
        this.state = {
            id: id || null,
            maPhieu: data?.maPhieu || '',
            tenPhieu: data?.tenPhieu || '',
            donVi: [data?.toChucId] || [],
            userLapPhieu: '',
            userId: data?.nguoiLapPhieuId,
            listPhieuChiTiet: data?.listPhieuChiTiet,
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
        console.log('cap_nhat 123: ', this.props.route.params);
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
        });
        Promise.all([
            this.buildTreedvlist(),
            this.getUserDangnhap(),
            this.getPhieuChiTiet(),
        ]);
    }

    getUserDangnhap() {
        const { userId } = this.state;
        const url = `${endPoint.getUserDangNhapPhieuDuTruMuaSam}?input=${userId}`;
        createGetMethod(url)
            .then(res => {
                this.setState({
                    userLapPhieu: res.result,
                })
            });
            
    }

    getPhieuChiTiet = () => {
        const { listPhieuChiTiet } = this.state;
        if (listPhieuChiTiet) {
            this.setState({
                listTaisanMuaSam: listPhieuChiTiet,
            },() =>         console.log('list phieu chi tiet 123 : ', this.state.listTaisanMuaSam));
        }
    };

      saveNewDutruMuasam() {
        const {
            id,
            maPhieu,
            tenPhieu,
            donVi,
            userId,
            listTaisanMuaSam,
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
        const params = {
            id,
            listDinhKem: [],
            listPhieuChiTiet: listTaisanMuaSam,
            maPhieu,
            nguoiLapPhieuId: userId,
            tenPhieu,
            toChucId: donVi && donVi[0],
        }

        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    "Thêm mới phiếu thành công",
                    "",
                    [
                        { text: "OK", onPress: () => this.goBack() }
                    ]
                );
            }
        })
    }

    buildTreedvlist() {
        const list = buildTree(this.props.DvqlDataFilter);
        if (list) {
            this.setState({
                listDonvi: list,
            });
        }
    }

    goBack() {
        const { navigation, route } = this.props;
        route.params.onGoBack();
        navigation.goBack();
    }

    removeItem(index) {
        const array = [...this.state.listTaisanMuaSam]; // make a separate copy of the array
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({listTaisanMuaSam: array});
        }
    }

    renderItemComponent = (data, index) => (
      <View style={styles.listItem}>
        <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color="#0080FF" size={15} />
        <View style={styles.infor}>
          <Text numberOfLines={1} style={[{ fontWeight: "bold", paddingBottom: 3 }]}>Product Number: {data?.productNumber}</Text>
          <Text numberOfLines={1} style={{ paddingBottom: 3 }}>Tên: {data?.tenTaiSan}</Text>
          <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Hãng sản xuất: {data?.hangSanXuat}</Text>
          <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Nhà cung cấp: {data?.nhaCungCap}</Text>
          <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Số lượng: {data?.soLuong}</Text>
          <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Đơn giá: {data?.donGia && currencyFormat(data.donGia)}</Text>
          <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Tổng giá: {data?.soLuong && data?.donGia && currencyFormat(((data?.soLuong) * (data?.donGia)))}</Text>
        </View>
        <TouchableOpacity onPress={() => this.removeItem(index)} style={{ alignItems: "flex-end", paddingRight: 20 }}>
          <Icon name="trash" color="#FF0000" size={15} />
        </TouchableOpacity>
      </View>
    )

    addTaisan(donGia, ghiChu, hangSanXuat, nhaCungCap, productNumber, soLuong, tenTaiSan, modalVisible) {
        const { listTaisanMuaSam } = this.state;
        if (tenTaiSan === '') {
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
        if (donGia === '') {
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

        if (ghiChu === '') {
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
        if (hangSanXuat === '') {
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

        if (nhaCungCap === '') {
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

        if (productNumber === '') {
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

        if (soLuong === '') {
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
            const array = [...listTaisanMuaSam];
            array.push(item);
            this.setState({
                listTaisanMuaSam: array,
            })
        }
        this.setState({
            modalVisible: !modalVisible,
        })
    }

    render() {
        const {
            userLapPhieu,
            listTaisanMuaSam,
            listDonvi,
            modalVisible, donGia,
            ghiChu,
            hangSanXuat,
            nhaCungCap,
            productNumber,
            soLuong,
            donVi,
            tenPhieu,
            maPhieu,
            tenTaiSan, } = this.state;

        return (
          <ScrollView style={styles.container}>
            <View>
              <Text style={styles.title}>Thêm mới phiếu dự trù mua sắm </Text>
              <Text style={styles.boldText}>Mã phiếu*: </Text>
              <TextInput
                placeholderTextColor="black"
                style={styles.bordered}
                defaultValue={maPhieu}
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
                defaultValue={tenPhieu}
                onChangeText={(text) => {
                            this.setState({
                                tenPhieu: text,
                            });
                        }}
              />
              <Text style={styles.boldText}>Đơn vị*: </Text>
              <MultiSelect
                ref={(component) => { this.multiSelect = component }}
                getCollapsedNodeHeight={{ height: 200 }}
                isTree
                items={listDonvi}
                single
                IconRenderer={Icon}
                searchInputPlaceholderText="Tìm kiếm..."
                styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                styleListContainer={listDonvi && listDonvi.length > 9 ? { height: 200 } : null}
                uniqueKey="id"
                displayKey="displayName"
                selectText="Chọn ..."
                onSelectedItemsChange={(value) => this.setState({
                    donVi: value
                                })}
                selectedItems={donVi}
                submitButtonColor="#2196F3"
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
                            donGia: '',
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
                        keyboardType='numeric'
                        onChangeText={(text) => {
                                            this.setState({
                                                soLuong: text,
                                            });
                                        }}
                      />
                      <Text style={styles.boldText}>Đơn giá*: </Text>
                      <CurrencyInput
                        value={donGia}
                        style={styles.bordered}
                        onChangeValue={(value) =>  this.setState({
                                                donGia: value,
                                            })}
                        suffix=" VND"
                        delimiter="."
                        precision={0}
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
              <FlatList
                scrollEnabled={false}
                data={listTaisanMuaSam}
                renderItem={({item, index}) => this.renderItemComponent(item, index)}
              />
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
        borderBottomWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 40,
        marginLeft: 5,
        marginRight: 5
    },
    searchText: {
        backgroundColor: 'transparent',
        height: 50,
        paddingLeft: 15
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
        flex: 1,
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
});

const mapStateToProps = state => ({
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
});

export default connect(mapStateToProps)(UpdateDuTruMuaSam);