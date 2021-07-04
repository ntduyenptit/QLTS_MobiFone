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
import { getLTSDataFilter } from '@app/modules/global/FilterApis';
import { endPoint } from '../../../../api/config';
import { createPostMethodWithToken } from '../../../../api/Apis';
import { colors, fonts } from '../../../../styles';
import { deviceWidth } from '../../../global/LoaderComponent';
import MultiSelect from '../../../../libs/react-native-multiple-select/lib/react-native-multi-select';

class UpdateLoaiTSScreen extends React.Component {
    constructor(props) {
        super(props);
        const data = this.props.route.params.paramKey;
        this.state = {
            id: data?.id,
            maLoaiTS: data?.ma || '',
            tenLoaiTS: data?.ten || '',
            thuocLoaiTS: '',
            ghiChu: data?.ghiChu,
            loaiTSList: [],
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.updateLoaiTS()}
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
        this.danhsachLoaiTS();
    }

    danhsachLoaiTS() {
        const data = this.props.LoaiTSData;
        if (data && data.length > 0) {
            this.setState({
                loaiTSList: data,
            });
        } else {
            getLTSDataFilter().then(res => this.setState({
                loaiTSList: res.result,
            }));
        }
    }
;
    updateLoaiTS() {
        const {
            id,
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
        const url = `${endPoint.CreatLoaiTaisan}`;
        const params = {
            id,
            ghiChu,
            ma: maLoaiTS,
            taiSanChaId: thuocLoaiTS[0],
            ten: tenLoaiTS,
        }

        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    '',
                    'Cập nhật loại tài sản thành công',
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

    render() {
        const {
            thuocLoaiTS,
            loaiTSList,
            tenLoaiTS,
            maLoaiTS,
            ghiChu
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
                    defaultValue={maLoaiTS}
                    style={styles.bordered}
                    onChangeText={(text) => {
                                    this.setState({
                                        maLoaiTS: text,
                                    });
                                }}
                  />
                  <Text style={styles.boldText}>Tên loại tài sản*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    defaultValue={tenLoaiTS}
                    onChangeText={(text) => {
                                    this.setState({
                                        tenLoaiTS: text
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
                    uniqueKey="value"
                    displayKey="text"
                    selectText="Chọn loại tài sản..."
                    onSelectedItemsChange={(item) => this.setState({
                                    thuocLoaiTS: item
                                })}
                    selectedItems={thuocLoaiTS}
                    submitButtonColor="#2196F3"
                  />

                  <Text style={styles.boldText}>Ghi chú</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    defaultValue={ghiChu}
                    onChangeText={(text) => {
                                    this.setState({
                                        ghiChu: text
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
export default connect(mapStateToProps)(UpdateLoaiTSScreen);