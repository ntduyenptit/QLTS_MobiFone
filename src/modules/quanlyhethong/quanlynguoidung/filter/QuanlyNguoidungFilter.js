import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
} from "react-native";
import React, { useState } from 'react';
import { connect } from "react-redux";
import find from 'lodash/find';


import Icon from 'react-native-vector-icons/MaterialIcons';
import { screens } from "@app/api/config";
import MultiSelect from '../../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { buildTree } from '../../../global/Helper';
import {
    addSelectedDVQLAction,
    removeSelectedDVQLAction,
} from '../../../../redux/actions/filter.actions';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


const NguoidungFilterComponent = (items) => {


    const dvqlTreeData = buildTree(items.DvqlDataFilter);


    // selectedChange
    const onSelectedDVQLChange = (newSelectItems) => {
        items.removeSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_nguoi_dung});
        items.addSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_nguoi_dung});
    }

    const DvqlFilterSelected = find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_nguoi_dung) 
    && find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_nguoi_dung).data;

    // end SelectedChange
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Đơn vị quản lý</Text>
            <MultiSelect
              isTree
              getCollapsedNodeHeight={{ height: 200 }}
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

    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: -10,
        padding: 10,
    },
    component: {

    }

});

const mapStateToProps = state => ({
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
    DvqlFilterSelected: state.filterDVQLSelectedReducer.dvqlFilterSelected,
});

function mapDispatchToProps(dispatch) {
    return {
        addSelectedDVQL: (item) => dispatch(addSelectedDVQLAction(item)),
        removeSelectedDVQL: (item) => dispatch(removeSelectedDVQLAction(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NguoidungFilterComponent);