import React from 'react';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import { SetCurrentPage} from '../../store/action/navigation';
import DataTable from '../../Shared/DataTable';

const  PatientTableForEnterOperations = ({location}) => {
    const dispatch = useDispatch();
    dispatch(SetCurrentPage("Home/>Registered Patients Table"));
    
    const queryData = queryString.parse(location.search)
    return ( 
        <DataTable 
            link ={"view-patients"}
            queryData = {queryData}
            url ={"enter-operation"}
            mainTopic={"Registered Patients"}
        />
     );
}
 
export default PatientTableForEnterOperations ;