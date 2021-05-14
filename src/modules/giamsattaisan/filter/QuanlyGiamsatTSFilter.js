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
import { chieuDiChuyen, phanLoaiTaiSan, screens } from '../../../api/config';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { filterType } from '../../global/Config';
import { buildTree , getPeriod } from '../../global/Helper';
import { deviceWidth } from '../../global/LoaderComponent';
import {
    addSelectedStartDateAction,
    addSelectedEndDateAction,
    removeSelectedStartDateAction,
    removeSelectedEndDateAction
} from '../../../redux/actions/filter.actions';


const QuanLyGiamSatFilter = (props) => {
    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});
    const [period, setPeriod]= useState({});

    const donViQuanLyRef = useRef();
    const chieuDiChuyenRef = useRef();
    const phanLoaiTaiSanRef = useRef();

    useEffect(() => {
        if (Object.keys(start).length !== 0) {
            props.removeStartDateSelected({data: start, screen: screens.theo_doi_ket_noi_thiet_bi});
            props.addStartDateSelected({data: start, screen: screens.theo_doi_ket_noi_thiet_bi});
        }
      }, [start]);

      useEffect(() => {
        if (Object.keys(end).length !== 0) {
            props.removeEndDateSelected({ data: end, screen: screens.theo_doi_ket_noi_thiet_bi });
            props.addEndDateSelected({ data: end, screen: screens.theo_doi_ket_noi_thiet_bi });
        }
      }, [end]);

      useEffect(() => {
        const StartDateFilterSelected = find(props.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.theo_doi_ket_noi_thiet_bi)
        && find(props.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.theo_doi_ket_noi_thiet_bi).data;
        const EndDateFilterSelected = find(props.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.theo_doi_ket_noi_thiet_bi)
        && find(props.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.theo_doi_ket_noi_thiet_bi).data;
        if (StartDateFilterSelected && EndDateFilterSelected) {
            const Period = getPeriod(StartDateFilterSelected.timestamp, EndDateFilterSelected.timestamp);
            setPeriod(Period);
        }
    }, [props.isShowFilter]);

    const closeMultiSelectIfOpened = (type) => {
  }

    // selectedChange
    const onSelectedDVQLChange = (newSelectItems) => {
      props.removeSelectedDVQL({data: newSelectItems, screen: screens.giam_sat_tai_san});
      props.addSelectedDVQL({data: newSelectItems, screen: screens.giam_sat_tai_san});
    }

    const onSelectedChieuDiChuyenChange = (newSelectItems) => {

    }


    const onSelectedLoaiTaiSanChange = (newSelectItems) => {

    }

    const DvqlFilterSelected = find(props.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san) 
    && find(props.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.giam_sat_tai_san).data;

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
              uniqueKey="id"
              displayKey="displayName"
              selectText="Chọn chiều di chuyển..."
              onSelectedItemsChange={(item) => onSelectedChieuDiChuyenChange(item)}
              selectedItems={DvqlFilterSelected}
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
              onSelectedItemsChange={(item) => onSelectedLoaiTaiSanChange(item)}
              selectedItems={DvqlFilterSelected}
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
  
    StartDateFilterSelected: state.filterStartDateSelectedReducer.startdateFilterSelected,
    EndDateFilterSelected: state.filterEndDateSelectedReducer.enddateFilterSelected,
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      addStartDateSelected: (item) => dispatch(addSelectedStartDateAction(item)),
      addEndDateSelected: (item) => dispatch(addSelectedEndDateAction(item)),
  
      removeStartDateSelected: (item) => dispatch(removeSelectedStartDateAction(item)),
      removeEndDateSelected: (item) => dispatch(removeSelectedEndDateAction(item)),
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyGiamSatFilter);