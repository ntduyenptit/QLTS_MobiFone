import AsyncStorage from '@react-native-community/async-storage';
import { signOut } from '@app/modules/navigation/Navigator';
import { baseUrl, headers, headerWithoutToken, headerContainFiles} from './config';
import save from '../localStorage/saveLogin';

export function createPostMethodWithoutToken(endPoint, params) {
    // eslint-disable-next-line no-undef
   return fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: headerWithoutToken,
        body: params
    })
    .then(res => res.json())
    .catch(err => console.warn(err))
};

export function createPostMethodWithToken(endPoint, params) {
    return _getStorageValue().then(token => 
        // eslint-disable-next-line no-undef
         fetch(`${baseUrl}${endPoint}`, {
            method: 'POST',
            headers: headers(token),
            body: params
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
        );
}

export function createPostMultiFiles(endPoint, params) {
      // eslint-disable-next-line no-undef
    return fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: headerContainFiles(),
        body: params
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

export function createGetMethod(endPoint, params = null) {
       return _getStorageValue().then(token => 
        // eslint-disable-next-line no-undef
         fetch(`${baseUrl}${endPoint}`, {
            method: 'GET',
            headers: headers(token),
            body: params
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    const {message} = data.error;
                    if (message === '[Current user did not login to the application]') {
                       return save.expriedLogin();
                    }
                }
                return data;
            })
            .catch(err => console.log(err))
        );
};

export function deleteMethod(endPoint, params = null) {
    return _getStorageValue().then(token => 
        // eslint-disable-next-line no-undef
         fetch(`${baseUrl}${endPoint}`, {
            method: 'DELETE',
            headers: headers(token),
            body: params
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
        );
}

async function _getStorageValue() {
    const value = await AsyncStorage.getItem('@token')
    if (value === null) {
        signOut();
    }
    return value
  }

