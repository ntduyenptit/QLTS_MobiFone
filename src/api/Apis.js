import { baseUrl, headers} from './config';

const createPostMethod = (endPoint, params) => (
    // eslint-disable-next-line no-undef
    fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers,
        body: params
    })
    .then(res => res.json())
    .catch(err => console.log(err))
);

export default createPostMethod;
