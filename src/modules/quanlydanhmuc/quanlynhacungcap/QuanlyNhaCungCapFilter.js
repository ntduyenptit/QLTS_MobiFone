/* eslint-disable import/no-cycle */
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import find from 'lodash/find';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { filterType } from '../../global/Config';
//import { GetNCCData } from '../QuanLyTaiSan';
import { 
  addSelectedNCCAction,

  removeSelectedNCCAction,
 } from '../../../redux/actions/filter.actions';
import store from '../../../redux/store';

const QuanLyNCCFilterComponent = (items) => {

  const nhaCungCapRef = useRef();

  const closeMultiSelectIfOpened = (type) => {
    switch (type) {
     
     
      case filterType.nha_cung_cap:
        
        break;
     
      default:
        break;
    }
  }

  // selectedChange
  const onSelectedNCCChange = (newSelectItems) => {
    items.removeSelectedLTS({data: newSelectItems, screen: items.screen, tab: items.tab});
    items.addSelectedNCC({data: newSelectItems, screen: items.screen, tab: items.tab});
    //GetNCCData({ nhacungcap: newSelectItems, isFilter: true });
  }
  
  // end SelectedChange
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Nhà cung cấp</Text>
            <MultiSelect
              ref={nhaCungCapRef}
              onToggleList={() => closeMultiSelectIfOpened(filterType.nha_cung_cap)}
              items={items.NccDataFilter}
              IconRenderer={Icon}
              single
              styleListContainer={items.NccDataFilter && items.NccDataFilter.length > 9 ? { height: 200 } : null}
              searchInputPlaceholderText="Tìm kiếm..."
              uniqueKey="id"
              displayKey="displayName"
              selectText="Chọn nhà cung cấp..."
              onSelectedItemsChange={(item) => onSelectedNCCChange(item)}
              selectedItems={find(items.NccFilterSelected, itemSelected => itemSelected.tab === items.tab) 
              && find(items.NccFilterSelected, itemSelected => itemSelected.tab === items.tab).data}
            />
          </View>
          <View>
            <Text style={styles.titleText}>Lĩnh vực kinh doanh</Text>
            <MultiSelect
              ref={nhaCungCapRef}
              onToggleList={() => closeMultiSelectIfOpened(filterType.nha_cung_cap)}
              items={items.NccDataFilter}
              IconRenderer={Icon}
              single
              styleListContainer={items.NccDataFilter && items.NccDataFilter.length > 9 ? { height: 200 } : null}
              searchInputPlaceholderText="Tìm kiếm..."
              uniqueKey="id"
              displayKey="displayName"
              selectText="Chọn nhà cung cấp..."
              onSelectedItemsChange={(item) => onSelectedNCCChange(item)}
              selectedItems={find(items.NccFilterSelected, itemSelected => itemSelected.tab === items.tab) 
              && find(items.NccFilterSelected, itemSelected => itemSelected.tab === items.tab).data}
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

  NccFilterSelected: state.filterNCCSelectedReducer.nccFilterSelected,
});

function mapDispatchToProps(dispatch) {
  return {
    addSelectedNCC: (item) => dispatch(addSelectedNCCAction(item)),
    removeSelectedNCC: (item) => dispatch(removeSelectedNCCAction(item)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyNCCFilterComponent);