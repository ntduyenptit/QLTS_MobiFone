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
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { endPoint } from '@app/api/config';
import { createGetMethod, createPostMethodWithToken } from '@app/api/Apis';
import { colors, fonts } from '../../../../styles';
import { deviceWidth } from '../../../global/LoaderComponent';
import find from 'lodash/find';
import MultiSelect from '../../../../libs/react-native-multiple-select/lib/react-native-multi-select';

class UpdateVitriDialyScreen extends React.Component {
    constructor(props) {
        super(props);
        const data = this.props.route.params.paramKey;
        this.state = {
            tenVitri: data?.tenViTri || '',
            tinhId: '',
            quanId: '',
            isFirst: true,
            tinh: data?.tinhThanh || '',
            quan: data?.quanHuyen || '',
            diachi: data?.diaChi || '',
            ghiChu: data?.ghiChu || '',
            TinhthanhList: [],
            QuanhuyenList: [],
            id: this.props.route.params?.idTs
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => this.saveNewVitri()}
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
        this.getAllTinhthanh();
    }

    getAllTinhthanh() {
        const { tinh, isFirst } = this.state;
        const url = `${endPoint.getAllTinhthanh}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    const list = res.result.map(e => ({
                        name: e.displayName,
                        id: e.id
                    }));
                    this.setState({
                        TinhthanhList: list,
                    }, () => {
                        if (tinh !== '' && isFirst) {
                            const tinhThanhId = find(list, e => e.name === tinh).id;
                            this.setState({
                                tinhId: [tinhThanhId]
                            }, () => this.getAllQuanHuyen(tinhThanhId));
                        }
                    });
                }
            })
    }

    getAllQuanHuyen(idTinh) {
        const { quan, isFirst } = this.state;
        const url = `services/app/ViTriDiaLy/GetAllDtoQuanHuyenFromTT?tinhthanhId=${  idTinh}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    const list = res.result.map(e => ({
                        name: e.displayName,
                        id: e.id
                    }));
                    this.setState({
                        QuanhuyenList: list,
                    }, () => {
                        if (quan !== '' && isFirst) {
                            const quanHuyenId = find(list, e => e.name === quan).id;
                            this.setState({
                                quanId: [quanHuyenId],
                                isFirst: false,
                            });
                        }
                    });
                }
            })
    }

    onSelectedTinhThanhChange = (item) => {
        this.setState({
            tinhId: item,
        }, () => this.getAllQuanHuyen(item));
    }

    saveNewVitri() {
        const {
            id,
            tenVitri,
            tinhId,
            quanId,
            diachi,
            ghiChu,
        } = this.state;
        let s = '';
        let check = false;
        switch("") {
            case tenVitri: 
            {
                s = "tên vị trí";
                check = true;
                break;
            }
            case tinhId: {
                s = "tỉnh/thành phố";
                check = true;
                break;
            }
            case quanId: {
                s = "quận/huyện";
                check = true;
                break;
            } 
            case diachi: {
                s = "địa chỉ";
                check = true;
                break;
            }
            default: 
            break;
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
        const url = `${endPoint.CreatVitriDialy}`;
        const params = {
            id,
            diaChi: diachi,
            ghiChu,
            quanHuyen: quanId[0],
            tenViTri: tenVitri,
            tinhThanh: tinhId[0],
        }

        createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
            if (res.success) {
                Alert.alert(
                    '',
                    'Cập nhật vị trí thành công',
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
            tenVitri,
            tinhId,
            quanId,
            diachi,
            ghiChu,
            TinhthanhList,
            QuanhuyenList,
        } = this.state;
        return (
          <Animated.View>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <Animated.ScrollView>
                <View style={styles.container}>
                  <Text style={styles.boldText}>Tên vị trí*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Nhập tên"
                    defaultValue={tenVitri}
                    style={styles.bordered}
                    onChangeText={(text) => {
                                    this.setState({
                                        tenVitri: text,
                                    });
                                }}
                  />

                  <Text style={styles.boldText}>Tỉnh/Thành phố*</Text>
                  <MultiSelect
                    ref={(component) => { this.multiSelect = component }}
                    getCollapsedNodeHeight={{ height: 200 }}
                    items={TinhthanhList}
                    single
                    IconRenderer={Icon}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    styleListContainer={TinhthanhList && TinhthanhList.length > 9 ? { height: 200 } : null}
                    uniqueKey="id"
                    selectText="Chọn tỉnh/thành phố..."
                    onSelectedItemsChange={(item) => this.onSelectedTinhThanhChange(item)}
                    selectedItems={tinhId}
                    submitButtonColor="#2196F3"
                  />
                  <Text style={styles.boldText}>Quận/huyện*</Text>
                  <MultiSelect
                    ref={(component) => { this.multiSelect = component }}
                    getCollapsedNodeHeight={{ height: 200 }}
                    items={QuanhuyenList}
                    single
                    IconRenderer={Icon}
                    styleDropdownMenuSubsection={[styles.searchText, styles.bordered]}
                    searchInputPlaceholderText="Tìm kiếm..."
                    styleListContainer={QuanhuyenList && QuanhuyenList.length > 9 ? { height: 200 } : null}
                    uniqueKey="id"
                    selectText="Chọn quận/huyện..."
                    onSelectedItemsChange={(quanId) => {
                                    this.setState({
                                        quanId,
                                    });
                                }}
                    selectedItems={quanId}
                    submitButtonColor="#2196F3"
                  />
                  <Text style={styles.boldText}>Địa chỉ*</Text>
                  <TextInput
                    placeholderTextColor="black"
                    style={styles.bordered}
                    defaultValue={diachi}
                    onChangeText={(text) => {
                                    this.setState({
                                        diachi: text
                                    });
                                }}
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
    searchText: {
        backgroundColor: 'transparent',
        height: 50,
        paddingLeft: 15
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 20,
        height: 50,
        marginLeft: 10,
        marginRight: 10,
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
});

export default UpdateVitriDialyScreen;