import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from "react-redux";
import find from 'lodash/find';
import { chieuDiChuyen, phanLoaiTaiSan, screens } from '@app/api/config';
import { filterType } from '@app/modules/global/Config';
import MultiSelect from '@app/libs/react-native-multiple-select/lib/react-native-multi-select';
import { buildTree , getPeriod } from '@app/modules/global/Helper';
import { deviceWidth } from '@app/modules/global/LoaderComponent';
import {
    addSelectedStartDateAction,
    addSelectedEndDateAction,
    addSelectedDVQLAction,
    addSelectedChieuDiChuyenAction,
    addSelectedPhanLoaiTaiSanAction,

    removeSelectedDVQLAction,
    removeSelectedStartDateAction,
    removeSelectedEndDateAction,
    removeSelectedChieuDiChuyenAction,
    removeSelectedPhanLoaiTaiSanAction,
} from '@app/redux/actions/filter.actions';


const QuanLyGiamSatFilter = (props) => {
    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});
    const [period, setPeriod]= useState({});

    const donViQuanLyRef = useRef();
    const chieuDiChuyenRef = useRef();
    const phanLoaiTaiSanRef = useRef();

    useEffect(() => {
        if (Object.keys(start).length !== 0) {
            props.removeStartDateSelected({data: start, screen: screens.giam_sat_tai_san});
            props.addStartDateSelected({data: start, screen: screens.giam_sat_tai_san});
        }
      }, [start]);

      useEffect(() => {
        if (Object.keys(end).length !== 0) {
            props.removeEndDateSelected({ data: end, screen: screens.giam_sat_tai_san });
            props.addEndDateSelected({ data: end, screen: screens.giam_sat_tai_san });
        }
      }, [end]);

      useEffect(() => {
        const StartDateFilterSelected = find(props.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
        && find(props.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
        const EndDateFilterSelected = find(props.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san)
        && find(props.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;
        if (StartDateFilterSelected && EndDateFilterSelected) {
            const Period = getPeriod(StartDateFilterSelected.timestamp, EndDateFilterSelected.timestamp);
            setPeriod(Period);
        }
    }, [props.isShowFilter]);

  const closeMultiSelectIfOpened = (type) => {
    switch (type) {
      case filterType.don_vi_quan_ly:
        if (chieuDiChuyenRef.current && chieuDiChuyenRef.current.state.selector) {
          chieuDiChuyenRef.current._toggleSelector();
        };
        if (phanLoaiTaiSanRef.current && phanLoaiTaiSanRef.current.state.selector) {
          phanLoaiTaiSanRef.current._toggleSelector();
        };
        break;
      case filterType.chieu_di_chuyen:
        if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
          donViQuanLyRef.current._toggleSelector();
        };
        if (phanLoaiTaiSanRef.current && phanLoaiTaiSanRef.current.state.selector) {
          phanLoaiTaiSanRef.current._toggleSelector();
        };
        break;
      case filterType.phan_loai_tai_san:
        if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
          donViQuanLyRef.current._toggleSelector();
        };
        if (chieuDiChuyenRef.current && chieuDiChuyenRef.current.state.selector) {
          chieuDiChuyenRef.current._toggleSelector();
        }
        break;
      default:
        break;
    }
  }

    // selectedChange
    const onSelectedDVQLChange = (newSelectItems) => {
      props.removeSelectedDVQL({data: newSelectItems, screen: screens.giam_sat_tai_san});
      props.addSelectedDVQL({data: newSelectItems, screen: screens.giam_sat_tai_san});
    }

    const onSelectedChieuDiChuyenChange = (newSelectItems) => {
      props.removeSelectedChieuDiChuyen({data: newSelectItems, screen: screens.giam_sat_tai_san});
      props.addSelectedChieuDiChuyen({data: newSelectItems, screen: screens.giam_sat_tai_san});
    }


    const onSelectedPhanLoaiTaiSanChange = (newSelectItems) => {
      props.removeSelectedPLTS({data: newSelectItems, screen: screens.giam_sat_tai_san});
      props.addSelectedPLTS({data: newSelectItems, screen: screens.giam_sat_tai_san});
    }

    const DvqlFilterSelected = find(props.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san) 
    && find(props.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;

    const ChieuDiChuyenFilterSelected = find(props.ChieuDiChuyenFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san) 
    && find(props.ChieuDiChuyenFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;

    const PltsFilterSelected = find(props.PltsFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san) 
    && find(props.PltsFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;

  const dvqlTreeData = buildTree(props.DvqlDataFilter);

    // selectedChange
    const onStartDateChange = (dayObj) => {
        const {
            day, month, year,
          } = dayObj
          const timestamp = new Date(year, month - 1, day).getTime()
          const newDayObj = { ...dayObj, timestamp }
        if (Object.keys(start).length === 0) {
            setStart(newDayObj);
        } else {
            const { timestamp: savedTimestamp } = start
            if (savedTimestamp > timestamp) {
                const Period = getPeriod(timestamp, savedTimestamp);
                setPeriod(Period);
            } else {
                const Period = getPeriod(savedTimestamp, timestamp);
                setPeriod(Period);
            }
            setEnd(newDayObj);
        }
    }

    // end SelectedChange
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Thời gian</Text>
            <Calendar
              onDayPress={(day) => onStartDateChange(day)}
              markingType='period'
              markedDates={period}
            />
          </View>
          <View>
            <Text style={styles.titleText}>Đơn vị quản lý</Text>
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
          <View>
            <Text style={styles.titleText}>Chiều di chuyển</Text>
            <MultiSelect
              ref={chieuDiChuyenRef}
              getCollapsedNodeHeight={{ height: 200 }}
              onToggleList={() => closeMultiSelectIfOpened(filterType.chieu_di_chuyen)}
              items={chieuDiChuyen}
              single
              IconRenderer={Icon}
              searchInputPlaceholderText="Tìm kiếm..."
              uniqueKey="value"
              displayKey="displayName"
              selectText="Chọn chiều di chuyển..."
              onSelectedItemsChange={(item) => onSelectedChieuDiChuyenChange(item)}
              selectedItems={ChieuDiChuyenFilterSelected}
            />
          </View>
          <View>
            <Text style={styles.titleText}>Phân loại</Text>
            <MultiSelect
              ref={phanLoaiTaiSanRef}
              getCollapsedNodeHeight={{ height: 200 }}
              onToggleList={() => closeMultiSelectIfOpened(filterType.phan_loai_tai_san)}
              items={phanLoaiTaiSan}
              single
              IconRenderer={Icon}
              searchInputPlaceholderText="Tìm kiếm..."
              uniqueKey="id"
              displayKey="displayName"
              selectText="Chọn loại..."
              onSelectedItemsChange={(item) => onSelectedPhanLoaiTaiSanChange(item)}
              selectedItems={PltsFilterSelected}
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
        width: deviceWidth - 100
    },

    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: -10,
        padding: 10,
    },
});

