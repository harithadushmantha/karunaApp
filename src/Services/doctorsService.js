import http from './httpService/httpService';
import {apiUrl} from '../Utilities/config.json';

const apiEndPoint = `${apiUrl}/doctors`;

export function getDoctors()
{
    return http.get(apiEndPoint)
}