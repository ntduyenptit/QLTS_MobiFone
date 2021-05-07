/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../DaudocFilterComponent';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, tabs } from '../../../api/config';
import { store } from '../../../redux/store';
import {
  toanbodaudocCodinhGetData,
} from '../../../redux/actions/quanlydaudoc.actions';
import Icon from 'react-native-vector-icons/FontAwesome';
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export function GetToanBoDauDocCoDinhData(datas) {
  if (datas && datas.length > 0) {
    let url;
    url = `${endPoint.getDaudocCodinh}?`;
   

    datas.forEach(e => {
      url += `PhongBanSuDung=${encodeURIComponent(`${e.id}`)}&`;
    });

    url += `IsSearch=${encodeURIComponent(`${false}`)}&`;
    url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
    url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;
    createGetMethod(url)
      .then(res => {
        if (res) {
          store.dispatch(toanbodaudocCodinhGetData(res));
          
        } else {
          // Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch(err => console.log(err));
  }
}

function LoaderComponent(array, props) {
  if (array && array.length > 0) {
    const items = () => array.map((item, index) => (
       
      <View key={`loader-component-${index + 1}`} style={styles.listItem}>
        <Icon style={{ alignItems: "flex-start", paddingRight: 10 }} name="circle" color='#0080FF'  size={15} />
        <View style={styles.infor}>
          <Text numberOfLines={1} style={[{fontWeight: "bold"}, styles.infoText]}>EPC: {item.maEPC ? item.maEPC : item.epcCode}</Text>
          <Text numberOfLines={1} style={styles.infoText}>{item.tenTS ? item.tenTS : item.tenTaiSan}</Text>
          <Text numberOfLines={1}>{item.phongBanQL ? item.phongBanQL : item.phongBanQuanLy}</Text>
        </View>
        <TouchableOpacity
          style={{ height: 40, width: 20, alignItems: "flex-end"}}
          onPress={() => props.navigation.navigate('Chi tiết tài sản', {paramKey: item})}
        >
          <Icon name="chevron-right" color='#0080FF' size={15} />
        </TouchableOpacity>
      </View>
          )) 

    return (
      <View>{items()}</View>
    );
  }
  return (
    <TouchableOpacity onPress={() => GetToanBoDauDocCoDinhData(props.DvqlDataFilter)}><Text>Không có dữ liệu</Text></TouchableOpacity>
  );
}

const QuanLyDauDocCoDinh = (state) => {
  const [scrollYValue] = useState(new Animated.Value(0));
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      new Animated.Value(0),
    ),
    0,
    50,
  )

  useEffect(() => {
    GetToanBoDauDocCoDinhData(state.DvqlDataFilter);
  }, []);

  
  return (
    <Animated.View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchComponent clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            margin: 10,
            paddingTop: 55,
            paddingBottom: 15,
          }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            paddingBottom: 55,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => { },          // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic"
        >
          {LoaderComponent(state.toanbotaisanData, state)}
        </Animated.ScrollView>
      </SafeAreaView>
      <FilterComponent />
    </Animated.View>
  );
};

const mapStateToProps = state => ({
  toanbotaisanData: state.toanbodaudocCodinhReducer.toanbotaisanData,
  taisanchuasudungData: state.daudoccodinhchuasudungReducer.taisanchuasudungData,
  taisandangsudungData: state.daudoccodinhdangsudungReducer.taisandangsudungData,

  DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
});


const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    flex: 1,
    width: deviceWidth - 50,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    height: 95,
  },
  infor: {
    marginLeft: 10,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: 50,
    width: "85%",

  },
  infoText: {
    paddingBottom: 3,
    
  }
});

export default connect(mapStateToProps)(QuanLyDauDocCoDinh);