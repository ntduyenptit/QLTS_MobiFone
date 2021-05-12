/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetToanBoTaiSanData } from '../quanlytaisan/QuanLyTaiSan';
import { maTaiSan, screens, tenTaiSan } from '../../api/config';
import { convertTimeFormatToLocaleDate, getColorByType } from "./Helper";
import Modal from 'react-native-modal';
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


const loadInfo = (screen, item, props) => {
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
    case screens.chi_tiet_dau_doc:
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
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab })}
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
            <Text numberOfLines={1} style={styles.infoText}>Ngày di chuyển: {convertTimeFormatToLocaleDate(item.ngayDiChuyen)}</Text>
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
            <Text numberOfLines={1} style={styles.infoText}>Ngày di chuyển: {convertTimeFormatToLocaleDate(item.ngayDiChuyen)}</Text>
          </View>
        </>
      );
    case screens.chi_tiet_kiem_ke_tai_san:
      return (
        <>
          <View style={styles.infor}>
            <Text numberOfLines={1} style={[{ fontWeight: "bold" }, styles.infoText]}>Mã kiểm kê: {item.kiemKeTaiSan.maKiemKe}</Text>
            <Text numberOfLines={1}>Tên kiểm kê: {item.kiemKeTaiSan.tenKiemKe}</Text>
            <Text numberOfLines={1} style={styles.infoText}>Đơn vị: {(item.phongBan)}</Text>
          </View>
          <TouchableOpacity
            style={{ height: 40, width: 20, alignItems: "flex-end" }}
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab })}
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
            onPress={() => props.navigation.navigate(screen, { paramKey: item, tabKey: props.tab })}
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
    default:
      return null;
  }
};

function LoaderComponent(array, props, screen) {

  if (array && array.length > 0) {
    const items = () => array.map((item, index) => (
      <View key={`loader-component-${index + 1}`} style={styles.listItem}>
        {loadInfo(screen, item, props)}
      </View>
    ))

    return (
      <View>{items()}</View>
    );
  }
  return (
    <TouchableOpacity onPress={() => GetToanBoTaiSanData({ datas: props.DvqlDataFilter, tab: props.tab })}><Text>Không có dữ liệu</Text></TouchableOpacity>
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
    height: 95,
  },
  infor: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: 50,
    width: "85%",

  },
  infoText: {
    paddingBottom: 3,

  }
});

export default LoaderComponent;