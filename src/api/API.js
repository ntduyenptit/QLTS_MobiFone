// // a library to wrap and simplify api calls
// import apisauce from 'apisauce';
// import { Constants } from './config';

// const { API } = Constants;

// const create = () => {
//   const api = apisauce.create({
//     // base URL is read from the "constructor"
//     baseURL: API,
//     // here are some default headers
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//     },
//     // 10 second timeout...
//     timeout: 10000,
//   });

//   const login = (userNameOrEmailAddress, password) => api.post('TokenAuth/Authenticate', { userNameOrEmailAddress, password });
//   return {
//     login,
//   };
// };

// export default {
//   create,
// };