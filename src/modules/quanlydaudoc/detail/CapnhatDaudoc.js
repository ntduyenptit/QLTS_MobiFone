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
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    Platform,
    TouchableHighlight
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { endPoint } from '../../../api/config';
import { convertDateToIOSString, addYearToDate, getLinkFile } from '../../global/Helper';
import { createGetMethod, createPostMethodWithToken, createPostMultiFiles } from '../../../api/Apis';
import { colors, fonts } from '../../../styles';
import { deviceWidth } from '../../global/LoaderComponent';

let idTaisan = null;
class UpdateDaudocScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idTaisan: this.props.route.params.idTs,
            tenTS: this.props.route.params.paramKey.tenTS,
            loaiTaisan: this.convertLoaiTs(this.props.route.params.paramKey.loaiTS),
            SN: this.props.route.params.paramKey.serialNumber,
            PN: this.props.route.params.paramKey.productNumber,
            hangSx: this.props.route.params.paramKey.hangSanXuat,
            nguyenGia: this.props.route.params.paramKey.nguyenGia,
            ngayMua: this.props.route.params.paramKey.ngaymua,
            ngayHetBh: this.props.route.params.paramKey.ngayBaoHanh,
            ngayHetSd: this.props.route.params.paramKey.hanSD,
            nhaCungcap: this.props.route.params.paramKey.nhaCC,
            ghiChu: this.props.route.params.paramKey.ghichu,
        };
    }

    componentDidMount() {
        Promise.all([
            this.props.navigation.setOptions({
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => this.saveNewTaiSan()}
                    style={{
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                        }
                        }
                  >
                    <View style={{ marginLeft: 15, backgroundColor: 'transparent' }}>
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
            }),
            // this.setData(Taisan),
        ]);
        this.setState({
            loaiTaisan: this.props.route.params.paramKey.loaiTS
        })
    }

    saveNewTaiSan() {
        const {
            hangSx,
            loaiTaisan,
            ngayHetBh,
            ghiChu,
            nguyenGia,
            nhaCungcap,
            PN,
            SN,
            tenTS,
            ngayHetSd,
            ngayMua
        } = this.state;
        const url = `${endPoint.creatReaderdidong}`;
        let s = '';
        let check = false;
        switch ("") {
            case tenTS:
                {
                    s = "tên tài sản";
                    check = true;
                    break;
                }
            case loaiTaisan: {
                s = "loại tài sản";
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
        // eslint-disable-next-line no-undef
        const params = {
            ghiChu: ghiChu,
            id: idTaisan,
            hangSanXuat: hangSx,
            loaiTS: 1,
            ngayBaoHanh: ngayHetBh && convertDateToIOSString(ngayHetBh),
            hanSD: ngayHetSd && convertDateToIOSString(ngayHetSd),
            ngayMua: ngayMua && convertDateToIOSString(ngayMua),
            nguyenGia : nguyenGia,
            nhaCC: nhaCungcap && nhaCungcap[0],
            noiDungChotGia: "",
            productNumber: PN,
            serialNumber: SN,
            tenTS: tenTS,
        }
        createPostMethodWithToken(url, JSON.stringify(params)).then((result) => {
            if (result.success) {
                Alert.alert('Cập nhật đầu đọc thành công',
                    '',
                    [
                        { text: 'OK', onPress: this.goBack() },
                    ],
                    { cancelable: false }
                );
            }
        })

    }

    goBack() {
        const { navigation, route } = this.props;
        route.params.onGoBack();
        this.props.navigation.goBack()
    }

    convertLoaiTs(loaiTs) {
        const list = '';
        list[0] = loaiTs;
        return list;
    }

    render() {
        const {
            tenTS,
            loaiTaisan,
            nguyenGia,
            SN,
            PN,
            hangSx,
            ngayMua,
            ngayHetBh,
            ngayHetSd,
            nhaCungcap,
            ghiChu,
        } = this.state;
        const { paramKey, idTs } = this.props.route.params;
        console.log(`loaiTaisan ${  loaiTaisan}`);

        Taisan = paramKey;
        idTaisan = idTs;
        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView>
                <View style={styles.container}>
                  <Text style={styles.boldText}>Tên đầu đọc*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    defaultValue={tenTS}
                    onChangeText={(tenTS) => {
                                    this.setState({
                                        tenTS,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Loại tài sản*</Text>
                  <MultiSelect
                    single
                    items={this.props.LoaiTSData}
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    uniqueKey="value"
                    displayKey="text"
                    selectText=""
                    onSelectedItemsChange={(item) => this.setState({
                                    loaiTaisan: item,
                                })}
                    selectedItems={loaiTaisan}
                  />

                  <Text style={styles.boldText}>S/N (Serial Number)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    defaultValue={SN}
                    onChangeText={(SN) => {
                                    this.setState({
                                        SN,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>P/N (Product Number)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    defaultValue={PN}
                    style={styles.bordered}
                    onChangeText={(PN) => {
                                    this.setState({
                                        PN,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Nhà cung cấp</Text>
                  <MultiSelect
                    single
                    items={this.props.NhaCCData}
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText={paramKey.nhaCungCap}
                    onSelectedItemsChange={(item) => this.setState({
                                    nhaCungcap: item,
                                })}
                    selectedItems={nhaCungcap}
                  />
                  <Text style={styles.boldText}>Hãng sản xuất</Text>
                  <TextInput
                    placeholderTextColor="black"
                    defaultValue={hangSx}
                    style={styles.bordered}
                    onChangeText={(hangsx) => {
                                    this.setState({
                                        hangSx: hangsx,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Nguyên giá (VND)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    defaultValue={nguyenGia}
                    style={styles.bordered}
                    onChangeText={(price) => {
                                    this.setState({
                                        nguyenGia: price,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Ngày mua</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={ngayMua} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    borderRadius='15'
                    placeholder="Chọn ngày"
                    format="DD-MM-YYYY"
                    confirmBtnText="Chọn"
                    cancelBtnText="Thoát"
                    customStyles={{
                                    dateIcon: {
                                        // display: 'none',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 5,
                                    },
                                }}
                    onDateChange={(date) => {
                                    this.setState({
                                        ngayMua: date,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Ngày hết hạn bảo hành</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={ngayHetBh} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    borderRadius='15'
                    placeholder="Chọn ngày"
                    format="DD-MM-YYYY"
                    confirmBtnText="Chọn"
                    cancelBtnText="Thoát"
                    customStyles={{
                                    dateIcon: {
                                        // display: 'none',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 5,
                                    },
                                }}
                    onDateChange={(date) => {
                                    this.setState({
                                        ngayHetBh: date,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Ngày hết hạn sử dụng</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={ngayHetSd} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    borderRadius='15'
                    placeholder="Chọn ngày"
                    format="DD-MM-YYYY"
                    confirmBtnText="Chọn"
                    cancelBtnText="Thoát"
                    customStyles={{
                                    dateIcon: {
                                        // display: 'none',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 5,
                                    },
                                }}
                    onDateChange={(date) => {
                                    this.setState({
                                        ngayHetSd: date,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Ghi chú</Text>
                  <TextInput
                    placeholderTextColor="black"
                    defaultValue={ghiChu}
                    style={styles.bordered}
                    onChangeText={(text) => {
                                    this.setState({
                                        ghiChu: text,
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
    searchText: {
        backgroundColor: 'transparent',
        height: 50,
        paddingLeft: 15
    },
    title: {
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic'
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

const mapStateToProps = state => ({
    LoaiTSData: state.filterLTSDataReducer.ltsDataFilter,
    NhaCCData: state.filterNCCDataReducer.nccDataFilter,
});

export default connect(mapStateToProps)(UpdateDaudocScreen);