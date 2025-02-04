/* eslint-disable import/no-cycle */
import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import BulletView from '@app/modules/global/BulletView';
import MoreMenu from '@app/modules/global/MoreComponent';
import { endPoint, moreMenu, screens } from '@app/api/config';
import { createGetMethod, deleteMethod } from '@app/api/Apis';
import { deviceWidth } from '@app/modules/global/LoaderComponent';
import { getTextFromList } from '@app/modules/global/Helper';

class VitriDialyDetailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chitietData: this.props.route.params?.paramKey || null,
            id: this.props.route.params?.id,
            tinhThanhList: [],
        }
    }

    componentDidMount() {
        const { chitietData } = this.state;
        this.props.navigation.setOptions({
            headerRight: () => (
              <MoreMenu listMenu={this.showMenu()} />
            )
          });
          if (chitietData === null) {
              Promise.all([
                this.getchitietViTriDialy(),
                this.getTinhThanhList(),
              ]);
          }
    }

    getchitietViTriDialy() {
        const { id } = this.state;
        let url = `${endPoint.getViewVitriDiaLy}?`;
        url += `input=${encodeURIComponent(`${id}`)}&`;
        url += `isView=${encodeURIComponent(`${true}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res.success) {
                    this.setState({
                        chitietData: res.result,
                    }, () => {
                        this.getAllQuanHuyen(res.result.tinhThanh);
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch();
    }

    getTinhThanhList() {
        const url = `${endPoint.getTinhThanhAll}?`;
        createGetMethod(url)
            .then(res => {
                if (res.success) {
                    this.setState({
                        tinhThanhList: res.result,
                    });
                }
            })
            .catch();
    }

    getAllQuanHuyen(idTinh) {
        const url = `services/app/ViTriDiaLy/GetAllDtoQuanHuyenFromTT?tinhthanhId=${  idTinh}`;
        console.log('ket qua de123: ', url);
        createGetMethod(url)
            .then(res => {
                if (res.success) {
                    this.setState({
                        QuanhuyenList: res.result,
                    });
                }
            })
    }

    showMenu = () => (
        [{
          title: moreMenu.cap_nhat,
          action: () => this.capnhat(),
        }]
    )

    refresh = () => {
        this.setState({
            chitietData: null
        }, () => {
            Promise.all([
                this.getTinhThanhList(),
                this.getchitietViTriDialy(),
            ])
        });
      }

    capnhat() {
        const { chitietData, id } = this.state;
        this.props.navigation.navigate(screens.cap_nhat_vi_tri_dia_ly, { paramKey: chitietData, idTs: id, onGoBack: () => this.refresh() });
      }

    delete(id) {
        Alert.alert('Bạn có chắc chắn muốn xóa không?',
            '',
            [
                {
                    text: 'OK', onPress: () => {
                        let url = `${endPoint.deleteNhaCC}?`;
                        url += `Id=${id}`;

                        deleteMethod(url).then(res => {
                            if (res.success) {
                                Alert.alert('Xóa nhà cung cấp thành công',
                                    '',
                                    [
                                        { text: 'OK', onPress: this.goBack() },
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                Alert.alert(res.error.message);
                            }
                        });
                    }
                },
                { text: 'Hủy' },
            ],
            { cancelable: true }
        );
    }

    goBack() {
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
    }
    
    render() {
        const { chitietData, id, tinhThanhList, QuanhuyenList } = this.state;
        const tinhThanh = getTextFromList(chitietData?.tinhThanh, tinhThanhList)
        const quanHuyen = getTextFromList(chitietData?.quanHuyen, QuanhuyenList);
        return (
          <View style={styles.container}>
            <View style={{ alignItems: 'flex-start', width: deviceWidth, height: 'auto', padding: 10, flex: 1 }}>
              <Text style={styles.title}>Thông tin vị trí địa lý:</Text>
              <BulletView title='Tên vị trí' text={chitietData?.tenViTri} />
              <BulletView title='Tỉnh/Thành phố' text={tinhThanh} />
              <BulletView title='Quận/Huyện' text={quanHuyen} />
              <BulletView title='Địa chỉ' text={chitietData?.diaChi} />
              <BulletView title='Ghi chú' text={chitietData?.ghiChu} />
            </View>
            <View style={styles.separator} />
            <View style={styles.addToCarContainer}>
              <TouchableOpacity
                onPress={() => this.delete(id)}
                style={styles.shareButton}
              >
                <Text style={styles.shareButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        paddingBottom: 10,
        paddingTop: 15,
        alignSelf: 'center',
        fontSize: 18,
        fontStyle: 'italic'
    },
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
    },
    normalText: {
        flex: 1,
        alignItems: 'flex-end',
    },
    text: {
        fontSize: 15,
    },

    separator: {
        height: 2,
        backgroundColor: "#eeeeee",
        marginTop: 20,
        marginHorizontal: 30
    },
    shareButton: {
        marginTop: 10,
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "red",
    },
    shareButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    addToCarContainer: {
        marginHorizontal: 30,
        paddingBottom: 30
    }
});

export default VitriDialyDetailScreen;