import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, Animated, SafeAreaView, FlatList, CheckBox, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { endPoint } from '../../../api/config';
import { createGetMethod } from '../../../api/Apis';
import { convertHinhthucTaisan } from '../../global/Helper';
import SearchComponent from '../../global/SearchComponent';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
const deviceWidth = Dimensions.get("window").width;
let tab = '';
var tempCheckValues = [];
const hinhThucList = [
    {
        label: 'Sửa chữa',
        value: 'Sửa chữa',
    },
    {
        label: 'Bảo dưỡng',
        value: 'Bảo dưỡng',
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
            listTaisanKhaibao: [],
            userKhaibao: "",
            dateKhaibao: "",
            contentKhaibao: "",
            checkBoxChecked: [],
            hinhthuc: '',
            diachiSuachua: '',
            dateSuachua: '',
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
        this.getUserDangnhap();
        this.rederDataList(this.props.DvqlDataFilter);
    }

    getUserDangnhap() {
        let url;
        url = `${endPoint.getuserDangnhap}`;
        createGetMethod(url)
            .then(res => {
                this.setState({
                    userKhaibao: res.result,
                })
            });

        var today = new Date();
        const date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
        if (date != null) {
            this.setState({
                dateKhaibao: date,
            })
        }
    }

    rederDataList(array) {
        let url;
        switch (tab) {
            case "tài sản mất":
                url = `${endPoint.TsMatgetAll}?`;
                break;
            case "tài sản hỏng":
                url = `${endPoint.TsHonggetAll}?`;
                break;
            case "tài sản thanh lý":
                url = `${endPoint.TsThanhlygetAll}?`;
                break;
            case "tài sản hủy":
                url = `${endPoint.TsHuygetAll}?`;
                break;
            case "tài sản sửa chữa/bảo dưỡng":
                url = `${endPoint.TsSuachuabaoduonggetAll}?`;
                break;
        }
        if (array && array.length > 0) {
            array.forEach(e => {
                url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
            });
            url += `IsSearch=${encodeURIComponent(`${true}`)}&`;
            url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
            url += `MaxResultCount=${encodeURIComponent(`${20}`)}`;

            createGetMethod(url)
                .then(res => {
                    this.setState({
                        toanboTaisan: '',
                    })
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
                        <Text style={styles.title}>Khai báo {tab} </Text>
                        <Text style={styles.boldText}>Người khai báo: </Text>
                        <TextInput
                            placeholderTextColor={'black'}
                            style={styles.bordered}
                            placeholder={userKhaibao}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                        <Text style={styles.boldText}>Ngày khai báo: </Text>
                        <TextInput
                            placeholderTextColor={'black'}
                            style={styles.bordered}
                            placeholder={dateKhaibao}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                        <Text style={styles.boldText}>Nội dung khai báo*: </Text>
                        <TextInput
                            placeholderTextColor={'black'}
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
                        <Text style={styles.title}>Khai báo sửa chữa/bảo dưỡng </Text>
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
                            Icon={() => {
                                return <Icon name="caret-down" size={25} color="black" />;
                            }}
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
                                    dateSuachua: date,
                                });
                            }}
                        />
                        <Text style={styles.boldText}>Nội dung khai báo*: </Text>
                        <TextInput
                            placeholderTextColor={'black'}
                            style={styles.borderedContentSuachuabaoduong}
                            onChangeText={(text) => {
                                this.setState({
                                    contentKhaibao: text,
                                });
                            }}
                        />
                        <Text style={styles.boldText}>Địa chỉ sửa chữa bảo dưỡng: </Text>
                        <TextInput
                            placeholderTextColor={'black'}
                            style={styles.borderedContentSuachuabaoduong}
                            onChangeText={(text) => {
                                this.setState({
                                    diachiSuachua: text,
                                });
                            }}
                        />
                    </View>
                )
        }
    }
    renderItemComponent = (data) => (
        <View style={styles.listItem}>
            <CheckBox
                value={this.state.checkBoxChecked[data.item.id]}
                onValueChange={() => this.checkBoxChanged(data.item.id, this.state.checkBoxChecked[data.item.id])}
            />
            <View style={styles.infor}>
                <Text numberOfLines={1} style={[{ fontWeight: "bold", paddingBottom: 3 }]}>SN: {data.item.serialNumber}</Text>
                <Text numberOfLines={1} style={{ paddingBottom: 3 }}>Tên: {data.item.tenTaiSan}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Phòng ban: {data.item.phongBanQuanLy}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Trạng thái: {convertHinhthucTaisan(data.item.hinhThuc)}</Text>
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
            <View style={styles.container}>
                {this.renderTabInfor(userKhaibao, dateKhaibao, dateSuachua)}
                <Text style={styles.boldText}> Chọn tài sản khai báo</Text>
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

export default connect(mapStateToProps)(KhaiBaoMatTaiSan);