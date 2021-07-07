/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image,StyleSheet} from 'react-native';
import { convertTimeFormatToLocaleDate } from '@app/modules/global/Helper';

export default class AssetInfoScreen extends Component {
  currencyFormat = (num) => `${num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')  } VNĐ`

  render() {
    const {params} = this.props.route;
    const data = params?.result;
    if (data) {
      // console.log(data);
      return (
        <View style={assetStyles.card}>
          <Image
            style={{width: '100%', height: 100}}
            source={require('../../../assets/images/icons/qr-code.png')}
            resizeMode="contain"
          />
          <Text
            h1
            style={{paddingLeft: 10, fontWeight: 'bold', paddingBottom: 10}}
          >
            Kết quả
          </Text>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Tên tài sản: </Text>
            <Text style={assetStyles.text}>{data?.tenTS}</Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Mã tài sản: </Text>
            <Text style={assetStyles.text}>{data?.maQRCode}</Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Loại tài sản: </Text>
            <Text style={assetStyles.text}>{data?.loaiTaiSan}</Text>
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
            <Text style={assetStyles.text}>{data?.hangSanXuat}</Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Nguyên giá: </Text>
            <Text style={assetStyles.text}>
              {this.currencyFormat(Number(data?.nguyenGia))}
            </Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Ngày Mua: </Text>
            <Text style={assetStyles.text}>
              {data?.ngayMua && convertTimeFormatToLocaleDate(data?.ngayMua)}
            </Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Ngày hết hạn bảo hành: </Text>
            <Text style={assetStyles.text}>
              {data?.ngayBaoHanh && convertTimeFormatToLocaleDate(data?.ngayBaoHanh)}
            </Text>
          </View>
          <View style={assetStyles.row}>
            <Text style={assetStyles.name}>Ngày hết hạn sử dụng: </Text>
            <Text style={assetStyles.text}>
              {data?.hanSD && convertTimeFormatToLocaleDate(params.hanSD)}
            </Text>
          </View>
        </View>
      );
    } 
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>
            Không tìm thấy thông tin tài sản này!
          </Text>
        </View>
      );
    
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
