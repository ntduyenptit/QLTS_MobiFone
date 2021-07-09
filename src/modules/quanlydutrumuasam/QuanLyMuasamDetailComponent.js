import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity, FlatList, ScrollView, Alert,
} from 'react-native';
import BulletView from '@app/modules/global/BulletView';
import { createGetMethod, deleteMethod } from '../../api/Apis';
import { endPoint } from '../../api/config';

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
                    { text: 'OK', onPress: this.props.navigation.goBack() },
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

  renderItemComponent = (data) => (
    <View style={styles.listItem}>
      <Text style={{ alignItems: "flex-start", paddingRight: 10 }}> {data.item.tenantId}</Text>
      <View style={styles.infor}>
        <BulletView title='Tên tài sản' text={data?.item?.tenTaiSan} />
        <BulletView title='ProducNumber' text={data?.item?.productNumber} />
        <BulletView title='Hãng sản xuất' text={data?.item?.hangSanXuat} />
        <BulletView title='Nhà cung cấp' text={data?.item?.nhaCungCap} />
        <BulletView title='Số lượng' text={data?.item?.soLuong} />
        <BulletView title='Đơn giá' text={data?.item?.donGia} />
        <BulletView title='Ghi chú' text={data?.item?.ghiChu} />
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
        <ScrollView style={{ height: 'auto', padding: 10 }}>
          <FlatList
            scrollEnabled={false}
            data={chitietPhieuMuasam?.listPhieuChiTiet}
            renderItem={item => this.renderItemComponent(item)}
          />
        </ScrollView>
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
  listItem: {
    padding: 10,
    paddingTop: 10,
    width: deviceWidth - 50,
    flex: 1,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
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
