import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Error from '../../Shared/error';
import {postHospital} from '../../Services/hospitalService';

import '../Auth/CSS/custom.min.css';

const validationSchema = Yup.object().shape({

    hospitalname: Yup.string()
    .required(" Hospital Name is Required")
    .matches(/^[A-Za-z _]+$/, "Not valid")
    .trim(),
    
    hospitalPhonenumber: Yup.string()
    .required("Hospital Password is Required")
    .matches(/^[0-9]{10}$/,'Phone number Must be valid')
    .trim(),
    
    })
    

const GenarateHospital = () => {
    return ( 
         <div>

            <Formik
            initialValues={{ hospitalname:"", hospitalPhonenumber:""}}
            validationSchema={validationSchema}
            
            onSubmit={async (values, { setSubmitting,resetForm }) => {
            setSubmitting(true);
            await postHospital(values);
            resetForm();
           }}
            >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  resetForm,
                  isValid,
                  isSubmitting,touched,errors
                 }) => (

             <div  className="col-md-12 col-sm-12 ">
                
                    <div className="">
                           <h2 className="" style={{color: "rgb(39, 38, 38)",
  fontWeight: "300",
  textShadow:" 2px 2px 2px rgb(189, 185, 185)",
  textAlign: "center",
  marginLeft: "-80px"}}>Genarate Hospital</h2>
  <hr/>
                            <ul className="nav navbar-right panel_toolbox"> </ul>
                             <div className="clearfix"></div>
                          </div>

                 
                  <form data-parsley-validate className="form-horizontal form-label-left" onSubmit={handleSubmit} onReset={resetForm}>
                     <br/>
                     <div className="item form-group title">
                       <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Hospital Name </label>    
                         <div className="col-md-5 col-sm-5 ">
                                 <input className ="form-control" 
                                  type="text"
                                  name="hospitalname"
                                  placeholder="Hospital Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.hospitalname}
                                 ></input><Error touched={touched.hospitalname} message={errors.hospitalname} />
                                </div>
                             </div>

                           

                      <div className="item form-group title">
                        <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Phone Number </label>    
                          <div className="col-md-5 col-sm-5 ">
                                 <input className ="form-control" 
                                  type="text"
                                  name="hospitalPhonenumber"
                                  placeholder="Phone Number"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.hospitalPhonenumber}
                                 ></input><Error touched={touched.hospitalPhonenumber} message={errors.hospitalPhonenumber} />
                                </div>
                             </div>
                             {isSubmitting ? (<div id="cover-spin"></div>) : (<div>
                  <div className="item form-group ">
                    <div className="col-md-5 col-sm-5 offset-md-3 ">
                      <button
                        type="submit"
                        className="btn btn-warning"
                        disabled={!isValid}
                        style={{backgroundColor:"rgb(238, 112, 9)"}}
                      ><p style={{ height: "9px",color:"white", fontWeight: "400" }}>Submit</p>

                      </button>
                      <button className="btn btn-secondary buttn"
                        type="reset"
                      >
                        Reset
                      </button>

                    </div>
                  </div>
                </div>)}
                           
                                 
                      
                 
                   <div className="clearfix"></div>
                 
         
                 </form>
                 
                  </div>
                  )}
            </Formik>

           </div>



    );
}
 
export default GenarateHospital;

