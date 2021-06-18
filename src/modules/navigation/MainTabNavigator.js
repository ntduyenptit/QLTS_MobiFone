import * as React from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../styles';

import tabNavigationData from './tabNavigationData';
import { store } from '../../redux/store';
import { setCurrentTab } from '../../redux/actions/screen.actions';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator tabBarOptions={{ style: { height: Platform.OS === 'ios' ? 90 : 50 } }}>
      {tabNavigationData.map((item, idx) => (
        <Tab.Screen
          key={`tab_item${idx + 1}`}
          name={item.name}
          component={item.component}
          listeners={{
            tabPress: e => {
              const tabName = e.target.substring(0, e.target.indexOf('-')); 
              store.dispatch(setCurrentTab(tabName));
            },
          }}
          tittle = {item.tittle}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <Image
                  resizeMode="contain"
                  source={item.icon}
                  style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                />
              </View>
            ),
            tabBarLabel: ({ focused }) => <Text style={{ fontSize: 14, color: focused ? "#5A1681" : colors.gray }}>{item.name}</Text>,
            
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
    bottom: Platform.OS === 'ios' ? -5 : 0,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconFocused: {
    tintColor: "#5A1681",
  },
});
