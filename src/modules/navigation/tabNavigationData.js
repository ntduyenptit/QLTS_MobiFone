import QuanLyTaiSanScreen from '../quanlytaisan/QuanLyTaiSanContainer';
import QuanLyTaiSanMatScreen from '../quanlytaisan/taisanmat/QuanLyTaiSanMatContainer';
import QuanLyTSHongScreen from '../quanlytaisan/taisanhong/QuanLyTaiSanHongContainer';
import QuanLyTSThanhLyScreen from '../quanlytaisan/taisanthanhly/QuanLyTaiSanThanhLyContainer';
import PagesScreen from '../pages/PagesViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: 'Toàn bộ TS',
    component: QuanLyTaiSanScreen,
    icon: iconHome,
  },
 
  {
    name: 'TS mất',
    component: QuanLyTaiSanMatScreen,
    icon: iconGrids,
  },
  {
    name: 'TS hỏng',
    component: QuanLyTSHongScreen,
    icon: iconPages,
  },
  {
    name: 'TS thanh lý',
    component: QuanLyTSThanhLyScreen,
    icon: iconCalendar,
  },
  {
    name: 'Khác',
    component: PagesScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;