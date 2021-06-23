import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, Modal, Dimensions } from 'react-native';
import { endPoint, screens } from '@app/api/config';
import { createPostMethodWithoutToken } from '../../api/Apis'

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    componentDidMount() {
        this.getNguoidung(this.props.DvqlDataFilter);
    }

    getNguoidung(datas) {
        if (datas && datas.length > 0) {
            let url;
            url = `${endPoint.getAllNguoidung}?`;

            datas.forEach(e => {
                url += `ToChucIdList=${encodeURIComponent(`${e.id}`)}&`;
            });

            url += `IsSearch=${encodeURIComponent(`${true}`)}&`;
            url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
            url += `MaxResultCount=${encodeURIComponent(`${30}`)}`;
            createGetMethod(url)
                .then(res => {
                    if (res) {
                        this.setState({
                            toanboNguoidungData: res.result.items,
                            total: res.result.totalCount
                        });
                    } else {
                        // Alert.alert('Lỗi khi load toàn bộ tài sản!');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    sendEmail() {
    }

    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Nhập email để nhận mật khẩu mới</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({ email: text })}
              />
            </View>

            <TouchableOpacity style={styles.Btn} onPress={() => this.sendEmail()}>
              <Text style={styles.Text}>Tiếp tục </Text>
            </TouchableOpacity>

          </View>
        );
    }

}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: 10,
        },
        title: {
            marginTop: 5,
            fontSize: 20,
            color: "#003f5c",
        },
        inputView: {
            width: "100%",
            textAlign: 'center',
            height: 50,
            marginTop: 15,
            alignSelf: "center",
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            backgroundColor: "#FFFFFF"
        },
        inputText: {

        },

        Btn: {
            width: "100%",
            backgroundColor: "#526be8",
            borderRadius: 10,
            height: 50,
            padding: 10,
            alignItems: "center",
            alignSelf: "center",
            bottom: 4,
            position: 'absolute',
            marginBottom: 5,
            marginLeft: 10
        },
        Text: {
            color: "white",
            fontSize: 16,
            fontWeight: 'bold',
            alignItems: "center",
            alignSelf: "center",
        },
    }
)