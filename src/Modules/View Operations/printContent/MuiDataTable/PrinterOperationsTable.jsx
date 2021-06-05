import React from 'react';
import MUIDataTable from './MUIDataTable';




const PrinterOperationsTable = ({operationses,fromDate,toDate,patientsCount}) => {

   const columns=[ 
        
        {name:'patient.name', label: 'Name'},
        {name:'payType', label: 'PayType'},
        {name:'hospital.name', label: 'HospitalName'},
        {name:'status', label: 'Post ops'},
       {name:'date', label: 'RegisterDate', content: operation => (
           operation.date.substr(0,10)
       )}

];




    return ( <div>

<MUIDataTable
            title=""
            columns={columns}
            data={operationses}
            fromDate={fromDate}
toDate={toDate}
patientsCount={patientsCount}
            />


    </div> );
}
 
export default PrinterOperationsTable;