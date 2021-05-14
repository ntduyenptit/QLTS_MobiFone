import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl, headers, headerWithoutToken} from './config';

export function createPostMethodWithoutToken(endPoint, params) {
    // eslint-disable-next-line no-undef
   return fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: headerWithoutToken,
        body: params
    })
    .then(res => res.json())
    .catch(err => console.log(err))
};

export function createGetMethod(endPoint, params = null) {
       return _getStorageValue().then(token => 
        // eslint-disable-next-line no-undef
         fetch(`${baseUrl}${endPoint}`, {
            method: 'GET',
            headers: headers(token),
            body: params
        })
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
        );
};

async function _getStorageValue() {
    const value = await AsyncStorage.getItem('@token')
    return value
  }

