import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getType } from '../../Services/fakeTitles';
import Error from "../../Shared/error";
import { getDistricts } from '../../Services/districtsService';
import { savePatient } from '../../Services/patientsService';
import { SetCurrentPage } from '../../store/action/navigation';

import './style.css';
import '../Base/topnavigation/custom.css';

const validationSchema = Yup.object().shape({
  type: Yup.string()
    .required("* Type is required!"),
  fullname: Yup.string()
    .required("* Full name is required!")
    .matches(/^[A-Za-z _]+$/, "* Full name is not valid!")
    .trim()
    .min(5, "* Full names must have at least 5 characters!")
    .max(30, "* Full names can't be longer than 30 characters!"),
  nicbox: Yup.string()
    .required("* NIC number is required!")
    .matches(/^[0-9]{9}[vVxX]$|[0-9]{12}$/, '* Must be a valid NIC number!')
    .max(12, "* NIC number can't be longer than 12 characters!")
    .trim(),
  dob: Yup.string()
    .required("* date of Birth day is required!"),
  gender: Yup.string()
    .required("Required"),
  phone: Yup.string()
    .required("* Phone number is required!")
    .matches(/^[0-9]{10}$/, '* Must be a valid phone numbre!')
    .trim(),
  district: Yup.string()
    .required("* District is required!")

})

const GeneratePatient = () => {
  const dispatch = useDispatch();
  dispatch(SetCurrentPage("Home/>Generate Patient"));

  const [districts, setDistricts] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const type = getType();
      setType(type);
      const { data: districts } = await getDistricts();
      setDistricts(districts);
    };
    getData();
  }, [])

  return (

    <div>

      <Formik
        initialValues={{
          type: "", fullname: "", nicbox: "", dob: "",
          gender: "", phone: "", district: ""
        }}
        validationSchema={validationSchema}

        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          try {

            await savePatient(values)

            toast.success("Successfuly Added New Patient ");
            window.location.replace("/");
          } catch (error) {
            console.log(error);
            toast.warn(error);
            //window.location.reload();
            // axios.interceptors.response.use(null, error => {
            //   const expectedex = error.response &&
            //     error.response.status >= 400 &&
            //     error.response.status <= 500
            //   if (!expectedex) {

            //   }});
         }}}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
          setFieldValue,
          isValid,
          isSubmitting
        }) => (

            <div class="col-md-12 col-sm-12 ">

              <div className="">
                <h2 className="mainTopicP">Genarate Patient</h2>
                <hr/>
                <ul className="nav navbar-right panel_toolbox">
                </ul>
                <div className="clearfix"></div>
              </div>
              <div className="x_content" />
              <br />
              <form data-parsley-validate className="form-horizontal form-label-left" onSubmit={handleSubmit} onReset={resetForm}>
                <div className="item form-group ">
                  <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Title
                        </label>
                  <div className="col-md-2 col-sm-2 ">
                    <select id="heard"
                      name="type"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      required
                    >
                      <option value={null}>Select type</option>
                      {type.map(t => (<option value={t.name}>{t.name}</option>))}
                    </select>
                  </div>
                  {errors.type && (<p className="radioCheck">{errors.type}</p>)}
                  <div className="error">

                  </div>

                </div>
                <div className="item form-group title">
                  <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Full Name
                        </label>
                  <div className="col-md-5 col-sm-5 ">
                    <input
                      className="form-control"
                      type="text"
                      name="fullname"
                      placeholder="Full name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      autoComplete="off"
                    /><Error touched={touched.fullname} message={errors.fullname} />
                  </div>

                </div>

                <div className="item form-group">
                  <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name">NIC Number
                        </label>
                  <div className="col-md-5 col-sm-5 ">

                    <input
                      className="form-control"
                      type="text"
                      name="nicbox"
                      placeholder="NIC number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      autoComplete="off"
                    /><Error touched={touched.nicbox} message={errors.nicbox} />
                  </div>

                </div>

                <div className="item form-group">
                  <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Phone Number</label>
                  <div className="col-md-5 col-sm-5 ">
                    <input className="form-control"
                      type="name"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                      autoComplete="off"
                    /><Error touched={touched.phone} message={errors.phone} />
                  </div>

                </div>

                <div className="item form-group gender">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">
                    Gender
                   </label>
                  <div class="col-md-6 col-sm-6 ">
                    <div class="radio">
                    </div>
                    <div class="radio">
                      <div className="form-check payment male" >
                        <input className="form-check-input"
                          type="radio"
                          name="gender"
                          value="male"
                          checked={values.gender === 'male'}
                          onChange={() => setFieldValue('gender', "male")}
                        />
                        <label className="gender">Male</label>
                      </div>

                    </div>

                    <div class="radio">

                      <div className="form-check payment female" >
                        <input className="form-check-input"
                          type="radio"
                          name="gender"
                          value="female"
                          checked={values.gender === 'female'}
                          onChange={() => setFieldValue('gender', "female")}
                        />
                        <label className="gender">Female</label>
                        {errors.gender && (<p className="radioCheck">{errors.gender}</p>)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="item form-group dob">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">Date Of Birth
                        </label>
                  <div className="col-md-5 col-sm-5 ">
                    <div className="form-group">
                      <div className='input-group date'>
                        <input className="form-control"
                          type="date"
                          name="dob"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.dob}
                          autoComplete="off"
                        />
                      </div><Error touched={touched.dob} message={errors.dob} />
                    </div>
                  </div>

                </div>
                <div className="item form-group district">
                  <label className="col-form-label col-md-3 col-sm-3 label-align">District
                        </label>
                  <div className="col-md-5 col-sm-5 ">

                    <select className="form-control"
                      type="text"
                      name="district"
                      placeholder="Full name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.district}
                      autoComplete="off"
                    >
                      <option>Select district</option>
                      {districts.map(d => (<option value={d._id}>{d.name}</option>))}
                    </select> <Error touched={touched.district} message={errors.district} />
                  </div>

                </div>
                <div className="ln_solid"></div>
                {isSubmitting ? (<div id="cover-spin"></div>) : (<div>
                  <div className="item form-group ">
                    <div className="col-md-5 col-sm-5 offset-md-3 ">
                      <button
                        type="submit"
                        className="btn btn-warning"
                        disabled={!isValid}
                        style={{ backgroundColor: "rgb(238, 112, 9)" }}
                      ><p style={{ height: "9px", color: "white", fontWeight: "400" }}>Submit</p>

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

export default GeneratePatient;