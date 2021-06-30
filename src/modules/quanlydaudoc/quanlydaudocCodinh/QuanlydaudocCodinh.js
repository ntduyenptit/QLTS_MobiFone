import React from 'react';
import { Animated, SafeAreaView, StatusBar, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';
import find from 'lodash/find';
import ActionButton from 'react-native-action-button';
import SearchComponent from '../../global/SearchComponent';
import FilterComponent from '../../global/FilterComponent';
import { createGetMethod } from '../../../api/Apis';
import { endPoint, screens } from '../../../api/config';
import LoaderComponent from '../../global/LoaderComponent';
import getParameters from '../filter/GetParameters';
import { getTTSDDataFilter } from '../../global/FilterApis';
import {
  getTTSDDataAction
} from '../../../redux/actions/filter.actions';


export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

let isSearch = false;
class QuanLyDauDocCoDinhScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYValue: new Animated.Value(0),
      daudoccodinhData: [],
      total: 0,
    }
    this.getToanBoDauDocCoDinhData = this.getToanBoDauDocCoDinhData.bind(this);
  }

  componentDidMount() {
    if (this.props.TtsdDataFilter.length === 0) {
      getTTSDDataFilter().then(res => {
        this.props.getTTSDData(res.result);
      });
    }
    this.getToanBoDauDocCoDinhData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchText !== this.props.searchText) {
      this.getToanBoDauDocCoDinhData();
    }
  }

  getToanBoDauDocCoDinhData() {
    const { datas, tinhtrangsudung } = getParameters(screens.quan_ly_dau_doc_co_dinh);
    if (datas && datas.length > 0) {
      let url;
      url = `${endPoint.getDaudocCodinh}?`;

      const textState = this.props.searchText;
      const textFilter = find(textState, itemSelected => itemSelected.screen === screens.quan_ly_dau_doc_co_dinh)
        && find(textState, itemSelected => itemSelected.screen === screens.quan_ly_dau_doc_co_dinh).data;
      if (textFilter) {
        url += `TenTS=${textFilter}&`
      }

      datas.forEach(e => {
        if (e.id) {
          url += `PhongBanSuDung=${encodeURIComponent(`${e.id}`)}&`;
        } else {
          url += `PhongBanSuDung=${encodeURIComponent(`${e}`)}&`;
        }
      });

      if (tinhtrangsudung) {
          url += `TinhTrangSuDung=${encodeURIComponent(`${tinhtrangsudung}`)}&`;
      }

      url += `IsSearch=${encodeURIComponent(`${isSearch}`)}&`;
      url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
      url += `MaxResultCount=${encodeURIComponent(`${10}`)}`;

      createGetMethod(url)
        .then(res => {
          if (res) {
            this.setState({
              daudoccodinhData: res.result.items,
              total: res.result.totalCount
            });
          }
        })
        .catch();
    }
  }

  refresh = () => {
    isSearch = false;
    this.getToanBoDauDocCoDinhData();
  }

  handleFilter = () => {
    isSearch = true;
    this.getToanBoDauDocCoDinhData();
  };

  render() {
    const {
      scrollYValue,
      daudoccodinhData,
      total
    } = this.state;
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
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <Animated.View>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <SearchComponent
              clampedScroll={clampedScroll}
              screen={screens.quan_ly_dau_doc_co_dinh}
            />
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
              {LoaderComponent(daudoccodinhData, this.props, screens.chi_tiet_dau_doc_co_dinh, this.refresh)}
            </Animated.ScrollView>
          </SafeAreaView>
          <Text
            style={{
              bottom: 5,
              right: 5,
              position: 'absolute',
            }}
          >Hiển thị: {daudoccodinhData.length}/{total}
          </Text>
          <FilterComponent
            action={this.handleFilter}
          />
        </Animated.View>
        <ActionButton buttonColor="rgba(231,76,60,1)" position='right' onPress={() => this.props.navigation.navigate(screens.them_moi_dau_doc, { screen: "Thêm mới đầu đọc cố định", onGoBack: () => this.refresh() })} />
      </View>
    );
  }

}

const mapStateToProps = state => ({
  TtsdDataFilter: state.filterTTSDDataReducer.ttsdDataFilter,
  searchText: state.SearchReducer.searchData
});

function mapDispatchToProps(dispatch) {
  return {
    getTTSDData: (item) => dispatch(getTTSDDataAction(item)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuanLyDauDocCoDinhScreen);