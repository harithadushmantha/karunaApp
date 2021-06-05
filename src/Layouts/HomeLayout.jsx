import React from 'react';
import { Switch } from 'react-router-dom';
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DvrIcon from '@material-ui/icons/Dvr';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import DescriptionIcon from '@material-ui/icons/Description';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Sidebar from "../Modules/Base/sidemenu/Sidebar";
import NavBar from '../Modules/Base/topnavigation/Nav';
import ProtectedRoute from '../Shared/ProtectedRoute';
import GeneratePatient from '../Modules/Genarate Patient/generatePatient';
import HomePage from '../Modules/HomePage/HomePage';
import MarkPostOps from '../Modules/Mark Post Ops/MarkPostOps';
import GenerateReport from '../Modules/Genarate Illness/GenarateReport';
import ViewPatients from '../Modules/View Patients/viewPatients';
import ViewOperations from '../Modules/View Operations/ViewOperation';
import ViewReports from '../Modules/View Reports/ViewReports';
import PatientTableForEnterReports from '../Modules/Genarate Illness/PatientsTableForEnterReports';
import PatientTableForEnterOperations from '../Modules/Genarate Operation/PatientsTableForEnterOperationDetails';
import GenarateOperation from '../Modules/Genarate Operation/genarateOperation';
import PatientsTable from '../Modules/View Patients/PatientsTable';
import OperationDataTable from '../Modules/View Operations/OperationDataTable';
import PatientsTableForViewReports from '../Modules/View Reports/PatientsTableForReports';
import PrintSearchedOperations from '../Modules/View Operations/printContent/printoptionalSearchedOperations';
import PrintSearchedPatients from '../Modules/View Patients/printContent/printoptionalSearchedPatients';
import PrintIllnessReport from '../Modules/View Reports/printIllnessReport';
import GenarateUser from '../Modules/Genarate User/GenarateUser';
import GenarateDocter from '../Modules/Genarate Docter/GenarateDocter';
import GenarateHospital from '../Modules/Genarate Hospital/GenarateHospital';
import PrintAllPatients  from '../Modules/View Patients/printContent/printAllPatients';
import PrintAllOperations from '../Modules/View Operations/printContent/printALlOperations';

const HomeLayout = () => {
    
    const onClick = (e,item) => {
           
    }
    const items = [
        { name: "home", label: "Home", Icon: HomeIcon, link: "/"},
        { name: "generatepatient", label: "Generate Patient", Icon: GroupAddIcon, onClick,link: `/add-patient` },
        { name: "generateoperation", label: "Generate Operation", Icon: DvrIcon,onClick, link: `/add-operation?page=${1}&pageSize=${8}&fromDate=undefined&toDate=undefined` },
        { name: "updatepostops", label: "Update PostOps", Icon: QueuePlayNextIcon, link: `/update-postops?status=undifined&page=${1}&pageSize=${8}` },
        { name: "generatereport", label: "Generate Report", Icon: DescriptionIcon, link: `/add-report?page=${1}&pageSize=${8}&fromDate=undefined&toDate=undefined` },
        {
            name: "viewdetails",
            label: "View Details",
            Icon: ReceiptIcon,
            onClick,
            items: [
                { name: "viewpatients", label: "View Patients", onClick, link: `/view-patients?page=${1}&pageSize=${8}&fromDate=undefined&toDate=undefined` },
                { name: "viewoperations", label: "View Operations", onClick, link: `/view-operations?page=${1}&pageSize=${8}` },
                { name: "viewreports", label: "View Reports", onClick, link: `/view-reports?page=${1}&pageSize=${8}` }
            ]
        }
    ];
    return (
        <div style = {{overflowX:"hidden",overflowY:"hidden"}}>
        <div className="row" >
            <div className="col-md-3">
                <Sidebar items={items} />
            </div>
            <div className="col-md-9">
                <NavBar />
                <Switch>
                    <ProtectedRoute path="/" exact component={HomePage} />
                    <ProtectedRoute path="/add-patient" component={GeneratePatient} />
                    <ProtectedRoute path="/add-operation" component={PatientTableForEnterOperations} />
                    <ProtectedRoute path="/update-postops" component={MarkPostOps} />
                    <ProtectedRoute path="/add-report" component={PatientTableForEnterReports} />
                    <ProtectedRoute path ="/view-patients" component = {PatientsTable}/>
                    <ProtectedRoute path ="/view-operations" component = {OperationDataTable}/>
                    <ProtectedRoute path ="/view-reports" component = {PatientsTableForViewReports}/>

                    <ProtectedRoute path ="/register-user" component ={GenarateUser}/>
                    <ProtectedRoute path ="/register-doctor" component = {GenarateDocter}/>
                    <ProtectedRoute path ="/register-hospital" component ={GenarateHospital}/>

                    <ProtectedRoute path ="/set-details/:id" component = {GenerateReport}/>
                    <ProtectedRoute path ="/enter-operation/:id" component = {GenarateOperation}/>
                    <ProtectedRoute path ="/view-single-patient/:id" component = {ViewPatients}/>
                    <ProtectedRoute path ="/view-single-operation/:id" component = {ViewOperations}/>
                    <ProtectedRoute path ="/view-single-report/:id" component = {ViewReports}/>
                    <ProtectedRoute path ="/printoperations" component = {PrintSearchedOperations}/>
                    <ProtectedRoute path ="/printpatients" component = {PrintSearchedPatients}/>
                    <ProtectedRoute path ="/reportDetailsPrinting/:id" component = {PrintIllnessReport}/>
                    <ProtectedRoute path ="/printallpatients" component = {PrintAllPatients}/>
                    <ProtectedRoute path ="/printAlloperations" component = {PrintAllOperations}/>
                </Switch>
            </div>
        </div>
        <div className = "row" style = {{backgroundColor:"#2A3F54", height:100}}>

        </div>
        </div>
    );
}

export default HomeLayout;