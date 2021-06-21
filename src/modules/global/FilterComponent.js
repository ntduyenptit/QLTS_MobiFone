/* eslint-disable import/no-cycle */
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import find from 'lodash/find';
import { store } from "../../redux/store";
import { hideFilter } from "../../redux/actions/filter.actions";
import { deviceWidth, deviceHeight } from './LoaderComponent';
import { screens } from "../../api/config";

const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0

const FilterComponent = (props) => {
  const [renderFilter, setFilter] = useState(null);
  useEffect(() => {
    setFilter(props.filter);
  }, []);
  return (
    <Modal
      animationType="slide"
      transparent
      visible={store.getState().filterReducer.isShowFilter}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.modalView}
      >
        <View style={styles.underLine}>
          <Text style={styles.titleStyle}>Bộ lọc</Text>
        </View>
        <View style={styles.container}>
          {renderFilter}
        </View>
        <View style={{ width: deviceWidth - 100, alignItems: 'center' }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              store.dispatch(hideFilter());
              let DvqlFilterSelected;
              let LtsFilterSelected;
              let NccFilterSelected;
              let MsdFilterSelected;
              if (props.screen === screens.quan_ly_tai_san) {
                DvqlFilterSelected = find(props.DvqlFilterSelected, itemSelected => itemSelected.tab === props.tab)
                  && find(props.DvqlFilterSelected, itemSelected => itemSelected.tab === props.tab).data;
                LtsFilterSelected = find(props.LtsFilterSelected, itemSelected => itemSelected.tab === props.tab)
                  && find(props.LtsFilterSelected, itemSelected => itemSelected.tab === props.tab).data;
                NccFilterSelected = find(props.NccFilterSelected, itemSelected => itemSelected.tab === props.tab)
                  && find(props.NccFilterSelected, itemSelected => itemSelected.tab === props.tab).data;
                MsdFilterSelected = find(props.MsdFilterSelected, itemSelected => itemSelected.tab === props.tab)
                  && find(props.MsdFilterSelected, itemSelected => itemSelected.tab === props.tab).data;
              } else {
                DvqlFilterSelected = find(props.DvqlFilterSelected, itemSelected => itemSelected.screen === props.screen)
                  && find(props.DvqlFilterSelected, itemSelected => itemSelected.screen === props.screen).data;
                LtsFilterSelected = find(props.LtsFilterSelected, itemSelected => itemSelected.screen === props.screen)
                  && find(props.LtsFilterSelected, itemSelected => itemSelected.screen === props.screen).data;
                NccFilterSelected = find(props.NccFilterSelected, itemSelected => itemSelected.screen === props.screen)
                  && find(props.NccFilterSelected, itemSelected => itemSelected.screen === props.screen).data;
                MsdFilterSelected = find(props.MsdFilterSelected, itemSelected => itemSelected.screen === props.screen)
                  && find(props.MsdFilterSelected, itemSelected => itemSelected.screen === props.screen).data;
              }
              const paramters = {
                datas: DvqlFilterSelected && DvqlFilterSelected.length > 0 ? DvqlFilterSelected : props.DvqlDataFilter,
                loaitaisan: LtsFilterSelected,
                nhacungcap: NccFilterSelected,
                masudung: MsdFilterSelected,
                startdate: props.StartDateFilterSelected,
                enddate: props.EndDateFilterSelected,
                chieuDiChuyen: props.chieuDiChuyenFilterSelected,
                phanloaitaisan: props.PltsFilterSelected,
                tinhtrangsudung: props.TtsdFilterSelected,
                tinhtrangkiemke: props.TtkkFilterSelected,
                isFilter: true
              };
              props.action(paramters);
            }}
          >
            <Text style={styles.textStyle}>Xong</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    width: deviceWidth - 100
  },
  modalView: {
    margin: 20,
    paddingTop: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: deviceHeight - 200,
  },
  underLine: {
    width: deviceWidth - 100,
    borderBottomColor: 'black',
    borderBottomWidth: 0.7,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
    color: '#2196F3'
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    color: 'white'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonClose: {
    width: 100,
    backgroundColor: "#2196F3",
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = state => ({
  isShowFilter: state.filterReducer.isShowFilter,
  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
  tab: state.currentTabReducer.tabName,

  DvqlFilterSelected: state.filterDVQLSelectedReducer.dvqlFilterSelected,
  LtsFilterSelected: state.filterLTSSelectedReducer.ltsFilterSelected,
  MsdFilterSelected: state.filterMSDSelectedReducer.msdFilterSelected,
  TtFilterSelected: state.filterTTSelectedReducer.ttFilterSelected,
  NccFilterSelected: state.filterNCCSelectedReducer.nccFilterSelected,
  TtsdFilterSelected: state.filterTTSDSelectedReducer.ttsdFilterSelected,
  HtFilterSelected: state.filterHTSelectedReducer.htFilterSelected,
  StartDateFilterSelected: state.filterStartDateSelectedReducer.startdateFilterSelected,
  EndDateFilterSelected: state.filterEndDateSelectedReducer.enddateFilterSelected,
  chieuDiChuyenFilterSelected: state.filterChieuDiChuyenSelectedReducer.chieuDiChuyenFilterSelected,
  PltsFilterSelected: state.filterPhanLoaiTaiSanSelectedReducer.pltsFilterSelected,
  TtkkFilterSelected: state.filterTTKKSelectedReducer.ttkkFilterSelected,
});

export default connect(mapStateToProps)(FilterComponent);