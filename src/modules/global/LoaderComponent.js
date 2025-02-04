/* eslint-disable import/no-cycle */
import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetToanBoTaiSanData } from '../quanlytaisan/QuanLyTaiSan';
import { maTaiSan, screens, tenTaiSan } from '../../api/config';
import { convertTimeFormatToLocaleDate, getColorByType, convertTimeFormatToLocaleDateFullTime,convertTrangthaiTaisan } from "./Helper";

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


const loadInfo = (screen, item, props, action) => {
  let maTaiSanKey;
  let tenTaiSanKey;
  maTaiSan.forEach(e => {
    const mataisan = Object.keys(item).find(x => x === e);
    if (mataisan) {
      maTaiSanKey = mataisan;
    }
  })
  tenTaiSan.forEach(e => {
    const tentaisan = Object.keys(item).find(x => x === e);
    if (tentaisan) {
      tenTaiSanKey = tentaisan;
    }
  });

  switch (screen) {
    case screens.chi_tiet_tai_san:
    case screens.chi_tiet_dau_doc_di_dong:
    case screens.chi_tiet_dau_doc_co_dinh:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color={getColorByType(item.trangThai ? item.trangThai : props.tab)} size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>EPC: {item[maTaiSanKey]}</Text>
            <Text numberOfLines={1} style={styles.infoText}>{item[tenTaiSanKey]}</Text>
            <Text numberOfLines={1}>{item.phongBanQL ? item.phongBanQL : item.phongBanQuanLy}</Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab, onGoBack: () => action() })}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity>
        </>
      );
    case screens.giam_sat_tai_san:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} color="#0080FF" name="exchange" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>EPC: {item[maTaiSanKey]}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Ngày di chuyển: {convertTimeFormatToLocaleDateFullTime(item.ngayDiChuyen)}</Text>
            <Text numberOfLines={1}>Chiều di chuyển: {item.chieuDiChuyen}</Text>
          </View>
        </>
      );
    case screens.theo_doi_ket_noi_thiet_bi:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} color="#0080FF" name="exchange" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>EPC: {item[maTaiSanKey]}</Text>
            <Text numberOfLines={1}>{item.loaiTaiSan}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Ngày di chuyển: {convertTimeFormatToLocaleDateFullTime(item.ngayDiChuyen)}</Text>
          </View>
        </>
      );
    case screens.chi_tiet_kiem_ke_tai_san:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10, bottom: 10 }} name="server" color="#0080FF" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Mã kiểm kê: {item.kiemKeTaiSan.maKiemKe}</Text>
            <Text numberOfLines={1}>Tên kiểm kê: {item.kiemKeTaiSan.tenKiemKe}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Đơn vị: {(item.phongBan)}</Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab, onGoBack: () => action() })}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity>
        </>
      );

    case screens.chi_tiet_du_tru_mua_sam:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color="#0080FF" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Mã phiếu: {item.maPhieu}</Text>
            <Text numberOfLines={1}>Tên phiếu: {item.tenPhieu}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Đơn vị: {(item.tenPhongBan)}</Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, onGoBack: () => action() })}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity>
        </>
      );
    case screens.quan_ly_canh_bao:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="bell" color="#0080FF" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Nội dung: {item.noiDung}</Text>
            <Text numberOfLines={1}>Đơn vị: {item.toChuc}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Thời gian: {convertTimeFormatToLocaleDate(item.thoiGian)}</Text>
          </View>
        </>
      );
    case screens.chi_tiet_lich_xuat_bao_cao:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color="#0080FF" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Tên báo cáo: {item.tenBaoCao}</Text>
            <Text numberOfLines={1}>Lặp lại: {item.lapLai}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Thời gian: {(item.ngayGio)}</Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab, onGoBack: () => action() })}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity>
        </>
      );
    case screens.chi_tiet_nha_cung_cap:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color="#0080FF" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Mã NCC: {item.nhaCungCap.maNhaCungCap}</Text>
            <Text numberOfLines={1}>Tên NCC: {item.nhaCungCap.tenNhaCungCap}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Lĩnh vực kinh doanh: {(item.tenLinhVuc)}</Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab, idNCC: item.nhaCungCap.id , onGoBack: () => action()})}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity>
        </>
      );
    case screens.chi_tiet_vi_tri_dia_ly:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="map-marker" color="#0080FF" size={15} />
          <TouchableOpacity onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab, id: item.id , onGoBack: () => action()})} style={styles.infor}>
            <Text numberOfLines={2} style={[{ fontWeight: "bold" }, styles.infoText]}>Tên vị trí: {item.tenViTri}</Text>
            <Text numberOfLines={1}>Địa chỉ: {item.diaChi}</Text>
            <Text numberOfLines={1} style={styles.infoText}>{(item.quanHuyen)}, {(item.tinhThanh)} </Text>
          </TouchableOpacity>
          <View
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </View>
        </>
      );
    case screens.chi_tiet_quan_ly_loai_tai_san:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="cubes" color="#0080FF" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Mã loại Tài sản: {item.data.loaiTaiSan.ma}</Text>
            <Text numberOfLines={1}>Tên: {item.data.loaiTaiSan.ten}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Mã Hexa: {item.data.maHexa} </Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab, id: item.id , onGoBack: () => action()})}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity>
        </>
      );
    case screens.chi_tiet_quan_ly_don_vi:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color="#0080FF" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Mã đơn vị: {item.data.toChuc.maToChuc}</Text>
            <Text numberOfLines={1}>Tên: {item.data.toChuc.tenToChuc}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Mã Hexa: {item.data.toChuc.maHexa} </Text>
            <Text numberOfLines={1} style={styles.infoText}>Địa chỉ: {item.data.diaChi} </Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab, id: item.id , onGoBack: () => action()})}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity>
        </>
      );
    case screens.chi_tiet_nguoi_dung:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color="#0080FF" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Tên đăng nhập: {item.userName}</Text>
            <Text numberOfLines={1}>Tên: {item.name}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Số điện thoại: {(item.phoneNumber)}</Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab , onGoBack: () => action()})}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity>
        </>
      );
    case screens.chi_tiet_quan_ly_phan_quyen:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color="#0080FF" size={15} />
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Tên vai trò: {item.displayName}</Text>
            <Text numberOfLines={1}>Tên hiển thị: {item.name}</Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab , onGoBack: () => action()})}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity>
        </>
      );
    case screens.chi_tiet_bao_hongmat_tai_san:
      return (
        <>
          <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color="#0080FF" size={15} />
          <View style={styles.inforhongmat}>
            <Text numberOfLines={2} style={[{ fontWeight: "bold" }, styles.infoText]}>Đơn vị khai báo: {item.phongBanKhaiBao}</Text>
            <Text numberOfLines={1}>Người khai báo: {item.nguoiKhaiBao}</Text>
            <Text numberOfLines={1}>Ngày khai báo: {convertTimeFormatToLocaleDate(item.ngayKhaiBao)}</Text>
            <Text numberOfLines={1}>Khai báo: {convertTrangthaiTaisan(item.khaiBao)}</Text>
          </View>
          {/* <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab , onGoBack: () => action()})}
          >
            <Icon name="chevron-right" color='#0080FF' size={15} />
          </TouchableOpacity> */}
        </>
      );
    default:
      return null;
  }
};

function LoaderComponent(array, props, screen, action) {
  if (array && array.length > 0) {
    const items = () => array.map((item, index) => (
      <View key={`loader-component-${index + 1}`} style={styles.listItem}>
        {loadInfo(screen, item, props, action)}
      </View>
    ))

    return (
      <View>{items()}</View>
    );
  }
  return (
    <TouchableOpacity><Text>Không có dữ liệu</Text></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    flex: 1,
    width: deviceWidth - 50,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  infor: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: 80,
    width: "85%",
  },
  inforhongmat: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: 110,
    width: "85%",
  },
  infoText: {
    paddingBottom: 3,

  }
});

export default LoaderComponent;