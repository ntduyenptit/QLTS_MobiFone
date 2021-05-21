/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux';
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

const nguonKinhphiList = [
    {
        label: 'Quỹ phát triển khoa học công nghệ',
        value: 'Quỹ phát triển khoa học công nghệ',
    },
    {
        label: 'Sản xuất kinh doanh',
        value: 'baseball',
    },
    {
        label: 'Sản xuất kinh doanh',
        value: 'Sản xuất kinh doanh',
    },
];
const maSudungList = [
    {
        label: 'RFID',
        value: 'RFID',
    },
    {
        label: 'Barcode',
        value: 'Barcode',
    },
    {
        label: 'QR Code',
        value: 'QR Code',
    },
]
class TaomoiTaisanScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollYValue: new Animated.Value(0),
            toanboData: [],
            tenTS: '',
            loaiTaisan: '',
            SN: '',
            PN: '',
            hangSx: '',
            nguyenGia: '',
            nguonKinhphi: '',
            ngayMua: '',
            ngayHetBh: '',
            ngayHetSd: '',
            maSudung: '',
            nhaCungcap: '',
            trichKhauhao: '',
            hetKhauhao: '',
            hinhanh: {},
            tailieu: '',
            loaiTSList: [],
            nhaCCList: [],
        }
    }

    componentDidMount() {
        this.danhsachLoaiTS(this.props.LoaiTSData);
        this.danhsachNhaCC(this.props.NhaCCData);
    }

    danhsachLoaiTS(data) {
        if (data != null) {
            let list = [];
            for (let i = 0; i < data.length; i++) {
                let item = {
                    label: data[i].text,
                    value: data[i].text,
                };
                list.push(item);
            }
            this.setState({
                loaiTSList: list,
            });
        } else {
            let url;
            url = `${endPoint.getAllLoaiTaiSanTree}`;
            createGetMethod(url)
                .then(res => {
                    if (res) {
                        let list = [];
                        let data = res.result;
                        for (let i = 0; i < data.length; i++) {
                            let item = {
                                label: data[i].text,
                                value: data[i].text,
                            };
                            list.push(item);
                        }
                        this.setState({
                            loaiTSList: list,
                        });
                    } else {
                        // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    danhsachNhaCC(data) {
        if (data != null) {
            let list = [];
            for (let i = 0; i < data.length; i++) {
                let item = {
                    label: data[i].displayName,
                    value: data[i].displayName,
                };
                list.push(item);
            }
            this.setState({
                nhaCCList: list,
            });
        } else {
            let url;
            url = `${endPoint.getAllNhaCungCap}`;
            createGetMethod(url)
                .then(res => {
                    if (res) {
                        let list = [];
                        let data = res.result;
                        for (let i = 0; i < data.length; i++) {
                            let item = {
                                label: data[i].displayName,
                                value: data[i].displayName,
                            };
                            list.push(item);
                        }
                        this.setState({
                            nhaCCList: list,
                        });
                    } else {
                        // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    selectFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, res => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                let source = res;
                this.setState({
                    hinhanh: source,
                });
            }
        });
    };

    render() {
        const {
            scrollYValue,
            toanboData,
            loaiTaisan,
            nguonKinhphi,
            ngayMua,
            ngayHetBh,
            ngayHetSd,
            maSudung,
            loaiTSList,
            nhaCCList,
        } = this.state;
        const placeholder = {
            label: 'Chọn ...',
            value: null,
            color: '#9EA0A4',
        };
        return (
            <Animated.View>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <Animated.ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            margin: 10,
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
                        <View style={styles.container}>
                            <Text style={styles.boldText}>Tên tài sản*</Text>
                            <TextInput
                                placeholderTextColor={'black'}
                                placeholder="Nhập tên tài sản"
                                style={styles.bordered}
                                onChangeText={(years) => {
                                    this.setState({
                                        tenTS: years,
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Loại tài sản*</Text>
                            <RNPickerSelect
                                placeholder={placeholder}
                                items={loaiTSList}
                                onValueChange={value => {
                                    this.setState({
                                        loaiTaisan: value,
                                    });
                                }}

                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                value={this.state.loaiTaisan}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ underlineColor: 'yellow' }}
                                Icon={() => {
                                    return <Icon name="caret-down" size={25} color="black" />;
                                }}
                            />

                            <Text style={styles.boldText}>S/N (Serial Number)</Text>
                            <TextInput
                                placeholderTextColor={'black'}
                                style={styles.bordered}
                                onChangeText={(years) => {
                                    this.setState({
                                        SN: years,
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>P/N (Product Number)</Text>
                            <TextInput
                                placeholderTextColor={'black'}
                                style={styles.bordered}
                                onChangeText={(years) => {
                                    this.setState({
                                        PN: years,
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Nhà cung cấp</Text>
                            <RNPickerSelect
                                placeholder={placeholder}
                                items={nhaCCList}
                                onValueChange={value => {
                                    this.setState({
                                        nhaCungcap: value,
                                    });
                                }}

                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                value={this.state.nhaCungcap}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ underlineColor: 'yellow' }}
                                Icon={() => {
                                    return <Icon name="caret-down" size={25} color="black" />;
                                }}
                            />
                            <Text style={styles.boldText}>Hãng sản xuất</Text>
                            <TextInput
                                placeholderTextColor={'black'}
                                style={styles.bordered}
                                onChangeText={(years) => {
                                    this.setState({
                                        hangSx: years,
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Nguyên giá (VND)</Text>
                            <TextInput
                                placeholderTextColor={'black'}
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
                                        //display: 'none',
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
                                        //display: 'none',
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
                                        //display: 'none',
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
                            <Text style={styles.boldText}>Thời gian trích khâu hao (năm)</Text>
                            <TextInput
                                placeholderTextColor={'black'}
                                style={styles.bordered}
                                onChangeText={(years) => {
                                    this.setState({
                                        trichKhauhao: years,
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Thời gian hết khấu hao</Text>
                            <TextInput
                                placeholderTextColor={'black'}
                                style={styles.bordered}
                                onChangeText={(years) => {
                                    this.setState({
                                        hetKhauhao: years,
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Nguồn kinh phí</Text>
                            <RNPickerSelect
                                placeholder={placeholder}
                                items={nguonKinhphiList}
                                onValueChange={value => {
                                    this.setState({
                                        nguonKinhphi: value,
                                    });
                                }}

                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                value={this.state.nguonKinhphi}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ underlineColor: 'yellow' }}
                                Icon={() => {
                                    return <Icon name="caret-down" size={25} color="black" />;
                                }}
                            />
                            <Text style={styles.boldText}>Mã sử dụng</Text>
                            <RNPickerSelect
                                placeholder={placeholder}
                                items={maSudungList}
                                onValueChange={value => {
                                    this.setState({
                                        maSudung: value,
                                    });
                                }}

                                style={{
                                    ...pickerSelectStyles,
                                    iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                value={this.state.maSudung}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ underlineColor: 'yellow' }}
                                Icon={() => {
                                    return <Icon name="caret-down" size={25} color="black" />;
                                }}
                            />
                            <View style={styles.selectContainer}>
                                <Text style={styles.boldText}>Hình ảnh</Text>
                                <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
                                    <Text style={styles.buttonText}> Bấm để chọn ảnh  </Text>
                                </TouchableOpacity>
                            </View>

                            <Image
                                source={{ uri: this.state.hinhanh.uri }}
                                style={{ width: 100, height: 100, alignSelf: 'center' }}
                            />
                            <TouchableOpacity onPress={this.selectFile} style={styles.button2}  >
                                <Text style={styles.buttonText}> Lưu tài sản  </Text>
                            </TouchableOpacity>
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
    LoaiTSData: state.filterLTSDataReducer.ltsDataFilter,
    NhaCCData: state.filterNCCDataReducer.nccDataFilter,
});

export default connect(mapStateToProps)(TaomoiTaisanScreen);