import { tabs } from '../../api/config';
import QuanLyTaiSanScreen from '../quanlytaisan/QuanLyTaiSanContainer';

const chartIcon = require('../../../assets/images/pages/chart.png');
const calendarIcon = require('../../../assets/images/pages/calendar.png');
const chatIcon = require('../../../assets/images/pages/chat.png');
const galleryIcon = require('../../../assets/images/pages/gallery.png');
const profileIcon = require('../../../assets/images/pages/profile.png');

const tabPagesViewData = [
    {
      name: tabs.tai_san_dang_su_dung,
      component: QuanLyTaiSanScreen,
      icon: chartIcon,
    },
   
    {
      name: tabs.tai_san_chua_su_dung,
      component: QuanLyTaiSanScreen,
      icon: calendarIcon,
    },
    {
      name: tabs.tai_san_sua_chua_bao_duong,
      component: QuanLyTaiSanScreen,
      icon: chatIcon,
    },
    {
      name: tabs.tai_san_huy,
      component: QuanLyTaiSanScreen,
      icon: galleryIcon,
    },
    {
      name: tabs.bao_hong_mat_tai_san,
      component: QuanLyTaiSanScreen,
      icon: profileIcon,
    },
  ];

  export default tabPagesViewData;