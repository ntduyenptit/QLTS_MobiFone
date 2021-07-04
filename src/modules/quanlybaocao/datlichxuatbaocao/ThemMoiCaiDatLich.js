import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, StyleSheet, View, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { createGetMethod, createPostMethodWithToken } from '../../../api/Apis';
import { endPoint, } from '../../../api/config';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { buildTree, convertDateFormatTo, convertDateToIOSString, convertFormatDate, convertTimeFormatToLocaleDateFullTime, convertTimeToIOSString } from '../../global/Helper';
import { colors, fonts } from '../../../styles';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

const LaplaiList = [
    {
        label: "Ngày",
        value: 0,

    },
    {
        label: "Tuần",
        value: 1,
    },
    {
        label: "Tháng",
        value: 2,
    },
    {
        label: "Quý",
        value: 3,
    },
    {
        label: "Năm",
        value: 4,
    },
]
const TenBaocaoList = [
    {
        label: "Báo cáo người dùng",
        value: 0,
    },
    {
        label: "Báo cáo cảnh báo",
        value: 1,
    },
    {
        label: "Báo cáo thông tin thiết bị RFID",
        value: 2,
    },
    {
        label: "Báo cáo thông tin tài sản",
        value: 3,
    },
]

const listCheckphongBan = [];

class ThemmoiCaidatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenBaocao: '',
            lapLai: '',
            gioGuiBaocao: new Date(1598051730000),
            phongBanNhan: '',
            nguoiNhanBaocao: [],
            ghiChu: "",
            phongBanList: [],
            userList: [],
            isDateTimePickerVisible: false,
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.saveNewLichXuatbaocao()}
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
        this.danhsachPhongban(this.props.DvqlData);
        this.danhsachNguoidung();
    }

    danhsachPhongban(data) {
        if (data) {
            dvqlTreeData = buildTree(data);
            this.setState({
                phongBanList: dvqlTreeData,
            });
        }
    }
