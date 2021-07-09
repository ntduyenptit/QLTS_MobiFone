import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import {View, StyleSheet} from 'react-native';
import { screens, endPoint } from '@app/api/config';
import { createGetMethod } from '../../api/Apis'

export default class QRScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        qrCode: '',
    }
    this.param = {
        param: props.route.params,
    }
}

  getAsset = () => {
    const { qrCode } = this.state;
      let url = `${endPoint.getQRCode}?`;
      url += `qrCode=${qrCode}`;
      createGetMethod(url).then(res => {
          this.props.navigation.navigate(screens.qrScanAssetInfor, res);
      });
  }

  detected = (value) => {
    const { qrCode } = this.state;
    if (qrCode === '') {
      this.setState({
        qrCode: value,
      }, () => this.getAsset());
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
        this.camera = ref;
      }}
          style={styles.preview}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={(barcodes) => this.detected(barcodes)}
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
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
