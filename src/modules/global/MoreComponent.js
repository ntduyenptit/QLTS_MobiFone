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

const FilterComponent = () => (
    <Modal
    animationType="slide"
    transparent
    visible={store.getState().filterReducer.isShowFilter}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  >
    </Modal>
);