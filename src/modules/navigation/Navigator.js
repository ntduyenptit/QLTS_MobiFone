/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { connect } from "react-redux";
// eslint-disable-next-line import/no-unresolved
import AsyncStorage from '@react-native-community/async-storage';

import Collapsible from 'react-native-collapsible';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigatorView from './RootNavigation';
import AuthScreen from '../auth/AuthViewContainer';
import { userLogin, userLogout } from '../../redux/actions/user.actions';
import store from '../../redux/store';

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
    children: [
      {
        name: 'Quản lý đầu đọc di động'
      },
      {
        name: 'Quản lý đầu đọc cố định'
      }
    ]
  },
  {
    name: 'Giám sát tài sản',
    icon: iconGrids,
    children: [
      {
        name: 'Giám sát tài sản'
      },
      {
        name: 'Theo dõi kết nối thiết bị'
      }
    ]
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
  {
    name: 'Đăng xuất',
    icon: iconQuanlyhethong,
  },
];

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function handler(props, children) {
  return (children.map((item, idx) => (
    <DrawerItem
      key={`expand_item-${idx + 1}`}
      label={() => (
        <View
          style={styles.menuLabelFlex}
        >
          <Text style={styles.menuTitle}>{item.name}</Text>
        </View>
)}
      onPress={() => props.navigation.navigate(item.name)}
    />
    )
  ))
}

function CustomDrawerContent(props) {
  const [state, setState] = useState({});
  const [user, setUser] = useState('');
  const signOut = () => {
    AsyncStorage.clear();
    store.dispatch(userLogout());
  }
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        const userNameOrEmailAddress = await AsyncStorage.getItem('@userNameOrEmail');
        if (userNameOrEmailAddress !== null) {
          setUser(userNameOrEmailAddress);
        }
      } catch (e) {
        console.log(e)
      }
    };

    bootstrapAsync();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/background.png')} style={styles.backgroundImage}>
        <View style={styles.profile}>
          <Image source={require('../../../assets/images/drawer/user.png')} resizeMode="contain" style={{ margin: 15, width: 60, height: 60, borderRadius: 20, alignSelf: 'center' }} />
          <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
            <Text style={{ fontWeight: '200', fontSize: 25, color: 'white', textAlign: 'center' }}>{user}</Text>
            <Text style={{ fontWeight: '200', color: 'white', maxWidth: 200, textAlign: 'center' }}>{user}@mobifone.vn</Text>
          </View>
        </View>
      </ImageBackground>

      <DrawerContentScrollView {...props} style={styles.drawer}>
        {drawerData.map((item, idx) => {
          if (!item.children) {
            return (
              <DrawerItem
                key={`drawer_item-${idx + 1}`}
                label={() => (
                  <View
                    style={styles.menuLabelFlex}
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={item.icon}
                    />
                    <Text style={styles.menuTitle}>{item.name}</Text>
                  </View>
            )}
                onPress={() => idx === drawerData.length - 1 ? signOut() : props.navigation.navigate(item.name)}
              />
            )
          }
          return (
            <View
              key={`drawer_children_item-${idx + 1}`} 
              style={{flex: 1}}
            >
              <DrawerItem
                label={() => (
                  <View
                    style={styles.menuLabelFlex}
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={item.icon}
                    />
                    <Text style={styles.menuTitle}>{item.name}</Text>
                    {state[item.name] ? (
                      <Icon name="angle-up" size={20} color='black' />
                  ) : <Icon name="angle-down" size={20} color='black' />}
                  </View>
            )}
                onPress={() => setState((prevState) => ({ [item.name]: !prevState[item.name] }))}
              />
              <Collapsible collapsed={!state[item.name]}>
                <View style={{flex: 20, paddingLeft: 40}}>
                  {handler(props, item.children)}
                </View>
              </Collapsible>
            </View>
          );
          })}

      </DrawerContentScrollView>
    </View>
  );
}

const DrawerStack = () => (
  <Drawer.Navigator
    drawerStyle={{
      backgroundColor: 'white',
    }}
    drawerContent={props => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen name="Homes" component={NavigatorView} />
  </Drawer.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      animationEnabled: false
    }}
    headerMode='none'
  >
    <Stack.Screen name="Login" component={AuthScreen} />
  </Stack.Navigator>
);

function App(stateToProps) {
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('@token');
        if (userToken !== null) {
          stateToProps.userLogin({ userToken })
        }
      } catch (e) {
        stateToProps.userLogout()
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      {!stateToProps.isUserLoggedIn ?
        <Stack.Screen name='Auth' component={AuthStack} />
          :
        <Stack.Screen name='App' component={DrawerStack} />
        }
    </Stack.Navigator>
  );
}

function mapStateToProps(state) {
  return { isUserLoggedIn: state.userReducer.isLoggedIn }
}

function mapDispatchToProps(dispatch) {
  return {
    userLogin: (token) => dispatch(userLogin(token)),
    userLogout: () => dispatch(userLogout()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    height: '20%',
    flexDirection: 'column',

  },
  backgroundImage: {
    width: "100%",
    
    resizeMode: "cover",
  },
  drawer: {
    height: '80%',
    padding: 0
  },
  menuTitle: {
    marginLeft: 10,
    color: 'black',
    flex: 1
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
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
