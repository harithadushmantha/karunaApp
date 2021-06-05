import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import queryString from 'query-string';

import { getOperation } from '../../Services/operationService';
import { getIllnessByPatientId } from '../../Services/illnessesService';
import { useDispatch } from 'react-redux';
import { SetCurrentPage, SetNavigationLink } from '../../store/action/navigation';

import './style.css';

const validationSchema = Yup.object().shape({
   name: Yup.string().required().label("Full Name"),
   gender: Yup.string().required().label("Gender"),
   type: Yup.string().required("Name is required"),
   dob: Yup.number().required().label("DOB"),
   phone: Yup.string().required().label("Phone Number"),
   nicbox: Yup.string().required().min(10).max(12).label("NIC Number"),
   years: Yup.number().required().label("Years"),
   district: Yup.string().required().label("Districts"),

});

const ViewPatient = ({ match, location }) => {
   const queryData = queryString.parse(location.search);

   const dispatch = useDispatch();
   dispatch(SetCurrentPage(`Home/>Registered Patients Table/>${queryData.name}`));
   dispatch(SetNavigationLink(`/view-patients?page=1&pageSize=8&fromDate=undefined&toDate=undefined`))
   const [personName, setPersonName] = useState(null);
   const [personID, setPersonID] = useState(null);
   const [personPhoneNumber, setPersonPhoneNumber] = useState(null);
   const [district, setdistrict] = useState(null);
   const [gender, setgender] = useState(null);
   const [dob, setdob] = useState(null);
   const [registerDate, setregisterDate] = useState(null);
   const [age, setAge] = useState(null);

   const [refError, setRefError] = useState(null);
   const [leftVisualAccuaracy, setLeftVisualAccuaracy] = useState(null);
   const [rightVisualAccuaracy, setRightVisualAccuaracy] = useState(null);

   const [eye, setEye] = useState(null);
   const [status, setStatus] = useState(null);

   useEffect(() => {
      const getPatient = async () => {

         const patientId = match.params.id;

         const birthDay = queryData.dob.substr(0, 10);
         var year = Number(birthDay.substr(0, 4));
         var month = Number(birthDay.substr(4, 2)) - 1;
         var day = Number(birthDay.substr(6, 2));
         var today = new Date();

         var age = today.getFullYear() - year;

         if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
            age--;
         }

         setPersonName(queryData.name);
         setPersonID(patientId);
         setPersonPhoneNumber(queryData.phone);
         setdistrict(queryData.district);
         setgender(queryData.gender);
         setdob(queryData.dob.substr(0, 10));
         setregisterDate(queryData.register_date.substr(0, 10));
         setAge(age);
      };

      const getAnOperation = async () => {
         const { data: Operation } = await getOperation(match.params.id);
         const OperationValue = { ...Operation[0] };
         setEye(OperationValue.eye);
         setStatus(OperationValue.status);
      };

      const getIllness = async () => {
         const { data: Illness } = await getIllnessByPatientId(match.params.id);
         const illnessValueOne = { ...Illness[0] }
         setRefError(illnessValueOne.reflectiveErrorType);
         setLeftVisualAccuaracy(illnessValueOne.leftVisualAccuaracy);
         setRightVisualAccuaracy(illnessValueOne.rightVisualAccuaracy);
      }

      getPatient();
      getAnOperation();
      getIllness();
      return null;

   }, [])


   return (
      <div>
         <Formik
            initialValues={{ name: '', nicbox: '', phone: '', district: '', gender: '', type: '', dob: '', registerDate: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
            }
            }
         >
            {({
               values, touched, handleChange, handleSubmit, handleBlur, errors
            }) => (

                  <div className="col-md-12 col-sm-12 ">
                     <div className="">
                        <h2 className="mainTopicI" style={{color: "rgb(39, 38, 38)",
  fontWeight: "300",
  textShadow:" 2px 2px 2px rgb(189, 185, 185)",
  textAlign: "center",
  marginLeft: "-80px"}}>  View Patient</h2>
<hr/>
                        <div className="clearfix"></div>
                     </div>

                     <br />
                     {/* <form id="demo-form2" data-parsley-validate className="form-horizontal form-label-left"> */}
                     <form onSubmit={handleSubmit}>

                        <div className="item form-group">
                           <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Full Name</label>
                           <div className="col-md-4 col-sm-4 ">
                              <input type="text"
                                 name="personName"
                                 className="form-control"
                                 disabled="disabled"
                                 placeholder="Full Name"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={personName}
                                 style={{ backgroundColor: "white" }}
                              />
                           </div>
                        </div>

                        <div className="item form-group">
                           <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">NIC Number</label>
                           <div className="col-md-4 col-sm-4 ">
                              <input
                                 type="personID"
                                 name="personName"
                                 className="form-control"
                                 disabled="disabled"
                                 placeholder="NIC Number"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={personID}
                                 style={{ backgroundColor: "white" }} />
                           </div>
                        </div>

                        <div className="item form-group">
                           <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Phone Number</label>
                           <div className="col-md-4 col-sm-4 ">
                              <input
                                 type="text"
                                 name="personPhoneNumber"
                                 className="form-control"
                                 disabled="disabled"
                                 placeholder="Phone Number"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={personPhoneNumber}
                                 style={{ backgroundColor: "white" }} />
                           </div>
                        </div>   
                        <div className="item form-group">
                           <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Age</label>
                           <div className="col-md-4 col-sm-4 ">
                              <input type="text"
                                 name="age"
                                 className="form-control"
                                 disabled="disabled"
                                 placeholder="Age"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={age}
                                 style={{ backgroundColor: "white" }}
                              />
                           </div>
                        </div>

                        <div className="item form-group">
                           <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">DOB</label>
                           <div className="col-md-4 col-sm-4 ">
                              <input type="text"
                                 name="dob"
                                 className="form-control"
                                 disabled="disabled"
                                 placeholder="DOB"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={dob} style={{ backgroundColor: "white" }}
                              />
                           </div>
                        </div>

                        <div className="item form-group">
                           <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Gender</label>
                           <div className="col-md-4 col-sm-4 ">
                              <input type="text"
                                 name="gender"
                                 className="form-control"
                                 disabled="disabled"
                                 placeholder="Gender"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={gender}
                                 style={{ backgroundColor: "white" }}
                              />
                           </div>
                        </div>

                        <div className="item form-group">
                           <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">District</label>
                           <div className="col-md-4 col-sm-4 ">
                              <input
                                 type="text"
                                 name="district"
                                 className="form-control"
                                 disabled="disabled"
                                 placeholder="District"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={district}
                                 style={{ backgroundColor: "white" }} />
                           </div>
                        </div>


                        <div className="item form-group">
                           <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Registered Date</label>
                           <div className="col-md-4 col-sm-4 ">
                              <input
                                 type="text"
                                 name="registerDate"
                                 className="form-control"
                                 disabled="disabled"
                                 placeholder="Registered Date"
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={registerDate}
                                 style={{ backgroundColor: "white" }} />
                           </div>
                        </div>
                     </form>
                     <div className="x_title ">
                        <h4 className="tableTitle mainTopicI">Illness table</h4>
                        <ul className="nav navbar-right panel_toolbox">
                        </ul>
                        <div className="clearfix"></div>
                     </div>
                     <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                           <table className="table table-bordered">
                              <thead className="thead-secondary">
                                 <tr>
                                    <th scope="col">Reflective Error Type</th>
                                    <th scope="col">Left Visual Accuaracy</th>
                                    <th scope="col">Right Visual Accuaracy</th>
                                    <th scope="col">Operation Eye </th>
                                    <th scope="col">status </th>
                                 </tr>
                              </thead>
                              <tr>
                                 <td>{refError}</td>
                                 <td>{leftVisualAccuaracy}</td>
                                 <td>{rightVisualAccuaracy}</td>
                                 <td>{eye}</td>
                                 <td>{status}</td>
                              </tr>
                           </table>
                        </div><div className="col-md-1"></div>
                     </div>
                  </div>
               )}
         </Formik>
      </div>
   );
}

export default ViewPatient;