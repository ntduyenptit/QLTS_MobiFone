/* eslint-disable import/no-cycle */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { endPoint, imageBaseUrl, screens, tabs } from '../../../api/config';
import { deviceWidth } from '../../global/LoaderComponent';
import { createGetMethod, deleteMethod } from '../../../api/Apis';
import { addYearToDate, convertTextToLowerCase, convertTimeFormatToLocaleDate } from '../../global/Helper';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';

let idTaisan = null;
const bullet = (title, text) => (
  <View style={styles.row}>
    <View style={styles.bullet}>
      <Text>{'\u2022' + " "}</Text>
    </View>
    <View style={styles.bulletText}>
      <Text styles={styles.text}>
        <Text style={styles.boldText}>{`${title}: `}</Text>
        {/* <Text style={styles.normalText}>{text}</Text> */}
      </Text>
    </View>
    <View style={styles.bulletTextNormal}>
      <Text styles={styles.text}>
        {/* <Text style={styles.boldText}>{`${title}: `}</Text> */}
        <Text style={styles.normalText}>{text}</Text>
      </Text>
    </View>
  </View>
);

class QuanLyTaiSanDetailComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taisan: '',
      tenTS: '',
      images: '',
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
    console.log("idTs: "+ idTaisan);
    let url = `${endPoint.GetTaiSan}?`;
    url += `input=${idTaisan}&isView=true`;
  console.log ("Refresh ko" + idTaisan);
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
    this.props.navigation.navigate(screens.cap_nhat_tai_san, { paramKey: this.state.taisan,idTs: idTaisan , onGoBack: () => this.refresh()});
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
              <Menu ref={this.setMenuRef} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
                <MenuItem onPress={() => { this.capnhat() }} >Cập nhật</MenuItem>
                <MenuItem onPress={this.hideMenu} >Xóa</MenuItem>
                <MenuDivider />
              </Menu>
            </View>
          </TouchableOpacity>
        )
      }),
      this.getAssetMoreInfo()
    ]);
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

  render() {
    const {
      taisan,
      images,
    } = this.state;
    const { paramKey, tabKey } = this.props.route.params;
    console.log("item: " + paramKey.id);
    idTaisan = paramKey.id;
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
            {/* Mã tài sản */}
            {bullet('Mã tài sản', paramKey.maEPC ? paramKey.maEPC : paramKey.epcCode)}
            {/* Tên tài sản */}
            {bullet('Tên tài sản', taisan.tenTS ? taisan.tenTS : taisan.tenTaiSan)}
            {/* Loại tài sản */}
            {bullet('S/N (Serial Number)', taisan.serialNumber)}
            {bullet('P/N (Product Number)', taisan.productNumber)}
            {bullet('Nhà cung cấp', taisan.nhaCC)}
            {bullet('Hãng sản xuất', taisan.hangSanXuat)}
            {bullet('Loại tài sản', taisan.loaiTS ? taisan.loaiTS : taisan.loaiTaiSan)}
            {/* Phòng ban quản lý */}
            {bullet('Phòng ban quản lý', paramKey.phongBanQL ? paramKey.phongBanQL : paramKey.phongBanQuanLy)}
            {/* Vị trí tài sản */}
            {bullet('Vị trí tài sản', paramKey.viTriTS ? paramKey.viTriTS : paramKey.viTriTaiSan)}
            {/* Trạng thái */}
            {bullet('Trạng thái', paramKey.trangThai)}
            {/* Ngày mua */}
            {bullet('Ngày mua', taisan.ngayMua && convertTimeFormatToLocaleDate(taisan.ngayMua))}
            {bullet('Nguyên giá', taisan.nguyenGia)}
            {bullet('Ngày hết hạn bảo hành', taisan.ngayBaoHanh && convertTimeFormatToLocaleDate(taisan.ngayBaoHanh))}
            {bullet('Ngày hết hạn sử dụng', taisan.hanSD && convertTimeFormatToLocaleDate(taisan.hanSD))}
            {bullet('Thời gian trích khấu hao', taisan.thoiGianChietKhauHao)}
            {bullet('Thời gian hết khấu hao',addYearToDate(taisan.ngayMua, taisan.thoiGianChietKhauHao))}
            {bullet('Nguồn kinh phí', taisan.nguonKinhPhiId)}
            {bullet('Mã dử dụng', taisan.dropdownMultiple )}
            
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

export default QuanLyTaiSanDetailComponent;