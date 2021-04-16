import React from 'react';
import { TouchableOpacity, Image,View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import TabNavigator from './MainTabNavigator';
import GalleryScreen from '../gallery/GalleryViewContainer';
import AvailableInFullVersion from "../availableInFullVersion/AvailableInFullVersionViewContainer";

// import ProfileScreen from '../profile/ProfileViewContainer';
// import ArticleScreen from '../article/ArticleViewContainer';
// import ChatScreen from '../chat/ChatViewContainer';
// import MessagesScreen from '../chat/MessagesViewContainer';
// import ChartsScreen from '../charts/ChartsViewContainer';

import { colors, fonts } from '../../styles';

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

const headerRightComponent = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      paddingHorizontal: 16,
      paddingVertical: 12,
    }}
  >
    <View style={{ marginTop: 10,  marginLeft: 15, backgroundColor: 'transparent' }}>
      <Icon name="search" color="white" size={25} />
    </View>
  </TouchableOpacity>

)
const headerBackground = require('../../../assets/images/topBarBg.png');

const StackNavigationData = [
  {
    name: 'Quản lý tài sản',
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
    name: 'Quản lý đầu đọc di động',
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
    name: 'Quản lý đầu đọc cố định',
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
    name: 'Giám sát tài sản',
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
    name: 'Theo dõi kết nối thiết bị',
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
    name: 'Quản lý kiểm kê tài sản',
    component: GalleryScreen,
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
    name: 'Quản lý dự trù mua sắm',
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
    name: 'Quản lý cảnh báo',
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
    name: 'Quản lý danh mục',
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
    name: 'Quản lý nhà cung cấp',
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
    name: 'Quản lý vị trí địa lý',
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
    name: 'Quản lý loại tài sản',
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
    name: 'Quản lý đơn vị',
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
    name: 'Báo cáo',
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
    name: 'Báo cáo người dùng',
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
    name: 'Báo cáo cảnh báo',
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
    name: 'Đặt lịch xuất báo cáo',
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
    name: 'Báo cáo thông tin thiết bị RFID',
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
    name: 'Báo cáo thông tin tài sản',
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
    name: 'Quản lý hệ thống',
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
    name: 'Quản lý người dùng',
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
    name: 'Quản lý phân quyền',
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
    name: 'Lịch sử người dùng',
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
    name: 'Quản lý Mail, Server',
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

]

export default StackNavigationData;
