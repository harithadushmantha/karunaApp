import http from './httpService/httpService';
import {apiUrl} from '../Utilities/config.json';

const apiEndPoint = `${apiUrl}/hospitals`;

export function getHospitals()
{
    return http.get(apiEndPoint);
};
export function postHospital(user)
{console.log(apiEndPoint)
    return http.post(apiEndPoint,{
        name: user.hospitalname,
        phone: user.hospitalPhonenumber,
    })
}