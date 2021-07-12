import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity, FlatList, SafeAreaView, Alert,
} from 'react-native';
import BulletView from '@app/modules/global/BulletView';
import { createGetMethod, deleteMethod } from '../../api/Apis';
import { currencyFormat } from '@app/modules/global/Helper';
import { endPoint, moreMenu, screens } from '../../api/config';
import MoreMenu from '../global/MoreComponent';

const deviceWidth = Dimensions.get("window").width;

export default class QuanLyMuasamDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chitietPhieuMuasam: this.props.route.params?.paramKey || null,
    }
  }

  componentDidMount() {
    this.getchitietPhieuMuasam();
    this.props.navigation.setOptions({
      headerRight: () => (
        <MoreMenu listMenu={this.showMenu()} />
      )
    });
  }

  getchitietPhieuMuasam() {
    const { chitietPhieuMuasam } = this.state;
    let url = `${endPoint.getChitietPhieuMuasam}?`;
    url += `input=${encodeURIComponent(`${chitietPhieuMuasam?.id}`)}&`;
    url += `isView=${encodeURIComponent(`${true}`)}`;

    createGetMethod(url)
      .then(res => {
        if (res) {
          this.setState({
            chitietPhieuMuasam: res.result,
          });
        }
      })
      .catch();
  }

  showMenu = () => (
    [{
      title: moreMenu.cap_nhat,
      action: () => this.capnhat(),
    }]
  )

  refresh = () => {
    this.getchitietPhieuMuasam();
  }

  capnhat() {
    const { chitietPhieuMuasam } = this.state;
    this.props.navigation.navigate(screens.cap_nhat_quan_ly_du_tru_mua_sam, { paramKey: chitietPhieuMuasam, idTs: chitietPhieuMuasam?.id, onGoBack: () => this.refresh() });
  }

  deleteThisAsset(id) {
    Alert.alert('Bạn có chắc chắn muốn xóa không?',
      '',
      [
        {
          text: 'OK', onPress: () => {
            let url = `${endPoint.deletePhieuMuasam}?`;
            url += `input=${id}`;

            deleteMethod(url).then(res => {
              if (res.success) {
                Alert.alert('Xóa phiếu mua sắm thành công',
                  '',
                  [
                    { text: 'OK', onPress: this.goBack() },
                  ],
                  { cancelable: false }
                );
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
    const { navigation, route } = this.props;
    route.params.onGoBack();
    navigation.goBack();
}

  renderItemComponent = (data, index) => (
    <View style={styles.listItem}>
      <Text style={{ alignItems: "flex-start", paddingRight: 10 }}> {index + 1}</Text>
      <View style={styles.infor}>
        <BulletView title='Tên tài sản' text={data?.tenTaiSan} />
        <BulletView title='ProducNumber' text={data?.productNumber} />
        <BulletView title='Hãng sản xuất' text={data?.hangSanXuat} />
        <BulletView title='Nhà cung cấp' text={data?.nhaCungCap} />
        <BulletView title='Số lượng' text={data?.soLuong} />
        <BulletView title='Đơn giá' text={data?.donGia && currencyFormat(data?.donGia)} />
        <BulletView title='Ghi chú' text={data?.ghiChu} />
      </View>
    </View>
  )


  render() {
    const { chitietPhieuMuasam } = this.state;
    const { paramKey } = this.props.route.params;
    const idPhieu = paramKey.id;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin Phiếu dự trù mua sắm:</Text>
        <BulletView title='Mã phiếu' text={chitietPhieuMuasam?.maPhieu} />
        <BulletView title='Tên phiếu' text={chitietPhieuMuasam?.tenPhieu} />
        <BulletView title='Đơn vị' text={chitietPhieuMuasam?.toChucId} />
        <BulletView title='Người lập phiếu' text={chitietPhieuMuasam?.nguoiLapPhieuId} />
        <Text style={styles.title}>Danh sách tài sản đề xuất mua sắm</Text>
        <SafeAreaView style={{ height: 'auto', padding: 10, flex: 1 }}>
          <FlatList
            scrollEnabled={false}
            data={chitietPhieuMuasam?.listPhieuChiTiet}
            renderItem={({item, index}) => this.renderItemComponent(item, index)}
          />
        </SafeAreaView>
        <View style={styles.separator} />
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            onPress={() => this.deleteThisAsset(idPhieu)}
            style={styles.shareButton}
          >
            <Text style={styles.shareButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 10,
    paddingTop: 15,
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
  listItem: {
    padding: 10,
    paddingTop: 10,
    width: deviceWidth - 50,
    flex: 1,
    backgroundColor: "#FFF",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    height: 200,
  },
  infor: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: 50,
    width: "85%",
    paddingBottom: 10,
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
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
    paddingBottom: 30,
  }
});
