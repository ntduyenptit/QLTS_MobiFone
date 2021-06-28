/* eslint-disable import/no-unresolved */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MultiSelect from '@app/libs/react-native-multiple-select/lib/react-native-multi-select';
import { endPoint, } from '@app/api/config';
import { createPostMethodWithToken } from '@app/api/Apis';
import { convertDateToIOSString } from '@app/modules/global/Helper';
import { colors, fonts } from '../../../styles';

let tab = '';

class ThemmoiDaudocScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenTS: '',
            loaiTaisan: '',
            loaiTaisanId: '',
            SN: '',
            PN: '',
            nhaCungcap: '',
            hangSx: '',
            nguyenGia: '',
            ngayMua: '',
            ngayHetBh: '',
            ngayHetSd: '',
            ghiChu: '',
            ReaderMACId: '',
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            title: tab,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.saveNewReader()}
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
        })
        this.renderLoaiTS();
    }

    saveNewReader() {
        const {
            tenTS,
            loaiTaisanId,
            SN,
            PN,
            nhaCungcap,
            hangSx,
            nguyenGia,
            ngayMua,
            ngayHetBh,
            ngayHetSd,
            ghiChu,
            ReaderMACId,
        } = this.state;
        let s = '';
        let check = false;
        switch ("") {
            case tenTS:
                {
                    s = "tên đầu đọc";
                    check = true;
                    break;
                }
            case ReaderMACId :
                {
                    if (tab === 'Thêm mới đầu đọc di động') {
                        check = false;
                        break;

                    }
                    s = "ReaderMAC id";
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
        let url = '';
        let params = '';
        if (tab === 'Thêm mới đầu đọc di động') {
            url = `${endPoint.creatReaderdidong}`;
            params = {
                ghiChu,
                hanSD: ngayHetSd && convertDateToIOSString(ngayHetSd),
                hangSanXuat: hangSx,
                loaiTS: loaiTaisanId,
                ngayBaoHanh: ngayHetBh && convertDateToIOSString(ngayHetBh),
                ngayMua: ngayMua && convertDateToIOSString(ngayMua),
                nguyenGia,
                nhaCC: nhaCungcap[0],
                productNumber: PN,
                serialNumber: SN,
                tenTS,
            }
        } else {
            url = `${endPoint.creatReadercodinh}`;
            params = {
                ghiChu,
                hanSD: ngayHetSd && convertDateToIOSString(ngayHetSd),
                hangSanXuat: hangSx,
                loaiTS: loaiTaisanId,
                ngayBaoHanh: ngayHetBh && convertDateToIOSString(ngayHetBh),
                ngayMua: ngayMua && convertDateToIOSString(ngayMua),
                nguyenGia,
                nhaCC: nhaCungcap[0],
                productNumber: PN,
                readerMACId: ReaderMACId,
                serialNumber: SN,
                tenTS,
            }
        }
        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    '',
                    'Thêm mới thành công',
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

    renderLoaiTS() {
        if (tab === 'Thêm mới đầu đọc di động') {
            this.setState({
                loaiTaisanId: 1,
            })
            this.setState({
                loaiTaisan: 'Đầu đọc thẻ RFID',
            });
        } else {
            this.setState({
                loaiTaisanId: 2,
            })
            this.setState({
                loaiTaisan: 'Đầu đọc cố định',
            });
        }
    }

    renderReaderMACView() {
        if (tab === 'Thêm mới đầu đọc di động') {
            return null;
        }
        return (
          <View>
            <Text style={styles.boldText}>ReaderMACId*</Text>
            <TextInput
              placeholderTextColor="black"
              style={styles.bordered}
              onChangeText={(text) => {
                        this.setState({
                            ReaderMACId: text,
                        });
                    }}
            />
          </View>
        )
    }

    render() {
        const {
            loaiTaisan,
            ngayMua,
            ngayHetBh,
            ngayHetSd,
            nhaCungcap
        } = this.state;
        const { screen } = this.props.route.params;
        tab = screen;
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
                    onChangeText={(years) => {
                                    this.setState({
                                        tenTS: years,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Loại tài sản*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    placeholder={loaiTaisan}
                    editable={false}
                    selectTextOnFocus={false}
                  />

                  <Text style={styles.boldText}>S/N (Serial Number)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(years) => {
                                    this.setState({
                                        SN: years,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>P/N (Product Number)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(years) => {
                                    this.setState({
                                        PN: years,
                                    });
                                }}
                  />
                  {this.renderReaderMACView()}
                  <Text style={styles.boldText}>Nhà cung cấp</Text>
                  <MultiSelect
                    single
                    items={this.props.NhaCCData}
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText="Chọn nhà cung cấp..."
                    onSelectedItemsChange={(item) => this.setState({
                        nhaCungcap: item,
                                    })}
                    selectedItems={nhaCungcap}
                  />
                  <Text style={styles.boldText}>Hãng sản xuất</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(years) => {
                                    this.setState({
                                        hangSx: years,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Nguyên giá (VND)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(years) => {
                                    this.setState({
                                        nguyenGia: years,
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
                    style={[styles.bordered, { height: 100 }]}
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
        padding: 5,
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
    searchText: {
        backgroundColor: 'transparent',
        height: 50,
        paddingLeft: 15
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
    NhaCCData: state.filterNCCDataReducer.nccDataFilter,
});

export default connect(mapStateToProps)(ThemmoiDaudocScreen);