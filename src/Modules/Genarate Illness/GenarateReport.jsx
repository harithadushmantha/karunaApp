import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { getVisualAccuracy } from '../../Services/fakeVisualAccuracy';
import { getDoctors } from '../../Services/doctorsService';
import Error from '../../Shared/error';
import { saveIllness } from '../../Services/illnessesService';
import { SetCurrentPage, SetNavigationLink } from '../../store/action/navigation';

import './style.css';
import '../Base/topnavigation/custom.css';

const validationSchema = Yup.object().shape({

  visualAccuracyLeftId: Yup.string().required('* Visual Accuracy Left is required!'),
  visualAccuracyRightId: Yup.string().required('* Visual Accuracy Right is required!'),
  doctorsId: Yup.string().required('* Exemined By is required!'),
  ipd: Yup.string().min(1, '* IPD must have at leaster 1 characters!').max(6, "* IPD cant't be longer than 6 characters!").required('* IPD is required!').trim(),
  reflectiveErrorType: Yup.string().min(2, '* Reflective error type must at 2 characters!').max(20, "* Reflective error type can't be longer than 20 characters!").required('* Reflective Error Type is required!').trim(),
  iop: Yup.string().min(1, '* IOP must have at leaster 1 characters!').max(6, "* IOP cant't be longer than 6 characters!").required('* IOP is required!').trim(),
  hypertension: Yup.string().min(1, '* Hypertension must have at leaster 1 characters!').max(6, "* Hypertension cant't be longer than 6 characters!").required('Hypertension is required!').trim(),

})

