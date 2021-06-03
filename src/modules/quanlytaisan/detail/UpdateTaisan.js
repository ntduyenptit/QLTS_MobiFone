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
let Taisan= '';
let list = '';
class UpdateTaisanScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nguonKinhphiList: [],
            tenTS: this.props.route.params.paramKey.tenTS,
            loaiTaisan: this.props.route.params.paramKey.loaiTS,
            SN: this.props.route.params.paramKey.serialNumber,
            PN: this.props.route.params.paramKey.productNumber,
            hangSx: this.props.route.params.paramKey.hangSanXuat,
            nguyenGia: this.props.route.params.paramKey.nguyenGia,
            ngayMua: this.props.route.params.paramKey.ngaymua,
            ngayHetBh: this.props.route.params.paramKey.ngayBaoHanh,
            ngayHetSd: this.props.route.params.paramKey.hanSD,
            maSudung: this.props.route.params.paramKey.dropdownMultiple,
            nhaCungcap: this.props.route.params.paramKey.nhaCC,
            trichKhauhao: this.props.route.params.paramKey.thoiGianChietKhauHao,
            imageList: this.props.route.params.paramKey.listHinhAnh,
        };
        this.chosenPicker = this.chosenPicker.bind(this)
    }

    componentDidMount() {
        Promise.all([
            this.props.navigation.setOptions({headerRight: () => (
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
                  )}),
            this.getNguonKinhPhi(),
           // this.setData(Taisan),
        ]);
    }
    setData(paramKey) {
        console.log ("paramKey.tenTS: "+paramKey.tenTS);
        this.setState ({
            tenTS: paramKey.tenTS,
            loaiTaisan: paramKey.loaiTS,
            SN: paramKey.serialNumber,
            PN: paramKey.productNumber,
            hangSx: paramKey.hangSanXuat,
            nguyenGia: paramKey.nguyenGia,
            ngayMua: paramKey.ngaymua,
            ngayHetBh: paramKey.ngayBaoHanh,
            ngayHetSd: paramKey.hanSD,
            maSudung: paramKey.dropdownMultiple,
            nhaCungcap: paramKey.nhaCC,
            trichKhauhao: paramKey.thoiGianChietKhauHao,
            imageList: paramKey.listHinhAnh,

        })
    }
    getNguonKinhPhi() {
        const url = `${endPoint.getAllNguonKinhPhi}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        nguonKinhphiList: res.result,
                    });
                }
            })
    }
    getAssetMoreInfo() {
        let url = `${endPoint.GetTaiSan}?`;
        url += `input=${idTaisan}&isView=true`;
      
        createGetMethod(url).then(res => {
          if (res.success) {
            const imageList = res.result.listHinhAnh.map(e => `${imageBaseUrl}${e.linkFile.replace(/\\/g, "/")}`);
            this.setState({
              images: imageList,
              taisan: res.result,
            });
          }
        });
      }
    chosenPicker = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            compressImageMaxHeight: 400,
            compressImageMaxWidth: 400,
            multiple: true
        }).then(images => {
            if (images && images.length < 4) {
                if (Platform.OS === 'ios') {
                    this.setState({
                        imageList: images.map(e => ({
                            tenFile: e.path.split('/').pop() || moment().toString(),
                            linkFile: e.sourceURL,
                            path: e.path,
                            mime: e.mime,
                        }))
                    });
                } else {
                    this.setState({
                        imageList: images.map(e => ({
                            tenFile: e.path.split('/').pop(),
                            linkFile: e.path,
                            path: e.path,
                            mime: e.mime
                        }))
                    });
                }
            }
        });
    }

    saveNewTaiSan() {
        const { 
            maSudung, 
            hangSx, 
            imageList, 
            loaiTaisan,
            ngayHetBh,
            nguonKinhphi,
            nguyenGia,
            nhaCungcap,
            PN,
            SN,
            tenTS,
            trichKhauhao,
            ngayHetSd,
            ngayMua
         } = this.state;
        const url = `${endPoint.TsAllCreateOrEdit}`;
        const urlUpload = `${endPoint.ToanBoTSUpload}`;
        console.log("idTaisan: " + idTaisan);
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
        // eslint-disable-next-line no-undef
        const fromData = new FormData();

            imageList.forEach((e, index) => {
                fromData.append(`${index + 1}`, { type: e.mime, uri: e.path, name: e.tenFile })
            });
            
            if (imageList.length > 0) {
                createPostMultiFiles(urlUpload, fromData).then((res) => {
                    if (res.success) {
                        const images = imageList.map(e => ({
                                tenFile: e.tenFile,
                                linkFile: getLinkFile(res, e.tenFile)
                            }));
                        const params  = {
                            dropdownMultiple: maSudung[0],
                            ghiChu: "",
                            giaCuoiTS: '',
                            id: idTaisan,
                            hangSanXuat: hangSx,
                            listFile: [],
                            listHA: images,
                            loaiTS: loaiTaisan[0],
                            ngayBaoHanh: ngayHetBh && convertDateToIOSString(ngayHetBh),
                            hanSD: ngayHetSd && convertDateToIOSString(ngayHetSd),
                            ngayMua: ngayMua && convertDateToIOSString(ngayMua),
                            nguonKinhPhiId: nguonKinhphi && nguonKinhphi[0],
                            nguyenGia,
                            nhaCC: nhaCungcap && nhaCungcap[0],
                            noiDungChotGia: "",
                            productNumber: PN,
                            serialNumber: SN,
                            tenTS,
                            thoiGianChietKhauHao: trichKhauhao
                        }
        
                        createPostMethodWithToken(url, JSON.stringify(params)).then((result) => {
                            if (result.success) {
                                Alert.alert('Thêm mới tài sản thành công',
                                '',
                                [
                                    {text: 'OK', onPress: this.goBack()},
                                ],
                                { cancelable: false }
                                );
                            }
                        })
                    }
                });
            } else {
                const params  = {
                    dropdownMultiple: maSudung[0],
                    ghiChu: "",
                    giaCuoiTS: "",
                    hangSanXuat: hangSx,
                    listFile: [],
                    listHA: [],
                    loaiTS: loaiTaisan[0],
                    id: idTaisan,
                    ngayBaoHanh: ngayHetBh && convertDateToIOSString(ngayHetBh),
                    hanSD: ngayHetSd && convertDateToIOSString(ngayHetSd),
                    ngayMua: ngayMua && convertDateToIOSString(ngayMua),
                    nguonKinhPhiId: nguonKinhphi && nguonKinhphi[0],
                    nguyenGia,
                    nhaCC: nhaCungcap && nhaCungcap[0],
                    noiDungChotGia: "",
                    productNumber: PN,
                    serialNumber: SN,
                    tenTS,
                    thoiGianChietKhauHao: trichKhauhao
                }
                createPostMethodWithToken(url, JSON.stringify(params)).then((result) => {
                    if (result.success) {
                        Alert.alert('Cập nhật tài sản thành công',
                        '',
                        [
                            {text: 'OK', onPress: this.goBack()},
                        ],
                        { cancelable: false }
                        );
                    }
                })
            }


    }

    goBack() {
        const { navigation, route } = this.props;
        route.params.onGoBack();
        navigation.goBack();
    }

    render() {
        const {
            tenTS,
            imageList,
            trichKhauhao,
            loaiTaisan,
            nguonKinhphi,
            ngayMua,
            ngayHetBh,
            ngayHetSd,
            maSudung,
            nhaCungcap,
            nguonKinhphiList,
        } = this.state;
        const {paramKey,idTs} = this.props.route.params;
        console.log("loaiTaisan "+ loaiTaisan);
        Taisan = paramKey;
        idTaisan = idTs;
        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView
                              >
                <View style={styles.container}>
                  <Text style={styles.boldText}>Tên tài sản*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={tenTS}
                    style={styles.bordered}
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
                   // placeholder={paramKey.serialNumber}
                    onChangeText={(SN) => {
                                    this.setState({
                                        SN,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>P/N (Product Number)</Text>
                  <TextInput
                    placeholderTextColor="black"
                   // placeholder={paramKey.productNumber}
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
                    placeholder={paramKey.hangSanXuat}
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
                    placeholder={paramKey.nguyenGia}
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
                  <Text style={styles.boldText}>Thời gian trích khấu hao (năm)</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder = {paramKey.thoiGianChietKhauHao}
                    style={styles.bordered}
                    onChangeText={(time) => {
                                    this.setState({
                                        trichKhauhao: time,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Thời gian hết khấu hao</Text>
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={addYearToDate(ngayMua, trichKhauhao)} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    borderRadius='15'
                    disabled
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
                  />
                  <Text style={styles.boldText}>Nguồn kinh phí</Text>
                  <MultiSelect
                    single
                    items={nguonKinhphiList}
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText=""
                    onSelectedItemsChange={(item) => this.setState({
                        nguonKinhphi: item,
                                    })}
                    selectedItems={nguonKinhphi}
                  />
                  <Text style={styles.boldText}>Mã sử dụng</Text>
                  <MultiSelect
                    single
                    items={this.props.MaSuDungData}
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    uniqueKey="id"
                    displayKey="displayName"
                    selectText={paramKey.maSudung}
                    onSelectedItemsChange={(item) => this.setState({
                        maSudung: item,
                                    })}
                    selectedItems={maSudung}
                  />
                  <View style={styles.selectContainer}>
                    <Text style={styles.boldText}>Hình ảnh</Text>
                    <TouchableOpacity onPress={this.chosenPicker} style={styles.button}>
                      <Text style={styles.buttonText}> Bấm để chọn ảnh  </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: 'row', flex: 1, paddingLeft: 20, paddingRight: 20 }}>
                    <FlatList
                      data={imageList}
                      keyExtractor={(item) => item.filename}
                      numColumns={3}
                      renderItem={({ item, index }) =>
                                    (
                                      <View style={{padding: 5, flexDirection: 'row'}}>
                                        <Image
                                          key={item.tenFile}
                                          source={{ uri: item.linkFile }}
                                          style={{ width: 100, height: 100, borderRadius: 5 }}
                                        />
                                        <TouchableHighlight
                                          style={{
                                            alignItems: 'flex-end', top: 0, right: -8,  position: 'absolute', backgroundColor: 'transparent'
                                        }}
                                          onPress={()=> {
                                              const newImages = [...imageList];
                                              newImages.splice(index, 1);
                                              this.setState({
                                                  imageList: newImages,
                                              });
                                          }}
                                        >
                                          <Icon name="times" color='#DC143C' size={28} />
                                        </TouchableHighlight>
                                      </View>
                                    )}
                    />

                  </View>
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
    MaSuDungData: state.filterMSDDataReducer.msdDataFilter
});

export default connect(mapStateToProps)(UpdateTaisanScreen);