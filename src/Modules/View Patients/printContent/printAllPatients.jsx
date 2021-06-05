import React, { Component } from 'react';
import queryString from 'query-string';
import { getPatients } from '../../../Services/patientsService';
import PrintPatientTable from './MuiDataTable/PrinterPatientsTable'
//import PatientTable from '../../Shared/PatientTable';
//import Pagination from '../../Shared/pagination';
//import PrintPatientTable from './printPatientTable';
//import Printer, { print } from 'react-pdf-print';
//import karunaTrust from '../ViewOperations/Image/karunaTrust.jpg';

const ids = ['1']

class PrintAllPatients extends Component {
    state = { 
        patients:[],
        currentPage:1,
        patientsCount:'',
        dates:{},
        loading :true
     }
     async demoAsyncCall() {
       
        const {data} = await getPatients();
        const patients = data.content;
        const patientsCount = data.total;
        
        this.setState({patients});
        
        this.setState({patientsCount});
    }
    componentDidMount() {
        this.demoAsyncCall().then(() => this.setState({ loading: false }));
    }
    handlePageChange = async (page) =>
    {
        this.setState({currentPage:page});
        
    };
    render() { 
        const {patientsCount,currentPage,dates,loading} = this.state;
        // if(loading) return (<div id="app" class="loader"></div>)
        return ( 
        
            <div> 
                <a href = {`/view-patients?page=${1}&pageSize=${8}&fromDate=undefined&toDate=undefined`}><button style={{margin:"3px"}} className="btn btn-secondary backButton"> 
               Back to Table
            </button></a>
                <div style={{height:"538px",width:"970px",overflow:"auto",border:"1px"}}>
              <PrintPatientTable
patients={this.state.patients}
fromDate={dates.startdate}
toDate={dates.enddate}
patientsCount={this.state.patientsCount}
/>   

</div>  

           </div>

         );
    }
}
 
export default PrintAllPatients;