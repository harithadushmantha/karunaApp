import React, { Component } from 'react';
import { getOperationsViaOptions } from '../../../Services/operationService';
import queryString from 'query-string';
import PrinterOperationsTable from './MuiDataTable/PrinterOperationsTable';








const ids = ['1']
class PrintSearchedOperations extends Component {state = { 
    operations:[],
    currentPage:1,
    patientsCount:'',
    dates:{},
    loading:true
    
 }

 async demoAsyncCall() {
    const dates = queryString.parse(this.props.location.search);
    
     const page = dates.page;
     const payType = dates.payType;
     this.setState({dates});
     
     const {data} = await getOperationsViaOptions(dates.fromDate,dates.toDate,payType,page);
     
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
                
                <a href = {`/view-operations?page=${1}&pageSize=${8}&fromDate=undefined&toDate=undefined`}><button  style={{margin:"3px"}} className="btn btn-secondary backButton"> 
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
 
export default PrintSearchedOperations;