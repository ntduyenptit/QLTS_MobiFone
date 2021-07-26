import { screens } from '@app/api/config';
import React, { useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getLVKDDDataFilter } from '@app/modules/global/FilterApis';
import { connect } from 'react-redux';
import MultiSelect from '../../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { 
  addSelectedLVKDAction,
 } from '../../../../redux/actions/filter.actions';
 import { getLVKDDataAction } from '@app/redux/actions/filter.actions';

const QuanLyNCCFilterComponent = (items) => {

  const nhaCungCapRef = useRef();

  useEffect(() => {
    if (!items.lvkdDataFilter) {
      getLVKDDDataFilter().then(res => {
        if (res) {
          items.setLVKDDataAction(res.result);
        }
      })
    }
  }, []);

  // selectedChange
  const onSelectedLVKDChange = (newSelectItems) => {
    items.addSelectedLVKD(newSelectItems);
  }
  
  // end SelectedChange
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Lĩnh vực kinh doanh</Text>
          <MultiSelect
            ref={nhaCungCapRef}
            items={items.LvkdDataFilter}
            IconRenderer={Icon}
            single
            styleListContainer={items.NccDataFilter && items.NccDataFilter.length > 9 ? { height: 200 } : null}
            searchInputPlaceholderText="Tìm kiếm..."
            uniqueKey="id"
            displayKey="displayName"
            selectText="Chọn lĩnh vực kinh doanh..."
            onSelectedItemsChange={(item) => onSelectedLVKDChange(item)}
            selectedItems={items.lvkdFilterSelected}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    width: 300
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: -10,
    padding: 10,
  },
  component: {

  }

});

const mapStateToProps = state => ({
  LvkdDataFilter: state.filterLVKDDataReducer.lvkdDataFilter,

  lvkdFilterSelected: state.filterLVKDSelectedReducer.lvkdFilterSelected,
});

function mapDispatchToProps(dispatch) {
  return {
    addSelectedLVKD: (item) => dispatch(addSelectedLVKDAction(item)),
    setLVKDDataAction: (items) => dispatch(getLVKDDataAction(items))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyNCCFilterComponent);