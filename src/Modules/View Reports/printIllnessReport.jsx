import React, { Component,useState,useEffect,useRef} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
//import '../IllnessDetails/style.css';
//import {getPatients} from '../../../services/patientsService';
import {getIllnesses} from '../../Services/illnessesService';
import Printer, { print } from 'react-pdf-print';
import ReactToPrint from 'react-to-print';
import './style.css';
import karunaTrust from '../View Patients/printContent/Image/karunaTrust.jpg';
import queryString from 'query-string';
import PrintIcon from '@material-ui/icons/Print';



const ids = ['1']
const validationSchema = Yup.object().shape({
     name :Yup.string().required('Name is required'),
     phone :Yup.string().required('Phone Number is required'),
     visualAccuracyLeftId        : Yup.string().required('Left is required'),
     visualAccuracyRightId      : Yup.string().required('Right is required'),
     iodLeft                   : Yup.string().required('IOD Left is required'),
     iodRight                  : Yup.string().required('IOD Right is required'), 
    // doctorsId               : Yup.string().required('Exemined By is required'),

     reflectiveErrorType : Yup.string().required('Reflective Error Type is required'),
     iop                 : Yup.string().required('IOP is required'),     
     hypertension        : Yup.string().required('Hypertension is required'),

});

const PrintIllnessReport = ({match,location}) => {

       const [personName,setPersonName] = useState(null);
       const [personID,setPersonID] = useState(null);
       const [doctorName,setdoctorName] = useState(null);
       const [reflectiveErrorType,setreflectiveErrorType] = useState(null);
       const [illnessIPD,setIllnessIPD] = useState(null);
       const [sprint,setsprint] = useState(null);
       const [diabetics,setdiabetics] = useState(null);
       const [cardiac,setcardiac] = useState(null);
       const [oneEye,setoneEye] = useState(null);
       const [IOP,setIOP] = useState(null);
       const [hypertension,sethypertension] = useState(null);
       const [leftVisualAccuaracy,setleftVisualAccuaracy] = useState(null);
       const [leftCatract,setleftCatract] = useState(null);
       const [rightVisualAccuaracy,setrightVisualAccuaracy] = useState(null);
       const [rightCatract,setrightCatract] = useState(null);
       const [glaucoma,setglaucoma] = useState(null);
       const [age,setAge] = useState(null);
       

       useEffect(()=>{
              
              const getillness = async () => {
                    const queryData = queryString.parse(location.search)
                     
                    setIllnessIPD(queryData.ipd);
                    if(queryData.glaucoma=="Yes" ) {setglaucoma(" √ ")}
                    else {setglaucoma(" x ")}

                    setreflectiveErrorType(queryData.ref_error);
                    if (queryData.sprint=="Yes") {setsprint(" √ ")} 
                    else {setsprint(" x ");}

                    if (queryData.diabetics=="Yes") {setdiabetics(" √ ")} 
                    else {setdiabetics(" x ")}
                    ;
                    if (queryData.cardiac== "Yes") {setcardiac(" √ ")}
                    else {setcardiac(" x ")}
                    ;
                    if (queryData.oneEye== "Yes")  {setoneEye(" √ ")} 
                    else {setoneEye(" x ")}
                    ;
                    setIOP(queryData.iop);
                    sethypertension(queryData.hypertension);
                    setleftVisualAccuaracy(queryData.l_v_accuaracy);
                    
                    if (queryData.l_catract=="Yes") {setleftCatract(" √ ")}
                    else {setleftCatract(" -- ")};

                    setrightVisualAccuaracy(queryData.r_v_accuaracy);
                    if (queryData.r_catract=="Yes") {setrightCatract(" √ ")}
                    else {setrightCatract(" -- ")};
       
                    setPersonName(queryData.name)
                    setPersonID(queryData.patient_id)
                    setdoctorName(queryData.doctor)
                    setAge(queryData.age)
              };
              getillness();
             
              return null;
       },
       
       [])
    

     return ( 
      
      <div class="card border-secondary mb-12">
      <div class="card-body">
          <Formik
          initialValues = {{name:'',phone:'',visualAccuracyLeftId:'',visualAccuracyRightId:'',iodLeft:'',iodRight:'',
                       catractLeft:'',catractright:'',reflectiveErrorType:'',iop:'',glaucoma: '', sprint:'', diabetics:'',
                       oneEye:'',cardiac:'',hypertension:'',doctorsId:''}}

           validationSchema={validationSchema}
       
          >  

          {({
           values,touched,handleChange,handleSubmit,handleBlur,errors
          })=>(
            <div>      

            <form  onSubmit = {handleSubmit}  >  
            
            <button type='button' style={{ position: 'relative', float: 'right' }}
                   onClick={() => print(ids)} value='Print Report' className="btn btn-warning"><PrintIcon/></button>
            
            <div className='App'>
                    <Printer>
            
            <div id={ids[0]} style={{width:'210mm', height: '297mm'}}>
                           
                          
            
            <div style={{display:"flex" , flexDirection:"row", justifyContent:"center",alignItems:"center", marginLeft:"5em"}}>
                                                                        
                                                                           
                </div>
            <div style={{margin:"20px"}}>
            <img src={karunaTrust}  alt="Image" width="130px" height="130px"/>
            <h6>Karuna Community Eye Care Center</h6> <p >110/1/1, Dehiwala Road, Maharagama, Sri Lanka.  Phone: +94 77 2914060</p>
               
            <hr style={{borderTop:"3px solid black"}}/>                                            
            </div>
            <div className = " form-group">
            
            
            <h5  style={{textAlign:"center"}}> View illness Details </h5>
                  
            <ol>
            <table border="2" style={{marginLeft:"52px"}}> 
                <tbody>
            
            <tr> 
                <td><li className="tableTopicAlign">Name:-</li> </td>
             <td colSpan="2">     
            <input 
            className = "form-control textAlign"
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={personName}
            />
            </td> 
            </tr>
            
            <tr> 
            <td><li className="tableTopicAlign">NIC_No:-</li> </td>
             <td colSpan="2">     
             <input 
            className = "form-control textAlign"
            type="text"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={personID}
            />
            </td>
            
            </tr>
            

            <tr>
<td> <li className="tableTopicAlign">Age:-</li> </td>
<td><input 
            className = "form-control textAlign"
            type="text"
            name="age"
            onChange={handleChange}
            onBlur={handleBlur}
            value={age}
            /></td>
<td></td>
            </tr>
            
            <tr>
            <td rowSpan="2"> <li className="tableTopicAlign">Visual_Accuracy</li>  </td>
            <td >Left </td>
            <td >Right </td>
            </tr>
            
            <tr>
            <td>
            <input
            className = "form-control textAlign"
            name="visualAccuracyLeftId"
            value={leftVisualAccuaracy}
            onChange={handleChange}
            onBlur={handleBlur}
            />    
              
            </td>
            <td>
            <input
            className = "form-control textAlign"
            name="visualAccuracyRightId"
            value={rightVisualAccuaracy}
            onChange={handleChange}
            onBlur={handleBlur}
            >     
            </input> 
            </td>
            
            
            </tr>
            
            <tr>
            <td rowSpan="2"><li  className="tableTopicAlign">Catract</li></td>
            
            <td>Left</td>
            <td>Right</td>
            </tr>
            
            
            <tr>
            <td><input 
            className = "form-control textAlign"
            type="text"
            name="catractLeft"
            onChange={handleChange}
            onBlur={handleBlur}
            value={leftCatract}
            /></td>
            <td><input 
            className = "form-control textAlign"
            type="text"
            name="catractRight"
            onChange={handleChange}
            onBlur={handleBlur}
            value={rightCatract}
            /></td>
            </tr>
            
            
            <tr>
            <td><li className="tableTopicAlign" >IPD:-</li></td>
            <td><input 
            className = "form-control textAlign"
            type="text"
            name="iodRight"
            onChange={handleChange}
            onBlur={handleBlur}
            value={illnessIPD}
            /></td>
            <td rowSpan="9"></td> 
            </tr>
            
            
            <tr>
            <td><li className="tableTopicAlign">Reflective_Error_Type:- </li>  </td>
            <td><input 
                className = "form-control textAlign"
                type="text"
                name="reflectiveErrorType"
                onChange={handleChange}
                onBlur={handleBlur}
                value={reflectiveErrorType}
                />
            </td>
            
            </tr>
            
            <tr>
            <td>  <li className="tableTopicAlign">IOP:-</li>    </td>
            <td><input 
                className = "form-control textAlign"
                type="text"
                name="iop"
                onChange={handleChange}
                onBlur={handleBlur}
                value={IOP}
                />
            </td>
                                
            </tr>
            
            
            <tr>
            <td><li className="tableTopicAlign">Glaucoma:- </li>  </td>
            <td>    <input 
                className = "form-control textAlign"
                type="text"
                name="iop"
                onChange={handleChange}
                onBlur={handleBlur}
                value={glaucoma}
                />
            </td>
            </tr>
            
            
            <tr>
            <td>  <li className="tableTopicAlign"> Squint:-  </li>    </td>
            <td><input 
                className = "form-control textAlign"
                type="text"
                name="sprint"
                onChange={handleChange}
                onBlur={handleBlur}
                value={sprint}
                />
            </td>
            </tr>
            
            
            <tr>
            <td><li className="tableTopicAlign"> Diabetics:-  </li>     </td>
            <td> <input 
                className = "form-control textAlign"
                type="text"
                name="diabetics"
                onChange={handleChange}
                onBlur={handleBlur}
                value={diabetics}
                />
            </td>
            </tr>
            
            
            <tr>
            <td> <li className="tableTopicAlign"> Cardiac:-  </li>    </td>
            <td><input 
                className = "form-control textAlign"
                type="text"
                name="cardiac"
                onChange={handleChange}
                onBlur={handleBlur}
                value={cardiac}
                />
            </td>
            </tr>
            
            <tr>
            <td> <li className="tableTopicAlign"> OneEye:-  </li>   </td>
            <td><input 
                className = "form-control textAlign"
                type="text"
                name="oneEye"
                onChange={handleChange}
                onBlur={handleBlur}
                value={oneEye}
                />
            </td>
            </tr>
            
            <tr>
            <td> <li className="tableTopicAlign">Hypertension:-</li>       </td>
            <td><input 
                className = "form-control textAlign"
                type="text"
                name="hypertension"
                onChange={handleChange}
                onBlur={handleBlur}
                value={hypertension}                       
                />
            </td>
            </tr>
            
            
            <tr>
            <td> <li className="tableTopicAlign">Examined_By:-</li>    </td>
            <td colSpan="2"><input 
                            className = "form-control textAlign"
                            type="text"
                            name="Exemined By"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={doctorName}
                            />
            </td>
            </tr>
            
             </tbody>
             </table>
            
            </ol>
                <textarea name="other"  cols="184" rows="5" placeholder="Add any other details ..." style={{marginLeft:"-18px",width:'590px'}}></textarea>
            
            </div>                                   
            </div>
                </Printer>
            
            </div>
            
            </form>
                
            
            </div>  
          )}           
          </Formik>
          </div>
          </div>
          
          
      );
}



  
  export default PrintIllnessReport; 
  