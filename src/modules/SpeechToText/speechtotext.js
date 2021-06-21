import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Platform
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-community/voice';
import { screens } from '../../api/config';

class VoiceTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],

    }
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = (e) => {
    console.log('onSpeechEnd: ', e);

    this.setState({
      end: '√',
    });
    let list = this.state.results;

    list.map((result, index) => {
      if (result == "Xem báo cáo cảnh báo") {
        this.props.navigation.navigate(screens.bao_cao_canh_bao)
      }
    })

  };

  onSpeechError = (e) => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    console.log('onSpeechResults: ', e);
    if (Platform.OS == 'ios') {
      this.setState({
        results: e.value[0],
      });  
    } else
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = (e) => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e) => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('vi-VN');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }

  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };
  checkResult(result) {
    switch (result) {
      case "Xem báo cáo cảnh báo":
      case "xem báo cáo cảnh báo":
        this.props.navigation.navigate(screens.bao_cao_canh_bao);

        break;
      case "Xem toàn bộ tài sản":
      case "xem toàn bộ tài sản":
        this.props.navigation.navigate(screens.quan_ly_tai_san)
        break;
      case "Xem danh sách kiểm kê":
      case "xem danh sách kiểm kê":
        this.props.navigation.navigate(screens.quan_ly_kiem_ke_tai_san)
        break;
      case "Xem giám sát tài sản":
        this.props.navigation.navigate(screens.giam_sat_tai_san)
        break;
      case "quản lý đầu độc":
      case "quản lý đầu đọc":
        this.props.navigation.navigate(screens.quan_ly_dau_doc_co_dinh)
        break;
      case "quản lý dự trù mua sắm":
      case "Quản lý dự trù mua sắm":
        this.props.navigation.navigate(screens.quan_ly_du_tru_mua_sam)
        break;
      case "đặt lịch xuất báo cáo":
      case "Đặt lịch xuất báo cáo":
        this.props.navigation.navigate(screens.dat_lich_xuat_bao_cao)
        break;
      case "quản lý nhà cung cấp":
      case "Quản lý nhà cung cấp":
        this.props.navigation.navigate(screens.quan_ly_nha_cung_cap)
        break;
      case "Quản lý người dùng":
      case "quản lý người dùng":
        this.props.navigation.navigate(screens.quan_ly_nguoi_dung)
        break;
      case "Quản lý loại tài sản":
      case "quản lý loại tài sản":
        this.props.navigation.navigate(screens.quan_ly_loai_tai_san)
        break;
      case "Báo cáo thông tin tài sản":
      case "báo cáo thông tin tài sản":
        this.props.navigation.navigate(screens.bao_cao_thong_tin_tai_san)
        break;
      case "Quản lý phân quyền":
      case "quản lý phân quyền":
        this.props.navigation.navigate(screens.quan_ly_phan_quyen)
        break;
      case "Thêm mới tài sản":
        case "thêm mới tài sản":
        this.props.navigation.navigate(screens.them_moi_tai_san);
        break;
    }
    //this._destroyRecognizer();
    this._stopRecognizing();
    this._destroyRecognizer();
  }
  displayStartProgess() {
    if (this.state.started != '') {
      return <Text style={styles.stat}>{`Đang bắt đầu....`}</Text>
    }
  }
  displayRecognizedProgess() {
    if (this.state.recognized != '') {
      return <Text style={styles.stat}>{`Đang bắt đầu tìm kiếm....`}</Text>
    }
  }
  displayErrorProgess() {
    if (this.state.error != '') {
      return  <Text style={styles.stat}>{`Lỗi nhận dạng: ${this.state.error}`}</Text>
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bấm nút và nói</Text>

        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {this.checkResult(result)}
            </Text>
          );
        })}
        {/* <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${this.state.recognized
          }`}</Text>
        <Text style={styles.stat}>{`Đang nhận dạng: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Lỗi nhận dạng: ${this.state.error}`}</Text>
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>Partial Results</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>{`End: ${this.state.end}`}</Text> */}

        <TouchableHighlight onPress={this._startRecognizing}>
          <Image style={styles.button} source={require('../../../assets/images/button.png')} />
        </TouchableHighlight>
        {this.displayStartProgess()}
        {this.displayRecognizedProgess()}
        {this.displayErrorProgess()}
        {/* <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default VoiceTest;