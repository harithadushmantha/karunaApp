import React, { Component } from 'react';
import { getOperations } from '../../../Services/operationService';
import queryString from 'query-string';
import PrinterOperationsTable from './MuiDataTable/PrinterOperationsTable';


const ids = ['1']
class PrintAllOperations extends Component {state = { 
    operations:[],
    currentPage:1,
    patientsCount:'',
    dates:{},
    loading:true
    
 }
 async demoAsyncCall() {
 
     
     const {data} = await getOperations("","");
     
     const operations = data.content;
     const patientsCount = data.total;
     this.setState({operations});

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
        if(loading) return ( <div id="app" class="loader"></div>)
        return ( 
            
            <div>  
                
                <a href = {`/view-operations?page=${1}&pageSize=${8}&fromDate=undefined&toDate=undefined`}><button className="btn btn-secondary backButton" style={{margin:"3px"}}> 
               Back to Table
            </button></a>
<div style={{height:"538px",width:"970px",overflow:"auto",border:"1px"}}>

 <PrinterOperationsTable
operationses={this.state.operations}
fromDate={dates.fromDate}
toDate={dates.toDate}
patientsCount={patientsCount}
/> 



</div>
           </div>

         );
    }
}
 
export default PrintAllOperations;