import http from './httpService/httpService';
import config from '../Utilities/config.json';
const apiEndPoint = config.apiUrl;
export function register(user)
{
    return http.post(`${apiEndPoint}/users`,{
        email: user.username,
        password: user.password,
        name : user.name
    })
}
