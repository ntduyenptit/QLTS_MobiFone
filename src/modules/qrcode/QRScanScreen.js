import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import { screens, endPoint } from '@app/api/config';
import { createGetMethod } from '../../api/Apis'

export default class QRScanScreen extends Component {

  getAsset(input) {
      let url = `${endPoint.getQRCode}?`;
      url += `qrCode=${input}`;
      createGetMethod(url).then(res => {
          this.props.navigation.navigate(screens.qrScanAssetInfor, res);
      });
  }

  forceUpdate() {
    return (
      <RNCamera
        ref={ref => {
        this.camera = ref;
      }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
        androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
        this.getAsset(barcodes);
      }}
      />
    );
  }

  render() {
    return this.forceUpdate();
  }
}

const styles = {
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}
