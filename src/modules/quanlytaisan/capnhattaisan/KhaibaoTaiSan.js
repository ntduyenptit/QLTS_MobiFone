import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Animated, 
    SafeAreaView, 
    FlatList, 
    TouchableOpacity, 
    Alert 
} from 'react-native';
import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import { endPoint, hinhThucData } from '../../../api/config';
import { 
    createGetMethod, 
    createPostMethodWithToken,
 } from '../../../api/Apis';
import { convertHinhthucTaisan, currentDate } from '../../global/Helper';
import SearchComponent from '../../global/SearchComponent';
import { colors, fonts } from '../../../styles';
import { deviceWidth } from '../../global/LoaderComponent';

let tab = '';
const hinhThucList = [
    {
        label: 'Sửa chữa',
        value: 5,
    },
    {
        label: 'Bảo dưỡng',
        value: 6,
    },

]
const placeholder = {
    label: 'Chọn ...',
    value: null,
    color: '#9EA0A4',
};
class KhaiBaoMatTaiSan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            toanboTaisan: [],
            userKhaibao: "",
            dateKhaibao: "",
            contentKhaibao: "",
            checkBoxChecked: [],
            hinhthuc: '',
            dateSuachua: '',
            searchText: '',
            diachiSuachua: ''
        }
        this.screen = {
            param: props.route.params
        }
        this.updateSearchText = this.updateSearchText.bind(this);
    }

    componentDidMount() {
        const { screen } = this.props.route.params;
        this.props.navigation.setOptions({
            title: `Khai báo ${  screen}`,
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
              )})
        this.getUserDangnhap();
        this.renderDataList();
    }

    getUserDangnhap() {
        const url = `${endPoint.getuserDangnhap}`;
        createGetMethod(url)
            .then(res => {
                this.setState({
                    userKhaibao: res.result,
                })
            });

        const today = new Date();
        const date = `${today.getDate()  }/${parseInt(today.getMonth() + 1)}/${  today.getFullYear()}`;
        if (date != null) {
            this.setState({
                dateKhaibao: date,
            })
        }
    }

    saveNewTaiSan() {
        const {
            userKhaibao,
            contentKhaibao,
            checkBoxChecked,
            diachiSuachua,
            hinhthuc
        } = this.state;
        let url = '';
        let phanLoaiId;
        let message = '';
        switch (tab) {
            case "tài sản mất":
                url = `${endPoint.CreateTaiSanMat}`;
                phanLoaiId = 7;
                message = 'Khai báo tài sản mất thành công';
                break;
            case "tài sản hỏng":
                url = `${endPoint.CreateTaiSanHong}`;
                phanLoaiId = 8;
                message = 'Khai báo tài sản hỏng thành công';
                break;
            case "tài sản thanh lý":
                url = `${endPoint.CreateTaiSanThanhLy}`;
                phanLoaiId = 9;
                message = "Khai báo tài sản thanh lý thành công";
                break;
            case "tài sản hủy":
                url = `${endPoint.CreateTaiSanHuy}`;
                message = "Khai báo tài sản hủy thành công";
                phanLoaiId = 10;
                break;
            case "tài sản sửa chữa/bảo dưỡng":
                url = `${endPoint.CreateTaiSanSuaChuaBaoDuong}`;
                phanLoaiId = 6;
                message = "Khai báo tài sản sửa chữa/bảo dưỡng thành công";
                break;
                default:
                    break;
        }
        let assetList;
            let params = {};
            if (tab === "tài sản sửa chữa/bảo dưỡng") {
                assetList = checkBoxChecked.map(e => ({
                    taiSanId: e,
                    trangThaiId: 1
                }));
                params  = {
                    diaChi: diachiSuachua,
                    diaChiSuaChuaBaoDuong: diachiSuachua,
                    hinhThuc: hinhThucData.find(e => e.id === hinhthuc),
                    ngayKhaiBao: currentDate(),
                    noiDung: contentKhaibao,
                    noiDungKhaiBaoSuaChuaBaoDuong: contentKhaibao,
                    phanLoaiId : phanLoaiId,
                    phieuTaiSanChiTietList: assetList,
                    thoiGianBatDau: currentDate(),
                }
            } else {
                assetList = checkBoxChecked.map(e => ({
                    taiSanId: e
                }));
                params  = {
                    ngayKhaiBao: currentDate(),
                    nguoiKhaiBao: userKhaibao,
                    noiDung: contentKhaibao,
                    noiDungKhaiBao: contentKhaibao,
                    phanLoaiId: phanLoaiId,
                    phieuTaiSanChiTietList: assetList,
                    thoiGianKhaiBao: currentDate(),
                }
            }

        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(message, "",
                [
                    {text: 'OK', onPress: this.goBack()},
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

    checkBoxChanged(id) {
        const { checkBoxChecked } = this.state;

        const index = checkBoxChecked.indexOf(id);
        if (index > -1) {
            checkBoxChecked.splice(index, 1);
            this.setState({
                checkBoxChecked,
            });
        } else {
            checkBoxChecked.push(id);
        }
        this.setState({
            checkBoxChecked,
        });

    }

    updateSearchText(text) {
        this.setState({
            searchText: text
        },() => this.renderDataList());
    }

    renderDataList() {
        const { DvqlDataFilter } = this.props;
        const { searchText } = this.state;
        let url;
        switch (tab) {
            case "tài sản mất":
                url = `${endPoint.getTaiSanMat}?`;
                break;
            case "tài sản hỏng":
                url = `${endPoint.getTaiSanHong}?`;
                break;
            case "tài sản thanh lý":
                url = `${endPoint.getTaiSanThanhLy}?`;
                break;
            case "tài sản hủy":
                url = `${endPoint.getTaiSanHuy}?`;
                break;
            case "tài sản sửa chữa/bảo dưỡng":
                url = `${endPoint.getTaiSanSuaChuaBaoDuong}?`;
                break;
                default:
                    break;
        }
        if (DvqlDataFilter && DvqlDataFilter.length > 0) {
            DvqlDataFilter.forEach(e => {
                url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
            });

            if (searchText) {
                url += `TenTaiSan=${searchText}&`;
            }

            url += `IsSearch=${encodeURIComponent(`${true}`)}&`;
            url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
            url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;

            createGetMethod(url)
                .then(res => {
                    this.setState({
                        toanboTaisan: res.result.items,
                    })
                });

        }
    }

    renderTabInfor(userKhaibao, dateKhaibao, dateSuachua) {
        switch (tab) {
            case "tài sản mất":
            case "tài sản hỏng":
            case "tài sản thanh lý":
            case "tài sản hủy":
                return (
                  <View>
                    <Text style={styles.boldText}>Người khai báo: </Text>
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.bordered}
                      placeholder={userKhaibao}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                    <Text style={styles.boldText}>Ngày khai báo: </Text>
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.bordered}
                      placeholder={dateKhaibao}
                      editable={false}
                      selectTextOnFocus={false}
                    />
                    <Text style={styles.boldText}>Nội dung khai báo*: </Text>
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.borderedContent}
                      onChangeText={(text) => {
                                this.setState({
                                    contentKhaibao: text,
                                });
                            }}
                    />
                  </View>
                )
            case "tài sản sửa chữa/bảo dưỡng":
                return (
                  <View>
                    <Text style={styles.boldText}>Hình thức: </Text>
                    <RNPickerSelect
                      placeholder={placeholder}
                      items={hinhThucList}
                      onValueChange={value => {
                                this.setState({
                                    hinhthuc: value,
                                });
                            }}
                      style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                            }}
                      value={this.state.hinhthuc}
                      useNativeAndroidPickerStyle={false}
                      textInputProps={{ underlineColor: 'yellow' }}
                      Icon={() => <Icon name="caret-down" size={25} color="black" />}
                    />
                    <Text style={styles.boldText}>Thời gian bắt đầu: </Text>
                    <DatePicker
                      style={styles.datePickerStyle}
                      date={dateSuachua} // Initial date from state
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
                                    dateSuachua: date,
                                });
                            }}
                    />
                    <Text style={styles.boldText}>Nội dung khai báo*: </Text>
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.borderedContentSuachuabaoduong}
                      onChangeText={(text) => {
                                this.setState({
                                    contentKhaibao: text,
                                });
                            }}
                    />
                    <Text style={styles.boldText}>Địa chỉ sửa chữa bảo dưỡng: </Text>
                    <TextInput
                      placeholderTextColor="black"
                      style={styles.borderedContentSuachuabaoduong}
                      onChangeText={(text) => {
                                this.setState({
                                    diachiSuachua: text,
                                });
                            }}
                    />
                  </View>
                )
                default:
                    return null;
        }
    }

    renderItemComponent = (data) => (
      <View style={styles.listItem}>
        <CheckBox
          isChecked={this.state.checkBoxChecked.indexOf(data.item.id) > -1}
          onClick={() => this.checkBoxChanged(data.item.id)}
        />
        <View style={styles.infor}>
          {data.item.serialNumber ? (
            <View style={styles.itemInfor}>
              <Text style={styles.itemInfoTitle}>SN:</Text>
              <Text style={styles.itemInfoDes} numberOfLines={1}>{data.item.serialNumber}</Text>
            </View>
          ) : null}
          <View style={styles.itemInfor}>
            <Text style={styles.itemInfoTitle}>Tên:</Text>
            <Text style={[styles.itemInfoDes, { fontWeight: "bold", color: '#0040ff' }]}>{data.item.tenTaiSan}</Text>
          </View>
          <View style={styles.itemInfor}>
            <Text style={styles.itemInfoTitle}>Phòng ban:</Text>
            <Text style={styles.itemInfoDes}>{data.item.phongBanQuanLy}</Text>
          </View>
          <View style={styles.itemInfor}>
            <Text style={styles.itemInfoTitle}>Trạng thái:</Text>
            <Text style={styles.itemInfoDes} numberOfLines={1}>{convertHinhthucTaisan(data.item.hinhThuc)}</Text>
          </View>
        </View>
      </View>
    )

    render() {
        const { scrollYValue, toanboTaisan,
            userKhaibao,
            dateKhaibao,
            dateSuachua } = this.state;
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
          <View style={styles.container}>
            {this.renderTabInfor(userKhaibao, dateKhaibao, dateSuachua)}
            <Text style={styles.boldText}> Chọn tài sản khai báo</Text>
            <SafeAreaView
              style={{flex: 1}}
            >
              <SearchComponent
                clampedScroll={clampedScroll}
                action={this.updateSearchText}
              />
              <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                            margin: 10,
                            paddingTop: 55,
                            paddingBottom: 15,
                        }}
                contentContainerStyle={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            paddingBottom: 55,
                        }}
                onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                            { useNativeDriver: true },
                            () => { },          // Optional async listener
                        )}
                contentInsetAdjustmentBehavior="automatic"
              >
                <FlatList
                  keyExtractor={data => data.id}
                  scrollEnabled={false}
                  data={toanboTaisan}
                  renderItem={item => this.renderItemComponent(item)}
                />
              </Animated.ScrollView>
            </SafeAreaView>
          </View>
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
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
        padding: 5,
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 35,
        marginLeft: 5,
        marginRight: 5
    },
    borderedContent: {
        borderWidth: 0.5,
        height: 50,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 5,
        marginRight: 5
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
    datePickerStyle: {
        width: '100%',
        marginTop: 0,

    },
    itemInfoTitle: {
        fontWeight: "bold", 
        paddingRight: 5, 
        width: '25%'
    },
    itemInfoDes: {
        width: '75%'
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
});

export default connect(mapStateToProps)(KhaiBaoMatTaiSan);