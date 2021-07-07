import React, {Component} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import { screens, endPoint } from '@app/api/config';
import { createGetMethod } from '../../api/Apis'

export default class QRScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLight: false,
    };
  }

  getAsset(input) {
      let url = `${endPoint.getQRCode}?`;
      url += `qrCode=${input}`;
      createGetMethod(url).then(res => {
          this.props.navigation.navigate(screens.qrScanAssetInfor, res);
      });
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
