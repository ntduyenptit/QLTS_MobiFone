/* eslint-disable import/no-cycle */
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import find from 'lodash/find';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { filterType } from '../../global/Config';
import { buildTree } from '../../global/Helper';
import { deviceWidth } from '../../global/LoaderComponent';
import { screens, tabs, hinhThucData } from '../../../api/config';
import { 
  addSelectedDVQLAction,
  addSelectedLTSAction,
  addSelectedMSDAction,
  addSelectedNCCAction,
  addSelectedTTAction,
  addSelectedTTSDAction,
  addSelectedHTAction,

  removeSelectedDVQLAction,
  removeSelectedLTSAction,
  removeSelectedMSDAction,
  removeSelectedNCCAction,
  removeSelectedTTAction,
  removeSelectedTTSDAction,
  removeSelectedHTAction,
 } from '../../../redux/actions/filter.actions';

const QuanLyTaiSanFilterComponent = (items) => {

  const donViQuanLyRef = useRef();
  const loaiTaiSanRef = useRef();
  const nhaCungCapRef = useRef();
  const maSuDungRef = useRef();
  const hinhThucRef = useRef();

  const dvqlTreeData = buildTree(items.DvqlDataFilter);

  const closeMultiSelectIfOpened = (type) => {
    switch (type) {
      case filterType.don_vi_quan_ly:
        if (loaiTaiSanRef.current && loaiTaiSanRef.current.state.selector) {
          loaiTaiSanRef.current._toggleSelector();
        }
        if (nhaCungCapRef.current && nhaCungCapRef.current.state.selector) {
          nhaCungCapRef.current._toggleSelector();
        };
        if (maSuDungRef.current && maSuDungRef.current.state.selector) {
          maSuDungRef.current._toggleSelector();
        };
        if (hinhThucRef.current && hinhThucRef.current.state.selector) {
          hinhThucRef.current._toggleSelector();
        };
        break;
      case filterType.loai_tai_san:
        if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
          donViQuanLyRef.current._toggleSelector();
        };
        if (nhaCungCapRef.current && nhaCungCapRef.current.state.selector) {
          nhaCungCapRef.current._toggleSelector();
        };
        if (maSuDungRef.current && maSuDungRef.current.state.selector) {
          maSuDungRef.current._toggleSelector();
        };
        if (hinhThucRef.current && hinhThucRef.current.state.selector) {
          hinhThucRef.current._toggleSelector();
        };
        break;
      case filterType.nha_cung_cap:
        if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
          donViQuanLyRef.current._toggleSelector();
        };
        if (loaiTaiSanRef.current && loaiTaiSanRef.current.state.selector) {
          loaiTaiSanRef.current._toggleSelector();
        }
        if (maSuDungRef.current && maSuDungRef.current.state.selector) {
          maSuDungRef.current._toggleSelector();
        };
        if (hinhThucRef.current && hinhThucRef.current.state.selector) {
          hinhThucRef.current._toggleSelector();
        };
        break;
      case filterType.ma_su_sung:
        if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
          donViQuanLyRef.current._toggleSelector();
        };
        if (loaiTaiSanRef.current && loaiTaiSanRef.current.state.selector) {
          loaiTaiSanRef.current._toggleSelector();
        }
        if (nhaCungCapRef.current && nhaCungCapRef.current.state.selector) {
          nhaCungCapRef.current._toggleSelector();
        };
        if (hinhThucRef.current && hinhThucRef.current.state.selector) {
          hinhThucRef.current._toggleSelector();
        };
        break;
      case filterType.hinh_thuc:
        if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
          donViQuanLyRef.current._toggleSelector();
        };
        if (loaiTaiSanRef.current && loaiTaiSanRef.current.state.selector) {
          loaiTaiSanRef.current._toggleSelector();
        }
        if (nhaCungCapRef.current && nhaCungCapRef.current.state.selector) {
          nhaCungCapRef.current._toggleSelector();
        };
        if (maSuDungRef.current && maSuDungRef.current.state.selector) {
          maSuDungRef.current._toggleSelector();
        };
        break;
      default:
        break;
    }
  }

  // selectedChange
  const onSelectedDVQLChange = (newSelectItems) => {
    items.removeSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }
  const onSelectedLTSChange = (newSelectItems) => {
    items.removeSelectedLTS({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedLTS({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }
  const onSelectedNCCChange = (newSelectItems) => {
    items.removeSelectedNCC({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedNCC({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }
  const onSelectedMSDChange = (newSelectItems) => {
    items.removeSelectedMSD({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedMSD({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }
  const onSelectedHTChange = (newSelectItems) => {
    items.removeSelectedHT({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
    items.addSelectedHT({data: newSelectItems, screen: screens.quan_ly_tai_san, tab: items.tab});
  }

  const DvqlFilterSelected = find(items.DvqlFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.DvqlFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const LtsFilterSelected = find(items.LtsFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.LtsFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const NccFilterSelected = find(items.NccFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.NccFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const MsdFilterSelected = find(items.MsdFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.MsdFilterSelected, itemSelected => itemSelected.tab === items.tab).data;
  const HtFilterSelected = find(items.HtFilterSelected, itemSelected => itemSelected.tab === items.tab) 
  && find(items.HtFilterSelected, itemSelected => itemSelected.tab === items.tab).data;

  // end SelectedChange
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {(items.tab === tabs.toan_bo_tai_san
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
              getCollapsedNodeHeight={{ height: 200 }}
              onToggleList={() => closeMultiSelectIfOpened(filterType.don_vi_quan_ly)}
              items={dvqlTreeData}
              IconRenderer={Icon}
              searchInputPlaceholderText="Tìm kiếm..."
              styleListContainer={dvqlTreeData && dvqlTreeData.length > 9 ? { height: 200 } : null}
              uniqueKey="id"
              displayKey="displayName"
              selectText="Chọn đơn vị quản lý..."
              onSelectedItemsChange={(item) => onSelectedDVQLChange(item)}
              selectedItems={DvqlFilterSelected}
            />
          </View>
        </>
          )}
        {(items.tab === tabs.toan_bo_tai_san
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
              isTree
              onToggleList={() => closeMultiSelectIfOpened(filterType.loai_tai_san)}
              items={items.LtsDataFilter}
              IconRenderer={Icon}
              styleListContainer={items.LtsDataFilter && items.LtsDataFilter.length > 9 ? { height: 200 } : null}
              single
              searchInputPlaceholderText="Tìm kiếm..."
              uniqueKey="value"
              displayKey="text"
              selectText="Chọn loại tài sản..."
              onSelectedItemsChange={(item) => onSelectedLTSChange(item)}
              selectedItems={LtsFilterSelected}
            />
          </View>
        </>
          )}
        {(items.tab === tabs.toan_bo_tai_san
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
              selectedItems={NccFilterSelected}
            />
          </View>
        </>
          )}
        {(items.tab === tabs.toan_bo_tai_san
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
              selectedItems={MsdFilterSelected}
            />
          </View>
        </>
          )}
        {items.screen === screens.quan_ly_tai_san && items.tab === tabs.tai_san_sua_chua_bao_duong && (
          <>
            <View>
              <Text style={styles.titleText}>Hình thức</Text>
              <MultiSelect
                ref={hinhThucRef}
                onToggleList={() => closeMultiSelectIfOpened(filterType.hinh_thuc)}
                items={hinhThucData}
                IconRenderer={Icon}
                single
                searchInputPlaceholderText="Tìm kiếm..."
                uniqueKey="id"
                displayKey="displayName"
                selectText="Chọn hình thức..."
                onSelectedItemsChange={(item) => onSelectedHTChange(item)}
                selectedItems={HtFilterSelected}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    width: deviceWidth - 100
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
  tab: state.currentTabReducer.tabName,

  DvqlFilterSelected: state.filterDVQLSelectedReducer.dvqlFilterSelected,
  LtsFilterSelected: state.filterLTSSelectedReducer.ltsFilterSelected,
  MsdFilterSelected: state.filterMSDSelectedReducer.msdFilterSelected,
  TtFilterSelected: state.filterTTSelectedReducer.ttFilterSelected,
  NccFilterSelected: state.filterNCCSelectedReducer.nccFilterSelected,
  TtsdFilterSelected: state.filterTTSDSelectedReducer.ttsdFilterSelected,
  HtFilterSelected: state.filterHTSelectedReducer.htFilterSelected,
});

function mapDispatchToProps(dispatch) {
  return {
    addSelectedDVQL: (item) => dispatch(addSelectedDVQLAction(item)),
    addSelectedLTS: (item) => dispatch(addSelectedLTSAction(item)),
    addSelectedMSD: (item) => dispatch(addSelectedMSDAction(item)),
    addSelectedNCC: (item) => dispatch(addSelectedNCCAction(item)),
    addSelectedTT: (item) => dispatch(addSelectedTTAction(item)),
    addSelectedTTSD: (item) => dispatch(addSelectedTTSDAction(item)),
    addSelectedHT: (item) => dispatch(addSelectedHTAction(item)),

    removeSelectedDVQL: (item) => dispatch(removeSelectedDVQLAction(item)),
    removeSelectedLTS: (item) => dispatch(removeSelectedLTSAction(item)),
    removeSelectedMSD: (item) => dispatch(removeSelectedMSDAction(item)),
    removeSelectedNCC: (item) => dispatch(removeSelectedNCCAction(item)),
    removeSelectedTT: (item) => dispatch(removeSelectedTTAction(item)),
    removeSelectedTTSD: (item) => dispatch(removeSelectedTTSDAction(item)),
    removeSelectedHT: (item) => dispatch(removeSelectedHTAction(item)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyTaiSanFilterComponent);