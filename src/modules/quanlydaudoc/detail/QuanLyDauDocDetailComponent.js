import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import BulletView from '@app/modules/global/BulletView';
import { deviceWidth } from '../../global/LoaderComponent';
import { convertTimeFormatToLocaleDate } from '../../global/Helper';
import { deleteMethod } from '../../../api/Apis';
import { endPoint } from '../../../api/config';

function QuanLyDauDocDetailComponent({ navigation, route }) {
  const { paramKey, tabKey } = route.params;
  
  function deleteThisAsset() {
    Alert.alert('Bạn có chắc chắn muốn xóa không?',
      '',
      [
        {
          text: 'OK', onPress: () => {
            let url = `${endPoint.deleteReaderdidong}?`;
            url += `input=${paramKey.id}`;

            deleteMethod(url).then(res => {
              if (res.success) {
                Alert.alert('Xóa đầu đọc thành công',
                  '',
                  [
                    { text: 'OK', onPress: navigation.goBack() },
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'flex-start', marginHorizontal: 30 }}>
          <Image style={styles.productImg} source={require('../../../../assets/images/icon.png')} />
          <Text style={styles.title}>Thông tin đầu đọc:</Text>
          {/* Mã tài sản */}
          <BulletView title='Mã tài sản' text={paramKey.maEPC ? paramKey.maEPC : paramKey.epcCode} />
          {/* Tên tài sản */}
          <BulletView title='Tên tài sản' text={paramKey.tenTS ? paramKey.tenTS : paramKey.tenTaiSan} />
          {/* Loại tài sản */}
          <BulletView title='Loại tài sản' text={paramKey.loaiTS ? paramKey.loaiTS : paramKey.loaiTaiSan} />
          {/* Phòng ban quản lý */}
          <BulletView title='Phòng ban quản lý' text={paramKey.phongBanQL ? paramKey.phongBanQL : paramKey.phongBanQuanLy} />
          {/* Vị trí tài sản */}
          <BulletView title='Vị trí tài sản' text={paramKey.viTriTS ? paramKey.viTriTS : paramKey.viTriTaiSan} />
          {/* Trạng thái */}
          <BulletView title='Trạng thái' text={paramKey.trangThai} />
          {/* Ngày mua */}
          <BulletView title='Ngày mua' text={paramKey.ngayMua && convertTimeFormatToLocaleDate(paramKey.ngayMua)} />
        </View>

      </ScrollView>
      <View style={styles.separator} />
      <View style={styles.addToCarContainer}>
        <TouchableOpacity
          onPress={() => deleteThisAsset()}
          style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    paddingBottom: 10,
    fontSize: 18,
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
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20
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
    paddingBottom: 30
  }
});

export default QuanLyDauDocDetailComponent;