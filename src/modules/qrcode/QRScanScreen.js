import React, {Component} from 'react';

import {StyleSheet, Text, TouchableOpacity, BackHandler} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import RNCamera from 'react-native-camera';
import { screens } from '@app/api/config';
import { createGetMethod } from '@app/api/Apis';
//const axios = require('axios');
export default class QRScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLight: true,
    };
  }
  componentWillUnmount() {
    this.props.route.params.onGoBack();
  }

  async getAsset(input) {
    // try {
    //   const response = await axios.get(
    //     'http://10.6.71.64:9080/api/services/app/LookupTable/GetAssetByQRCode?qrCode=' +
    //       input,
    //   );
    //   if (response.data.success) {
    //     this.setState({isLight: false});
    //     this.props.navigation.navigate(screens.qrScanAssetInfor, response.data.result);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    let url = 'http://10.6.71.64:9080/api/services/app/LookupTable/GetAssetByQRCode?qrCode=' +input;
   
    createGetMethod(url)
                .then(res => {
                  this.setState({isLight: false});
                  this.props.navigation.navigate(screens.qrScanAssetInfor, res.result);
                })
  }

  onSuccess = (e) => {
    this.getAsset(e.data);
  };

  forceUpdate() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        showMarker={true}
        reactivate={true}
        reactivateTimeout={2000}
        flashMode={
          this.state.isLight
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
  render() {
    return this.forceUpdate();
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
