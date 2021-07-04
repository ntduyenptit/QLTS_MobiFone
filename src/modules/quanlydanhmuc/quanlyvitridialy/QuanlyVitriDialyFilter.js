/* eslint-disable import/no-cycle */
import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import find from 'lodash/find';
import { endPoint, screens } from '../../../api/config';
import { createGetMethod } from '../../../api/Apis';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { filterType } from '../../global/Config';
// import { GetNCCData } from '../QuanLyTaiSan';
import { 
  getTinhThanhDataAction,
  addSelectedTinhThanhAction,
  removeSelectedTinhThanhAction,
 } from '../../../redux/actions/filter.actions';

const QuanLyVitriDialyilterComponent = (items) => {
  const tinhThanhRef = useRef();
  const quanHuyenRef = useRef();

  const [tinhThanhSelected, setTinhThanhSelected] = useState([]);
  const [quanHuyen, setQuanHuyen] = useState([]);
  const [quanHuyenSelected, setQuanHuyenSelected] = useState([]);

  const closeMultiSelectIfOpened = () => {
    if (tinhThanhRef.current && tinhThanhRef.current.state.selector) {
      tinhThanhRef.current._clearSelector();
    };
    if (quanHuyenRef.current && quanHuyenRef.current.state.selector) {
      quanHuyenRef.current._clearSelector();
    };
  }

  useEffect(() => {
    getAllTinhthanh();
  }, []);

  useEffect(() => {
    const tinhThanh = find(items.getTinhThanhDataSelected, itemSelected => itemSelected.screen === screens.quan_ly_vi_tri_dia_ly)
      && find(items.getTinhThanhDataSelected, itemSelected => itemSelected.screen === screens.quan_ly_vi_tri_dia_ly).data;
      console.log('tinh thanh data: ', tinhThanh);
      setTinhThanhSelected(tinhThanh)
      getAllQuanHuyen(tinhThanh[0])
  }, [items.getTinhThanhDataSelected]);

  const getAllTinhthanh = () => {
    const url = `${endPoint.getAllTinhthanh}`;
    createGetMethod(url)
        .then(res => {
            if (res.success) {
                items.setTinhThanhData(res.result);
            }
        })
}

const getAllQuanHuyen = (idTinh) => {
  const url = `services/app/ViTriDiaLy/GetAllDtoQuanHuyenFromTT?tinhthanhId=${  idTinh}`;
  createGetMethod(url)
      .then(res => {
          if (res.success) {
            setQuanHuyen(res.result)
          }
      })
}

  // selectedChange
  const onSelectedTinhThanhChange = (newSelectItems) => {
    items.removeSelectedTinhThanh({data: newSelectItems, screen: screens.quan_ly_vi_tri_dia_ly});
    items.addSelectedTinhThanh({data: newSelectItems, screen: screens.quan_ly_vi_tri_dia_ly});
  }
  
  // end SelectedChange
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>Tỉnh thành</Text>
          <MultiSelect
            ref={tinhThanhRef}
            onToggleList={() => closeMultiSelectIfOpened()}
            items={items.getTinhThanhData || []}
            IconRenderer={Icon}
            single
            styleListContainer={items.getTinhThanhData && items.getTinhThanhData.length > 9 ? { height: 200 } : null}
            searchInputPlaceholderText="Tìm kiếm..."
            uniqueKey="id"
            displayKey="displayName"
            selectText="Chọn ..."
            onSelectedItemsChange={(item) => onSelectedTinhThanhChange(item)}
            selectedItems={tinhThanhSelected}
          />
        </View>
        <View>
          <Text style={styles.titleText}>Quận huyện</Text>
          <MultiSelect
            ref={quanHuyenRef}
            onToggleList={() => closeMultiSelectIfOpened()}
            items={quanHuyen}
            IconRenderer={Icon}
            single
            styleListContainer={quanHuyen && quanHuyen.length > 9 ? { height: 200 } : null}
            searchInputPlaceholderText="Tìm kiếm..."
            uniqueKey="id"
            displayKey="displayName"
            selectText="Chọn ..."
            onSelectedItemsChange={(item) => setQuanHuyenSelected(item)}
            selectedItems={quanHuyenSelected}
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
  getTinhThanhData: state.filterTinhThanhDataReducer.tinhthanhDataFilter,
  getTinhThanhDataSelected: state.filterTinhThanhSelectedReducer.tinhthanhFilterSelected
});

function mapDispatchToProps(dispatch) {
  return {
    setTinhThanhData: (item) => dispatch(getTinhThanhDataAction(item)) ,
    addSelectedTinhThanh: (item) => dispatch(addSelectedTinhThanhAction(item)),
    removeSelectedTinhThanh: (item) => dispatch(removeSelectedTinhThanhAction(item)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyVitriDialyilterComponent);