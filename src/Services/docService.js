import http from './httpService/httpService';
import config from '../Utilities/config.json';
const apiEndPoint = config.apiUrl;
export function Docregister(user)
{
    return http.post(`${apiEndPoint}/doctors`,{
        name: user.Docterusername,
        phone: user.Docterphonenumber,
        
    })
}
