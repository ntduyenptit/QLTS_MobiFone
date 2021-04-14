import AsyncStorage from '@react-native-community/async-storage';

const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('@token', token);
        console.log('luu Token thanh cong');
    } catch (error) {
        console.log('Loi khi luu Token');
        console.log(error);
    }
};


export default saveToken;
