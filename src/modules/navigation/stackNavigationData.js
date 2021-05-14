import React from 'react';
import { TouchableOpacity, Image,View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import TabNavigator from './MainTabNavigator';
import QuanLyTaiSanScreen from '../quanlytaisan/QuanLyTaiSanContainer';
import QuanLyTaiSanDetailComponentScreen from "../quanlytaisan/detail/QuanLyTaiSanDetailComponent";

import QuanLyDauDocCodinhScreen from '../quanlydaudoc/quanlydaudocCodinh/QuanlydaudocCodinh';
import QuanLyDauDocDiDongScreen from '../quanlydaudoc/quanlydaudocDidong/QuanlydaudocDiDong';
import QuanLyDauDocDetailComponentScreen from "../quanlydaudoc/detail/QuanLyDauDocDetailComponent";

import GiamsatTaiSanScreen from '../giamsattaisan/theodoitaisan/GiamsatTs';
import TheodoiThietbiScreen from '../giamsattaisan/theodoiketnoi/TheodoiKetnoi';

import KiemKeTaiSanDetailComponent from '../kiemketaisan/DetailKiemkeComponent';

import AvailableInFullVersion from "../availableInFullVersion/AvailableInFullVersionViewContainer";
import BaoCaoThongTinTS from '../baocao/BaoCaoThongTinTS';
import KiemkeTsScreen from '../kiemketaisan/KiemkeTS';

import QuanLyDutruMuasamScreen from '../quanlydutrumuasam/DutruMuasamComponent';
import ChitietDutruMuasamScreen from '../quanlydutrumuasam/QuanLyMuasamDetailComponent';

import QuanlyCanhbaoScreen from '../quanlycanhbao/QuanlyCanhbao';
import BaocaonguoidungScreen from '../quanlybaocao/baocaonguoidung/BaoCaoNguoiDung';
import BaocaoCanhbaoScreen from '../quanlybaocao/baocaocanhbao/BaoCaoCanhbao';
import DatLichXuatBaoCaoScreen from '../quanlybaocao/datlichxuatbaocao/LichXuatBaoCao';
import LichXuatBaoCaoChitietScreen  from '../quanlybaocao/datlichxuatbaocao/LichXuatBaoCao_Chitiet';
import QuanlyNhaCungcapScreen from '../quanlydanhmuc/quanlynhacungcap/QuanLyNhaCungCap';
import NhaCungCapDetailScreen from '../quanlydanhmuc/quanlynhacungcap/QuanLyNhaCungCapDetail';
import QuanlyVitriDialyScreen from '../quanlydanhmuc/quanlyvitridialy/QuanlyVitriDialy';
import QuanlyLoaiTaiSanScreen from '../quanlydanhmuc/quanlyloaitaisan/QuanlyLoaiTaisan';
import QuanlyDonviScreen from '../quanlydanhmuc/quanlydonvi/QuanlyDonvi';
import QuanLyNguoidungScreen from '../quanlyhethong/quanlynguoidung/QuanlyNguoidung';
import NguoidungDetailScreen from '../quanlyhethong/quanlynguoidung/QuanlyNguoidungDetail';
import QuanLyPhanQuyenScreen from '../quanlyhethong/quanlyphanquyen/QuanLyPhanQuyen';
import QuanlyCauhinhMailServer from '../quanlyhethong/quanlymailServer/QuanLyMailServer';

import { colors, fonts } from '../../styles';
import { store } from '../../redux/store';
import { showFilter } from '../../redux/actions/filter.actions';
import { screens, tabs } from '../../api/config';

const headerLeftComponent = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      paddingHorizontal: 16,
      paddingVertical: 12,
    }}
  >
    <Image
      source={require('../../../assets/images/icons/arrow-back.png')}
      resizeMode="contain"
      style={{
        height: 20,
      }}
    />
  </TouchableOpacity>
)

