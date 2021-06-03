import React, { useEffect, useState, useRef } from 'react';
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
import { convertTextToLowerCase, convertTimeFormatToLocaleDate } from '../../global/Helper';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import store from '../../../redux/store';

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

function QuanLyTaiSanDetailComponent({ navigation, route }) {
  const { paramKey, tabKey } = route.params;
  const [images, setImages] = useState([]);
  console.log("tabkey: " + tabKey);
  const menu = useRef();
  const screen = store.getState().currentScreenReducer.screenName || store.getState().currentTabReducer.tabName;

  function hideMenu() {
    menu.current.hide();
  }
  function showMenu() {
    menu.current.show();
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => showMenu()}
        >
          <View style={styles.containerMenu}>
            <Menu ref={menu} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
              <MenuItem onPress={() => { capnhat() }} >Cập nhật</MenuItem>
              <MenuDivider />
            </Menu>
          </View>
        </TouchableOpacity>
      )
    })
    getAssetMoreInfo(paramKey.id);
  }, []);

  function capnhat(tabKey) {
    hideMenu();
    navigation.navigate(screens.cap_nhat_tai_san, { paramKey: paramKey });
  }
  function hoantac(tabKey, id) {
    hideMenu();
  }
  function khaibaosudung(id) {
    hideMenu();
  }
  function capphat(id) {
    hideMenu();
  }
  function dieuchuyen(id) {
    hideMenu();
  }
  function thuhoi(id) {
    hideMenu();
  }
  function thanhcong(id) {
    hideMenu();
  }
  function khongthanhcong(id) {
    hideMenu();
  }
  function menuforTab(tabKey) {
    switch (tabKey) {
      case tabs.toan_bo_tai_san:
        return <View style={styles.containerMenu}>
          <Menu ref={menu} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem onPress={capnhat(tabKey)}>Cập nhật</MenuItem>
            <MenuDivider />
          </Menu>
        </View>
      case tabs.tai_san_mat:
      case tabs.tai_san_huy:
      case tabs.tai_san_hong:
      case tabs.tai_san_thanh_ly:
        return <View style={styles.containerMenu}>
          <Menu ref={menu} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem onPress={hoantac(tabKey, paramKey.id)}>Hoàn tác</MenuItem>
            <MenuDivider />
          </Menu>
        </View>

      case tabs.tai_san_chua_su_dung:
        return <View style={styles.containerMenu}>
          <Menu ref={menu} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem onPress={capnhat(tabKey, paramKey.id)}>Cập nhật</MenuItem>
            <MenuDivider />
            <MenuItem >Khai báo sử dụng</MenuItem>
            <MenuDivider />
            <MenuItem >Cấp phát</MenuItem>

          </Menu>
        </View>
      case tabs.tai_san_dang_su_dung:
        return <View style={styles.containerMenu}>
          <Menu ref={menu} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem onPress={capnhat(tabKey, paramKey.id)}>Cập nhật</MenuItem>
            <MenuDivider />
            <MenuItem >Điều chuyển</MenuItem>
            <MenuDivider />
            <MenuItem >Thu hồi</MenuItem>
          </Menu>
        </View>

      case tabs.tai_san_sua_chua_bao_duong:
        return <View style={styles.containerMenu}>
          <Menu ref={menu} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} />}>
            <MenuItem >Thành công</MenuItem>
            <MenuDivider />
            <MenuItem>Không thành công</MenuItem>
            <MenuDivider />
            <MenuItem >Hoàn tác</MenuItem>
          </Menu>
        </View>
      case tabs.bao_hong_mat_tai_san:
        return null;
      default:
        break;
    }
  }


  function getAssetMoreInfo(id) {
    let url = `${endPoint.GetTaiSan}?`;
    url += `input=${id}&isView=true`;

    createGetMethod(url).then(res => {
      if (res.success) {
        const imageList = res.result.listHinhAnh.map(e => `${imageBaseUrl}${e.linkFile.replace(/\\/g, "/")}`);
        setImages(imageList);
      }
    });
  }
  function setMoreMenu(tabKey) {

  }
  function deleteThisAsset(id) {
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
                    { text: 'OK', onPress: goBack() },
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

  function goBack() {
    route.params.onGoBack();
    navigation.goBack();
  }

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
            {bullet('Tên tài sản', paramKey.tenTS ? paramKey.tenTS : paramKey.tenTaiSan)}
            {/* Loại tài sản */}
            {bullet('Loại tài sản', paramKey.loaiTS ? paramKey.loaiTS : paramKey.loaiTaiSan)}
            {/* Phòng ban quản lý */}
            {bullet('Phòng ban quản lý', paramKey.phongBanQL ? paramKey.phongBanQL : paramKey.phongBanQuanLy)}
            {/* Vị trí tài sản */}
            {bullet('Vị trí tài sản', paramKey.viTriTS ? paramKey.viTriTS : paramKey.viTriTaiSan)}
            {/* Trạng thái */}
            {bullet('Trạng thái', paramKey.trangThai)}
            {/* Ngày mua */}
            {bullet('Ngày mua', paramKey.ngayMua && convertTimeFormatToLocaleDate(paramKey.ngayMua))}
            {bullet('Nguyên giá', paramKey.nguyenGia)}
          </View>
        </View>

      </ScrollView>
      <View style={styles.separator} />
      <View style={styles.addToCarContainer}>
        <TouchableOpacity
          onPress={() => deleteThisAsset(paramKey.id)}
          style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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