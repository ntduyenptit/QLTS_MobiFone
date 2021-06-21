import React, {Component} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import { screens } from '@app/api/config';

const axios = require('axios');

export default class QRScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLight: false,
    };
  }

  async getAsset(input) {
    try {
      const response = await axios.get(
        `http://10.6.71.64:9080/api/services/app/LookupTable/GetAssetByQRCode?qrCode=${ 
          input}`,
      );
      if (response.data.success) {
        this.setState({isLight: false});
        this.props.navigation.navigate(screens.qrScanAssetInfor, response.data.result);
      }
    } catch (error) {
      console.error(error);
    }
    
  }

  onSuccess = (e) => {
    this.getAsset(e.data);
  };

  forceUpdate() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        showMarker
        reactivate
        reactivateTimeout={2000}
        flashMode={
          this.state.isLight
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
      />
    );
  }

  render() {
    return this.forceUpdate();
  }
}
