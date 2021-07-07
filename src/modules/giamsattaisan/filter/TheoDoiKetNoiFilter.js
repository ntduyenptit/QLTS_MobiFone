import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import React, { useState, useEffect } from 'react';
import {Calendar} from 'react-native-calendars';

import { connect } from "react-redux";
import find from 'lodash/find';
import { deviceWidth } from '../../global/LoaderComponent';
import {
    addSelectedStartDateAction,
    addSelectedEndDateAction,
    removeSelectedStartDateAction,
    removeSelectedEndDateAction
} from '../../../redux/actions/filter.actions';
import { getPeriod } from '../../global/Helper';
import { screens } from "../../../api/config";

let dateFix = new Date().toISOString().split('T')[0];
const TheoDoiKetNoiFilter = (props) => {
    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});
    const [period, setPeriod]= useState({});

    useEffect(() => {
        if (Object.keys(start).length !== 0) {
            props.removeStartDateSelected({data: start, screen: screens.theo_doi_ket_noi_thiet_bi});
            props.addStartDateSelected({data: start, screen: screens.theo_doi_ket_noi_thiet_bi});
            dateFix = start;
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
              current={dateFix}
              onDayPress={(day) => onStartDateChange(day)}
              markingType='period'
              markedDates={period}
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

export default connect(mapStateToProps, mapDispatchToProps)(TheoDoiKetNoiFilter);