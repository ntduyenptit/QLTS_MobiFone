import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import { endPoint } from '../../api/config';
import { createPostMethodWithoutToken } from '../../api/Apis'
import save from '../../localStorage/saveLogin';

export default class AuthViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin',
      password: '123qwe',
    };
  }

  signIn(userNameOrEmailAddress, password) {
    createPostMethodWithoutToken(endPoint.login, JSON.stringify({ userNameOrEmailAddress, password }))
      .then(res => {
        if (res) {
          save.saveLogin(res.result.accessToken,userNameOrEmailAddress);
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
          <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
          <Text style={styles.logo}>Quản lý tài sản</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
             // value='admin'
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Mật khẩu..."
             // value='123qwe'
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ password: text })}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.signIn(this.state.email, this.state.password)}>
            <Text style={styles.loginText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotpassBtn} >
            <Text style={styles.forgotpassBtn}>Quên mật khẩu</Text>
          </TouchableOpacity>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#1f76c3",
    marginBottom: 40,
    alignContent: "flex-start",
  },
  iconImage: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: 15,
    height: 90,

  },
  inputView: {
    width: "80%",
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black",
  },
  
  loginBtn: {
    width: "80%",
    backgroundColor: "#526be8",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10
  },
  loginText: {
    color: "white",
    fontSize: 15,
    fontWeight:'bold'
  },
  forgotpassBtn:{
    textDecorationLine: 'underline',
    color: "black",
    marginTop: 15,
    fontSize: 15
  },
  hotline: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end',
    bottom: 10,
    position: 'absolute',
    fontSize: 14
  }
});
