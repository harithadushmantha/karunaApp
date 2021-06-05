import React from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import EyeLogo from './Image/karunaTrust.jpg';
import { toast } from 'react-toastify';
import axios from 'axios';

import Error from './Error';
import auth from '../../Services/authService/authService';

import './CSS/animate.min.css';
import './CSS/bootstrap.min.css';
import './CSS/custom.min.css';
import './CSS/nprogress.css';



const validationSchema = Yup.object().shape({

  email: Yup.string()
    .email("Email must be a valid")
    .required("*Required filled"),
  password: Yup.string()
    .required("*Required filled")
    .max(15, "Password should be less than 15")
    .min(5, "Password should be more than 5")
})

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}

      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        try {
          await auth.login(values.email, values.password);
          window.location = '/';
          toast.info("Welcome - Kuruna Trust Eye Care Center")
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
              toast.warn("Not Found")
            }
            if (ex.response && ex.response.status === 400) {
              toast.error("Your Username or Password is wrong");
              resetForm();
            }else
            toast.error(ex.message);
        
          // axios.interceptors.response.use(null, error => {
          //   const expectedex = error.response &&
          //     error.response.status >= 400 &&
          //     error.response.status <= 500
          //   if (!expectedex) {
          //     toast.warn("An unexpected error occured");
          //   }
          //   return Promise.reject(error);

          
        }
      }}

    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        isSubmitting,
        setFieldValue,
        isValid
      }) => (

          <div>
            <div >

              <script src="./js/jquery.min.js"></script>
              <script src="./js/bootstrap.bundle.min.js"></script>
              <script src="./js/fastclick.js"></script>
              <script src="./js/nprogress.js"></script>

              <a className="hiddenanchor" id="signup"></a>
              <a className="hiddenanchor" id="signin"></a>

              <div className="login_wrapper" >
                <div className="animate form login_form">
                  <section className="login_content">
                    <form onSubmit={handleSubmit}>
                      <h1 className="grayout" >Login</h1>
                      <div>
                        <input type="text"
                          className="form-control"
                          placeholder="Username"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          style={{ fontSize: "14px" }}
                        />
                        <Error touched={touched.email} message={errors.email} />
                      </div>
                      <div>
                        <input type="password" className="form-control" placeholder="Password" data-validate-length-range="5,15" name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          style={{ fontSize: "14px" }} />
                        <Error touched={touched.password} message={errors.password} />
                      </div>
                      {isValid && <hr style={{ marginTop: "31px" }}></hr>}
                      <div>
                        <button disabled={!isValid} type="submit" style={{ backgroundColor: "white", color: "rgb(108, 109, 108)" }} className="btn btn-secondary submit" disabled={!isValid} >Log in</button>
                      </div>
                      <div className="separator">
                        <div className="clearfix"></div>
                        <br />
                        <div>
                          <h1 className="grayout" style={{ fontSize: "20px" }}>
                            <img src={EyeLogo} alt="jjjj" width="40px" height="40px"></img> Karuna Trust Eye Care</h1>
                          <p className="grayout">©2020 All Rights Reserved - Privacy and Terms</p>
                        </div>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
    </Formik>
  );
}
export default LoginForm;








