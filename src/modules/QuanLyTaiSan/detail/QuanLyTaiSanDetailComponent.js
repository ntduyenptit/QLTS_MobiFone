/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert, TextInput, Pressable,
  Modal, KeyboardAvoidingView
} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BulletView from '../../global/BulletView';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import MoreMenu from '../../global/MoreComponent';
import { buildTree, convertLoaiTs, convertNguonKinhphi, getTextNCC, convertTextToLowerCase, convertTimeFormatToLocaleDate } from '../../global/Helper';
import { createGetMethod, createPostMethodWithToken, deleteMethod } from '../../../api/Apis';
import { deviceWidth, deviceHeight } from '../../global/LoaderComponent';
import { endPoint, imageBaseUrl, screens, tabs, moreMenu } from '../../../api/config';

const keyboardVerticalOffset = -60;

class QuanLyTaiSanDetailComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      taisan: '',
      images: '',
      modalVisible: false,
      donvi: '',
      donviList: [],
      datetime: '',
      noidung: '',
      menuTitle: '',
      paramTS: null,
      tab: null,
    };
  }

  componentDidMount() {
    const { paramKey, tabKey } = this.props.route.params;
    if (paramKey) {
      this.setState({
        paramTS: paramKey,
        tab: tabKey
      },() => this.getAssetMoreInfo());
    }
    Promise.all([
      this.props.navigation.setOptions({
        headerRight: () => (
          <MoreMenu listMenu={this.menuforTab()} />
        )
      }),
      this.danhsachdonvi(this.props.DvqlData)
    ]);
  }

  getAssetMoreInfo() {
    const { paramTS } = this.state;
    let url = `${endPoint.GetTaiSan}?`;
    url += `input=${paramTS?.id}&isView=true`;
    createGetMethod(url).then(res => {
      if (res.success) {
        const imageList = res.result.listHinhAnh.map(e => `${imageBaseUrl}${e.linkFile.replace(/\\/g, "/")}`);
        this.setState({
          images: imageList,
          taisan: res.result,
        });
      }
    });
  }

  onSelectedDVQLChange = donvi => {
    this.setState({ donvi });
  }

  refresh = () => {
    this.getAssetMoreInfo();
  }

  menuforTab = () => {
    const { tab } = this.state;
    let subMenus = null;
    switch (tab) {
      case tabs.toan_bo_tai_san:
        subMenus = [{
          title: moreMenu.cap_nhat,
          action: () => this.capnhat(),
        }];
        break;
      case tabs.tai_san_mat:
      case tabs.tai_san_huy:
      case tabs.tai_san_hong:
      case tabs.tai_san_thanh_ly:
        subMenus = [{
          title: moreMenu.hoan_tac,
          action: () => this.hoantac(tab),
        }];
        break;
      case tabs.tai_san_chua_su_dung:
        subMenus = [
          {
          title: moreMenu.cap_nhat,
          action: () => this.capnhat(tab),
        },
        {
          title: moreMenu.khai_bao_su_dung,
          action: () => this.showModalView(moreMenu.khai_bao_su_dung),
        },
        {
          title: moreMenu.cap_phat,
          action: () => this.showModalView(moreMenu.cap_phat),
        },
      ];
      break;
      case tabs.tai_san_dang_su_dung:
        subMenus = [
          {
          title: moreMenu.cap_nhat,
          action: () => this.capnhat(tab),
        },
        {
          title: moreMenu.dieu_chuyen,
          action: () => this.showModalView(moreMenu.dieu_chuyen),
        },
        {
          title: moreMenu.thu_hoi,
          action: () => this.showModalView(moreMenu.thu_hoi),
        },
      ];
      break;
      case tabs.tai_san_sua_chua_bao_duong:
        subMenus = [
          {
          title: moreMenu.thanh_cong,
          action: () => this.editTsSuachua(2),
        },
        {
          title: moreMenu.khong_thanh_cong,
          action: () => this.editTsSuachua(3),
        },
      ];
      break;
      default:
        return subMenus;
    }
     return subMenus;
  }

  danhsachdonvi(data) {
    if (data) {
      const dvqlTreeData = buildTree(data);
      this.setState({
        donviList: dvqlTreeData,
      });
    }
  };

  capnhat()  {
    const { paramTS } = this.state;
    this.props.navigation.navigate(screens.cap_nhat_tai_san, { paramKey: this.state.taisan, idTs: paramTS?.id, onGoBack: () => this.refresh() });
  }

  hoantac(Tab) {
    const { paramTS } = this.state;
    let url = ''
    switch (Tab) {
      case tabs.tai_san_mat:
        url = `${endPoint.tsMatHoantac}`;
        break;
      case tabs.tai_san_huy:
        url = `${endPoint.tsHuyHoantac}`;
        break;
      case tabs.tai_san_hong:
        url = `${endPoint.tsHongHoantac}`;
        break;
      case tabs.tai_san_thanh_ly:
        url = `${endPoint.tsThanhlyHoantac}`;
        break;
        default:
          break;
    }
    const params = {
      phieuTaiSanChiTietList: [{ "id": paramTS?.id }],
    }

    createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
      if (res.success) {
        Alert.alert(
          '',
          'Hoàn tác thành công',
          [
            { text: 'OK', onPress: this.goBack() },
          ],

        );

      }
    })
  }

  showModalView(title) {
    setTimeout(() => {
      this.setState({
        modalVisible: true,
        menuTitle: title,
      })
    }, 300)
  }

  editTsSuachua(trangthaiID) {
    const { paramTS } = this.state;
    const url = `${endPoint.editTsSuachua}`;

    let params = '';
    params = {
      creationTime: paramTS.creationTime,
      creatorUserId: paramTS.creatorUserId,
      deleterUserId: paramTS.deleterUserId,
      diaChiSuaChuaBaoDuong: paramTS.diaChiSuaChuaBaoDuong,
      epcCode: paramTS.epcCode,
      hinhThuc: paramTS.hinhThuc,
      id: paramTS.id,
      isDeleted: paramTS.isDeleted,
      lastModificationTime: paramTS.lastModificationTime,
      lastModifierUserId: paramTS.lastModifierUserId,
      liDoSuaChuaBaoDuong: paramTS.liDoSuaChuaBaoDuong,
      loaiTaiSan: paramTS.loaiTaiSan,
      loaiTaiSanId: paramTS.loaiTaiSanId,
      nguyenGia: paramTS.nguyenGia,
      nguyenGiaStr: paramTS.nguyenGiaStr,
      nhaCungCap: paramTS.nhaCungCap,
      phieuTaiSanChiTietId: paramTS.phieuTaiSanChiTietId,
      phongBanQuanLy: paramTS.phongBanQuanLy,
      phongBanQuanLyId: paramTS.phongBanQuanLyId,
      tenTaiSan: paramTS.tenTaiSan,
      thoiGianBatDau: paramTS.thoiGianBatDau,
      trangThai: trangthaiID,
    }

    createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
      if (res.success) {
        Alert.alert(
          '',
           ' Thành công',
          [
            { text: 'OK', onPress: this.goBack() },
          ],

        );

      }
    })
  }

  deleteThisAsset(id) {
    Alert.alert('Bạn có chắc chắn muốn xóa không?',
      '',
      [
        {
          text: 'OK', onPress: () => {
            let url = `${endPoint.DeleteTaiSan}?`;
            url += `input=${id}`;

            deleteMethod(url).then(res => {
              if (res.success) {
                Alert.alert('Xóa tài sản thành công',
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

  commit(phanLoai, tittle) {
    const {
      donvi,
      datetime,
      noidung,
      paramTS
    } = this.state;

    let url = '';
    let params = '';

    url = `${endPoint.capphatTS}`;
    params = {
      PhongBan: donvi[0],
      ngayKhaiBao: datetime,
      noiDung: noidung,
      noiDungKhaiBao: noidung,
      phanLoaiId: phanLoai,
      phieuTaiSanChiTietList: [{ taiSanId: paramTS?.id }],
      thoiGianKhaiBao: datetime,
      toChucDuocNhanId: donvi[0],
    }

    createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
      if (res.success) {
        Alert.alert(
          '',
          `${tittle  } thành công`,
          [
            { text: 'OK', onPress: this.goBack() },
          ],

        );

      }
    })
  }

  commitMenuItem(tittle) {
    this.setState({ modalVisible: false })
    switch (tittle) {
      case "Khai báo sử dụng":
        this.commit(4, tittle);
        break;
      case "Điều chuyển":
        this.commit(2, tittle);
        break;
      case "Cấp phát":
        this.commit(1, tittle);
        break;
      case "Thu hồi":
        this.commit(3, tittle);
        break;
      default:
        break;
    }
  }

  renderButton = (title) => (
    <View style={{flexDirection: 'row'}}>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => this.commitMenuItem(title)}
      >
        <Text style={styles.textStyle}>Xong </Text>
      </Pressable>
      <TouchableOpacity
        style={[styles.button, styles.buttonClose, {marginLeft: 5, backgroundColor: 'transparent', borderWidth: 0.5}]}
        onPress={() => this.setState({ modalVisible: false })}
      >
        <Text style={[styles.textStyle, {color: 'black'}]}>Hủy </Text>
      </TouchableOpacity>
    </View>
  );

  viewforMenu(title) {
    switch (title) {
      case "Khai báo sử dụng":
      case "Thu hồi":
        return (
          <ScrollView style={{ padding: 5, height: deviceHeight - 300, marginBottom: 5 }}>
            <Text style={styles.boldText}>Thời gian {convertTextToLowerCase(title)}</Text>
            <DatePicker
              style={{ width: '100%', marginTop: 0 }}
              date={this.state.datetime} // Initial date from state
              mode="date" // The enum of date, datetime and time
              borderRadius='15'
              format="DD-MM-YYYY"
              confirmBtnText="Chọn"
              cancelBtnText="Thoát"
              customStyles={{
                dateIcon: {
                  // display: 'none',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 5,
                },
              }}
            />
            <Text style={styles.boldText}>Nội dung {convertTextToLowerCase(title)}: </Text>
            <TextInput
              placeholderTextColor="black"
              style={styles.bordered}
              onChangeText={(text) => {
                this.setState({
                  noidung: text,
                });
              }}
            />
            {this.renderButton(title)}
          </ScrollView>
        )
      case "Điều chuyển":
      case "Cấp phát":
        return (
          <ScrollView style={{ padding: 5, height: deviceHeight - 150, marginBottom: 5 }}>
            <Text style={styles.boldText}>Đơn vị được {convertTextToLowerCase(title)} tài sản*: </Text>
            <MultiSelect
              ref={(component) => { this.multiSelect = component }}
              getCollapsedNodeHeight={{ height: 200 }}
              items={this.state.donviList}
              single
              isTree
              IconRenderer={Icon}
              searchInputPlaceholderText="Tìm kiếm..."
              styleDropdownMenuSubsection={[styles.searchText, styles.inputBordered]}
              uniqueKey="id"
              displayKey="displayName"
              selectText="Chọn đơn vị quản lý..."
              onSelectedItemsChange={(item) => this.onSelectedDVQLChange(item)}
              selectedItems={this.state.donvi}
              submitButtonColor="#2196F3"
            />
            <Text style={styles.boldText}>Thời gian {convertTextToLowerCase(title)}*</Text>
            <DatePicker
              style={{ width: '100%', marginTop: 0 }}
              date={this.state.datetime} // Initial date from state
              mode="date" // The enum of date, datetime and time
              borderRadius='15'
              format="DD-MM-YYYY"
              confirmBtnText="Chọn"
              cancelBtnText="Thoát"
              customStyles={{
                dateIcon: {
                  // display: 'none',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 5,
                },
              }}
            />
            <Text style={styles.boldText}>Nội dung {title}: </Text>
            <TextInput
              placeholderTextColor="black"
              style={styles.bordered}
              onChangeText={(text) => {
                this.setState({
                  noidung: text,
                });
              }}
            />
            {this.renderButton(title)}
          </ScrollView>
        )

      default:
        return null;
    }
  }

  render() {
    const {
      taisan,
      images,
      menuTitle,
      modalVisible,
      paramTS,
      tab,
    } = this.state;
    const textLoaiTs= convertLoaiTs(taisan.loaiTS  ? taisan.loaiTS : taisan.loaiTaiSan, this.props.LoaiTSData) ;


    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'flex-start' }}>
            {images.length > 0 ?
              (
                <View style={{ height: 200, paddingBottom: 20 }}>
                  <SliderBox
                    images={images}
                    dotColor="#FFEE58"
                    sliderBoxHeight={200}
                    dotStyle={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      marginHorizontal: 0,
                      padding: 0,
                      margin: 0,
                      backgroundColor: "rgba(128, 128, 128, 0.92)"
                    }}
                  />
                </View>
              ) :
              (<Image style={styles.productImg} source={require('../../../../assets/images/icon.png')} />)}
            <View style={{ marginHorizontal: 5 }}>
              <Text style={styles.title}>Thông tin {tab && convertTextToLowerCase(tab)}:</Text>
              <BulletView title="Mã tài sản" text={paramTS?.maEPC || paramTS?.epcCode} />
              <BulletView title='Tên tài sản' text={taisan.tenTS || taisan.tenTaiSan} />
              <BulletView title='S/N (Serial Number)' text={taisan.serialNumber} />
              <BulletView title='P/N (Product Number)' text={taisan.productNumber} />
              <BulletView title='Nhà cung cấp' text={taisan.nhaCC && getTextNCC(taisan.nhaCC,this.props.NhaCCData)} />
              <BulletView title='Hãng sản xuất' text={taisan.hangSanXuat} />
              <BulletView title='Loại tài sản' text={textLoaiTs} />
              <BulletView title='Phòng ban quản lý' text={paramTS?.phongBanQL || paramTS?.phongBanQuanLy} />
              <BulletView title='Vị trí tài sản' text={paramTS?.viTriTS || paramTS?.viTriTaiSan} />
              <BulletView title='Trạng thái' text={paramTS?.trangThai} />
              <BulletView title='Ngày mua' text={taisan.ngayMua && convertTimeFormatToLocaleDate(taisan.ngayMua)} />
              <BulletView title='Nguyên giá' text={taisan.nguyenGia} />
              <BulletView title='Ngày hết hạn bảo hành' text={taisan.ngayBaoHanh && convertTimeFormatToLocaleDate(taisan.ngayBaoHanh)} />
              <BulletView title='Ngày hết hạn sử dụng' text={taisan.hanSD && convertTimeFormatToLocaleDate(taisan.hanSD)} />
              <BulletView title='Thời gian trích khấu hao' text={taisan.thoiGianChietKhauHao} />
              {/* <BulletView title='Thời gian hết khấu hao' text={taisan.ngayMua && taisan.thoiGianChietKhauHao && addYearToDate(taisan.ngayMua, taisan.thoiGianChietKhauHao)} /> */}
              <BulletView title='Nguồn kinh phí' text={taisan.nguonKinhPhiId && convertNguonKinhphi(taisan.nguonKinhPhiId)} />
              <BulletView title='Mã sử dụng' text={taisan.dropdownMultiple} />

            </View>
          </View>

        </ScrollView>
        <View style={styles.separator} />
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            onPress={() => this.deleteThisAsset(paramTS?.id)}
            style={styles.shareButton}
          >
            <Text style={styles.shareButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              this.setState({
                modalVisible: !modalVisible,
              });
            }}
          >
            <View>
              <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={keyboardVerticalOffset}
                style={styles.modalView}
              >
                <Text style={styles.modalText}>{menuTitle}</Text>
                {this.viewforMenu(menuTitle)}
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: deviceWidth - 30,
    paddingBottom: 5
  },
  title: {
    paddingBottom: 10,
    fontSize: 18,
    fontStyle: 'italic'
  },
  bullet: {
    width: 10
  },
  bulletText: {
    flex: 0.8,
    paddingRight: 5
  },
  bulletTextNormal: {
    flex: 2
  },
  boldText: {
    fontWeight: 'bold',
    alignItems: 'flex-start',
    padding: 5,
  },
  normalText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 15,
  },
  searchText: {
    backgroundColor: 'transparent',
    height: 50,
    paddingLeft: 15
},
inputBordered: {
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 40,
    marginLeft: 5,
    marginRight: 5
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
  },
  modalView: {
    margin: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: deviceHeight - 200,
  },
  bordered: {
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 80,
    padding: 10,
    marginLeft: 5,
    marginRight: 5
  },

  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 60,
    elevation: 2,
    alignSelf: 'center'
  },

  buttonClose: {
    width: 150,
    height: 45,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  DvqlData: state.filterDVQLDataReducer.dvqlDataFilter,
  LoaiTSData: state.filterLTSDataReducer.ltsDataFilter,
  NhaCCData: state.filterNCCDataReducer.nccDataFilter,
  MaSuDungData: state.filterMSDDataReducer.msdDataFilter
});
export default connect(mapStateToProps)(QuanLyTaiSanDetailComponent);