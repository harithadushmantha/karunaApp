import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import { SetCurrentPage, SetNavigationLink } from '../../store/action/navigation';

import './style.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone Number is required'),
  visualAccuracyLeftId: Yup.string().required('Left is required'),
  visualAccuracyRightId: Yup.string().required('Right is required'),
  iodLeft: Yup.string().required('IOD Left is required'),
  iodRight: Yup.string().required('IOD Right is required'),
  reflectiveErrorType: Yup.string().required('Reflective Error Type is required'),
  iop: Yup.string().required('IOP is required'),
  hypertension: Yup.string().required('Hypertension is required'),

});

const ViewReports = ({ match, location }) => {
  const queryData = queryString.parse(location.search);
  const dispatch = useDispatch();
  dispatch(SetCurrentPage(`Home/>Registered Patients Table/>${queryData.name}`));
  dispatch(SetNavigationLink(`/view-reports?page=1&pageSize=8`))
  const [patients, setPatients] = useState(0);
  const [illnesss, setillnesss] = useState(0);
  const [illnessId, setIllnessId] = useState(0);
  const [personName, setPersonName] = useState(null);
  const [personID, setPersonID] = useState(null);
  const [doctorName, setdoctorName] = useState(null);
  const [reflectiveErrorType, setreflectiveErrorType] = useState(null);
  const [illnessIPD, setIllnessIPD] = useState(null);
  const [sprint, setsprint] = useState(null);
  const [diabetics, setdiabetics] = useState(null);
  const [cardiac, setcardiac] = useState(null);
  const [oneEye, setoneEye] = useState(null);
  const [IOP, setIOP] = useState(null);
  const [hypertension, sethypertension] = useState(null);
  const [leftVisualAccuaracy, setleftVisualAccuaracy] = useState(null);
  const [leftCatract, setleftCatract] = useState(null);
  const [rightVisualAccuaracy, setrightVisualAccuaracy] = useState(null);
  const [rightCatract, setrightCatract] = useState(null);
  const [glaucoma, setglaucoma] = useState(null);
  const [age, setAge] = useState(null);


  useEffect(() => {

    const getillness = async () => {

      const IllnessId = match.params.id;
      setIllnessId(IllnessId)
      setIllnessIPD(queryData.ipd);

      if (queryData.glaucoma == "true") { setglaucoma("Yes") }
      else { setglaucoma("No") }

      setreflectiveErrorType(queryData.ref_error);

      if (queryData.sprint == "true") { setsprint("Yes") }
      else { setsprint("No") };

      if (queryData.diabetics == "true") { setdiabetics("Yes") }
      else { setdiabetics("No") }

      if (queryData.cardiac == "true") { setcardiac("Yes") }
      else { setcardiac("No") }

      if (queryData.oneEye == "true") { setoneEye("Yes") }
      else { setoneEye("No") }
      ;
      setIOP(queryData.iop);
      sethypertension(queryData.hypertension);
      setleftVisualAccuaracy(queryData.l_v_accuaracy);

      if (queryData.l_catract == "true") { setleftCatract("Yes") }
      else { setleftCatract("No") };
      setrightVisualAccuaracy(queryData.r_v_accuaracy);
      if (queryData.r_catract == "true") { setrightCatract("Yes") }
      else { setrightCatract("No") };

      setPersonName(queryData.name)
      setPersonID(queryData.id)
      setdoctorName("dr. " + queryData.doctor)
      setAge(queryData.age)
    };
    getillness();

    return null;
  },

    [])
  return (
    <div>
      <Formik
        initialValues={{
          name: '', phone: '', visualAccuracyLeftId: '', visualAccuracyRightId: '', iodLeft: '', iodRight: '',
          catractLeft: '', catractright: '', reflectiveErrorType: '', iop: '', glaucoma: '', sprint: '', diabetics: '',
          oneEye: '', cardiac: '', hypertension: '', doctorsId: ''
        }}

        validationSchema={validationSchema}

      >

        {({ handleChange, handleSubmit, handleBlur
        }) => (

            <div class="col-md-12 col-sm-12 ">
              <div className="">
                <h2 className="" style={{
                  color: "rgb(39, 38, 38)",
                  fontWeight: "300",
                  textShadow: " 2px 2px 2px rgb(189, 185, 185)",
                  textAlign: "center",
                  marginLeft: "-80px"
                }}>View Illness Details</h2>
                <hr />


                <div className="clearfix"></div>
              </div>
              <div className="x_content" />
              <br />
              <form id="demo-form2" data-parsley-validate className="form-horizontal form-label-left" onSubmit={handleSubmit}>


                <div className="row">
                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  inputLabel">Name</label>
                    <div className="col-md-10 input1">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={personName}
                        style={{ backgroundColor: "white" }} />
                    </div>

                  </div>
                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  inputLabel2">Phone Number</label>
                    <div className="col-md-10 input2">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // value={phone}
                        style={{ backgroundColor: "white" }} />
                    </div>

                  </div>

                </div>
                <br />


                <div className="row">
                  <div className="col-md-6">

                    <label for="middle-name"
                      className="col-form-label  label-align dropdownLabel1"
                    >
                      Visual Accurecy Left
                 </label>
                    <div className="col-md-10 visualAccL">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Visual Accurecy Left"
                        value={leftVisualAccuaracy}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ backgroundColor: "white" }} />
                    </div>

                  </div>

                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  label-align dropdownLabel2">Visual Accurecy Right</label>
                    <div className="col-md-10 visualAccR">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Visual Accurecy Right"
                        value={rightVisualAccuaracy}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ backgroundColor: "white" }} />
                    </div>

                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  label-align IPDLabel">IPD</label>
                    <div className="col-md-10 IPDinput">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="IPD"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={illnessIPD}
                        style={{ backgroundColor: "white" }}
                      />
                    </div>

                  </div>
                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  label-align inputRefLabel">Reflective Error Type</label>
                    <div className="col-md-10  inputRef">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Reflective Error Type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={reflectiveErrorType}
                        style={{ backgroundColor: "white" }} />
                    </div>
                  </div>

                </div>

                <br />

                <div className="row">
                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label inputCataractLLabel ">Cataract Left</label>
                    <div className="col-md-10 inputCataractL">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Cataract Left"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={leftCatract}
                        style={{ backgroundColor: "white" }} />
                    </div>

                  </div>

                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  label-align inputCataractRLabel">Cataract Right</label>
                    <div className="col-md-10 inputCataractR ">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Cataract Right"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={rightCatract}
                        style={{ backgroundColor: "white" }} />
                    </div>
                  </div>

                </div>


                <br />
                <div className="row">
                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  label-align IOPLabel">IOP</label>
                    <div className="col-md-10 IOPinput">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="IOP"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={IOP}
                        style={{ backgroundColor: "white" }} />
                    </div>

                  </div>


                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label label-align glaucomaLabel">Glaucoma</label>
                    <div className="col-md-10 glaucomaInput">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Glaucoma"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={glaucoma}
                        style={{ backgroundColor: "white" }} />
                    </div>

                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  label-align SprintLabel">Sprint</label>
                    <div className="col-md-10 SprintInput">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Sprint"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={sprint}
                        style={{ backgroundColor: "white" }} />

                    </div>

                  </div>
                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  label-align diabeticsLabel">Diabetics</label>
                    <div className="col-md-10 diabeticsInput ">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Diabetics"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={diabetics}
                        style={{ backgroundColor: "white" }} />
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <label for="middle-name" className="col-form-label label-align cardiacLabel">Cardiac</label>
                    <div className="col-md-10 cardiacInput">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Cardiac"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={cardiac}
                        style={{ backgroundColor: "white" }} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label for="middle-name" className="col-form-label  label-align OneEyeLabel">One Eye</label>
                    <div className="col-md-10 OneEyeInput">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="One Eye"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={oneEye}
                        style={{ backgroundColor: "white" }} />
                    </div>

                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">

                    <label for="middle-name" className="col-form-label  label-align inputLabel3">Hypertention</label>
                    <div className="col-md-10 hypertenInput">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Hypertention"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={hypertension}
                        style={{ backgroundColor: "white" }} />
                    </div>

                  </div>

                  <div className="col-md-6">
                    <label for="middle-name" className="col-form-label  label-align dropdownLabel3">Exemined By</label>
                    <div className="col-md-10  ExainedBy">
                      <input type="text"
                        class="form-control"
                        disabled="disabled"
                        placeholder="Exemined By"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={doctorName}
                        style={{ backgroundColor: "white" }} />
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div>
                  <Link to={`/reportDetailsPrinting/${illnessId}?patient_id=${personID}&name=${personName}&age=${age}&ref_error=${reflectiveErrorType}&ipd=${illnessIPD}&glaucoma=${glaucoma}&sprint=${sprint}&diabetics=${diabetics}&cardiac=${cardiac}&oneEye=${oneEye}&iop=${IOP}&hypertension=${hypertension}&l_v_accuaracy=${leftVisualAccuaracy}&r_v_accuaracy=${rightVisualAccuaracy}&l_catract=${leftCatract}&r_catract=${rightCatract}&doctor=${doctorName}`}>
                    <button className="btn btn-warning" style={{ backgroundColor: "rgb(238, 112, 9)" }}>
                      Print Report
                </button>
                  </Link>
                </div>
              </form>
            </div>
          )}
      </Formik>

    </div>
  );
}

export default ViewReports;





