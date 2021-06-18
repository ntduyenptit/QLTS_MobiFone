// eslint-disable-next-line import/no-unresolved
import AsyncStorage from '@react-native-community/async-storage';

const localStorage = {
   async saveToken(token) {
        try {
            await AsyncStorage.setItem('@token', token);
        } catch (error) {
            console.log(error);
        }
    },
    async saveUserNameOrEmail(userNameOrEmail) {
        try {
            await AsyncStorage.setItem('@userNameOrEmail', userNameOrEmail);
        } catch (error) {
            console.log(error);
        }
    },
    async saveUserId(userId) {
        try {
            await AsyncStorage.setItem('@userId', userId);
        } catch (error) {
            console.log(error);
        }
    },
    saveLogin(token, userNameOrEmail) { localStorage.saveToken(token); localStorage.saveUserNameOrEmail(userNameOrEmail) }
};


export default localStorage;
