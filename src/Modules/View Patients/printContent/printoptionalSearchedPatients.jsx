import React, { Component } from 'react';
import queryString from 'query-string';
import { getPatientViaOptions } from '../../../Services/patientsService';
import PrintPatientTable from '../printContent/MuiDataTable/PrinterPatientsTable'

class PrintSearchedPatients extends Component {
    state = { 
        patients:[],
        currentPage:1,
        patientsCount:'',
        dates:{},
        loading :true
     }
     async demoAsyncCall() {
        const dates = queryString.parse(this.props.location.search);
        const page = dates.page;
        this.setState({dates});
        const {data} = await getPatientViaOptions(dates.startdate,dates.enddate,page,"");
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
        const {dates} = this.state;

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
 
export default PrintSearchedPatients;