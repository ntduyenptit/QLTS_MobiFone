//import { localhost } from '../localhost';

const logIn = (userNameOrEmailAddress, password) => (
    fetch(`http://10.6.71.64:9080/api/TokenAuth/Authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ userNameOrEmailAddress, password })
    })
    .then(res => res.json())
    .catch(err => console.log(err))
);

export default logIn;
