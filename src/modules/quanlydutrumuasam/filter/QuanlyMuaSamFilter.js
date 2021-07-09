import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
} from "react-native";
import React, { useState, useRef } from 'react';
import { connect } from "react-redux";

import Icon from 'react-native-vector-icons/MaterialIcons';
import find from 'lodash/find';
import { screens } from "@app/api/config";
import MultiSelect from '@app/libs/react-native-multiple-select/lib/react-native-multi-select';
import { buildTree } from '@app/modules/global/Helper';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

const QuanLyMuaSamFilterComponent = (items) => {

    const donViQuanLyRef = useRef();

    const dvqlTreeData = buildTree(items.DvqlDataFilter);


    // selectedChange
    const onSelectedDVQLChange = (newSelectItems) => {
        items.removeSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_du_tru_mua_sam});
        items.addSelectedDVQL({data: newSelectItems, screen: screens.quan_ly_du_tru_mua_sam});
    }

    const DvqlFilterSelected = find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_du_tru_mua_sam) 
    && find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === screens.quan_ly_du_tru_mua_sam).data;
   
    // end SelectedChange
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <>
            <View>
              <Text style={styles.titleText}>Đơn vị quản lý</Text>
              <MultiSelect
                ref={donViQuanLyRef}
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
          </>
          <>
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
    isShowFilter: state.filterReducer.isShowFilter,
    screen: state.currentScreenReducer.screenName,
});

export default connect(mapStateToProps)(QuanLyMuaSamFilterComponent);