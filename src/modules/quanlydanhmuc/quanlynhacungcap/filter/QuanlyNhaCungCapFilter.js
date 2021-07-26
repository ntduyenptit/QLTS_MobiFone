import { screens } from '@app/api/config';
import React, { useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import MultiSelect from '../../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { 
  addSelectedLVKDAction,
 } from '../../../../redux/actions/filter.actions';
import store from '../../../../redux/store';

const QuanLyNCCFilterComponent = (items) => {

  const nhaCungCapRef = useRef();

  useEffect(() => {
    
  }, []);

  // selectedChange
  const onSelectedLVKDChange = (newSelectItems) => {
    items.addSelectedLVKD({data: newSelectItems, screen: screens.quan_ly_nha_cung_cap});
  }
  
  // end SelectedChange
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Lĩnh vực kinh doanh</Text>
          <MultiSelect
            ref={nhaCungCapRef}
            items={items.NccDataFilter}
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
  NccDataFilter: state.filterNCCDataReducer.nccDataFilter,

  lvkdFilterSelected: state.filterNCCSelectedReducer.nccFilterSelected,
});

function mapDispatchToProps(dispatch) {
  return {
    addSelectedLVKD: (item) => dispatch(addSelectedLVKDAction(item)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyNCCFilterComponent);