import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';

import { colors, fonts } from '../../styles';
import { store } from '../../redux/store';
import { setCurrentTab } from '../../redux/actions/screen.actions';
import tabPagesViewData from './tabPagesViewData';

const { width } = Dimensions.get('window');
const itemWidth = (width - 12) / 3;
export default function PagesScreen(props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabPagesViewData}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
            store.dispatch(setCurrentTab(item.name));
            props.navigation.navigate(item.name)
            }}
            style={styles.item}
          >
            <Image
              resizeMode="contain"
              source={item.icon}
              style={styles.itemImage}
            />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        // Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  item: {
    paddingHorizontal: 10,
    marginTop: 10,
    width: itemWidth - 12,
    height: 120,
    paddingVertical: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  blogItem: {
    width: '31%',
    height: 120,
    paddingVertical: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: colors.primary,
    fontFamily: fonts.primary,
    justifyContent: 'center',
    textAlign:'center'
  },
  itemImage: {
    height: 35,
  },
});