;
    danhsachNguoidung(id) {
        if (id != null) {
            let url;
            url = `services/app/LookupTable/GetAllNguoiDungTheoPBLookupTable?phongBan=${  id}`;
            createGetMethod(url)
                .then(res => {
                    if (res) {
                        const list = res.result.map(e => ({
                            name: e.displayName,
                            id: e.id,
                        }));
                        this.setState({
                            userList: list,
                        });
                    } else {
                        // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    onSelectedItemsChange = nguoiNhanBaocao => {
        console.log(`nguoiNhan: ${  nguoiNhanBaocao}`);
        this.setState({ nguoiNhanBaocao });
    };

    onSelectedDVQLChange = phongBanNhan => {
        console.log(`phongBanNhan: ${  phongBanNhan}`);
        this.setState({ phongBanNhan });
        this.danhsachNguoidung(phongBanNhan);
    }

    showDatetimePicker = () => {
        this.setState({
            isDateTimePickerVisible: true
        });
    };

    closeDatetimePicker = () => {
        this.setState({
            isDateTimePickerVisible: false
        });
    };

    // handleSelectDate = (time) => {
    //     this.closeDatetimePicker();
    //     this.setState({
    //         gioGuiBaocao: time
    //     });
    // };
    handleSelectDate = (event, selectedDate) => {
        console.log(`giobaocao: ${  selectedDate}`);
        const currentTime = selectedDate || new Date(1598051730000);
        this.setState({
            isDateTimePickerVisible: false
        });
        this.setState({
            gioGuiBaocao: currentTime
        });
    };

    convertListnguoiNhanbaocao(list) {
        let stringList = '';
        for (let i = 0; i < list.length; i++) {
            stringList += list[i];
            if (i < list.length - 1) stringList += ",";
        }
        return stringList;
    }

    convertTime(time) {
        const str = "";
        return `${str + convertDateFormatTo(time).toString()  }.881Z`;
    }

    convertphongBanNhan(pbNhan) {
        return pbNhan[0];
    }

    saveNewLichXuatbaocao() {
        const {
            tenBaocao,
            lapLai,
            gioGuiBaocao,
            phongBanNhan,
            nguoiNhanBaocao,
            ghiChu,
        } = this.state;
        const url = `${endPoint.CreatLichBaocao}`;
        let s = '';
        let check = false;
        switch("") {
            case tenBaocao: 
            {
                s = "tên báo cáo";
                check = true;
                break;
            }
            case lapLai: {
                s = "lặp lại báo cáo";
                check = true;
                break;
            }
            case gioGuiBaocao: {
                s = "giờ gửi báo cáo";
                check = true;
                break;
            } 
            case phongBanNhan: {
                s = "phòng ban nhận báo cáo";
                check = true;
                break;
            }
            case nguoiNhanBaocao: {
                s = "người nhận báo cáo";
                check = true;
                break;
            }
        }
        if (check) {
            Alert.alert(
                '',
                `Hãy nhập ${ s}`,
                [
                    { text: 'OK', style: "cancel" },
                ],

            );
            return;
        }
        const params = {
            baoCaoId: tenBaocao,
            ghiChu,
            lapLaiId: lapLai,
            gioGuiBaoCao: this.convertTime(gioGuiBaocao),
            nguoiNhanBaoCaoId: this.convertListnguoiNhanbaocao(nguoiNhanBaocao),
            phongBanNhanId: this.convertphongBanNhan(phongBanNhan),
        }
        
        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
          
            if (res.success) {
                Alert.alert(
                    "Thêm mới cài đặt thành công",
                    "",
                    [
                      { text: "OK", onPress: () => this.props.navigation.goBack() }
                    ]
                  );
            }
        })
    }

    render() {
        const {
            gioGuiBaocao,
            phongBanNhan,
            nguoiNhanBaocao,
            phongBanList,
            userList,
            isDateTimePickerVisible,
        } = this.state;
        const placeholder = {
            label: 'Chọn',
            value: null,
            color: '#9EA0A4',
        };
        const { screen } = this.props.route.params;
        tab = screen;

        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView>
                <View style={styles.container}>
                  <Text style={styles.boldText}>Tên báo cáo*:</Text>
                  <RNPickerSelect
                    placeholder={placeholder}
                    items={TenBaocaoList}
                    onValueChange={value => {
                                    this.setState({
                                        tenBaocao: value,
                                    });
                                }}

                    style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                    value={this.state.tenBaocao}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: 'yellow' }}
                    Icon={() => <Icon name="caret-down" size={25} color="black" />}
                  />
                  <Text style={styles.boldText}>Lặp lại*:</Text>
                  <RNPickerSelect
                    placeholder={placeholder}
                    items={LaplaiList}
                    onValueChange={value => {
                                    this.setState({
                                        lapLai: value,
                                    });
                                }}

                    style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                    value={this.state.lapLai}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: 'yellow' }}
                    Icon={() => <Icon name="caret-down" size={25} color="black" />}
                  />

                  <View style={styles.containerButton}>
                    <Text style={styles.boldText}>Giờ gửi báo cáo*</Text>
                    <Icon
                      style={{ alignContent: "flex-end", paddingLeft: 220 }}
                      name="user-clock"
                      color="black"
                      size={27}
                      onPress={() => this.setState({
                                        isDateTimePickerVisible: true,
                                    })}
                    />
                  </View>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    placeholder={convertDateFormatTo(gioGuiBaocao)}
                    inlineImageLeft='time_icon'
                    editable={false}
                    selectTextOnFocus={false}
                  />
                  {isDateTimePickerVisible && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={gioGuiBaocao}
                      mode="time"
                      is24Hour
                      display="default"
                      onChange={this.handleSelectDate}
                    />
                            )}
                  <Text style={styles.boldText}>Phòng ban nhận báo cáo*</Text>
                  <MultiSelect
                    ref={(component) => { this.multiSelect = component }}
                    getCollapsedNodeHeight={{ height: 200 }}
                    items={phongBanList}
                    single
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleListContainer={phongBanList && phongBanList.length > 9 ? { height: 200 } : null}
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText="Chọn đơn vị quản lý..."
                    onSelectedItemsChange={(item) => this.onSelectedDVQLChange(item)}
                    selectedItems={phongBanNhan}
                    submitButtonColor="#2196F3"
                  />
                  <Text style={styles.boldText}>Người nhận báo cáo*: </Text>
                  <ScrollView style={{ height: 200 }}>
                    <MultiSelect
                      items={userList}
                      uniqueKey="id"
                      single
                      getCollapsedNodeHeight={{ height: 150 }}
                      ref={(component) => { this.multiSelect = component }}
                      onSelectedItemsChange={(item) => this.onSelectedItemsChange(item)}
                      selectedItems={nguoiNhanBaocao}
                      IconRenderer={Icon}
                      selectText="Bấm để chọn tên"
                      searchInputPlaceholderText="Tìm kiếm..."
                      searchInputStyle={{ color: '#CCC' }}
                      submitButtonColor="#2196F3"
                    />
                  </ScrollView>

                  <Text style={styles.boldText}>Ghi chú</Text>
                  <TextInput
                    placeholderTextColor="black"
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
        borderRadius: 10,
        paddingHorizontal: 20,
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
    DvqlData: state.filterDVQLDataReducer.dvqlDataFilter,
});

export default connect(mapStateToProps)(ThemmoiCaidatScreen);