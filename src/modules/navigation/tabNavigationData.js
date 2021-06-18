import QuanLyTaiSanScreen from '../quanlytaisan/QuanLyTaiSanContainer';
import PagesScreen from '../pages/PagesViewContainer';
import { tabs } from '../../api/config';

const iconComponents = require('../../../assets/images/tabbar/components.png');

const tshong = require('../../../assets/images/pages/hong.png');
const tsmat = require('../../../assets/images/pages/mat.png');
const tsthanhly = require('../../../assets/images/pages/thanhly.png');
const tbts = require('../../../assets/images/pages/tbts.png');

const tabNavigationData = [
  {
    name: tabs.toan_bo_tai_san,
    component: QuanLyTaiSanScreen,
    icon: tbts,
    tittle: "Toàn bộ tài sản",
  },
 
  {
    name: tabs.tai_san_mat,
    component: QuanLyTaiSanScreen,
    icon: tsmat,
    tittle: "Tài sản mất",
  },
  {
    name: tabs.tai_san_hong,
    component: QuanLyTaiSanScreen,
    icon: tshong,
  },
  {
    name: tabs.tai_san_thanh_ly,
    component: QuanLyTaiSanScreen,
    icon: tsthanhly,
  },
  {
    name: 'Khác',
    component: PagesScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;