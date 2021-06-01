// eslint-disable-next-line import/no-unresolved
import AsyncStorage from '@react-native-community/async-storage';

const localStorage = {
   async saveToken(token) {
        try {
            await AsyncStorage.setItem('@token', token);
            console.log('luu Token thanh cong');
        } catch (error) {
            console.log('Loi khi luu Token');
            console.log(error);
        }
    },
    async saveUserNameOrEmail(userNameOrEmail) {
        try {
            await AsyncStorage.setItem('@userNameOrEmail', userNameOrEmail);
            console.log('luu userNameOrEmail thanh cong');
        } catch (error) {
            console.log('Loi khi luu userNameOrEmail');
            console.log(error);
        }
    },
    async saveUserId(userID) {
        try {
            await AsyncStorage.setItem('@userId', userId);
            console.log('luu userId thanh cong');
        } catch (error) {
            console.log('Loi khi luu userId');
            console.log(error);
        }
    },
    saveLogin(token, userNameOrEmail,userId) { localStorage.saveToken(token); localStorage.saveUserNameOrEmail(userNameOrEmail); localStorage.saveUserId(userId) }
};


export default localStorage;
