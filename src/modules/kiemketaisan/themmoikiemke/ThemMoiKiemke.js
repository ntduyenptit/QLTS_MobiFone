import React from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, Animated, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import { endPoint } from '../../../api/config';
import { createGetMethod, createPostMethodWithToken } from '../../../api/Apis';
import { colors, fonts } from '../../../styles';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { convertDateToIOSString } from '../../global/Helper';

const deviceWidth = Dimensions.get("window").width;
let tab = '';
const tempCheckValues = [];

class ThemmoiDotKiemke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            toanboUser: [],
            tenKiemke: "",
            maKiemke: "",
            dateBatdau: "",
            dateKethuc: '',
            trangThai: 'Chưa bắt đầu',
            boPhanKiemke: '',
            bophanKiemkeList: [],
            userKiemke: [],
        }
        this.screen = {
            param: props.route.params
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.saveNewKiemke()}
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
        this.renderUserList(this.props.DvqlDataFilter);
        this.renderBophanKiemkeList(this.props.DvqlDataFilter);
    }

    convertList(array) {
        const list =  [];
        for (let i = 0; i < array.length; i++) {
            list.push(array[i]);
        }
        return list;
    }

    saveNewKiemke() {
        const {
            tenKiemke,
            maKiemke,
            dateBatdau,
            dateKethuc,
            boPhanKiemke,
            userKiemke,
        } = this.state;
        let s = '';
        let check = false;
        switch ("") {
            case tenKiemke:
                {
                    s = "tên đợt kiểm kê";
                    check = true;
                    break;
                }
            case maKiemke: {
                s = "mã đợt kiểm kê";
                check = true;
                break;
            }
            case dateBatdau:
                {
                    s = "ngày bắt đầu";
                    check = true;
                    break;
                }
            case dateKethuc: {
                s = "ngày kết thúc";
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
        const url = `${endPoint.creatKiemke}`;
        const params = {
            boPhanDuocKiemKeId: boPhanKiemke,
            doiKiemKeIdList: this.convertList(userKiemke),
            maKiemKe: maKiemke,
            tenKiemKe: tenKiemke,
            thoiGianBatDauDuKien: dateBatdau && convertDateToIOSString(dateBatdau),
            thoiGianKetThucDuKien: dateKethuc && convertDateToIOSString(dateKethuc),
            trangThaiId: 0,
        }
        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert('Thêm mới đợt kiểm kê thành công',
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
        navigation.goBack();
    }

    renderUserList() {
        const url = `${endPoint.getNguoidung}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    const list = res.result.map(e => ({
                        name: e.user.name,
                        id: e.user.id,
                    }))
                    this.setState({
                        toanboUser: list,
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch();
    }

    renderBophanKiemkeList(data) {
        const list = [];
        for (let i = 0; i < data.length; i++) {
            const item = {
                label: data[i].displayName,
                value: data[i].id,
            }
            list.push(item);
        }
        this.setState({
            bophanKiemkeList: list,
        })
    }

    onSelectedItemsChange = userKiemke => {
        
        this.setState({ userKiemke });
    };

    render() {
        const { scrollYValue,
            toanboUser,
            dateBatdau,
            dateKethuc,
            trangThai,
            bophanKiemkeList,
            userKiemke
        } = this.state;
        const { screen } = this.props.route.params;
        tab = screen;
        const clampedScroll = Animated.diffClamp(
            Animated.add(
                scrollYValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: 'clamp',
                }),
                new Animated.Value(0),
            ),
            0,
            50,
        )
        return (
          <ScrollView style={styles.container}>
            <Text style={styles.boldText}>Tên đợt kiểm kê*</Text>
            <TextInput
              placeholderTextColor="black"
              style={styles.bordered}
              onChangeText={(text) => {
                        this.setState({
                            tenKiemke: text,
                        });
                    }}
            />
            <Text style={styles.boldText}>Mã kiểm kê*</Text>
            <TextInput
              placeholderTextColor="black"
              style={styles.bordered}
              onChangeText={(text) => {
                        this.setState({
                            maKiemke: text,
                        });
                    }}
              selectTextOnFocus={false}
            />
            <Text style={styles.boldText}>Thời gian bắt đầu dự kiến</Text>
            <DatePicker
              style={{width:'100%'}}
              date={dateBatdau} // Initial date from state
              mode="date" // The enum of date, datetime and time
              display="default"
              placeholder="Chọn ngày"
              format="DD-MM-YYYY"
              confirmBtnText="Chọn"
              cancelBtnText="Thoát"
              customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            right: 0,
                            top: 0,
                        },
                        dateInput: {
                            marginLeft: 5,
                        },
                        datePickerCon: { backgroundColor: 'black'}
                    }}
              onDateChange={(date) => {
                        this.setState({
                            dateBatdau: date,
                        });
                    }}
            />
            <Text style={styles.boldText}>Thời gian kết thúc dự kiến</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={dateKethuc} // Initial date from state
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
                        datePickerCon: { backgroundColor: 'black'}
                    }}
              onDateChange={(date) => {
                        this.setState({
                            dateKethuc: date,
                        });
                    }}
            />
            <Text style={styles.boldText}>Bộ phận được kiểm kê</Text>
            <RNPickerSelect
              items={bophanKiemkeList}
              onValueChange={value => {
                        this.setState({
                            boPhanKiemke: value,
                        });
                    }}

              style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                            top: 10,
                            right: 12,
                        },
                    }}
              value={this.state.boPhanKiemke}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColor: 'yellow' }}
              Icon={() => <Icon name="caret-down" size={25} color="black" />}
            />
            <Text style={styles.boldText}>Trạng thái</Text>
            <TextInput
              placeholderTextColor="black"
              style={styles.bordered}
              placeholder={trangThai}
              editable={false}
              selectTextOnFocus={false}
            />
            <ScrollView style={{height: 300}}>
              <Text style={styles.boldText}> Thêm người kiểm kê</Text>
              <MultiSelect
                items={toanboUser}
                uniqueKey="id"
                ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={(item) => this.onSelectedItemsChange(item)}
                selectedItems={userKiemke}
                IconRenderer={Icon}
                selectText="Bấm để chọn tên"
                searchInputPlaceholderText="Tìm kiếm..."
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#2196F3"
              />
            </ScrollView>
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
        padding: 5,
    },
    bordered: {
        borderWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 40,
        marginLeft: 3,
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
        height: 95,
    },
    infor: {
        marginLeft: 10,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        height: 50,
        paddingBottom: 10,
    },
    datePickerStyle: {
        width: '100%',
        marginTop: 0,

    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        marginLeft: 5,
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
    toanbotaisanData: state.toanbotaisanReducer.toanbotaisanData,
    tokenUser: state.userReducer.token,
});

export default connect(mapStateToProps)(ThemmoiDotKiemke);