import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import TabNavigator from './MainTabNavigator';
import QuanLyTaiSanScreen from '../quanlytaisan/QuanLyTaiSanContainer';
import UpdateDaudocDiDongScreen from '../quanlydaudoc/update/CapnhatDaudocDiDong';
import UpdateDaudocCoDinhScreen from '../quanlydaudoc/update/CapnhatDaudocCoDinh';
import QuanLyTaiSanDetailComponentScreen from '../quanlytaisan/detail/QuanLyTaiSanDetailComponent';
import CapnhatTaisanScreen from '../quanlytaisan/detail/UpdateTaisan';

import QuanLyDauDocCodinhScreen from '../quanlydaudoc/quanlydaudocCodinh/QuanlydaudocCodinh';
import QuanLyDauDocDiDongScreen from '../quanlydaudoc/quanlydaudocDidong/QuanlydaudocDiDong';
import QuanLyDauDocCoDinhDetailComponentScreen from "../quanlydaudoc/detail/DauDocCoDinhComponent";
import QuanLyDauDocDiDongDetailComponentScreen from "../quanlydaudoc/detail/DauDocDiDongComponent";
import GiamsatTaiSanScreen from '../giamsattaisan/theodoitaisan/GiamsatTs';
import TheodoiThietbiScreen from '../giamsattaisan/theodoiketnoi/TheodoiKetnoi';

import KiemKeTaiSanDetailComponent from '../kiemketaisan/DetailKiemkeComponent';

import BaoCaoThongTinTS from '../baocao/BaoCaoThongTinTS';
import KiemkeTsScreen from '../kiemketaisan/KiemkeTS';

import QuanLyDutruMuasamScreen from '../quanlydutrumuasam/DutruMuasamComponent';
import ChitietDutruMuasamScreen from '../quanlydutrumuasam/QuanLyMuasamDetailComponent';

import QuanlyCanhbaoScreen from '../quanlycanhbao/QuanlyCanhbao';
import BaocaonguoidungScreen from '../quanlybaocao/baocaonguoidung/BaoCaoNguoiDung';
import BaocaoCanhbaoScreen from '../quanlybaocao/baocaocanhbao/BaoCaoCanhbao';
import DatLichXuatBaoCaoScreen from '../quanlybaocao/datlichxuatbaocao/LichXuatBaoCao';
import LichXuatBaoCaoChitietScreen from '../quanlybaocao/datlichxuatbaocao/LichXuatBaoCao_Chitiet';
import QuanlyNhaCungcapScreen from '../quanlydanhmuc/quanlynhacungcap/QuanLyNhaCungCap';
import NhaCungCapDetailScreen from '../quanlydanhmuc/quanlynhacungcap/QuanLyNhaCungCapDetail';
import VitriDialyDetailScreen from '../quanlydanhmuc/quanlyvitridialy/detail/VitriDialyDetail';
import CapNhatNhaCungCap from '../quanlydanhmuc/quanlynhacungcap/update/UpdateNhacungcap';
import CapNhatViTriDiaLy from '../quanlydanhmuc/quanlyvitridialy/update/UpdateVitriDialy';
import QuanlyVitriDialyScreen from '../quanlydanhmuc/quanlyvitridialy/QuanlyVitriDialy';
import QuanlyLoaiTaiSanScreen from '../quanlydanhmuc/quanlyloaitaisan/QuanlyLoaiTaisan';
import QuanlyDonviScreen from '../quanlydanhmuc/quanlydonvi/QuanlyDonvi';
import QuanLyNguoidungScreen from '../quanlyhethong/quanlynguoidung/QuanlyNguoidung';
import NguoidungDetailScreen from '../quanlyhethong/quanlynguoidung/QuanlyNguoidungDetail';
import QuanLyPhanQuyenScreen from '../quanlyhethong/quanlyphanquyen/QuanLyPhanQuyen';
import QuanlyCauhinhMailServer from '../quanlyhethong/quanlymailServer/QuanLyMailServer';
import ThemmoiTaiSanScreen from '../quanlytaisan/capnhattaisan/ThemmoiTaisan';
import KhaiBaoTaiSanScreen from '../quanlytaisan/capnhattaisan/KhaibaoTaiSan';
import ThemmoiDauDocScreen from '../quanlydaudoc/themmoi/ThemmoiDaudoc';
import ThemmoiDotKiemke from '../kiemketaisan/themmoikiemke/ThemMoiKiemke';
import ThemmoiPhieuDutruMuaSam from '../quanlydutrumuasam/ThemMoiDuTruMuaSam';
import ThemmoiCaidatLich from '../quanlybaocao/datlichxuatbaocao/ThemMoiCaiDatLich';
import ThemmoiNhaCungcap from '../quanlydanhmuc/quanlynhacungcap/ThemmoiNhacungcap';
import ThemmoiVitriDialy from '../quanlydanhmuc/quanlyvitridialy/ThemmoiVitriDialy';
import ThemmoiLoaiTaisan from '../quanlydanhmuc/quanlyloaitaisan/ThemmoiLoaiTS';
import ThemmoiDonvi from '../quanlydanhmuc/quanlydonvi/ThemmoiDonvi';
import ThemmoiNguoidung from '../quanlyhethong/quanlynguoidung/ThemmoiNguoidung';
import ThemmoiVaitro from '../quanlyhethong/quanlyphanquyen/ThemVaitro';
import DashBoard from '../dashboard/DashBoardView';
import QRScanAssetInfor from '../qrcode/AssetInforScreen';
import QRScaner from '../qrcode/QRScanScreen';
import moreHeaderRightComponent from '../global/MoreComponent';
import { colors, fonts } from '../../styles';
import { store } from '../../redux/store';
import { showFilter } from '../../redux/actions/filter.actions';
import { screens, tabs } from '../../api/config';

