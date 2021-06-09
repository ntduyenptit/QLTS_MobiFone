/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

export default function MoreMenu(props) {
  let _menu = null;

  function hideMenu(action) {
    if(_menu) {
      _menu.hide();
      action();
    }
  };

  const showMenu = () => _menu.show();

  const renderSubMenu = ({item}) => (
    <>
      <MenuItem onPress={() => hideMenu(item.action)}>{item.title}</MenuItem>
      <MenuDivider />
    </>
    )

  return (
    <TouchableOpacity
      onPress={() => showMenu()}
    >
      <View style={styles.containerMenu}>
        <Menu ref={ref => {_menu = ref}} marginRight='10' button={<Icon name="ellipsis-v" color="white" size={20} onPress={showMenu} />}>
          <FlatList
            data={props.listMenu}
            renderItem={renderSubMenu}
            keyExtractor={item => `${item}`}
          />
        </Menu>
      </View>
    </TouchableOpacity>
  );
}

MoreMenu.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  listMenu: PropTypes.array,
};

const styles = StyleSheet.create({
  containerMenu: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    marginRight: 15,
    justifyContent: 'center',
  }
});
