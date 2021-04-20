import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import React, { useState } from 'react';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { store } from "../../redux/store";
import { hideFilter } from "../../redux/actions/filter.actions";

export const deviceWidth = Dimensions.get('window').width;
const items = [
  // this is the parent or 'item'
  {
    name: 'Apple',
    id: 10,
  },
  {
    name: 'Strawberry',
    id: 17,
  },
  {
    name: 'Pineapple',
    id: 13,
  },
  {
    name: 'Banana',
    id: 14,
  },
  {
    name: 'Watermelon',
    id: 15,
  },
  {
    name: 'Kiwi fruit',
    id: 16,
  },

];

const items2 = [
  // this is the parent or 'item'
  {
    name: 'Apple',
    id: 10,
  },
  {
    name: 'Strawberry',
    id: 17,
  },
  {
    name: 'Pineapple',
    id: 13,
  },
  {
    name: 'Banana',
    id: 14,
  },
  {
    name: 'Watermelon',
    id: 15,
  },
  {
    name: 'Kiwi fruit',
    id: 16,
  },

];

const FilterComponent = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const onSelectedNewChange = (newSelectItems) => {
    console.log(newSelectItems);
    setSelectedItems(newSelectItems);
}
const onSelectedNewChange2 = (newSelectItems) => {
  console.log(newSelectItems);
  setSelectedItems2(newSelectItems);
}
  return(
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
          <SectionedMultiSelect
            items={items}
            IconRenderer={Icon}
            uniqueKey="name"
            selectText="Chọn đơn vị quản lý..."
            showDropDowns
            readOnlyHeadings={false}
            onSelectedItemsChange={(item) => onSelectedNewChange(item)}
            selectedItems={selectedItems}
          />
          <Text>Loại Tài Sản</Text>
          <SectionedMultiSelect
            items={items2}
            IconRenderer={Icon}
            single
            uniqueKey="id"
            selectText="Chọn loại tài sản..."
            showDropDowns
            readOnlyHeadings={false}
            onSelectedItemsChange={(item) => onSelectedNewChange2(item)}
            selectedItems={selectedItems2}
          />
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
}

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
        isShowFilter: state.filterReducer.isShowFilter
    });

export default connect(mapStateToProps)(FilterComponent);