import SpeechControlScreen from '../SpeechToText/speechtotext';

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

export const headerRightComponent = () => (
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

const headerBackground = require('../../../assets/images/topBarBg.png');

const StackNavigationData = [
  {
    name: screens.dash_board,
    component: DashBoard,
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
    name: screens.qrScanAssetInfor,
    component: QRScanAssetInfor,
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
    name: screens.qrScanAssetScreen,
    component: QRScaner,
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
    name: screens.cap_nhat_dau_doc_di_dong,
    component: UpdateDaudocDiDongScreen,
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
    name: screens.cap_nhat_dau_doc_co_dinh,
    component: UpdateDaudocCoDinhScreen,
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
    headerLeft: headerLeftComponent,
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
  {
    name: screens.chi_tiet_vi_tri_dia_ly,
    component: VitriDialyDetailScreen,
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
  {
    name: screens.cap_nhat_nha_cung_cap,
    component: CapNhatNhaCungCap,
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
  {
    name: screens.cap_nhat_vi_tri_dia_ly,
    component: CapNhatViTriDiaLy,
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
  {
    name: tabs.tai_san_huy,
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
    name: tabs.bao_hong_mat_tai_san,
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
    name: screens.cap_nhat_tai_san,
    component: CapnhatTaisanScreen,
    headerLeft: headerLeftComponent,
    headerRight: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
  // Màn hình chi tiết đầu đọc cố định
  {
    name: screens.chi_tiet_dau_doc_co_dinh,
    component: QuanLyDauDocCoDinhDetailComponentScreen,
    headerLeft: headerLeftComponent,
    headerRight: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
      alignSelf: 'center'
    },
  },
    // Màn hình chi tiết đầu đọc di động
    {
      name: screens.chi_tiet_dau_doc_di_dong,
      component: QuanLyDauDocDiDongDetailComponentScreen,
      headerLeft: headerLeftComponent,
      headerRight: null,
      headerBackground: { source: headerBackground },
      headerTitleStyle: {
        fontFamily: fonts.primaryRegular,
        color: colors.white,
        fontSize: 18,
        alignSelf: 'center'
      },
    },
  // thêm mới tài sản
  {
    name: screens.them_moi_tai_san,
    component: ThemmoiTaiSanScreen,
    headerLeft: headerLeftComponent,
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
    name: screens.khai_bao_tai_san,
    component: KhaiBaoTaiSanScreen,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_dau_doc,
    component: ThemmoiDauDocScreen,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_kiem_ke,
    component: ThemmoiDotKiemke,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_du_tru_mua_sam,
    component: ThemmoiPhieuDutruMuaSam,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_cai_dat_lich_xuat_bao_cao,
    component: ThemmoiCaidatLich,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_nha_cung_cap,
    component: ThemmoiNhaCungcap,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_vi_tri_dia_ly,
    component: ThemmoiVitriDialy,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_loai_tai_san,
    component: ThemmoiLoaiTaisan,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_don_vi,
    component: ThemmoiDonvi,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_nguoi_dung,
    component: ThemmoiNguoidung,
    headerLeft: headerLeftComponent,
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
    name: screens.them_moi_vai_tro,
    component: ThemmoiVaitro,
    headerLeft: headerLeftComponent,
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
    name: screens.speechControl,
    component: SpeechControlScreen,
    headerLeft: headerLeftComponent,
    headerRight: null,
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