const headerRightComponent = () => (
  <TouchableOpacity
    onPress={() => {
        if (!store.getState().filterReducer.isShowFilter) {
          store.dispatch(showFilter());
        }
      }}
    style={{
      paddingHorizontal: 16,
      paddingVertical: 12,
    }}
  >
    <View style={{ marginLeft: 15, backgroundColor: 'transparent' }}>
      <Icon name="filter" color="white" size={20} />
    </View>
  </TouchableOpacity>
  );

  const moreHeaderRightComponent = () => (
    <TouchableOpacity
      style={{
      paddingHorizontal: 16,
      paddingVertical: 12,
    }
  }
    >
      <View style={{ marginLeft: 15, backgroundColor: 'transparent' }}>
        <Icon name="ellipsis-v" color="white" size={20} />
      </View>
    </TouchableOpacity>
  );

const headerBackground = require('../../../assets/images/topBarBg.png');

const StackNavigationData = [
  {
    name: screens.quan_ly_tai_san,
    component: TabNavigator,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_dau_doc_di_dong,
    component: QuanLyDauDocDiDongScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_dau_doc_co_dinh,
    component: QuanLyDauDocCodinhScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.giam_sat_tai_san,
    component: GiamsatTaiSanScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.theo_doi_ket_noi_thiet_bi,
    component: TheodoiThietbiScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },

  {
    name: screens.chi_tiet_kiem_ke_tai_san,
    component: KiemKeTaiSanDetailComponent,
    headerLeft: null,
    headerRight: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_kiem_ke_tai_san,
    component: KiemkeTsScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_du_tru_mua_sam,
    component: QuanLyDutruMuasamScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.chi_tiet_du_tru_mua_sam,
    component: ChitietDutruMuasamScreen,
    headerLeft: null,
    headerRight: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_canh_bao,
    component: QuanlyCanhbaoScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_danh_muc,
    component: AvailableInFullVersion,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_nha_cung_cap,
    component: QuanlyNhaCungcapScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.chi_tiet_nha_cung_cap,
    component: NhaCungCapDetailScreen,
    headerLeft: null,
    headerRight: moreHeaderRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_vi_tri_dia_ly,
    component: QuanlyVitriDialyScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_loai_tai_san,
    component: QuanlyLoaiTaiSanScreen,
    headerLeft: null,
    headerRight: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_don_vi,
    component: QuanlyDonviScreen,
    headerLeft: null,
    headerRight: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.bao_cao_nguoi_dung,
    component: BaocaonguoidungScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.bao_cao_canh_bao,
    component: BaocaoCanhbaoScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.dat_lich_xuat_bao_cao,
    component: DatLichXuatBaoCaoScreen,
    headerLeft: null,
    headerRight: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.chi_tiet_lich_xuat_bao_cao,
    component: LichXuatBaoCaoChitietScreen,
    headerLeft: null,
    headerRight: moreHeaderRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.bao_cao_thong_tin_tai_san,
    component: BaoCaoThongTinTS,
    headerLeft: null,
    headerRight: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_nguoi_dung,
    component: QuanLyNguoidungScreen,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  
  {
    name: screens.chi_tiet_nguoi_dung,
    component: NguoidungDetailScreen,
    headerLeft: null,
    headerRight: moreHeaderRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_phan_quyen,
    component: QuanLyPhanQuyenScreen,
    headerLeft: null,
    headerRight: moreHeaderRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.lich_su_nguoi_dung,
    component: AvailableInFullVersion,
    headerLeft: null,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: screens.quan_ly_mail_server,
    component: QuanlyCauhinhMailServer,
    headerLeft: null,
    headerRight: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: tabs.tai_san_dang_su_dung,
    component: QuanLyTaiSanScreen,
    headerLeft: headerLeftComponent,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: tabs.tai_san_chua_su_dung,
    component: QuanLyTaiSanScreen,
    headerLeft: headerLeftComponent,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  {
    name: tabs.tai_san_sua_chua_bao_duong,
    component: QuanLyTaiSanScreen,
    headerLeft: headerLeftComponent,
    headerRight: headerRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  // Màn hình chi tiết tài sản
  {
    name: screens.chi_tiet_tai_san,
    component: QuanLyTaiSanDetailComponentScreen,
    headerLeft: headerLeftComponent,
    headerRight: moreHeaderRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
   // Màn hình chi tiết đầu đọc
  {
    name: screens.chi_tiet_dau_doc,
    component: QuanLyDauDocDetailComponentScreen,
    headerLeft: headerLeftComponent,
    headerRight: moreHeaderRightComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
 
]

export default StackNavigationData;
