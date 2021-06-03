import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import store from '../../redux/store';


function MoreMenu(tab) {
  const menu = useRef();
  const screen = store.getState().currentScreenReducer.screenName || store.getState().currentTabReducer.tabName;

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  if (store.getState().currentTabReducer.tabName != null) {
    console.log("Screen more menu: " + store.getState().currentTabReducer.tabName);
  } else {
    console.log("Screen more menu: " + store.getState().currentScreenReducer.screenName);
  }

  return (
    <View style={styles.container}>
      <Menu ref={menu} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} onPress={showMenu} />}>
        <MenuItem onPress={hideMenu}>Cập nhật</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Khai báo sử dụng</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Cấp phát</MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu} disabled>
          Điều chuyển
        </MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Thu hồi</MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    marginRight: 15,
    justifyContent: 'center',
  },
});

export default MoreMenu;
