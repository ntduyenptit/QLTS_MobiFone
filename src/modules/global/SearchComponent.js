/* eslint-disable import/no-cycle */
import React from 'react';
import { Animated, StyleSheet, TextInput } from 'react-native';
import find from 'lodash/find';
import { store } from '../../redux/store';
import { deviceWidth } from './LoaderComponent';
import { addSearch, removeSearch } from '../../redux/actions/search.actions';
import { screens } from '../../api/config';

const SearchComponent = (props) => {
  const {
    clampedScroll,
    screen,
    tab,
    action
  } = props;
  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -(250)],
    extrapolate: 'clamp',
  });
  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const textSearch = store.getState().SearchReducer.searchData;
  let value = "";
  if (screen === screens.quan_ly_tai_san) {
    value = find(textSearch, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tab)
    && find(textSearch, itemSelected => itemSelected.screen === screens.quan_ly_tai_san && itemSelected.tab === tab).data;
  } else {
    value = find(textSearch, itemSelected => itemSelected.screen === screen)
    && find(textSearch, itemSelected => itemSelected.screen === screen).data;
  }

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [
          {
            translateY: searchBarTranslate
          }
        ],
        opacity: searchBarOpacity,
      }
    ]}
    >
      <TextInput
        placeholder="Tìm kiếm tài sản"
        style={styles.formField}
        placeholderTextColor="#888888"
        value={value}
        onChangeText={(text) => {
          if (screen === screens.quan_ly_tai_san) {
              store.dispatch(removeSearch({ data: text, screen, tab }));
            store.dispatch(addSearch({ data: text, screen, tab }));
          } else if (action) {
            setTimeout(() => action(text), 1000);
            } else {
              store.dispatch(removeSearch({ data: text, screen }));
            store.dispatch(addSearch({ data: text, screen }));
            }
        }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    width: deviceWidth - 40,
    left: 20,
    zIndex: 99,
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: '#888888',
    fontSize: 18,
    height: 50,
    backgroundColor: 'white'
  }
})

export default SearchComponent;