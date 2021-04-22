import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import React from 'react';
import { connect } from "react-redux";
import { screens } from '../../api/config';
import { store } from "../../redux/store";
import { hideFilter } from "../../redux/actions/filter.actions";
import QuanLyTaiSanFilterComponent from '../quanlytaisan/filter/QuanLyTaiSanFilter';

export const deviceWidth = Dimensions.get('window').width;

const getFilterView = (screen) => {
  switch (screen) {
    case screens.quan_ly_tai_san:
      return <QuanLyTaiSanFilterComponent />
    case screens.toan_bo_tai_san:
      return <QuanLyTaiSanFilterComponent />
    default:
      return null;
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
    <View style={styles.modalView}>
      <View style={styles.container}>
        {getFilterView(props.screen)}
      </View>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => store.dispatch(hideFilter())}
      >
        <Text style={styles.textStyle}>Hide Modal</Text>
      </Pressable>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    width: 300
  },
  modalView: {
    margin: 20,
    marginTop: 50,
    backgroundColor: "white",
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
    height: 800,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

});

const mapStateToProps = state => ({
  isShowFilter: state.filterReducer.isShowFilter,
  screen: state.currentScreenReducer.screenName
});

export default connect(mapStateToProps)(FilterComponent);