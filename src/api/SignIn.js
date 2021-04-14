import { baseUrl, headers} from './config';

const logIn = (userNameOrEmailAddress, password) => (
    // eslint-disable-next-line no-undef
    fetch(`${baseUrl}/TokenAuth/Authenticate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ userNameOrEmailAddress, password })
    })
    .then(res => res.json())
    .catch(err => console.log(err))
);

export default logIn;
