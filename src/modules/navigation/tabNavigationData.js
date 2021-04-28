import QuanLyTaiSanScreen from '../quanlytaisan/QuanLyTaiSanContainer';
import PagesScreen from '../pages/PagesViewContainer';
import { tabs } from '../../api/config';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: tabs.toan_bo_tai_san,
    component: QuanLyTaiSanScreen,
    icon: iconHome,
  },
 
  {
    name: tabs.tai_san_mat,
    component: QuanLyTaiSanScreen,
    icon: iconGrids,
  },
  {
    name: tabs.tai_san_hong,
    component: QuanLyTaiSanScreen,
    icon: iconPages,
  },
  {
    name: tabs.tai_san_thanh_ly,
    component: QuanLyTaiSanScreen,
    icon: iconCalendar,
  },
  {
    name: 'Khác',
    component: PagesScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;