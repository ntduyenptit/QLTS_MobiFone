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
import React from 'react';
import { connect } from "react-redux";
import { store } from "../../redux/store";
import { hideFilter } from "../../redux/actions/filter.actions";
import { deviceWidth, deviceHeight } from './LoaderComponent';

const keyboardVerticalOffset = Platform.OS === 'ios' ? -50 : 0

const FilterComponent = (props) => (
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
        {props.filter}
      </View>
      <View style={{width: deviceWidth - 100, alignItems: 'center'}}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => store.dispatch(hideFilter())}
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
});

export default connect(mapStateToProps)(FilterComponent);