/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
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
import React from 'react';
import { connect } from "react-redux";
import { screens } from "@app/api/config";
import QuanLyGiamSatFilter from '@app/modules/giamsattaisan/filter/QuanlyGiamsatTSFilter';
import QuanLyTaiSanFilterComponent from '@app/modules/quanlytaisan/filter/QuanLyTaiSanFilter';
import TheoDoiKetNoiFilter from '@app/modules/giamsattaisan/filter/TheoDoiKetNoiFilter';
import QuanLyDauDocFilter from '@app/modules/quanlydaudoc/filter/QuanLyDauDocFilter';
import QuanLyKiemkeFilter from '@app/modules/kiemketaisan/filter/QuanlyKiemkeFilter';
import QuanlyMuaSamFilter from '@app/modules/quanlydutrumuasam/QuanlyMuaSamFilter';
import QuanLyCanhbaoFilter from '@app/modules/quanlycanhbao/QuanlyCanhbaoFilter';
import { store } from "../../redux/store";
import { hideFilter } from "../../redux/actions/filter.actions";
import { deviceWidth, deviceHeight } from './LoaderComponent';

const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0

const getFilterForScreen = (screen) => {
  console.log('screen: ', screen);
  switch (screen) {
    case screens.quan_ly_tai_san: {
      return <QuanLyTaiSanFilterComponent />
    }
    case screens.giam_sat_tai_san: {
      return <QuanLyGiamSatFilter />
    }
    case screens.theo_doi_ket_noi_thiet_bi: {
      return <TheoDoiKetNoiFilter />
    }
    case screens.quan_ly_dau_doc_di_dong:
    case screens.quan_ly_dau_doc_co_dinh: {
      return <QuanLyDauDocFilter />
    }
    case screens.quan_ly_kiem_ke_tai_san: {
      return <QuanLyKiemkeFilter />
    }
    case screens.quan_ly_du_tru_mua_sam: {
      return <QuanlyMuaSamFilter />
    }
    case screens.quan_ly_canh_bao: {
      return <QuanLyCanhbaoFilter />
    }
    default: {
      return null;
    }
  }
}

const FilterComponent = (props) => (
  <Modal
    animationType="slide"
    transparent
    visible={props.isShowFilter}
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
        {getFilterForScreen(props.screen)}
      </View>
      <View style={{ width: deviceWidth - 100, alignItems: 'center' }}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
              store.dispatch(hideFilter());
              props.action(0);
            }}
        >
          <Text style={styles.textStyle}>Xong</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  </Modal>
    )


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
  screen: state.currentScreenReducer.screenName,
  tab: state.currentTabReducer.tabName,
});

export default connect(mapStateToProps)(FilterComponent);