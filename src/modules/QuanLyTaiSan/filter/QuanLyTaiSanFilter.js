import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { filterType } from '../../global/Config';
import { buildTree } from '../../global/Helper';
import { screens, tabs } from '../../../api/config';

const QuanLyTaiSanFilterComponent = (items) => {
  const [selectedDVQLItems, setDVQLItems] = useState([]);
  const [selectedLTSItems, setLTSItems] = useState([]);
  const [selectedNCCItems, setNCCItems] = useState([]);
  const [selectedMSDItems, setMSDItems] = useState([]);

  const donViQuanLyRef  = useRef();
  const loaiTaiSanRef  = useRef();
  const nhaCungCapRef  = useRef();
  const maSuDungRef  = useRef();

  const dvqlTreeData = buildTree(items.DvqlDataFilter);

  const closeMultiSelectIfOpened = (type) => {
    switch (type) {
      case filterType.don_vi_quan_ly:
        if (loaiTaiSanRef.current.state.selector) {
          loaiTaiSanRef.current._toggleSelector();
        }
        if (nhaCungCapRef.current.state.selector) {
          nhaCungCapRef.current._toggleSelector();
        };
        if (maSuDungRef.current.state.selector) {
          maSuDungRef.current._toggleSelector();
        };
        break;
      case filterType.loai_tai_san:
        if (donViQuanLyRef.current.state.selector) {
          donViQuanLyRef.current._toggleSelector();
        };
        if (nhaCungCapRef.current.state.selector) {
          nhaCungCapRef.current._toggleSelector();
        };
        if (maSuDungRef.current.state.selector) {
          maSuDungRef.current._toggleSelector();
        };
        break;
      case filterType.nha_cung_cap:
        if (donViQuanLyRef.current.state.selector) {
          donViQuanLyRef.current._toggleSelector();
        };
        if (loaiTaiSanRef.current.state.selector) {
          loaiTaiSanRef.current._toggleSelector();
        }
        if (maSuDungRef.current.state.selector) {
          maSuDungRef.current._toggleSelector();
        };
        break;
      case filterType.ma_su_sung:
        if (donViQuanLyRef.current.state.selector) {
          donViQuanLyRef.current._toggleSelector();
        };
        if (loaiTaiSanRef.current.state.selector) {
          loaiTaiSanRef.current._toggleSelector();
        }
        if (nhaCungCapRef.current.state.selector) {
          nhaCungCapRef.current._toggleSelector();
        };
        break;
      default:
        break;
    }
  }

  const requestToanBoTaiSanDataByFilter = (params) => {

  }

  // selectedChange
  const onSelectedDVQLChange = (newSelectItems) => {
    setDVQLItems((newSelectItems), () => {
      requestToanBoTaiSanDataByFilter({'DVQL_Filter': selectedDVQLItems});
    });
  }
  const onSelectedLTSChange = (newSelectItems) => {
    setLTSItems((newSelectItems), () => {
      requestToanBoTaiSanDataByFilter({'LTS_Filter': selectedLTSItems});
    });
  }
  const onSelectedNCCChange = (newSelectItems) => {
    setNCCItems((newSelectItems), () => {
      requestToanBoTaiSanDataByFilter({'NCC_Filter': selectedNCCItems});
    });
  }
  const onSelectedMSDChange = (newSelectItems) => {
    setMSDItems((newSelectItems), () => {
      requestToanBoTaiSanDataByFilter({'MSD_Filter': selectedMSDItems});
    });
  }
  // end SelectedChange
  return (
    <View style={styles.container}>
      {items.screen === screens.quan_ly_tai_san && (
      items.tab === tabs.toan_bo_tai_san
      || items.tab === tabs.tai_san_chua_su_dung
      || items.tab === tabs.tai_san_dang_su_dung
      || items.tab === tabs.tai_san_sua_chua_bao_duong
      || items.tab === tabs.tai_san_mat
      || items.tab === tabs.tai_san_hong
      || items.tab === tabs.tai_san_thanh_ly
      || items.tab === tabs.tai_san_huy
      || items.tab === tabs.bao_hong_mat_tai_san
    ) && (
      <>
        <View>
          <Text style={styles.titleText}>{tabs.bao_hong_mat_tai_san ? `Đơn vị khai báo` : `Đơn vị quản lý`}</Text>
          <MultiSelect
            ref={donViQuanLyRef}
            isTree
            getCollapsedNodeHeight={{height: 200}}
            onToggleList={() => closeMultiSelectIfOpened(filterType.don_vi_quan_ly)}
            items={dvqlTreeData}
            IconRenderer={Icon}
            searchInputPlaceholderText="Tìm kiếm..."
            styleListContainer={dvqlTreeData && dvqlTreeData.length > 9 ? { height: 200 } : null}
            uniqueKey="id"
            displayKey="displayName"
            selectText="Chọn đơn vị quản lý..."
            onSelectedItemsChange={(item) => onSelectedDVQLChange(item)}
            selectedItems={selectedDVQLItems}
          />
        </View>
      </>
    )}
      {items.screen === screens.quan_ly_tai_san && (
      items.tab === tabs.toan_bo_tai_san
      || items.tab === tabs.tai_san_chua_su_dung
      || items.tab === tabs.tai_san_dang_su_dung
      || items.tab === tabs.tai_san_sua_chua_bao_duong
      || items.tab === tabs.tai_san_mat
      || items.tab === tabs.tai_san_hong
      || items.tab === tabs.tai_san_thanh_ly
      || items.tab === tabs.tai_san_huy
    ) && (
      <>
        <View>
          <Text style={styles.titleText}>Loại tài sản</Text>
          <MultiSelect
            ref={loaiTaiSanRef}
            onToggleList={() => closeMultiSelectIfOpened(filterType.loai_tai_san)}
            items={items.LtsDataFilter}
            IconRenderer={Icon}
            styleListContainer={items.LtsDataFilter && items.LtsDataFilter.length > 9 ? { height: 200 } : null}
            single
            searchInputPlaceholderText="Tìm kiếm..."
            uniqueKey="id"
            displayKey="displayName"
            selectText="Chọn loại tài sản..."
            onSelectedItemsChange={(item) => onSelectedLTSChange(item)}
            selectedItems={selectedLTSItems}
          />
        </View>
      </>
    )}
      {items.screen === screens.quan_ly_tai_san && (
      items.tab === tabs.toan_bo_tai_san
      || items.tab === tabs.tai_san_chua_su_dung
      || items.tab === tabs.tai_san_dang_su_dung
      || items.tab === tabs.tai_san_sua_chua_bao_duong
      || items.tab === tabs.tai_san_mat
      || items.tab === tabs.tai_san_hong
      || items.tab === tabs.tai_san_thanh_ly
      || items.tab === tabs.tai_san_huy
    ) && (
      <>
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
            selectedItems={selectedNCCItems}
          />
        </View>
      </>
    )}
      {items.screen === screens.quan_ly_tai_san && (
      items.tab === tabs.toan_bo_tai_san
      || items.tab === tabs.tai_san_chua_su_dung
      || items.tab === tabs.tai_san_dang_su_dung
    ) && (
      <>
        <View>
          <Text style={styles.titleText}>Mã sử dụng</Text>
          <MultiSelect
            ref={maSuDungRef}
            onToggleList={() => closeMultiSelectIfOpened(filterType.ma_su_sung)}
            items={items.MsdDataFilter}
            IconRenderer={Icon}
            single
            styleListContainer={items.MsdDataFilter && items.MsdDataFilter.length > 9 ? { height: 200 } : null}
            searchInputPlaceholderText="Tìm kiếm..."
            uniqueKey="id"
            displayKey="displayName"
            selectText="Chọn mã sử dụng..."
            onSelectedItemsChange={(item) => onSelectedMSDChange(item)}
            selectedItems={selectedMSDItems}
          />
        </View>
      </>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
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
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  LtsDataFilter: state.filterLTSDataReducer.ltsDataFilter,
  NccDataFilter: state.filterNCCDataReducer.nccDataFilter,
  MsdDataFilter: state.filterMSDDataReducer.msdDataFilter,
  screen: state.currentScreenReducer.screenName,
  tab: state.currentTabReducer.tabName
});

export default connect(mapStateToProps)(QuanLyTaiSanFilterComponent);