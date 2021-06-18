/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import BulletView from '../../global/BulletView';
import { convertTextToLowerCase, convertTimeFormatToLocaleDate } from '../../global/Helper';
import { createGetMethod, deleteMethod } from '../../../api/Apis';
import { endPoint, moreMenu, screens } from '../../../api/config';
import MoreMenu from '../../global/MoreComponent';

let idTaisan = null;

class QuanLyDauDocDetailComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      taisan: '',
    };
  }

  componentDidMount() {
    Promise.all([
      this.props.navigation.setOptions({
        headerRight: () => (
          <MoreMenu listMenu={this.showMenu()} />
        )
      }),
      this.getAssetMoreInfo(),
    ]);
  }
  showMenu = () => {
    return (
      subMenus = [{
        title: moreMenu.cap_nhat,
        action: () => this.capnhat(),
      }]
    )
  }
  getAssetMoreInfo() {
    let url = `${endPoint.getDaudocEdit}?`;
    url += `input=${idTaisan}&isView=true`;
    createGetMethod(url).then(res => {
      if (res.success) {
        this.setState({
          taisan: res.result,
        });
      }
    });
  }

  refresh = () => {
    this.getAssetMoreInfo();
  }

  capnhat() {
    this.props.navigation.navigate(screens.cap_nhat_dau_doc, { paramKey: this.state.taisan, idTs: idTaisan, onGoBack: () => this.refresh() });
  }
  deleteThisAsset(id) {
    Alert.alert('Bạn có chắc chắn muốn xóa không?',
      '',
      [
        {
          text: 'OK', onPress: () => {
            let url = `${endPoint.deleteReaderdidong}?`;
            url += `input=${id}`;

            deleteMethod(url).then(res => {
              if (result.success) {
                Alert.alert('Xoas thành công',
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


  render() {
    const {
      taisan,
    } = this.state;
    const { paramKey, tabKey } = this.props.route.params;
    idTaisan = paramKey.id;
    tab = tabKey;
    paramTS = paramKey;
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ alignItems: 'flex-start', marginHorizontal: 10 }}>
            <Image style={styles.productImg} source={require('../../../../assets/images/icon.png')} />
            <Text style={styles.title}>Thông tin đầu đọc di động:</Text>
            <BulletView title="Mã tài sản" text={paramKey.maEPC ? paramKey.maEPC : paramKey.epcCode} flexTitle={1.5} />
            <BulletView title='Tên tài sản' text={taisan.tenTS ? taisan.tenTS : taisan.tenTaiSan} flexTitle={1.5} />
            <BulletView title='S/N (Serial Number)' text={taisan.serialNumber} flexTitle={1.5} />
            <BulletView title='P/N (Product Number)' text={taisan.productNumber} flexTitle={1.5} />
            <BulletView title='Nhà cung cấp' text={taisan.nhaCC} flexTitle={1.5} />
            <BulletView title='Hãng sản xuất' text={taisan.hangSanXuat} flexTitle={1.5} />
            <BulletView title='Loại tài sản' text={paramKey.loaiTS ? paramKey.loaiTS : paramKey.loaiTaiSan} flexTitle={1.5} />
            <BulletView title='Phòng ban quản lý' text={paramKey.phongBanQL ? paramKey.phongBanQL : paramKey.phongBanQuanLy} flexTitle={1.5} />
            <BulletView title='Vị trí tài sản' text={paramKey.viTriTS ? paramKey.viTriTS : paramKey.viTriTaiSan} flexTitle={1.5} />
            <BulletView title='Trạng thái' text={paramKey.trangThai} flexTitle={1.5} />
            <BulletView title='Ngày mua' text={taisan.ngayMua && convertTimeFormatToLocaleDate(taisan.ngayMua)} flexTitle={1.5} />
            <BulletView title='Nguyên giá' text={taisan.nguyenGia} flexTitle={1.5} />
            <BulletView title='Ngày hết hạn bảo hành' text={taisan.ngayBaoHanh && convertTimeFormatToLocaleDate(taisan.ngayBaoHanh)} flexTitle={1.5} />
            <BulletView title='Ngày hết hạn sử dụng' text={taisan.hanSD && convertTimeFormatToLocaleDate(taisan.hanSD)} flexTitle={1.5} />
          </View>

        </ScrollView>
        <View style={styles.separator} />
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            onPress={() => this.deleteThisAsset(idTaisan)}
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
    marginTop: 20,
  },
  title: {
    paddingBottom: 10,
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
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
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
    paddingBottom: 30
  }
});

export default QuanLyDauDocDetailComponent;