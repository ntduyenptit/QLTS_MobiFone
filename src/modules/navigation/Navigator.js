/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
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
import { Header } from 'react-native/Libraries/NewAppScreen';
import NavigatorView from './RootNavigation';
import AuthScreen from '../auth/AuthViewContainer';
import ForgotPassword from '../auth/ForgotPassword';
import { userLogin, userLogout } from '../../redux/actions/user.actions';
import { setCurrentScreen } from '../../redux/actions/screen.actions';
import { store } from '../../redux/store';
import { drawerData } from '../../api/config';
import { fonts,colors } from '../../styles';

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
        {/* <Collapsible collapsed={!state[item.name]}>
                <View style={{ flex: 20, paddingLeft: 30 }}>
                  {handler(props, item.children)}
                </View>
              </Collapsible> */}
          <Icon
                      name='cog'
                      size={27}
                      style = {{position: 'absolute' , right: 5,padding:10}}
                      color='white'
                    />
          <Image source={require('../../../assets/images/drawer/user.png')} resizeMode="contain" style={{ marginTop: 40, width: 80, height: 80, borderRadius: 20, alignSelf: 'center' }} />
          <View style={{  alignSelf: 'center' , marginTop: 15}}>
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
                    <Icon
                      name={item.icon}
                      size={17}
                      color='#0080FF'
                    />

                    <Text style={styles.menuTitle}>{item.name}</Text>
                  </View>
                )}
                onPress={() => {
                  store.dispatch(setCurrentScreen(item.name))
                  props.navigation.navigate(item.name)
                }}
              />
            )
          }
          return (
            <View
              key={`drawer_children_item-${idx + 1}`}
              style={{ flex: 1 }}
            >
              <DrawerItem
                label={() => (
                  <View
                    style={styles.menuLabelFlex}
                  >
                    <Icon
                      name={item.icon}
                      size={17}
                      color='#0080FF'
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
                <View style={{ flex: 20, paddingLeft: 30 }}>
                  {handler(props, item.children)}
                </View>
              </Collapsible>
            </View>
          );
        })}
        <View style={styles.divider} />
        <TouchableOpacity style={styles.logout} onPress={signOut}>
          <Icon
            name="sign-out"
            size={17}
            color='#0080FF'
          />
          <Text style={{ marginLeft: 15 }}>Đăng xuất</Text>
        </TouchableOpacity>
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

    <Stack.Screen name="Auth" component={AuthScreen} />
  </Stack.Navigator>
);
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
const ForgotPasswordStack = () => (
  <Stack.Navigator
    initialRouteName="Quên mật khẩu"
    screenOptions={{
      headerLeft: headerLeftComponent,
      headerRight: null,
      headerBackground: () => (
        <Image style={styles.headerImage} source={require('../../../assets/images/topBarBg.png')} />
      ),
      headerTitleStyle: {
        fontFamily: fonts.primaryRegular,
        color: colors.white,
        fontSize: 18,
        alignSelf: 'center'
      },
    }}
  >

    <Stack.Screen name="Quên mật khẩu" component={ForgotPassword} />
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
      <Stack.Screen name = 'Quên mật khẩu' component = {ForgotPasswordStack} />
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
    flex: 1,
    flexDirection: 'column',
  },
  profile: {
    height: '25%',
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
    borderBottomColor: 'black',
    opacity: 0.2,
    borderBottomWidth: 1,
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
  logout: {
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 15,
    flexDirection: 'row',
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: `${100}%`,
    height: Header.height,
  },
  headerTitleStyle: {
    fontFamily: fonts.primaryRegular,
    color: 'white',
    fontSize: 18,
    alignSelf: 'center'
  }
});
