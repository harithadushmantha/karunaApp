import React from 'react';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import DataTable from '../../Shared/DataTable';
import { SetCurrentPage } from '../../store/action/navigation';

import './style.css';

const PatientsTable = ({ location }) => {
    const dispatch = useDispatch();
    dispatch(SetCurrentPage("Home/>Registered Patients Table"));
    const queryData = queryString.parse(location.search);

    return (
        <DataTable
            link={"view-patients"}
            queryData={queryData}
            url={"view-single-patient"}
            stringForprint={"print"}
            mainTopic={"View Patients"}
        />
    )
}

export default PatientsTable;