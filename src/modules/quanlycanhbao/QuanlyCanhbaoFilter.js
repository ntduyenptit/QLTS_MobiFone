import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import find from 'lodash/find';
import {
    addSelectedDVQLAction,
    addSelectedStartDateAction,
    addSelectedEndDateAction,

    removeSelectedDVQLAction,
    removeSelectedStartDateAction,
    removeSelectedEndDateAction
} from '@app/redux/actions/filter.actions';
import { endPoint, screens } from '../../api/config';
import { createGetMethod } from '../../api/Apis';

import MultiSelect from '../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { buildTree, getPeriod } from '../global/Helper';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


const QuanLyMuaSamFilterComponent = (items) => {
    const [username, setUser] = useState([]);
    const [actions, setActions] = useState([]);
    const [userSelected, setUserSelected] = useState();
    const [actionSelected, setActionSelected] = useState();

    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});
    const [period, setPeriod]= useState({});

    const donViQuanLyRef = useRef();
    const nguoiGuiThongBaoRef = useRef();
    const hoatDongRef = useRef();

    const dvqlTreeData = buildTree(items.DvqlDataFilter);

    useEffect(() => {
        Promise.all([
            requestUser(),
            requestActions()
        ]);
    }, []);

    useEffect(() => {
        if (Object.keys(start).length !== 0) {
            items.removeStartDateSelected({data: start, screen: screens.quan_ly_canh_bao});
            items.addStartDateSelected({data: start, screen: screens.quan_ly_canh_bao});
        }
      }, [start]);

      useEffect(() => {
        if (Object.keys(end).length !== 0) {
            items.removeEndDateSelected({ data: end, screen: screens.quan_ly_canh_bao });
            items.addEndDateSelected({ data: end, screen: screens.quan_ly_canh_bao });
        }
      }, [end]);

      useEffect(() => {
        const StartDateFilterSelected = find(items.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao)
        && find(items.StartDateFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao).data;
        const EndDateFilterSelected = find(items.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao)
        && find(items.EndDateFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao).data;
        if (StartDateFilterSelected && EndDateFilterSelected) {
            const Period = getPeriod(StartDateFilterSelected.timestamp, EndDateFilterSelected.timestamp);
            setPeriod(Period);
        }
    }, [items.isShowFilter]);

    const requestActions = () => {
        const url = `${endPoint.getAllHoatDong}?`;
        createGetMethod(url)
        .then(res => {
          if (res) {
            setActions(res.result);
          }
        })
        .catch();
    }

    const requestUser = () => {
        const url = `${endPoint.getCurrentLoginInformation}?`;
        createGetMethod(url)
        .then(res => {
          if (res) {
            setUser([res.result.user])
          }
        })
        .catch();
    }

    const closeMultiSelectIfOpened = () => {
        if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
            donViQuanLyRef.current._clearSelector();
          };
          if (nguoiGuiThongBaoRef.current && nguoiGuiThongBaoRef.current.state.selector) {
            nguoiGuiThongBaoRef.current._clearSelector();
          }
          if (hoatDongRef.current && hoatDongRef.current.state.selector) {
            hoatDongRef.current._clearSelector();
          };
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

    const DvqlFilterSelected = find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao) 
    && find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_canh_bao).data;

    // selectedChange
    const onSelectedDVQLChange = (newSelectItems) => {
        items.removeSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_canh_bao});
        items.addSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_canh_bao});
    }

    const onSelectedNGTBChange = (newSelectItems) => {
      setUserSelected(newSelectItems);
    }

    const onSelectedHoatDongChange = (newSelectItems) => {
      setActionSelected(newSelectItems);
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
                onToggleList={() => closeMultiSelectIfOpened()}
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
              <Text style={styles.titleText}>Người gửi thông báo</Text>
              <MultiSelect
                ref={nguoiGuiThongBaoRef}
                single
                getCollapsedNodeHeight={{ height: 200 }}
                onToggleList={() => closeMultiSelectIfOpened()}
                items={username}
                hideSearch
                IconRenderer={Icon}
                searchInputPlaceholderText="Tìm kiếm..."
                uniqueKey="id"
                displayKey="userName"
                selectText="Chọn ..."
                onSelectedItemsChange={(item) => onSelectedNGTBChange(item)}
                selectedItems={userSelected}
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
            <View>
              <Text style={styles.titleText}>Hoạt động</Text>
              <MultiSelect
                ref={hoatDongRef}
                single
                getCollapsedNodeHeight={{ height: 200 }}
                onToggleList={() => closeMultiSelectIfOpened()}
                items={actions}
                IconRenderer={Icon}
                searchInputPlaceholderText="Tìm kiếm..."
                uniqueKey="id"
                displayKey="displayName"
                selectText="Chọn ..."
                onSelectedItemsChange={(item) => onSelectedHoatDongChange(item)}
                selectedItems={actionSelected}
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
    screen: state.currentScreenReducer.screenName,
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