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
import { store } from '../../redux/store';
import { showFilter } from '../../redux/actions/filter.actions';

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
    name: 'Quản lý đầu đọc',
    component: AvailableInFullVersion,
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
    name: 'Giám sát tài sản',
    component: AvailableInFullVersion,
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
    name: 'Quản lý kiểm kê tài sản',
    component: GalleryScreen,
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
    name: 'Quản lý dự trù mua sắm',
    component: AvailableInFullVersion,
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
    name: 'Quản lý cảnh báo',
    component: AvailableInFullVersion,
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
    name: 'Quản lý danh mục',
    component: AvailableInFullVersion,
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
    name: 'Báo cáo',
    component: AvailableInFullVersion,
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
    name: 'Quản lý hệ thống',
    component: AvailableInFullVersion,
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
]

export default StackNavigationData;
