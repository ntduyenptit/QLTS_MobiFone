import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';

import AvailableInFullVersion from '../../modules/availableInFullVersion/AvailableInFullVersionViewContainer';

const iconHome = require('../../../assets/images/drawer/quanlytaisan.png');
const iconCalendar = require('../../../assets/images/drawer/quanlydaudoc.png');
const iconGrids = require('../../../assets/images/drawer/giamsattaisan.png');
const iconPages = require('../../../assets/images/drawer/quanlykiemke.png');
const iconComponents = require('../../../assets/images/drawer/quanlydutrumuasam.png');
const iconQuanlycanhbao = require('../../../assets/images/drawer/quanlycanhbao.png');
const iconBaocao = require('../../../assets/images/drawer/baocao.png');
const iconQuanlydanhmuc = require('../../../assets/images/drawer/quanlydanhmuc.png');

const iconQuanlyhethong = require('../../../assets/images/drawer/quanlyhethong.png');

const drawerData = [
  {
    name: 'Quản lý tài sản',
    icon: iconHome,
  },
  {
    name: 'Quản lý đầu đọc',
    icon: iconCalendar,
  },
  {
    name: 'Giám sát tài sản',
    icon: iconGrids,
  },
  {
    name: 'Quản lý kiểm kê tài sản',
    icon: iconPages,
  },
  {
    name: 'Quản lý dự trù mua sắm',
    icon: iconComponents,
  },
  {
    name: 'Quản lý cảnh báo',
    icon: iconQuanlycanhbao,
  },
  {
    name: 'Báo cáo',
    icon: iconBaocao,
  },
  {
    name: 'Quản lý danh mục',
    icon: iconQuanlydanhmuc,
  },
  {
    name: 'Quản lý hệ thống',
    icon: iconQuanlyhethong,
  },
];

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={require('../../../assets/images/drawer/user.png')} resizeMode="contain" style={{ margin: 15, width: 60, height: 60, borderRadius: 20, alignSelf: 'center' }} />
        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
          <Text style={{ fontWeight: '200', fontSize: 25, color: 'white', textAlign: 'center' }}>admin</Text>
          <Text style={{ fontWeight: '200', color: 'white', maxWidth: 200, textAlign: 'center' }}>admin@mobifone.vn</Text>
        </View>
      </View>

      <View>

      </View>
      <DrawerContentScrollView {...props} style={styles.drawer}>
        {drawerData.map((item, idx) => (
          <DrawerItem
            key={`drawer_item-${idx + 1}`}
            label={() => (
              <View
                style={styles.menuLabelFlex}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={item.icon}
                />
                <Text style={styles.menuTitle}>{item.name}</Text>
              </View>
            )}
            onPress={() => props.navigation.navigate(item.name)}
          />
        ))}
       
      </DrawerContentScrollView>
    </View>
  );
}

export default function App() {

  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: 'white',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    height: '20%',
    flexDirection: 'column',
    backgroundColor: '#156ea6'

  },
  drawer: {
    height: '80%',
    padding: 0
  },
  menuTitle: {
    marginLeft: 10,
    color: 'black'
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  userName: {
    color: '#fff',
    fontSize: 18
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
});