const GenerateReport = ({ match, location }) => {
  const dispatch = useDispatch();
  dispatch(SetCurrentPage("Home/>Registered Patients Table/Report"));
  dispatch(SetNavigationLink(`/add-report?page=${1}&pageSize=${8}&fromDate=undefined&toDate=undefined`))
  const [visualAccuracy, setVisualAccuracy] = useState([{}]);
  const [doctors, setDoctors] = useState([{}]);

  const [personName, setPersonName] = useState(null);
  const [personPhone, setPersonPhone] = useState(null);
  const [personId, setPersonId] = useState(null);


  useEffect(() => {
    const visualAccuracy = getVisualAccuracy();
    setVisualAccuracy(visualAccuracy);

    const getDoctorsList = async () => {
      const { data } = await getDoctors();
      const doctors = data;
      setDoctors(doctors);
    };
    const getPatient = async () => {
      const patientId = match.params.id;
      setPersonId(patientId);
      const queryData = queryString.parse(location.search);
      setPersonName(queryData.name);
      setPersonPhone(queryData.phone);
    };
    getPatient();
    getDoctorsList();
    return null;
  }, []);

  return (
    <Formik
      initialValues={{
        visualAccuracyLeftId: '',
        visualAccuracyRightId: '',
        ipd: '',
        catractLeft: false,
        catractRight: false,
        reflectiveErrorType: '',
        iop: '',
        glaucoma: false,
        sprint: false,
        diabetics: false,
        oneEye: false,
        cardiac: false,
        hypertension: '',
        doctorsId: ''
      }}
      validationSchema={validationSchema}

      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
          await saveIllness(personId, { values });
          toast.success("Successfuly Added New Report ");
          window.location.replace("/");

        } catch (error) {
          toast.warn("An unexpected error occured");
            window.location.reload();
          // axios.interceptors.response.use(null, error => {
          //   const expectedex = error.response &&
          //     error.response.status >= 400 &&
          //     error.response.status <= 500
          //   if (!expectedex) {

          //     toast.warn("An unexpected error occured");

          //   }
          // });
        }


      }
      }
    >
      {({
        values, touched, handleChange, handleSubmit, handleBlur, errors, resetForm, isValid, isSubmitting
      }) => (
          <div>

            <br />

            <h2 className="mainTopicIllness" style={{color: "rgb(39, 38, 38)",
  fontWeight: "300",
  textShadow:" 2px 2px 2px rgb(189, 185, 185)",
  textAlign: "center",
  marginLeft: "-80px"}}>Illness Report Form</h2>
            <hr className="line" />
            <div className="clearfix"></div>
            <div className="space"></div>
            <form data-parsley-validate className="form-horizontal form-label-left" onSubmit={handleSubmit} onReset={resetForm}>
              <div className="row">
                <div className="col-md-6 ">
                  <label className="col-form-label inputLabel" >Name </label>
                  <div className="col-md-10 input1">
                    <input
                      className="form-control"
                      data-validate-length-range="10"
                      data-validate-words="10"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={personName}
                      placeholder="Name"
                      required="required"
                      disabled
                      style={{ backgroundColor: "white" }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="col-form-label  label-align inputLabel2 ">Telephone </label>
                  <div className="col-md-10 input2 ">
                    <input
                      className="form-control"
                      type="text"
                      name="phone"
                      required='required'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={personPhone}
                      placeholder="Phone Number"
                      required="required"
                      style={{ backgroundColor: "white" }}
                      disabled
                      data-validate-length-range="8,20" />
                  </div>
                </div>
              </div>

              <br />
              <div className="row">
                <div className="col-md-6">
                  <label className="col-form-label label-align dropdownLabel1">Visual Accuracy Left
                 </label>
                  <div className="col-md-10 visualAccL">
                    <select className="select2_single form-control"
                      required="required"
                      tabindex="-1"
                      className="form-control"
                      name="visualAccuracyLeftId"
                      value={values.visualAccuracyLeftId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">- Select Visual Accuracy Left-</option>
                      {visualAccuracy.map(v => (<option value={v.name}>{v.name}</option>))}
                    </select>
                    <Error touched={touched.visualAccuracyLeftId} message={errors.visualAccuracyLeftId} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="col-form-label  label-align dropdownLabel2 ">Visual Accuracy Right
                 </label>
                  <div className="col-md-10 visualAccR">
                    <select className="select2_single form-control"
                      tabindex="-1"
                      className="form-control"
                      name="visualAccuracyRightId"
                      value={values.visualAccuracyRightId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required="required"
                    >
                      <option value="">-Select Visual Accuracy Right-</option>
                      {visualAccuracy.map(v => (<option value={v.name}>{v.name}</option>))}
                    </select>
                    <Error touched={touched.visualAccuracyRightId} message={errors.visualAccuracyRightId} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="col-form-label  label-align IPDLabel">IPD
                </label>
                  <div className="col-md-10 IPDinput">
                    <input className="form-control"
                      data-validate-length-range="8"
                      data-validate-words="5"
                      type="text"
                      name="ipd"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ipd}
                      autoComplete="off"
                      placeholder="IPD" required="required" />
                    <Error touched={touched.ipd} message={errors.ipd} />
                  </div>
                  <p className="Ptag2">mm Hg</p>
                </div>
                <div className="col-md-6">
                  <label className="col-form-label  label-align inputRefLabel">Reflective Error Type
                </label>
                  <div className="col-md-10 inputRef">
                    <input className="form-control"
                      data-validate-length-range="15"
                      data-validate-words="15"
                      type="text"
                      name="reflectiveErrorType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reflectiveErrorType}
                      autoComplete="off"
                      placeholder="Reflective Error Type" required="required" />
                    <Error touched={touched.reflectiveErrorType} message={errors.reflectiveErrorType} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="col-form-label  label-align IOPLabel ">IOP
                  </label>
                  <div className="col-md-10 IOPinput">
                    <input className="form-control"
                      data-validate-length-range="15"
                      data-validate-words="15"
                      name="iop"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.iop}
                      placeholder="IOP"
                      autoComplete="off"
                      placeholder="IOP" required="required" />
                    <Error touched={touched.iop} message={errors.iop} />
                  </div>
                  <p className="Ptag">mm</p>
                </div>
                <div>
                </div>
                <div className="col-md-6">
                  <label className="col-form-label   label-align inputLabel3">Hypertension
                 </label>
                  <div className="col-md-10 hypertenInput">
                    <input className="form-control"
                      data-validate-length-range="15"
                      data-validate-words="15"
                      name="hypertension"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.hypertension}
                      autoComplete="off"
                      placeholder="Hypertension" required="required" />
                    <Error touched={touched.hypertension} message={errors.hypertension} />
                  </div>
                  <p className="Ptag3">mm Hg</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="col-form-label  label-align dropdownLabel3">Exemined By
                 </label>
                  <div className="col-md-10 ExainedBy">
                    <select className="select2_single form-control"
                      tabindex="-1"
                      name="doctorsId"
                      value={values.doctorsId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="off"
                    >
                      <option value="">-Select Exemined By-</option>
                      {doctors.map(d => (<option value={d._id}>{d.name}</option>))}
                    </select>
                    <Error touched={touched.doctorsId} message={errors.doctorsId} />
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="field item form-group cataractLabel">
                  <label className="col-form-label col-md-3 col-sm-3 label-align cataractLabel">Cataract
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 CataractLeft ">
                  <div className="form-group form-check">
                    <label className="form-check-label" >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="catractLeft"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.catractLeft}
                      />
                      Cataract Left</label>
                  </div>
                </div>
                <div className="col-md-5  CataractRight">
                  <div className="form-group form-check">
                    <label className="form-check-label" >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="catractRight"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.catractRight}
                      />
                      Cataract Right</label>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <label className="col-form-label col-md-3 col-sm-3 label-align illnesslabel">Additonal Illnesses
                  </label>
              </div>
              <br />
              <div className="col-md-2 Glaucoma ">
                <div className="form-group form-check">
                  <label className="form-check-label" >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="glaucoma"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.glaucoma}
                    />
                    Glaucoma</label>
                </div>
              </div>
              <div className="col-md-2 Sprint ">
                <div className="form-group form-check">
                  <label className="form-check-label" >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="sprint"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.sprint}
                    />
                    Squint</label>
                </div>
              </div>

              <div className="col-md-2 Diabetict">
                <div className="form-group form-check">
                  <label className="form-check-label" >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="diabetics"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.diabetics}
                    />
                    Diabetict</label>
                </div>
              </div>

              <div className="col-md-2  Cardiac">
                <div className="form-group form-check">
                  <label className="form-check-label" >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="cardiac"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cardiac}
                    />
                    Cardiac</label>
                </div>
              </div>

              <div className="col-md-2 OneEye">
                <div className="form-group form-check">
                  <label className="form-check-label" >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="oneEye"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.oneEye}
                    />
                    One Eye</label>
                </div>
              </div>

              <br />
              <br />

              {isSubmitting ? (<div id="cover-spin"></div>) : (
                <div className="form-group">
                  <div className="col-md-6 offset-md-3">

                    <button
                      type='submit'
                      className="btn btn-warning offset-md-3"
                      disabled={!isValid} style={{ backgroundColor: "rgb(238, 112, 9)" }}>
                      <p style={{ height: "9px", color: "white", fontWeight: "400" }}>Submit</p>
                    </button>
                    <button type='reset' className="btn btn-secondary">Reset</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
    </Formik>

  );
}

export default GenerateReport;