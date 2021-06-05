import http from './httpService/httpService';
import {apiUrl} from '../Utilities/config.json';

const apiEndPoint = `${apiUrl}/operations`;

export function getOperationsViaOptions(startDate,endDate,payType,page,pageSize)
{
    console.log("ttt",`${apiEndPoint}?fromDate=${startDate}&toDate=${endDate}&payType=free&pageSize=${pageSize}&page=${page}`)
    return http.get(`${apiEndPoint}?fromDate=${startDate}&toDate=${endDate}&payType=free&pageSize=${pageSize}&page=${page}`);
}


export function getOperations(page,pageSize)
{
    return http.get(`${apiEndPoint}?page=${page}&pageSize=${pageSize}`);
}

export function getOperation(id)
{   

    return http.get(`${apiEndPoint}/patient/${id}`);
}
export function getOperationsByStatus(status,page,pageSize)
{
    console.log("aaaa",`${apiEndPoint}?status=${status}&page=${page}&pageSize=${pageSize}`)
    return http.get(`${apiEndPoint}?status=${status}&page=${page}&pageSize=${pageSize}`)
    // console.log("Service",status)
    // console.log("pageSert",page)
    // if(status == 'week')
    // {
    //     console.log(`${apiEndPoint}?status=pending&page=${page}&pageSize=8`)
    //     return http.get(`${apiEndPoint}?status=pending&page=${page}&pageSize=8`)
    // }   
    // else{
    //     return http.get(`${apiEndPoint}?status=week&page=${page}&pageSize=8`)
    // }
}

export function saveOperation(values,personId)
{console.log("VALUES,",values);
console.log("PERSON ID",personId);
    return http.post(apiEndPoint,{
        patientId : personId,
        payType: values.payment,
        hospitalId: values.hospitalsId,
        date: values.operationdate,
        eye: values.selectOperationEyeId,
        status:"pending"
    
});
}

export function getOperationCountForChart()
{
    return http.get(`${apiEndPoint}/chart`)
}
