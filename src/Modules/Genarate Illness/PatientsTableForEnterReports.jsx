import React from 'react';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import { SetCurrentPage } from '../../store/action/navigation';
import DataTable from '../../Shared/DataTable';

const PatientTableForEnterReports = ({location}) => {
    
    const dispatch = useDispatch();
    dispatch(SetCurrentPage("Home/>Registered Patients Table"));
    const queryData = queryString.parse(location.search);
    
    return ( 
        <DataTable
            link ={"add-report"}
            queryData = {queryData}
            url = {"set-details"}
            mainTopic={"Generate Report"}
        />
     );
}
 
export default PatientTableForEnterReports;