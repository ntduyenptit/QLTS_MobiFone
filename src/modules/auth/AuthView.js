import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import logIn from '../../api/SignIn';
import saveToken from '../../api/saveToken';

export default class AuthViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin',
      password: '123qwe',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  signIn(email, password) {
    logIn(email, password)
      .then(res => {
        console.log('345',res.result.accessToken);
        if (res) {
          saveToken(res.result.accessToken);
          Alert.alert('SignIn successfully!');
          this.props.userLogin(res.result.accessToken);
          // Global.onSignIn(res.user);
          // this.props.navigation.goBack();
        } else {
          Alert.alert('SignIn failed!');
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/images/background.png')} style={styles.backgroundImage}>
          <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
          <Text style={styles.logo}>Quản lý tài sản</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              value='admin'
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Mật khẩu..."
              value='123qwe'
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ password: text })}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.signIn(this.state.email, this.state.password)}>
            <Text style={styles.loginText}>Đăng nhập</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontFamily : "Lato-Semibold",
    fontSize: 40,
    color: "white",
    marginBottom: 40,
    alignContent: "flex-start"
  },
  iconImage: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: 80,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e5e5e5",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgot: {
    color: "black",
    fontSize: 11
  },
  loginBtn: {
    width: "60%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "black"
  }
});
