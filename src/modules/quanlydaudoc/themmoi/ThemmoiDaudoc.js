/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, StyleSheet, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, } from '../../../api/config';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
let tab = '';

class ThemmoiDaudocScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenTS: '',
            loaiTaisan: '',
            SN: '',
            PN: '',
            nhaCungcap: '',
            hangSx: '',
            nguyenGia: '',
            ngayMua: '',
            ngayHetBh: '',
            ngayHetSd: '',
            ghiChu: '',
            nhaCCList: [],
            ReaderMACId: '',
        }
    }

    componentDidMount() {
        this.danhsachNhaCC(this.props.NhaCCData);
        this.renderLoaiTS();
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
    renderLoaiTS() {
        if (tab == 'Thêm mới đầu đọc di động') {
           this.setState ({
            loaiTaisan: '',
           })
            this.setState({
                loaiTaisan: 'Đầu đọc thẻ RFID',
            });
        } else {
            this.setState ({
                loaiTaisan: '',
               })
            this.setState({
                loaiTaisan: 'Đầu đọc cố định',
            });
        }
    }
    renderReaderMACView() {
       
        if (tab == 'Thêm mới đầu đọc di động') {
            return null
        } else {
            return (
                <View>
                    <Text style={styles.boldText}>ReaderMACId*</Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        style={styles.bordered}
                        onChangeText={(text) => {
                            this.setState({
                                ReaderMACId: text,
                            });
                        }}
                        editable={false}
                        selectTextOnFocus={false}
                    />
                </View>


            )
        }
    }
    render() {
        const {
            loaiTaisan,
            ngayMua,
            ngayHetBh,
            ngayHetSd,
            nhaCCList,
        } = this.state;
        const placeholder = {
            label: 'Chọn',
            value: null,
            color: '#9EA0A4',
        };
        const { screen } = this.props.route.params;
       tab = screen;
        console.log ("screen: " + screen);
        return (
            <Animated.View>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <Animated.ScrollView>
                        <View style={styles.container}>
                            <Text style={styles.boldText}>Tên đầu đọc*</Text>
                            <TextInput
                                placeholderTextColor={'black'}
                                style={styles.bordered}
                                onChangeText={(years) => {
                                    this.setState({
                                        tenTS: years,
                                    });
                                }}
                            />
                            <Text style={styles.boldText}>Loại tài sản*</Text>
                            <TextInput
                                placeholderTextColor={'black'}
                                style={styles.bordered}
                                placeholder={loaiTaisan}
                                editable={false}
                                selectTextOnFocus={false}
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
                            {this.renderReaderMACView()}
                            <Text style={styles.boldText}>Nhà cung cấp</Text>
                            <RNPickerSelect
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

                            <Text style={styles.boldText}>Ghi chú</Text>
                            <TextInput
                                placeholderTextColor={'black'}
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
    NhaCCData: state.filterNCCDataReducer.nccDataFilter,
});

export default connect(mapStateToProps)(ThemmoiDaudocScreen);