/* eslint-disable import/no-cycle */
import React from 'react';
import {
    Animated,
    SafeAreaView,
    StatusBar,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { endPoint } from '../../../api/config';
import { createPostMethodWithToken } from '../../../api/Apis';
import { colors, fonts } from '../../../styles';
import { deviceWidth } from '../../global/LoaderComponent';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';

class TaomoiLoaiTSScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maLoaiTS: '',
            tenLoaiTS: '',
            thuocLoaiTS: '',
            ghiChu: '',
            loaiTSList: [],
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.saveNewLoaiTS()}
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
        this.danhsachLoaiTS(this.props.LoaiTSData);
    }

    danhsachLoaiTS(data) {
        if (data) {
            const list = data.map(e => ({
                name: e.text,
                id: e.value,
            }));
            this.setState({
                loaiTSList: list,
            });
        }
    }
;
    saveNewLoaiTS() {
        const {
            maLoaiTS,
            tenLoaiTS,
            thuocLoaiTS,
            ghiChu,
        } = this.state;
        let s = '';
        let check = false;
        switch ("") {
            case maLoaiTS:
                {
                    s = "mã loại tài sản";
                    check = true;
                    break;
                }
            case tenLoaiTS: {
                s = "tên loại tài sản";
                check = true;
                break;
            }
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
        const url = `${endPoint.CreatLoaiTaisan}`;
        const params = {
            ghiChu,
            ma: maLoaiTS,
            taiSanChaId: thuocLoaiTS[0],
            ten: tenLoaiTS,
        }

        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    '',
                    'Thêm mới loại tài sản thành công',
                    [
                        { text: 'OK', onPress: this.props.navigation.goBack() },
                    ],

                );

            }
        })
    }

    render() {
        const {
            thuocLoaiTS,
            loaiTSList
        } = this.state;
        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView>
                <View style={styles.container}>
                  <Text style={styles.boldText}>Mã loại tài sản*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Nhập tên"
                    style={styles.bordered}
                    onChangeText={(maLoaiTS) => {
                                    this.setState({
                                        maLoaiTS,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Tên loại tài sản*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(tenLoaiTS) => {
                                    this.setState({
                                        tenLoaiTS
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Thuộc loại tài sản</Text>
                  <MultiSelect
                    ref={(component) => { this.multiSelect = component }}
                    getCollapsedNodeHeight={{ height: 200 }}
                    items={loaiTSList}
                    single
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleListContainer={loaiTSList && loaiTSList.length > 9 ? { height: 200 } : null}
                    uniqueKey="id"
                    selectText="Chọn loại tài sản..."
                    onSelectedItemsChange={(thuocLoaiTS) => this.setState({
                                    thuocLoaiTS
                                })}
                    selectedItems={thuocLoaiTS}
                    submitButtonColor="#2196F3"
                  />

                  <Text style={styles.boldText}>Ghi chú</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    onChangeText={(ghiChu) => {
                                    this.setState({
                                        ghiChu
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
    title: {
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic'
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        height: 50,
        marginLeft: 5,
    },
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
        padding: 10,
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
});
export default connect(mapStateToProps)(TaomoiLoaiTSScreen);