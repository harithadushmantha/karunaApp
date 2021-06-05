import React, {Component} from 'react';
import MUIDataTable from './MUIDataTable'




const PrintPatientTable = ({patients,fromDate,toDate,patientsCount}) => {

    const columns=[ 
        {  name:'name',label: 'Name' },
        {name:'_id', label: 'NIC No'},
        {name:'phone', label: 'Phone No' },
        {name:'district.name' ,label:'District'},
        {name:'registerDate', label: 'RegisterDate', content : patients => (
            patients.registerDate.substr(0,10)
        ) },
 
 ];
 
 
 
 
     return ( <div>
 
 <MUIDataTable
             title=""
             columns={columns}
             data={patients}
             fromDate={fromDate}
 toDate={toDate}
 patientsCount={patientsCount}
             />
 
 
     </div> );
 }
  
 export default PrintPatientTable;