// eslint-disable-next-line import/no-unresolved
import AsyncStorage from '@react-native-community/async-storage';

const localStorage = {
   async saveToken(token) {
        try {
            await AsyncStorage.setItem('@token', token);
            console.warn('luu Token thanh cong');
        } catch (error) {
            console.warn('Loi khi luu Token');
            console.warn(error);
        }
    },
    async saveUserNameOrEmail(userNameOrEmail) {
        try {
            await AsyncStorage.setItem('@userNameOrEmail', userNameOrEmail);
            console.warn('luu userNameOrEmail thanh cong');
        } catch (error) {
            console.warn('Loi khi luu userNameOrEmail');
            console.warn(error);
        }
    },
    async saveUserId(userID) {
        try {
            await AsyncStorage.setItem('@userId', userID);
            console.warn('luu userId thanh cong');
        } catch (error) {
            console.warn('Loi khi luu userId');
            console.warn(error);
        }
    },
    saveLogin(token, userNameOrEmail,userId) { localStorage.saveToken(token); localStorage.saveUserNameOrEmail(userNameOrEmail); localStorage.saveUserId(userId) }
};


export default localStorage;
