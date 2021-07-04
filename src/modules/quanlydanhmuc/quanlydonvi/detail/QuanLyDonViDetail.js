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
import { connect } from 'react-redux';
import { deviceWidth } from '@app/modules/global/LoaderComponent';
import { getTextFromList, isNumeric } from '@app/modules/global/Helper';

class QuanLyDonViDetailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chitietData: this.props.route.params?.paramKey?.data || null,
            id: this.props.route.params?.paramKey?.data?.toChuc?.id,
            donViList: props.DvqlDataFilter,
            viTriList: [],
        }
    }

    componentDidMount() {
        const { chitietData, id, donViList } = this.state;
        this.props.navigation.setOptions({
            headerRight: () => (
              <MoreMenu listMenu={this.showMenu()} />
            )
          });
          if (chitietData === null) {
            this.getchitietLoaiTaiSan(id);
          }
          if (donViList.length === 0) {
            this.getAllToChuc();
          }
          this.getAllVitridialy();
    }

    getchitietLoaiTaiSan() {
        const { id } = this.state;
        let url = `${endPoint.getChiTietDonVi}?`;
        url += `Id=${encodeURIComponent(`${id}`)}&`;
        url += `isView=${encodeURIComponent(`${true}`)}`;
        createGetMethod(url)
            .then(res => {
                if (res.success) {
                    this.setState({
                        chitietData: res.result,
                    });
                } else {
                    // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                }
            })
            .catch();
    }

    getAllToChuc() {
        const url = `${endPoint.getAllToChuc}?`;
        createGetMethod(url)
            .then(res => {
                if (res.success) {
                    this.setState({
                        donViList: res.result,
                    });
                }
            })
            .catch();
    }

    getAllVitridialy() {
        const url = `${endPoint.getVitriDialy}`;
        createGetMethod(url)
            .then(res => {
                if (res) {
                    this.setState({
                        viTriList: res.result,
                    });
                }
            })
    }

    refresh = () => {
        this.getchitietLoaiTaiSan();
   }

    showMenu = () => (
        [{
          title: moreMenu.cap_nhat,
          action: () => this.capnhat(),
        }]
    )

    capnhat() {
        const { chitietData, id } = this.state;
        this.props.navigation.navigate(screens.cap_nhat_don_vi, { paramKey: chitietData, idTs: id, onGoBack: () => this.refresh() });
      }

    goBack() {
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
    }
    
    render() {
        const { chitietData, viTriList, donViList } = this.state;
        const donViCha = getTextFromList(chitietData?.toChuc?.trucThuocToChucId || chitietData?.trucThuocToChucId, donViList);
        const diaChi = chitietData?.viTriDiaLyId && getTextFromList(chitietData?.viTriDiaLyId, viTriList);
        return (
          <View style={styles.container}>
            <View style={{ alignItems: 'flex-start', width: deviceWidth, height: 'auto', padding: 10, flex: 1 }}>
              <Text style={styles.title}>Thông tin chi tiết đơn vị:</Text>
              <BulletView title='Mã đơn vị' text={chitietData?.toChuc?.maToChuc || chitietData?.maToChuc} />
              <BulletView title='Mã hexa' text={chitietData?.toChuc?.maHexa || chitietData?.maHexa} />
              <BulletView title='Tên đơn vị' text={chitietData?.toChuc?.tenToChuc || chitietData?.tenToChuc} />
              <BulletView title='Đơn vị quản lý' text={donViCha} />
              <BulletView title='Địa chỉ' text={chitietData?.diaChi || diaChi} />
              <BulletView title='Ghi chú' text={chitietData?.ghiChu} />
            </View>
            <View style={styles.separator} />
          </View>

        )
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

const mapStateToProps = state => ({
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  });

export default connect(mapStateToProps)(QuanLyDonViDetailScreen);