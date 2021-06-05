import http from './httpService/httpService';
import {apiUrl} from '../Utilities/config.json';

const apiEndPoint = `${apiUrl}/patients`;


export function getPatients()
{
    return http.get(apiEndPoint);
}
export function getPatientViaOptions(startDate,endDate,curruntPage,pageSize)
{
    console.log(`${apiEndPoint}?fromDate=${startDate}&toDate=${endDate}&pageSize=&page=${curruntPage}`)
    return http.get(`${apiEndPoint}?fromDate=${startDate}&toDate=${endDate}&pageSize=${pageSize}&page=${curruntPage}`);
}

export function getPatient(id)
{
    return http.get(`${apiEndPoint}/${id}`);
}

export function savePatient(patient)
{
        return http.post(apiEndPoint,{
            _id:patient.nicbox,
            title:patient.type,
            name:patient.fullname,
            districtId:patient.district,
            gender:patient.gender,
            phone:patient.phone,
            dob:patient.dob
        });
}/*
export function getPatientsFromPostofs(type)
{
   
    return http.get(`${apiEndPoint}?${type}`);
}*/