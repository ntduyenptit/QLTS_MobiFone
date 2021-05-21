import React from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { endPoint } from '../../../api/config';
import { createGetMethod } from '../../../api/Apis';
import { convertHinhthucTaisan } from '../../global/Helper';
const deviceWidth = Dimensions.get("window").width;
class KhaiBaoMatTaiSan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toanboTaisan: [],
            listTaisanKhaibao: [],
            userKhaibao: "",
            dateKhaibao: "",
            contentKhaibao: "",
        }
        this.screen = {
            param: props.route.params
        }

    }
    componentDidMount() {
        this.getUserDangnhap();
        this.rederDataList(this.props.DvqlDataFilter);
    }

    getUserDangnhap() {
        let url;
        url = `${endPoint.getuserDangnhap}`;
        createGetMethod(url)
            .then(res => {
                console.log("res: " + res.result);
                this.setState({
                    userKhaibao: res.result,
                })
            });

        var today = new Date();
        const date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
        if (date != null) {
            this.setState({
                dateKhaibao: date,
            })
        }
    }

    rederDataList(array) {
        let url;
        switch (this.props.route.params) {
            case "tài sản mất":
                return url = `${endPoint.TsMatgetAll}`;
            case "tài sản mất":
                return url = `${endPoint.TsMatgetAll}`;
            case "tài sản mất":
                return url = `${endPoint.TsMatgetAll}`;
            case "tài sản mất":
                return url = `${endPoint.TsMatgetAll}`;
            case "tài sản mất":
                return url = `${endPoint.TsMatgetAll}`;
        }
        if (array && array.length > 0) {
            array.forEach(e => {
                url += `PhongBanqQL=${encodeURIComponent(`${e.id}`)}&`;
            });
            url += `IsSearch=${encodeURIComponent(`${true}`)}&`;
            url += `SkipCount=${encodeURIComponent(`${0}`)}&`;
            url += `MaxResultCount=${encodeURIComponent(`${20}`)}`;

            createGetMethod(url)
                .then(res => {
                    console.log("data: " + res.result);
                    this.setState({
                        toanboTaisan: res.result.items,
                    })
                });

        }
    }

    renderItemComponent = (data) => (
        <View style={styles.listItem}>
            <View style={styles.infor}>
                <Text numberOfLines={1} style={[{ fontWeight: "bold", paddingBottom: 3 }]}>SN: {data.item.serialNumber}</Text>
                <Text numberOfLines={1} style={{ paddingBottom: 3 }}>{data.item.tenTaiSan}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>{data.item.phongBanQuanLy}</Text>
                <Text numberOfLines={1} tyle={{ paddingBottom: 3 }}>{convertHinhthucTaisan(data.item.hinhThuc)}</Text>
            </View>
        </View>
    )

    render() {
        const { toanboTaisan,
            listTaisanKhaibao,
            userKhaibao,
            dateKhaibao,
            contentKhaibao } = this.state;
        const { screen } = this.props.route.params;

        console.log("{screen} " + screen);
        return (
            <View style={styles.container}>
                <View style={styles.containerInfor}>
                    <Text style={styles.title}>Khai báo {screen} </Text>
                    <Text style={styles.boldText}>Người khai báo: </Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        style={styles.bordered}
                        placeholder={userKhaibao}
                        editable={false}
                        selectTextOnFocus={false}
                    />
                    <Text style={styles.boldText}>Ngày khai báo: </Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        style={styles.bordered}
                        placeholder={dateKhaibao}
                        editable={false}
                        selectTextOnFocus={false}
                    />
                    <Text style={styles.boldText}>Nội dung khai báo: </Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        style={styles.borderedContent}
                        onChangeText={(text) => {
                            this.setState({
                                contentKhaibao: text,
                            });
                        }}
                    />
                </View>
                <View style={styles.containerButton}>
                    <Text style={styles.boldText}> Chọn tài sản khai báo</Text>
                    <TouchableOpacity style={styles.button2, { marginLeft: 170 }}  >
                        <Icon name="trash" size={25} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerListTaisan}>
                    {/* {loadDanhsachtaisan} */}
                    <ScrollView>
                        <FlatList
                            scrollEnabled={false}
                            data={toanboTaisan}
                            renderItem={item => this.renderItemComponent(item)}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerInfor: {
        height: '40%',
        padding: 10,
    },

    containerButton: {
        height: '7%',
        paddingTop: 10,
        flexDirection: 'row',
    },
    containerListTaisan: {
        height: '50%',
        padding: 10,
    },
    title: {
        paddingBottom: 10,
        fontSize: 18,
        fontStyle: 'italic',
        alignSelf: 'center',

    },
    boldText: {
        fontWeight: 'bold',
        alignItems: 'flex-start',
        padding: 5,
    },
    bordered: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    borderedContent: {
        borderWidth: 0.5,
        height: '25%',
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    button2: {
        padding: 10,
        marginRight: 5,
    },
    listItem: {
        padding: 5,
        flex: 1,
        width: deviceWidth - 50,
        backgroundColor: "#FFF",
        alignSelf: "flex-start",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        height: 95,
    },
    infor: {
        marginLeft: 10,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        height: 50,
        paddingBottom: 10,
    },

})

const mapStateToProps = state => ({
    DvqlDataFilter: state.filterDVQLDataReducer.dvqlDataFilter,
    toanbotaisanData: state.toanbotaisanReducer.toanbotaisanData,
    tokenUser: state.userReducer.token,
});

export default connect(mapStateToProps)(KhaiBaoMatTaiSan);