import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { connect } from 'react-redux';

const QuanLyTaiSanFilterComponent = (items) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const onSelectedNewChange = (newSelectItems) => {
      setSelectedItems(newSelectItems);
  }
  return (
    <View style={styles.container}>
      <SectionedMultiSelect
        items={items.DvqlDataFilter}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Đơn vị quản lý..."
        showDropDowns
        readOnlyHeadings
        onSelectedItemsChange={(item) => onSelectedNewChange(item)}
        selectedItems={selectedItems}
      />
      <SectionedMultiSelect
        items={items.LtsDataFilter}
        IconRenderer={Icon}
        single
        uniqueKey="id"
        subKey="children"
        selectText="Loại tài sản..."
        showDropDowns
        readOnlyHeadings
        onSelectedItemsChange={(item) => onSelectedNewChange(item)}
        selectedItems={selectedItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      width: 300
    }
  });

  const mapStateToProps = state => ({
    DvqlDataFilter: state.filterDataReducer.dvqlDataFilter,
    LtsDataFilter: state.filterDataReducer.ltsDataFilter,
    NccDataFilter: state.filterDataReducer.nccDataFilter,
    MsdDataFilter: state.filterDataReducer.msdDataFilter,
});

  export default connect(mapStateToProps)(QuanLyTaiSanFilterComponent);