import http from './httpService/httpService';
import {apiUrl} from '../Utilities/config.json';

const apiEndPoint = `${apiUrl}/postofs`;

export function getPatientsOfSelectedPostof(type)
{
    return http.get(`${apiEndPoint}/${type}`)
}
export function savePostofs(object)
{
    
    const obj = {
        type:object.type,
        patientId:object.patientId,
        operationId:object.operationId,
        date:object.date
    }
    //console.log("obj",obj);
    //console.log(apiEndPoint)
    return http.post(apiEndPoint,obj);
}
export function getPostofByOperationId(id)
{
    console.log("aa",id);
    return http.get(`${apiEndPoint}/${id}`);
}