import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, Animated, SafeAreaView, FlatList, CheckBox, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { endPoint } from '../../../api/config';
import { createGetMethod } from '../../../api/Apis';
import SearchComponent from '../../global/SearchComponent';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
const deviceWidth = Dimensions.get("window").width;
let tab = '';
var tempCheckValues = [];

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
            checkBoxChecked: [],
        }
        this.screen = {
            param: props.route.params
        }
    }
    
    checkBoxChanged(id, value) {
        this.setState({
            checkBoxChecked: tempCheckValues
        })
        var tempCheckBoxChecked = this.state.checkBoxChecked;
        tempCheckBoxChecked[id] = !value;
        this.setState({
            checkBoxChecked: tempCheckBoxChecked
        })
    }

    componentDidMount() {
        this.renderUserList(this.props.DvqlDataFilter);
        this.renderBophanKiemkeList(this.props.DvqlDataFilter);
    }
   
    renderUserList() {
        let url;
        url = `${endPoint.getNguoidungKiemke}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        toanboUser: res.result,
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch(err => console.log(err));
    }

    renderBophanKiemkeList(data) {
        let list = [];
        for (let i = 0; i < data.length; i++) {
            let item = {
                label : data[i].displayName,
                value: data[i].displayName,
            }
            list.push(item);
        }
        this.setState({
            bophanKiemkeList : list,
        })
    }

    renderItemComponent = (data) => (
        <View style={styles.listItem}>
            <CheckBox
                value={this.state.checkBoxChecked[data.item.user.id]}
                onValueChange={() => this.checkBoxChanged(data.item.user.id, this.state.checkBoxChecked[data.item.user.id])}
            />
            <View style={styles.infor}>
                <Text numberOfLines={1} style={{ fontWeight: "bold", paddingBottom: 3 }}>Họ và Tên: {data.item.user.name}</Text>
                <Text numberOfLines={1} style={[{ paddingBottom: 3 }]}>Tên đăng nhập: {data.item.user.userName}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Địa chỉ email: {data.item.user.emailAddress}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Chức vụ: {data.item.user.chucVu}</Text>
            </View>
        </View>
    )

    render() {
        const { scrollYValue,
            toanboUser,
            dateBatdau,
            dateKethuc,
            trangThai,
            bophanKiemkeList
        } = this.state;
        const { screen } = this.props.route.params;
        tab = screen;
        console.log("{screen} " + tab);
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
                    placeholderTextColor={'black'}
                    style={styles.bordered}
                    onChangeText={(text) => {
                        this.setState({
                            tenKiemke: text,
                        });
                    }}
                />
                <Text style={styles.boldText}>Mã kiểm kê*</Text>
                <TextInput
                    placeholderTextColor={'black'}
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
                    style={styles.datePickerStyle}
                    date={dateBatdau} // Initial date from state
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
                    Icon={() => {
                        return <Icon name="caret-down" size={25} color="black" />;
                    }}
                />
                <Text style={styles.boldText}>Trạng thái</Text>
                <TextInput
                    placeholderTextColor={'black'}
                    style={styles.bordered}
                    placeholder={trangThai}
                    editable={false}
                    selectTextOnFocus={false}
                />
                <Text style={styles.boldText}> Thêm người kiểm kê</Text>
                <SafeAreaView>
                    <SearchComponent
                        clampedScroll={clampedScroll}
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
                            scrollEnabled={false}
                            data={toanboUser}
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
        padding: 5,
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
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
    toanbotaisanData: state.toanbotaisanReducer.toanbotaisanData,
    tokenUser: state.userReducer.token,
});

export default connect(mapStateToProps)(ThemmoiDotKiemke);