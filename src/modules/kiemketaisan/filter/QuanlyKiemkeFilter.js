import {
    StyleSheet,
    Text,
    View,
     ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import {Calendar} from 'react-native-calendars';
import { connect } from "react-redux";


import Icon from 'react-native-vector-icons/MaterialIcons';
import find from 'lodash/find';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { filterType } from '../../global/Config';
import { buildTree, getPeriod } from '../../global/Helper';
import { trangThaiKiemke, screens } from '../../../api/config';
import {
    addSelectedDVQLAction,
    addSelectedTTKKAction,
    addSelectedStartDateAction,
    addSelectedEndDateAction,

    removeSelectedDVQLAction,
    removeSelectedTTKKAction,
    removeSelectedStartDateAction,
    removeSelectedEndDateAction
} from '../../../redux/actions/filter.actions';
import { deviceWidth } from '../../global/LoaderComponent';


const QuanLyKiemkeFilterComponent = (items) => {
    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});
    const [period, setPeriod]= useState({});
    const [currentDay, setCurrent] = useState('');

    const donViQuanLyRef = useRef();
    const tinhTrangKiemKeRef = useRef();

    const dvqlTreeData = buildTree(items.DvqlDataFilter);

    useEffect(() => {
        if (Object.keys(start).length !== 0) {
            items.removeStartDateSelected({data: start, screen: screens.quan_ly_kiem_ke_tai_san});
            items.addStartDateSelected({data: start, screen: screens.quan_ly_kiem_ke_tai_san});
        }
      }, [start]);

      useEffect(() => {
        if (Object.keys(end).length !== 0) {
            items.removeEndDateSelected({ data: end, screen: screens.quan_ly_kiem_ke_tai_san });
            items.addEndDateSelected({ data: end, screen: screens.quan_ly_kiem_ke_tai_san });
        }
      }, [end]);

      useEffect(() => {
        const StartDateFilterSelected = find(items.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
        && find(items.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;
        const EndDateFilterSelected = find(items.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san)
        && find(items.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;
        if (StartDateFilterSelected && EndDateFilterSelected) {
            const Period = getPeriod(StartDateFilterSelected.timestamp, EndDateFilterSelected.timestamp);
            setPeriod(Period);
            console.log(Period);
        }
        setCurrent(StartDateFilterSelected?.dateString);
    }, [items.isShowFilter]);

    const closeMultiSelectIfOpened = (type) => {
        switch (type) {
            case filterType.don_vi_quan_ly:
                if (tinhTrangKiemKeRef.current && tinhTrangKiemKeRef.current.state.selector) {
                    tinhTrangKiemKeRef.current._toggleSelector();
                }
                break;

            case filterType.tinh_trang_kiem_ke:
                
                if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
                    donViQuanLyRef.current._toggleSelector();
                };
               
                break;
            default:
                break;
        }
    }

    // selectedChange
    const onSelectedDVQLChange = (newSelectItems) => {
        items.removeSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_kiem_ke_tai_san});
        items.addSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_kiem_ke_tai_san});
    }

    const onSelectedTTKKChange = (newSelectItems) => {
        items.removeSelectedTTKK({data: newSelectItems, screen: screens.quan_ly_kiem_ke_tai_san});
        items.addSelectedTTKK({data: newSelectItems, screen: screens.quan_ly_kiem_ke_tai_san});
    }

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

    const DvqlFilterSelected = find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san) 
    && find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;

    const TtkkFilterSelected = find(items.TtkkFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san) 
    && find(items.TtkkFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_kiem_ke_tai_san).data;

    // end SelectedChange
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <>
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
          </>
          <>
            <View>
              <Text style={styles.titleText}>Thời gian</Text>
              <Calendar
                current={currentDay}
                onDayPress={(day) => onStartDateChange(day)}
                markingType='period'
                markedDates={period}
              />
            </View>
          </>
          <>
            <View>
              <Text style={styles.titleText}>Tình trạng kiểm kê</Text>
              <MultiSelect
                ref={tinhTrangKiemKeRef}
                single
                getCollapsedNodeHeight={{ height: 200 }}
                onToggleList={() => closeMultiSelectIfOpened(filterType.tinh_trang_kiem_ke)}
                items={trangThaiKiemke}
                IconRenderer={Icon}
                searchInputPlaceholderText="Tìm kiếm..."
                uniqueKey="id"
                displayKey="displayName"
                selectText="Chọn..."
                onSelectedItemsChange={(item) => onSelectedTTKKChange(item)}
                selectedItems={TtkkFilterSelected}
              />
            </View>
          </>
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
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
    isShowFilter: state.filterReducer.isShowFilter,

    DvqlFilterSelected: state.filterDVQLSelectedReducer.dvqlFilterSelected,
    StartDateFilterSelected: state.filterStartDateSelectedReducer.startdateFilterSelected,
    EndDateFilterSelected: state.filterEndDateSelectedReducer.enddateFilterSelected,
    TtkkFilterSelected: state.filterTTKKSelectedReducer.ttkkFilterSelected,
});

function mapDispatchToProps(dispatch) {
    return {
        addSelectedDVQL: (item) => dispatch(addSelectedDVQLAction(item)),
        removeSelectedDVQL: (item) => dispatch(removeSelectedDVQLAction(item)),

        addSelectedTTKK: (item) => dispatch(addSelectedTTKKAction(item)),
        removeSelectedTTKK: (item) => dispatch(removeSelectedTTKKAction(item)),

        addStartDateSelected: (item) => dispatch(addSelectedStartDateAction(item)),
        removeStartDateSelected: (item) => dispatch(removeSelectedStartDateAction(item)),

        addEndDateSelected: (item) => dispatch(addSelectedEndDateAction(item)),
        removeEndDateSelected: (item) => dispatch(removeSelectedEndDateAction(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyKiemkeFilterComponent);