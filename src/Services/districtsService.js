import http from './httpService/httpService';
import {apiUrl} from '../Utilities/config.json';

const apiEndPoint = `${apiUrl}/districts`;
console.log(apiEndPoint)
export function getDistricts()
{
    return http.get(apiEndPoint);
}