const mapStateToProps = state => ({
    isShowFilter: state.filterReducer.isShowFilter,
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  
    DvqlFilterSelected: state.filterDVQLSelectedReducer.dvqlFilterSelected,
    StartDateFilterSelected: state.filterStartDateSelectedReducer.startdateFilterSelected,
    EndDateFilterSelected: state.filterEndDateSelectedReducer.enddateFilterSelected,

    ChieuDiChuyenFilterSelected: state.filterChieuDiChuyenSelectedReducer.chieuDiChuyenFilterSelected,
    PltsFilterSelected: state.filterPhanLoaiTaiSanSelectedReducer.pltsFilterSelected,
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      addStartDateSelected: (item) => dispatch(addSelectedStartDateAction(item)),
      addEndDateSelected: (item) => dispatch(addSelectedEndDateAction(item)),
  
      removeStartDateSelected: (item) => dispatch(removeSelectedStartDateAction(item)),
      removeEndDateSelected: (item) => dispatch(removeSelectedEndDateAction(item)),

      addSelectedDVQL: (item) => dispatch(addSelectedDVQLAction(item)),
      removeSelectedDVQL: (item) => dispatch(removeSelectedDVQLAction(item)),

      addSelectedChieuDiChuyen: (item) => dispatch(addSelectedChieuDiChuyenAction(item)),
      removeSelectedChieuDiChuyen: (item) => dispatch(removeSelectedChieuDiChuyenAction(item)),

      addSelectedPLTS: (item) => dispatch(addSelectedPhanLoaiTaiSanAction(item)),
      removeSelectedPLTS: (item) => dispatch(removeSelectedPhanLoaiTaiSanAction(item)),
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyGiamSatFilter);