import { tabs } from '../../api/config';
import QuanLyTaiSanScreen from '../quanlytaisan/QuanLyTaiSanContainer';
import TaiSanDangSuDung from '../quanlytaisan/taisandangsudung/TaiSanDangSuDung';

const tsdangsd = require('../../../assets/images/pages/chuasd.png');
const tschuasd = require('../../../assets/images/pages/dangsd.png');

const tshuy = require('../../../assets/images/pages/huy.png');
const tsscbd = require('../../../assets/images/pages/scbd.png');
const baohongmat = require('../../../assets/images/pages/baohm.png');

const tabPagesViewData = [
    {
      name: tabs.tai_san_dang_su_dung,
      component: TaiSanDangSuDung,
      icon: tsdangsd,
    },
   
    {
      name: tabs.tai_san_chua_su_dung,
      component: QuanLyTaiSanScreen,
      icon: tschuasd,
    },
    {
      name: tabs.tai_san_sua_chua_bao_duong,
      component: QuanLyTaiSanScreen,
      icon: tsscbd,
    },
    {
      name: tabs.tai_san_huy,
      component: QuanLyTaiSanScreen,
      icon: tshuy,
    },
    {
      name: tabs.bao_hong_mat_tai_san,
      component: QuanLyTaiSanScreen,
      icon: baohongmat,
    },
  ];

  export default tabPagesViewData;