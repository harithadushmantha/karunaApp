import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import {register} from '../../Services/userService';
import Error from "../../Shared/error";

import '../Genarate User/user.css';
import '../Auth/CSS/custom.min.css';

const validationSchema = Yup.object().shape({

  username: Yup.string()
  .required(" User Name is Required")
  .email("Enter valid username")
  
  .trim(),
  password: Yup.string()
  .required("Password is Required")
  .max(15,"Maximum limit reached")
  .min(5," Minimum lenght is 5")
  .trim(),
  name: Yup.string()
  .required("Name is Required")
  .matches(/^[A-Za-z _]+$/, "Not valid")
  .min(5, "Min lenght is 5")
  .max(8, "Max lenght is 8")
  .trim(),
  })
  
const GenarateUser = () => {
    return ( 
         <div>
             
            <Formik
             initialValues={{ username:"", password:"", name:"" }}
             validationSchema={validationSchema}
             
             onSubmit={async (values, { setSubmitting,resetForm }) => {
             setSubmitting(true);
             await register(values);
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
                           <h2 className="mainTopicP "  style={{color: "rgb(39, 38, 38)",
  fontWeight: "300",
  textShadow:" 2px 2px 2px rgb(189, 185, 185)",
  textAlign: "center",
  marginLeft: "-80px"}}>Genarate User</h2>
  <hr/>
                            <ul className="nav navbar-right panel_toolbox"></ul>
                             <div className="clearfix"></div>
                          </div>
                           <br/>
                    <form  data-parsley-validate className="form-horizontal form-label-left" onSubmit={handleSubmit} onReset={resetForm}>
                    <div className="item form-group title">
                       <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Username </label>    
                         <div className="col-md-5 col-sm-5 ">
                              <input className ="form-control" 
                               type="email"
                               name="username"
                               placeholder="Email"
                               value = {values.username}
                               onChange={handleChange}
                               onBlur={handleBlur}
                              ></input>
                              <Error touched={touched.username} message={errors.username} />
                            </div>
                           </div>

                         <div className="item form-group title">
                            <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name"> Password </label>    
                             <div className="col-md-5 col-sm-5 ">
                              <input className ="form-control" 
                               type="password"
                               name="password"
                               placeholder="Password"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.password}
                             ></input><Error touched={touched.password} message={errors.password} />
                             </div>
                           </div>

                        <div className="item form-group title">
                          <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Name</label>    
                             <div className="col-md-5 col-sm-5 ">
                               <input className ="form-control" 
                               type="text"
                               name="name"
                               placeholder="Name"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value ={values.name}
                             ></input><Error touched={touched.name} message={errors.name} />
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
                  </form>
                 
                  </div>   
                
                  )}
            </Formik>
           </div>
    );
}
 
export default GenarateUser;

