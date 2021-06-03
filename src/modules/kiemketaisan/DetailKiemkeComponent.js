import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity, FlatList, Alert,
  Platform
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ScrollableTabView, { DefaultTabBar, } from 'rn-collapsing-tab-bar';
import BulletView from '@app/modules/global/BulletView';
import { createGetMethod, deleteMethod } from '../../api/Apis';
import { endPoint } from '../../api/config';
import { convertTimeFormatToLocaleDate, convertTrangThai } from '../global/Helper';

const deviceWidth = Dimensions.get("window").width;
const containerHeight = Dimensions.get('window').height;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

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
              break;
            case 1:
              this.setState({
                danhsachTSNotFound: res.result,
              });
              break;
            case 2:
              this.setState({
                danhsachTSNgoaiHT: res.result,
              });
              break;
              default:
                break;
          }
        } else {
          // Alert.alert('Lỗi khi load toàn bộ tài sản!');
        }
      })
      .catch(err => console.log(err));
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
          <BulletView title="Tên" text={item.user.name} isBullet={false} flexTitle={0.6} />
          <BulletView title="Chức vụ" text={item.user.roleNames} isBullet={false} flexTitle={0.6} />
          <BulletView title="Phòng ban" text={item.tenToChuc} isBullet={false} flexTitle={0.6} />
          <BulletView title="Email" text={item.user.emailAddress} isBullet={false} flexTitle={0.6} />
        </View>
      </View>
    ))
    return (
      <View style={{ alignItems: 'flex-start', height: 450, backgroundColor: 'white', width: deviceWidth }}>
        <Text style={styles.title}>Thông tin kiểm kê tài sản:</Text>
        <View style={{paddingLeft: 2}}>
          <BulletView title="Mã kiểm kê" text={paramKey.kiemKeTaiSan.maKiemKe} isBullet={false} />
          <BulletView title="Tên kiểm kê" text={paramKey.kiemKeTaiSan.tenKiemKe} isBullet={false} />
          <BulletView title="Thời gian bắt đầu dự kiến" text={paramKey.kiemKeTaiSan.thoiGianBatDauDuKien && convertTimeFormatToLocaleDate(paramKey.kiemKeTaiSan.thoiGianBatDauDuKien)} isBullet={false} />
          <BulletView title="Thời gian bắt đầu thực tế" text={paramKey.kiemKeTaiSan.thoiGianBatDauThucTe && convertTimeFormatToLocaleDate(paramKey.kiemKeTaiSan.thoiGianBatDauThucTe)} isBullet={false} />
          <BulletView title="Thời gian kết thúc dự kiến" text={paramKey.kiemKeTaiSan.thoiGianKetThucDuKien && convertTimeFormatToLocaleDate(paramKey.kiemKeTaiSan.thoiGianKetThucDuKien)} isBullet={false} />
          <BulletView title="Thời gian kết thúc thực tế" text={paramKey.kiemKeTaiSan.thoiGianKetThucThucTe && convertTimeFormatToLocaleDate(paramKey.kiemKeTaiSan.thoiGianKetThucThucTe)} isBullet={false} />
          <BulletView title="Bộ phận được kiểm kê" text={paramKey.kiemKeTaiSan.phongBan} isBullet={false} />
          <BulletView title="Trạng thái" text={paramKey.kiemKeTaiSan.trangThaiId && convertTrangThai(paramKey.kiemKeTaiSan.trangThaiId)} isBullet={false} />
        </View>
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
        {items()}
      </View>
    )
  }

  deleteThisAsset(id,trangthai) {
    if (trangthai === 1) {
      Alert.alert('Không được phép xóa',
      'Đợt kiểm kê đang trong trạng thái kiểm kê',
      [
        { text: 'OK', style: 'cancel'},
      ],
      { cancelable: false }
    );
    return;
    }
    if (trangthai === 2) {
      Alert.alert('Không được phép xóa',
      'Đợt kiểm kê trong trạng thái kết thúc',
      [
        { text: 'OK', style: 'cancel'},
      ],
      { cancelable: false }
    );
    return;
    }
    Alert.alert('Bạn có chắc chắn muốn xóa không?',
      '',
      [
        {
          text: 'OK', onPress: () => {
            let url = `${endPoint.deleteKiemke}?`;
            url += `input=${id}`;
          
            deleteMethod(url).then(res => {
              if (res.success) {
                Alert.alert('Xóa đợt kiểm kê thành công',
                  '',
                  [
                    { text: 'OK', onPress: this.props.navigation.goBack() },
                  ],
                  { cancelable: false }
                );
              }
            });
          }
        },
        { text: 'Hủy' },
      ],
      { cancelable: true }
    );
  }

  render() {
    const { tabOneHeight, tabTwoHeight, tabThirtHeight, danhsachUserKiemke, danhsachTSFound,
      danhsachTSNotFound,
      danhsachTSNgoaiHT } = this.state;
    const { paramKey, tabKey } = this.props.route.params;
      const idKiemke = paramKey.kiemKeTaiSan.id;
      const trangthaiId = paramKey.kiemKeTaiSan.trangThaiId;
    return (
      <View style={styles.container}>
        <ScrollableTabView
          collapsableBar={this.collapsableComponent(paramKey, tabKey, danhsachUserKiemke)}
          initialPage={0}
          tabContentHeights={[tabOneHeight, tabTwoHeight, tabThirtHeight]}
          scrollEnabled
          prerenderingSiblingsNumber={Infinity}
          renderTabBar={() => <DefaultTabBar inactiveTextColor="gray" activeTextColor="black" backgroundColor="white" />}
        >
          <View onLayout={(event) => this.measureTabOne(event)} tabLabel='TS tìm thấy'>
            <ScrollView style={{ height: 'auto', backgroundColor: "white" }}>
              <FlatList
                scrollEnabled={false}
                data={danhsachTSFound}
                renderItem={item => this.renderItemComponent(item)}
              />
            </ScrollView>

          </View>
          <View onLayout={(event) => this.measureTabTwo(event)} tabLabel='TS không tìm thấy'>
            <ScrollView style={{ height: 'auto', backgroundColor: "white" }}>
              <FlatList
                scrollEnabled={false}
                data={danhsachTSNotFound}
                renderItem={item => this.renderItemComponent(item)}
              />
            </ScrollView>
          </View>
          <View onLayout={(event) => this.measureTabThirt(event)} tabLabel='TS ngoài danh sách'>
            <ScrollView style={{ height: 'auto', backgroundColor: "white" }}>
              <FlatList
                scrollEnabled={false}
                data={danhsachTSNgoaiHT}
                renderItem={item => this.renderItemComponent(item)}
              />
            </ScrollView>
          </View>
        </ScrollableTabView>
        <View style={styles.separator} />
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            onPress={() => this.deleteThisAsset(idKiemke,trangthaiId)}
            style={styles.shareButton}
          >
            <Text style={styles.shareButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  title: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    fontSize: 15,
    fontStyle: 'italic'
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
    flex: 1,
    width: deviceWidth - 50,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    bottom: 0
  },
  infor: {
    padding: 20,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: 'auto',
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "red",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
    paddingBottom: 30,
  }
});
