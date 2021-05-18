import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity, FlatList,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'rn-collapsing-tab-bar';
import { createGetMethod } from '../../api/Apis';
import { endPoint } from '../../api/config';
import { convertTextToLowerCase, convertTimeFormatToLocaleDate, convertTrangThai } from '../global/Helper';

const deviceWidth = Dimensions.get("window").width;
const containerHeight = Dimensions.get('window').height;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const bullet = (title, text) => (
  <View style={styles.row}>
    <View style={styles.bullet}>
      <Text>{'\u2022' + " "}</Text>
    </View>
    <View style={styles.bulletText}>
      <Text styles={styles.text}>
        <Text style={styles.boldText}>{`${title}: `}</Text>
      </Text>
    </View>
    <View style={styles.bulletTextNormal}>
      <Text styles={styles.text}>
        <Text style={styles.normalText}>{text}</Text>
      </Text>
    </View>
  </View>
);

export default class QuanLyKiemKeDetail extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      tabOneHeight: containerHeight,
      tabTwoHeight: containerHeight,
      tabThirtHeight: containerHeight,
      danhsachUserKiemke: [],
      danhsachTSFound: [],
      danhsachTSNotFound: [],
      danhsachTSNgoaiHT: []
    }
    this.param = {
      param: props.route.params,

    }

  }

  componentDidMount() {
    Promise.all([
      this.getDanhsachUserKiemke(),
      this.getAllTaiSanKiemke(0),
      this.getAllTaiSanKiemke(1),
      this.getAllTaiSanKiemke(2),
    ]);
  }

  measureTabOne = (event) => {
    this.setState({
      tabOneHeight: event.nativeEvent.layout.height
    })
  }

  measureTabTwo = (event) => {
    this.setState({
      tabTwoHeight: event.nativeEvent.layout.height
    })
  }

  measureTabThirt = (event) => {
    this.setState({
      tabThirstHeight: event.nativeEvent.layout.height
    })
  }

  getDanhsachUserKiemke() {
    let url;
    url = `${endPoint.getdanhsachUserKiemke}?`;
    url += `Id=${encodeURIComponent(`${2}`)}`;

    createGetMethod(url)
      .then(res => {
        if (res) {
          this.setState({
            danhsachUserKiemke: res.result,
            // total: `${res.result.length}/${res.result.totalCount}`
          });
        } else {
          // Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch(err => console.log(err));
  }

  getAllTaiSanKiemke(status) {
    let url;
    url = `${endPoint.getAllTaisanKiemke}?`;
    url += `Id=${encodeURIComponent(`${2}`)}&`;
    url += `Status=${encodeURIComponent(`${status}`)}&`;
    url += `IsSearch=${encodeURIComponent(`${false}`)}`;

    createGetMethod(url)
      .then(res => {
        if (res) {
          switch (status) {
            case 0:
              this.setState({
                danhsachTSFound: res.result,
              });
            case 1:
              this.setState({
                danhsachTSNotFound: res.result,
              });
            case 2:
              this.setState({
                danhsachTSNgoaiHT: res.result,
              });
          }
        } else {
          // Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch(err => console.log(err));
  }

  renderItemComponent = (data) => (
    <View style={styles.listItem}>
      <View style={styles.infor}>
        <Text numberOfLines={1} style={[{ fontWeight: "bold", paddingBottom: 3 }]}>EPC: {data.item.maTaiSan}</Text>
        <Text numberOfLines={1} style={{ paddingBottom: 3 }}>{data.item.tenTaiSan}</Text>
        <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>{data.item.viTri}</Text>
        <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>{data.item.trangThai}</Text>
      </View>
    </View>
  )


  collapsableComponent = (paramKey, tabKey, userList) => {
    const items = () => userList.map((item, index) => (
      <View style={styles.listItem}>
        <View style={styles.infor}>
          <Text numberOfLines={1} style={[{ paddingBottom: 3 }]}>Tên: {item.user.name}</Text>
          <Text numberOfLines={1} style={{ paddingBottom: 3 }}>Chức vụ: {item.user.roleNames}</Text>
          <Text numberOfLines={2} tyle={{ paddingBottom: 3 }}>Phòng ban: {item.tenToChuc}</Text>
          <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>Email: {item.user.emailAddress}</Text>
        </View>
      </View>
    ))
    return (
      <View style={{ alignItems: 'flex-start', height: 450, backgroundColor: 'white', width: deviceWidth }}>
        <Text style={styles.title}>Thông tin kiểm kê tài sản:</Text>
        {bullet('Mã kiểm kê', paramKey.kiemKeTaiSan.maKiemKe)}
        {bullet('Tên kiểm kê', paramKey.kiemKeTaiSan.tenKiemKe)}
        {bullet('Thời gian bắt đầu dự kiến', paramKey.kiemKeTaiSan.thoiGianBatDauDuKien && convertTimeFormatToLocaleDate(paramKey.kiemKeTaiSan.thoiGianBatDauDuKien))}
        {bullet('Thời gian bắt đầu thực tế', paramKey.kiemKeTaiSan.thoiGianBatDauThucTe && convertTimeFormatToLocaleDate(paramKey.kiemKeTaiSan.thoiGianBatDauThucTe))}
        {bullet('Thời gian kết thúc dự kiến', paramKey.kiemKeTaiSan.thoiGianKetThucDuKien && convertTimeFormatToLocaleDate(paramKey.kiemKeTaiSan.thoiGianKetThucDuKien))}
        {bullet('Thời gian kết thúc thực tế', paramKey.kiemKeTaiSan.thoiGianKetThucThucTe && convertTimeFormatToLocaleDate(paramKey.kiemKeTaiSan.thoiGianKetThucThucTe))}
        {bullet('Bộ phận được kiểm kê', paramKey.phongBan)}
        {bullet('Trạng thái', paramKey.kiemKeTaiSan.trangThaiId && convertTrangThai(paramKey.kiemKeTaiSan.trangThaiId))}
        <View
          style={{
            padding: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: "85%",
            alignSelf: 'center',
          }}
        />
        <Text style={styles.title}>Danh sách người kiểm kê</Text>
        <View>
          {items()}
        </View>
      </View>
    )
  }

  render() {
    const { tabOneHeight, tabTwoHeight, tabThirtHeight, danhsachUserKiemke, danhsachTSFound,
      danhsachTSNotFound,
      danhsachTSNgoaiHT } = this.state;
    const { paramKey, tabKey } = this.props.route.params;

    return (
      <ScrollableTabView
        collapsableBar={this.collapsableComponent(paramKey, tabKey, danhsachUserKiemke)}
        initialPage={0}
        tabContentHeights={[tabOneHeight, tabTwoHeight, tabThirtHeight]}
        scrollEnabled
        prerenderingSiblingsNumber={Infinity}
        renderTabBar={() => <DefaultTabBar inactiveTextColor="white" activeTextColor="white" backgroundColor="blue" />}
      >
        <View onLayout={(event) => this.measureTabOne(event)} tabLabel='TS tìm thấy'>
          <View style={{ height: 'auto', backgroundColor: "white" }}>

            <FlatList
              scrollEnabled={false}
              data={danhsachTSFound}
              renderItem={item => this.renderItemComponent(item)}
            />
          </View>

        </View>
        <View onLayout={(event) => this.measureTabTwo(event)} tabLabel='TS không tìm thấy'>
          <View style={{ height: 'auto', backgroundColor: "white" }}>

            <FlatList
              scrollEnabled={false}
              data={danhsachTSNotFound}
              renderItem={item => this.renderItemComponent(item)}
            />
          </View>
        </View>
        <View onLayout={(event) => this.measureTabThirt(event)} tabLabel='TS ngoài danh sách'>
          <View style={{ height: 'auto', backgroundColor: "white" }}>

            <FlatList
              scrollEnabled={false}
              data={danhsachTSNgoaiHT}
              renderItem={item => this.renderItemComponent(item)}
            />
          </View>
        </View>
      </ScrollableTabView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: deviceWidth,
    paddingBottom: 5,
    paddingLeft: 10
  },
  title: {
    paddingBottom: 10,
    alignSelf: 'center',
    fontSize: 18,
    fontStyle: 'italic'
  },
  bullet: {
    width: 15
  },
  bulletText: {
    flex: 2,
    paddingRight: 5
  },
  bulletTextNormal: {
    flex: 2
  },
  boldText: {
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },
  normalText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 15,
  },
  listItem: {
    padding: 5,
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
    paddingBottom: 10,
  },
});
