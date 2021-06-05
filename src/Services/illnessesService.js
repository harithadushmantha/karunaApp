import http from './httpService/httpService';
import {apiUrl} from '../Utilities/config.json';

const apiEndPoint = `${apiUrl}/illnesses`;
//console.log(apiEndPoint);
export function saveIllness(personId,illness)
{
    //console.log(illness)
   
        return http.post(apiEndPoint,{
            patientId : personId,
            doctorId : illness.values.doctorsId,
            leftVisualAccuaracy: illness.values.visualAccuracyLeftId,
            rightVisualAccuaracy: illness.values.visualAccuracyRightId,
            IPD: illness.values.ipd,
            leftCatract: illness.values.catractLeft,
            rightCatract: illness.values.catractRight,
            reflectiveErrorType: illness.values.reflectiveErrorType,
            IOP: illness.values.iop,
            glaucoma: illness.values.glaucoma,
            sprint: illness.values.sprint,
            diabetics: illness.values.diabetics,
            cardiac: illness.values.cardiac,
            oneEye: illness.values.oneEye,
            hypertension: illness.values.hypertension
        });
}
export function getIllnessByPatientId(PatientId)
{
    return http.get(`${apiEndPoint}/patient/${PatientId}`);
}

export function getIllnesses(page,pageSize)
{
    return http.get(`${apiEndPoint}?page=${page}&pageSize=${pageSize}`);
}

/*
    const obj = {
        patientId : illness.personId,
            doctorId : illness.values.doctorsId,
            leftVisualAccuaracy: illness.values.visualAccuracyLeftId,
            rightVisualAccuaracy: illness.values.visualAccuracyRightId,
            IPD: illness.values.ipd,
            leftCatract: illness.values.catractLeft,
            rightCatract: illness.values.catractRight,
            reflectiveErrorType: illness.values.reflectiveErrorType,
            IOP: illness.values.iop,
            glaucoma: illness.values.glaucoma,
            sprint: illness.values.sprint,
            diabetics: illness.values.diabetics,
            cardiac: illness.values.cardiac,
            oneEye: "illness.values.oneEye",
            hypertension: illness.values.hypertension
    }*/