import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import find from 'lodash/find';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    addSelectedDVQLAction,
    addSelectedStartDateAction,
    addSelectedEndDateAction,

    removeSelectedDVQLAction,
    removeSelectedStartDateAction,
    removeSelectedEndDateAction
} from '../../../redux/actions/filter.actions';
import { screens } from '../../../api/config';


import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { filterType } from '../../global/Config';
import { buildTree, getPeriod } from '../../global/Helper';
import { deviceWidth } from '../../global/LoaderComponent';


const QuanLyMuaSamFilterComponent = (items) => {
    const donViQuanLyRef = useRef();
    const thoiGianRef = useRef();

    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});
    const [period, setPeriod]= useState({});

    const dvqlTreeData = buildTree(items.DvqlDataFilter);

    useEffect(() => {
        if (Object.keys(start).length !== 0) {
            items.removeStartDateSelected({data: start, screen: screens.bao_cao_canh_bao});
            items.addStartDateSelected({data: start, screen: screens.bao_cao_canh_bao});
        }
      }, [start]);

      useEffect(() => {
        if (Object.keys(end).length !== 0) {
            items.removeEndDateSelected({ data: end, screen: screens.bao_cao_canh_bao });
            items.addEndDateSelected({ data: end, screen: screens.bao_cao_canh_bao });
        }
      }, [end]);

      useEffect(() => {
        const StartDateFilterSelected = find(items.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.bao_cao_canh_bao)
        && find(items.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.bao_cao_canh_bao).data;
        const EndDateFilterSelected = find(items.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.bao_cao_canh_bao)
        && find(items.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.bao_cao_canh_bao).data;
        if (StartDateFilterSelected && EndDateFilterSelected) {
            const Period = getPeriod(StartDateFilterSelected.timestamp, EndDateFilterSelected.timestamp);
            setPeriod(Period);
        }
    }, [items.isShowFilter]);

    const closeMultiSelectIfOpened = (type) => {
        switch (type) {
            case filterType.don_vi_quan_ly:
                if (thoiGianRef.current && thoiGianRef.current.state.selector) {
                    thoiGianRef.current._toggleSelector();
                }
                break;

            case filterType.hinh_thuc:

                if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
                    donViQuanLyRef.current._toggleSelector();
                };

                break;
            default:
                break;
        }
    }

    const DvqlFilterSelected = find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.bao_cao_canh_bao) 
    && find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.bao_cao_canh_bao).data;

    // selectedChange
    const onSelectedDVQLChange = (newSelectItems) => {
        items.removeSelectedDVQL({data: newSelectItems, screen: screens.bao_cao_canh_bao});
        items.addSelectedDVQL({data: newSelectItems, screen: screens.bao_cao_canh_bao});
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

    // end SelectedChange
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <>
            <View>
              <Text style={styles.titleText}>Đơn vị Quản lý</Text>
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
              <Text style={styles.titleText}>Thời gian</Text>
              <Calendar
                onDayPress={(day) => onStartDateChange(day)}
                markingType='period'
                markedDates={period}
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

    DvqlFilterSelected: state.filterDVQLSelectedReducer.dvqlFilterSelected,
    StartDateFilterSelected: state.filterStartDateSelectedReducer.startdateFilterSelected,
    EndDateFilterSelected: state.filterEndDateSelectedReducer.enddateFilterSelected,
});

function mapDispatchToProps(dispatch) {
    return {
        addSelectedDVQL: (item) => dispatch(addSelectedDVQLAction(item)),
        removeSelectedDVQL: (item) => dispatch(removeSelectedDVQLAction(item)),

        addStartDateSelected: (item) => dispatch(addSelectedStartDateAction(item)),
        removeStartDateSelected: (item) => dispatch(removeSelectedStartDateAction(item)),

        addEndDateSelected: (item) => dispatch(addSelectedEndDateAction(item)),
        removeEndDateSelected: (item) => dispatch(removeSelectedEndDateAction(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyMuaSamFilterComponent);