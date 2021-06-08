/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import moment from 'moment/min/moment-with-locales';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AssetInfoScreen extends Component {
  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ';
  }
  render() {
    moment.locale('vi');
    const {params} = this.props.route;
    console.log(params);
    if (params != null) {
      return (
        <View style={assetStyles.card}>
          <Icon name="qrcode" color="white" size={100} />
          <Text
            h1
            style={{paddingLeft: 10, fontWeight: 'bold', paddingBottom: 10}}>
            Kết quả
          </Text>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Tên tài sản: </Text>
            <Text style={assetStyles.text}>{params.tenTS}</Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Mã tài sản: </Text>
            <Text style={assetStyles.text}>{params.maQRCode}</Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Loại tài sản: </Text>
            <Text style={assetStyles.text}>{params.loaiTaiSan}</Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Serial number: </Text>
            <Text style={assetStyles.text}>{params.serialNumber}</Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Product number No: </Text>
            <Text style={assetStyles.text}>{params.productNumber}</Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Hãng sản xuất: </Text>
            <Text style={assetStyles.text}>{params.hangSanXuat}</Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Nguyên giá: </Text>
            <Text style={assetStyles.text}>
              {this.currencyFormat(Number(params.nguyenGia))}
            </Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Ngày Mua: </Text>
            <Text style={assetStyles.text}>
              {params.ngayMua != null
                ? moment(params.ngayMua).format('LL')
                : ''}
            </Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Ngày hết hạn bảo hành: </Text>
            <Text style={assetStyles.text}>
              {params.ngayBaoHanh != null
                ? moment(params.ngayBaoHanh).format('LL')
                : ''}
            </Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Ngày hết hạn sử dụng: </Text>
            <Text style={assetStyles.text}>
              {params.hanSD != null ? moment(params.hanSD).format('LL') : ''}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>
            Không tìm thấy thông tin tài sản này!
          </Text>
        </View>
      );
    }
  }
}

const assetStyles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    paddingTop: 20,
    shadowColor: '#000',
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'arial',
  },
  row: {
    paddingBottom: 20,
    flexDirection: 'row',
  },
  name: {
    flex: 3,
    paddingLeft: 20,
  },
  button: {
    paddingRight: 10,
  },
  text: {
    flex: 5,
    color: 'blue',
    alignItems: 'flex-end',
  },
});
