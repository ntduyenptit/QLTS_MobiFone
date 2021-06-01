import React from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
  } from "react-native";

const MoreComponent = () => (
  <Modal
    animationType="slide"
    transparent
    visible={store.getState().moreReducer.isShowMore}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  >
    <TouchableOpacity>
      <Text>Điều chuyển</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text>Điều chuyển</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text>Điều chuyển</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text>Điều chuyển</Text>
    </TouchableOpacity>
  </Modal>
  );

export default MoreComponent;