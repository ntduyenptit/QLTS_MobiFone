import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity, FlatList, ScrollView, Alert,
} from 'react-native';
import { createGetMethod, deleteMethod } from '../../api/Apis';
import { endPoint } from '../../api/config';
const deviceWidth = Dimensions.get("window").width;

const bullet = (title, text) => (
  <View style={styles.row}>
    <View style={styles.bullet}>
      <Text>{'\u2022' + " "}</Text>
    </View>
    <View style={styles.bulletText}>
      <Text styles={styles.text}>
        <Text style={styles.boldText}>{`${title}: `}</Text>
      </Text>
    </View>
    <View style={styles.bulletTextNormal}>
      <Text styles={styles.text}>
        <Text style={styles.normalText}>{text}</Text>
      </Text>
    </View>
  </View>
);

export default class QuanLyMuasamDetail extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      chitietPhieuMuasam: [],
    }
    this.param = {
      param: props.route.params,
    }
  }

  componentDidMount() {
    this.getchitietPhieuMuasam();
  }

  getchitietPhieuMuasam() {
    let url;
    url = `${endPoint.getChitietPhieuMuasam}?`;
    url += `input=${encodeURIComponent(`${2}`)}&`;
    url += `isView=${encodeURIComponent(`${true}`)}`;

    createGetMethod(url)
      .then(res => {
        if (res) {
          this.setState({
            chitietPhieuMuasam: res.result,
          });
        } else {
          // Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch(err => console.log(err));
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
  renderItemComponent = (data) =>
    <View style={styles.listItem}>
      <Text style={{ alignItems: "flex-start", paddingRight: 10 }}> {data.item.tenantId}</Text>
      <View style={styles.infor}>
        <Text numberOfLines={1} style={[{ fontWeight: "bold", paddingBottom: 3 }]}>Tên tài sản: {data.item.tenTaiSan}</Text>
        <Text numberOfLines={1} style={[{ paddingBottom: 3 }]}>ProducNumber: {data.item.productNumber}</Text>
        <Text numberOfLines={1} style={{ paddingBottom: 3 }}>Hãng sản xuất: {data.item.hangSanXuat}</Text>
        <Text numberOfLines={1} tyle={{ paddingBottom: 3 }} >Nhà cung cấp: {data.item.nhaCungCap}</Text>
        <Text numberOfLines={1} tyle={{ paddingBottom: 3 }} >Số lượng: {data.item.soLuong}</Text>
        <Text numberOfLines={1} tyle={{ paddingBottom: 3 }} >Đơn giá: {data.item.donGia}</Text>
        <Text numberOfLines={1} tyle={{ paddingBottom: 3 }} >Ghi chú: {data.item.ghiChu}</Text>
      </View>
    </View>


  render() {
    const { chitietPhieuMuasam } = this.state;
    const { paramKey, tabKey } = this.props.route.params;
    const idPhieu = paramKey.id;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin Phiếu dự trù mua sắm:</Text>
        {bullet('Mã phiếu', chitietPhieuMuasam.maPhieu)}
        {bullet('Tên phiếu', chitietPhieuMuasam.tenPhieu)}
        {bullet('Đơn vị', chitietPhieuMuasam.toChucId)}
        {bullet('Người lập phiếu', chitietPhieuMuasam.nguoiLapPhieuId)}
        <Text style={styles.title}>Danh sách tài sản đề xuất mua sắm</Text>
        <ScrollView style={{ height: 'auto', padding: 10 }}>
          <FlatList
            scrollEnabled={false}
            data={chitietPhieuMuasam.listPhieuChiTiet}
            renderItem={item => this.renderItemComponent(item)}
          />
        </ScrollView>
        <View style={styles.separator} />
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            onPress={() => this.deleteThisAsset(idPhieu)}
            style={styles.shareButton}>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: deviceWidth,
    paddingBottom: 5,
    paddingLeft: 10
  },
  title: {
    paddingBottom: 10,
    paddingTop: 15,
    alignSelf: 'center',
    fontSize: 18,
    fontStyle: 'italic'
  },
  bullet: {
    width: 15
  },
  bulletText: {
    flex: 1,
    paddingRight: 5
  },
  bulletTextNormal: {
    flex: 2
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
