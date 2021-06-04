/* eslint-disable import/no-cycle */
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
import { endPoint, imageBaseUrl, screens, tabs } from '../../../api/config';
import { deviceWidth, deviceHeight } from '../../global/LoaderComponent';
import { createGetMethod, createPostMethodWithToken, deleteMethod } from '../../../api/Apis';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { addYearToDate, buildTree, convertTextToLowerCase, convertTimeFormatToLocaleDate } from '../../global/Helper';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BulletView from '@app/modules/global/BulletView';
import MultiSelect from '@app/libs/react-native-multiple-select/lib/react-native-multi-select';
const keyboardVerticalOffset = -60;
let idTaisan = null;
let tab = '';
let paramTS = '';

class QuanLyTaiSanDetailComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taisan: '',
      tenTS: '',
      images: '',
      modalVisible: false,
      donvi: '',
      donviList: [],
      datetime: '',
      noidung: '',
      menuTitle: '',
    };
  }
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
  getAssetMoreInfo() {
    console.log("idTs: " + idTaisan);
    let url = `${endPoint.GetTaiSan}?`;
    url += `input=${idTaisan}&isView=true`;
    console.log("Refresh ko" + idTaisan);
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
  capnhat() {
    this._menu.hide();
    this.props.navigation.navigate(screens.cap_nhat_tai_san, { paramKey: this.state.taisan, idTs: idTaisan, onGoBack: () => this.refresh() });
  }
  hoantac(tab) {
    this._menu.hide();
    let url = ''
    switch (tab) {
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
    }
    params = {
      phieuTaiSanChiTietList: [{ "id": idTaisan }],
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
  onSelectedDVQLChange = donvi => {
    console.log("phongBanNhan: " + donvi);
    this.setState({ donvi });
  }

  showModalView(title) {
    this._menu.hide();
    this.setState({
      modalVisible: true,
      menuTitle: title,
    })

  }

  refresh = () => {
    this.getAssetMoreInfo();
  }
  componentDidMount() {
    Promise.all([
      this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => this.showMenu()}
          >
            <View style={styles.containerMenu}>
              {this.menuforTab()}
            </View>
          </TouchableOpacity>
        )
      }),
      this.getAssetMoreInfo(),
      this.danhsachdonvi(this.props.DvqlData)
    ]);
  }
  danhsachdonvi(data) {
    console.log("dataLdataLdataLdataL: " + data);
    if (data) {
      let dvqlTreeData = buildTree(data);
      this.setState({
        donviList: dvqlTreeData,
      });
    }
  };

  menuforTab() {
    switch (tab) {
      case tabs.toan_bo_tai_san:
        return (
          <Menu ref={this.setMenuRef} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem onPress={() => { this.capnhat() }} >Cập nhật</MenuItem>
            <MenuDivider />
          </Menu>)
      case tabs.tai_san_mat:
      case tabs.tai_san_huy:
      case tabs.tai_san_hong:
      case tabs.tai_san_thanh_ly:
        return (
          <Menu ref={this.setMenuRef} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem onPress={() => { this.hoantac(tab) }}>Hoàn tác</MenuItem>
            <MenuDivider />
          </Menu>
        )

      case tabs.tai_san_chua_su_dung:
        return (
          <Menu ref={this.setMenuRef} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem onPress={() => { this.capnhat() }} >Cập nhật</MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => { this.showModalView("Khai báo sử dụng") }}>Khai báo sử dụng</MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => { this.showModalView("Cấp phát") }}>Cấp phát</MenuItem>
          </Menu>
        )
      case tabs.tai_san_dang_su_dung:
        return (
          <Menu ref={this.setMenuRef} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem onPress={() => { this.capnhat() }} >Cập nhật</MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => { this.showModalView("Điều chuyển") }}>Điều chuyển</MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => { this.showModalView("Thu hồi") }}>Thu hồi</MenuItem>
          </Menu>
        )
      case tabs.tai_san_sua_chua_bao_duong:
        return (
          <Menu ref={this.setMenuRef} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem onPress={() => { this.editTsSuachua(2) }} >Thành công</MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => { this.editTsSuachua(3) }}>Không thành công</MenuItem>
            <MenuDivider />
          </Menu>
        )
      case tabs.bao_hong_mat_tai_san:
        return null;
      default:
    }
  }

  editTsSuachua(trangthaiID) {
    let url = `${endPoint.editTsSuachua}`;

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
      phieuTaiSanChiTietList: [{ taiSanId: idTaisan }],
      thoiGianKhaiBao: datetime,
      toChucDuocNhanId: donvi[0],
    }

    createPostMethodWithToken(url, JSON.stringify(params)).then((res) => {
      if (res.success) {
        Alert.alert(
          '',
          tittle + ' thành công',
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
        return null;
    }
  }
  viewforMenu(tittle) {
    switch (tittle) {
      case "Khai báo sử dụng":
      case "Thu hồi":
        return (
          <ScrollView style={{ padding: 5, height: deviceHeight - 300, marginBottom: 5 }}>
            <Text style={styles.boldText}>Thời gian {convertTextToLowerCase(tittle)}</Text>
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
            <Text style={styles.boldText}>Nội dung {convertTextToLowerCase(tittle)}: </Text>
            <TextInput
              placeholderTextColor="black"
              style={styles.bordered}
              onChangeText={(text) => {
                this.setState({
                  noidung: text,
                });
              }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.commitMenuItem(tittle)}
            >
              <Text style={styles.textStyle}>Xong </Text>
            </Pressable>
          </ScrollView>
        )
      case "Điều chuyển":
      case "Cấp phát":
        return (
          <ScrollView style={{ padding: 5, height: deviceHeight - 150, marginBottom: 5 }}>
            <Text style={styles.boldText}>Đơn vị được {convertTextToLowerCase(tittle)} tài sản*: </Text>
            <MultiSelect
              ref={(component) => { this.multiSelect = component }}
              getCollapsedNodeHeight={{ height: 100 }}
              items={this.state.donviList}
              single={true}
              isTree={true}
              IconRenderer={Icon}
              searchInputPlaceholderText="Tìm kiếm..."
              styleListContainer={this.state.donviList && this.state.donviList.length > 9 ? { height: 200 } : null}
              uniqueKey="id"
              displayKey="displayName"
              selectText="Chọn đơn vị quản lý..."
              onSelectedItemsChange={(item) => this.onSelectedDVQLChange(item)}
              selectedItems={this.state.donvi}
              submitButtonColor="#2196F3"
            />
            <Text style={styles.boldText}>Thời gian {convertTextToLowerCase(tittle)}*</Text>
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
            <Text style={styles.boldText}>Nội dung {tittle}: </Text>
            <TextInput
              placeholderTextColor="black"
              style={styles.bordered}
              onChangeText={(text) => {
                this.setState({
                  noidung: text,
                });
              }}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.commitMenuItem(tittle)}
            >
              <Text style={styles.textStyle}>Xong </Text>
            </TouchableOpacity>
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
      datetime,
      donviList,
      donvi,
    } = this.state;
    const { paramKey, tabKey } = this.props.route.params;
    console.log("item chi tiet: " + paramKey.id);
    idTaisan = paramKey.id;
    tab = tabKey;
    paramTS = paramKey,
    console.log("dataLdataLdataLdataL: " + donviList);
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
            <View style={{ marginHorizontal: 30 }}>
              <Text style={styles.title}>Thông tin {convertTextToLowerCase(tabKey)}:</Text>
              <BulletView title="Mã tài sản" text={paramKey.maEPC ? paramKey.maEPC : paramKey.epcCode} />
              <BulletView title='Tên tài sản' text={taisan.tenTS ? taisan.tenTS : taisan.tenTaiSan} />
              <BulletView title='S/N (Serial Number)' text={taisan.serialNumber} />
              <BulletView title='P/N (Product Number)' text={taisan.productNumber} />
              <BulletView title='Nhà cung cấp' text={taisan.nhaCC} />
              <BulletView title='Hãng sản xuất' text={taisan.hangSanXuat} />
              <BulletView title='Loại tài sản' text={paramKey.loaiTS ? paramKey.loaiTS : paramKey.loaiTaiSan} />
              <BulletView title='Phòng ban quản lý' text={paramKey.phongBanQL ? paramKey.phongBanQL : paramKey.phongBanQuanLy} />
              <BulletView title='Vị trí tài sản' text={paramKey.viTriTS ? paramKey.viTriTS : paramKey.viTriTaiSan} />
              <BulletView title='Trạng thái' text={paramKey.trangThai} />
              <BulletView title='Ngày mua' text={taisan.ngayMua && convertTimeFormatToLocaleDate(taisan.ngayMua)} />
              <BulletView title='Nguyên giá' text={taisan.nguyenGia} />
              <BulletView title='Ngày hết hạn bảo hành' text={taisan.ngayBaoHanh && convertTimeFormatToLocaleDate(taisan.ngayBaoHanh)} />
              <BulletView title='Ngày hết hạn sử dụng' text={taisan.hanSD && convertTimeFormatToLocaleDate(taisan.hanSD)} />
              <BulletView title='Thời gian trích khấu hao' text={taisan.thoiGianChietKhauHao} />
              {/* <BulletView title='Thời gian hết khấu hao' text={taisan.ngayMua && taisan.thoiGianChietKhauHao && addYearToDate(taisan.ngayMua, taisan.thoiGianChietKhauHao)} /> */}
              <BulletView title='Nguồn kinh phí' text={taisan.nguonKinhPhiId} />
              <BulletView title='Mã dử dụng' text={taisan.dropdownMultiple} />

            </View>
          </View>

        </ScrollView>
        <View style={styles.separator} />
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            onPress={() => this.deleteThisAsset(paramKey.id)}
            style={styles.shareButton}
          >
            <Text style={styles.shareButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            animationType="fade"
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
  containerMenu: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    marginRight: 15,
    justifyContent: 'center',
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
});
export default connect(mapStateToProps)(QuanLyTaiSanDetailComponent);