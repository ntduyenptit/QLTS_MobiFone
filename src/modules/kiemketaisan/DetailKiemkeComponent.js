import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity, FlatList,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'rn-collapsing-tab-bar';

const deviceWidth = Dimensions.get("window").width;
const containerHeight = Dimensions.get('window').height;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


export default class Collapse extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            tabOneHeight: containerHeight,
            tabTwoHeight: containerHeight
        }
        this.param = {
            param: props.route.params,
        }
    }

    measureTabOne = (event) => {
        this.setState({
            tabOneHeight: event.nativeEvent.layout.height
        })
    }
    measureTabTwo = (event) => {
        this.setState({
            tabTwoHeight: event.nativeEvent.layout.height
        })
    }
    collapsableComponent = () => {
        return (
            <View style={{ height: 400, backgroundColor: 'white', width: deviceWidth }}>
                <TouchableOpacity onPress={() => { alert('Alert') }}>
                    <Text>Thông tin kiểm kê</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const { tabOneHeight, tabTwoHeight } = this.state;

        const paramKey = this.param;
        console.log("DetailKiemke: " + paramKey);

        return <ScrollableTabView
            collapsableBar={this.collapsableComponent()}
            initialPage={0}
            tabContentHeights={[tabOneHeight, tabTwoHeight]}
            scrollEnabled
            prerenderingSiblingsNumber={Infinity}
            renderTabBar={() => <DefaultTabBar inactiveTextColor="white" activeTextColor="white" backgroundColor="blue" />}
        >
            <View onLayout={(event) => this.measureTabOne(event)} tabLabel='Tab #1'>
                <View style={{ height: 2000, backgroundColor: "cyan" }}>

                    <FlatList
                        scrollEnabled={false}
                        data={[{ key: 'item 12' }, { key: 'item 23' }, { key: 'item 13' }, { key: 'item 52' }, { key: 'item 51' }, { key: 'item 25' }]}
                        renderItem={({ item }) => <View style={{ height: 30 }}>
                            <Text>{item.key}</Text>
                        </View>}
                    />
                </View>

            </View>
            <View onLayout={(event) => this.measureTabTwo(event)} tabLabel='Tab #2'>
                <View style={{ height: 4000, backgroundColor: "orange" }}>

                    <FlatList
                        scrollEnabled={false}
                        data={[{ key: 'item 1' }, { key: 'item 2' }, { key: 'item 3' }, { key: 'item 4' }, { key: 'item 6' }, { key: 'item 12' }]}
                        renderItem={({ item }) => <View style={{ height: 30 }}>
                            <Text>{item.key}</Text>
                        </View>}
                    />
                </View>
            </View>
        </ScrollableTabView>;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    navContainer: {
        height: HEADER_HEIGHT,
        marginHorizontal: 10,
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
        backgroundColor: 'transparent',
    },
    navBar: {
        height: NAV_BAR_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
