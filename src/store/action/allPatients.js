import { getPatient, getPatients, getPatientViaOptions } from "../../Services/patientsService"
import { getOperations } from "../../Services/operationService";
import { getIllnesses } from "../../Services/illnessesService";

export const GetAllPatients = (patients) =>
{
    return async dispatch  =>  {
        const {data} = await getPatients();
        const patients = data.content;
        const count = data.total
        dispatch({
            type:"GET_PATIENTS",
            p:patients,
            c:count
        });

    }
}

export const GetAllOperations = () =>
{
    
    return async dispatch => {
        const {data} = await getOperations();
        const operations = data.content;
        const count = data.total;

        dispatch({
            type:"GET_OPERATIONS",
            o:operations,
            c:count
        });
    }
}
export const GetAllIllnesses = () =>
{
    return async dispatch =>{
        const {data} = await getIllnesses();
        const illnesses = data.content;
        dispatch({
            type:"GET_ILLNESSES",
            i:illnesses
        })
    }
}
export const setData = (data) =>{

    return {
        type : "GET_Data",
        patientss : data
    }
}