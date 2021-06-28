import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
} from "react-native";
import React, { useRef } from 'react';
import { connect } from "react-redux";


import Icon from 'react-native-vector-icons/MaterialIcons';
import find from 'lodash/find';
import MultiSelect from '../../../libs/react-native-multiple-select/lib/react-native-multi-select';
import { filterType } from '../../global/Config';
import { buildTree } from '../../global/Helper';
import {
    addSelectedDVQLAction,
    addSelectedTTSDAction,

    removeSelectedDVQLAction,
    removeSelectedTTSDAction
} from '../../../redux/actions/filter.actions';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;


const QuanLyDauDocFilter = (items) => {

    const donViQuanLyRef = useRef();
    const trangThaiRef = useRef();

    const dvqlTreeData = buildTree(items.DvqlDataFilter);

    const closeMultiSelectIfOpened = (type) => {
        switch (type) {
            case filterType.don_vi_quan_ly:
                if (trangThaiRef.current && trangThaiRef.current.state.selector) {
                    trangThaiRef.current._toggleSelector();
                }
                break;

            case filterType.tinh_trang_su_dung:

                if (donViQuanLyRef.current && donViQuanLyRef.current.state.selector) {
                    donViQuanLyRef.current._toggleSelector();
                };

                break;
            default:
                break;
        }
    }

    // selectedChange
    const onSelectedDVQLChange = (newSelectItems) => {
        items.removeSelectedDVQL({data: newSelectItems, screen: items.screen});
        items.addSelectedDVQL({data: newSelectItems, screen: items.screen});
    }

    const onSelectedTTSDChange = (newSelectItems) => {
        items.removeSelectedTTSD({data: newSelectItems, screen: items.screen});
        items.addSelectedTTSD({data: newSelectItems, screen: items.screen});
    }

    const DvqlFilterSelected = find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === items.screen) 
    && find(items.DvqlFilterSelected, itemSelected => itemSelected.screen === items.screen).data;

    const TtsdFilterSelected = find(items.TtsdFilterSelected, itemSelected => itemSelected.screen === items.screen) 
    && find(items.TtsdFilterSelected, itemSelected => itemSelected.screen === items.screen).data;

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
                onToggleList={() => closeMultiSelectIfOpened(filterType.don_vi_quan_ly)}
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
            <View>
              <Text style={styles.titleText}>Tình trạng sử dụng</Text>
              <MultiSelect
                ref={trangThaiRef}
                onToggleList={() => closeMultiSelectIfOpened(filterType.tinh_trang_su_dung)}
                items={items.TtsdDataFilter}
                IconRenderer={Icon}
                single
                searchInputPlaceholderText="Tìm kiếm..."
                uniqueKey="id"
                displayKey="displayName"
                selectText="Chọn..."
                onSelectedItemsChange={(item) => onSelectedTTSDChange(item)}
                selectedItems={TtsdFilterSelected}
              />
            </View>
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
    TtsdDataFilter: state.filterTTSDDataReducer.ttsdDataFilter,
    screen: state.currentScreenReducer.screenName, 

    DvqlFilterSelected: state.filterDVQLSelectedReducer.dvqlFilterSelected,
    TtsdFilterSelected: state.filterTTSDSelectedReducer.ttsdFilterSelected,
});

function mapDispatchToProps(dispatch) {
    return {
        addSelectedDVQL: (item) => dispatch(addSelectedDVQLAction(item)),
        removeSelectedDVQL: (item) => dispatch(removeSelectedDVQLAction(item)),

        addSelectedTTSD: (item) => dispatch(addSelectedTTSDAction(item)),
        removeSelectedTTSD: (item) => dispatch(removeSelectedTTSDAction(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDauDocFilter);