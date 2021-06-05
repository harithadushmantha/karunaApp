import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import Error from '../../Shared/error';
import { getHospitals } from '../../Services/hospitalService';
import { saveOperation } from '../../Services/operationService';
import { SetCurrentPage, SetNavigationLink } from '../../store/action/navigation';

import './style.css';
import { GetAllOperations } from '../../store/action/allPatients';

const validationSchema = Yup.object().shape({
  operationdate: Yup.date().
    required(" * Operaation Date is required!"),
  hospitalsId: Yup.string().
    required("* Hospitals is required! "),
  payment: Yup.string().required("required"),
  selectOperationEyeId: Yup.string().
    required("*  Operation Eye is required!"),
})

const GenarateOperation = ({ location }) => {
  const dispatch = useDispatch();
  
  dispatch(SetCurrentPage("Home/>Register Patients Table/>Generate Operation"));
  dispatch(SetNavigationLink(`/add-operation?page=${1}&pageSize=${8}&fromDate=undefined&toDate=undefined`))

  const [hospitals, setHospitals] = useState([]);
  const [operationDate, setOperationDate] = useState(null);
  const [personId, setPersonId] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personPhone, setPersonPhone] = useState(null);
  const queryData = queryString.parse(location.search);

  useEffect(() => {

    const getHospitalsList = async () => {
      const { data: hospitals } = await getHospitals();
      setHospitals(hospitals);
    };
    setOperationDate(operationDate);
    setPersonName(queryData.name);
    setPersonId(queryData.id);
    setPersonPhone(queryData.phone);
    getHospitalsList();
    return null;

  }, []);

  return (
    <Formik
      initialValues={{
        name: "",
        phonenumber: "", operationdate: "",
        hospitalsId: "", payment: "",
        selectOperationEyeId: ""
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
          await saveOperation(values, personId)
          toast.success("Successfuly Added New Operation ");
          window.location.replace("/");
        } catch (error) {
          toast.warn("An unexpected error occured");
          window.location.reload();
          // axios.interceptors.response.use(null, error => {
          //   const expectedex = error.response &&
          //     error.response.status >= 400 &&
          //     error.response.status <= 500
          //   if (!expectedex) {
          //   }
          // });
        }
      }}
    >
      {({
        values,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        setFieldValue,
        resetForm,
        isSubmitting,
        isValid
      }) => (
          <div class="col-md-12 col-sm-12 ">

            <div className="">
              <h2 className="mainTopicO">Genarate Operation</h2>
                      <hr/>
              <div className="clearfix"></div>
            </div>
            <div className="x_content" />
            <br />
            <form onSubmit={handleSubmit} onReset={resetForm} className="form-horizontal form-label-left" novalidate>
              <div className="item form-group name">
                <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Name
                        </label>
                <div className="col-md-4 col-sm-4 ">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Name"
                    disabled="disabled"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={personName}
                    style={{ backgroundColor: "white" }}
                  />
                  <Error touched={touched.personName} message={errors.personName} />
                </div>
              </div>

              <div className="item form-group">
                <label className="col-form-label col-md-3 col-sm-3 label-align" for="last-name">Phone Number
                        </label>
                <div className="col-md-4 col-sm-4 ">
                  <input
                    className="form-control"
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    disabled="disabled"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={personPhone}
                    style={{ backgroundColor: "white" }}
                  />
                  <Error touched={touched.personPhone} message={errors.personPhone} />
                </div>

              </div>

              <div className="item form-group">
                <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Hospital
                </label>
                <div className="col-md-4 col-sm-4 ">
                  <select name="hospitalsId"
                    className="form-control"
                    value={values.hospitalsId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  > <Error touched={touched.hospitalsId} message={errors.hospitalsId} />
                    <option value="">Select Hospital</option>
                    {hospitals.map(h => <option value={h._id}>{h.name}</option>)}
                  </select>

                </div>

              </div>

              <div className="item form-group">
                <label className="col-form-label col-md-3 col-sm-3 label-align">Operation Date
                         </label>
                <div className="col-md-4 col-sm-4 ">
                  <div className="form-group">
                    <div className='input-group date'>
                      <input
                        className="form-control"
                        type="date"
                        name="operationdate"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.operationdate}
                      />

                    </div><Error touched={touched.operationdate} message={errors.operationdate} />

                  </div>
                </div> <div className="error"> </div>
              </div>

              <div className="item form-group">
                <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Select Eye
                </label>
                <div className="col-md-4 col-sm-4 ">
                  <select
                    className="form-control"
                    name="selectOperationEyeId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.selectOperationEyeId}
                  >
                    <option >Select Eye</option>
                    <option >Left</option>
                    <option >Right</option>
                  </select> <Error touched={touched.selectOperationEyeId} message={errors.selectOperationEyeId} />
                </div>

              </div>


              <div className="item form-group">
                <label className="col-form-label col-md-3 col-sm-3 label-align">
                  Payment Type
                   </label>
                <div class="col-md-6 col-sm-6 ">
                  <div class="radio">
                  </div>
                  <div class="radio free">
                    <div className="form-check payment" >
                      <input className="form-check-input"
                        type="radio"
                        name="payment"
                        value="free"
                        checked={values.payment === "free"}
                        onChange={() => setFieldValue("payment", "free")}
                      />
                      <label className="form-check-label" htmlFor="">
                        Free
                            </label>
                    </div></div>

                  <div class="radio">

                    <div className="form-check payment paid" >
                      <input className="form-check-input"
                        type="radio"
                        name="payment"
                        value="paid"
                        checked={values.payment === "paid"}
                        onChange={() => setFieldValue("payment", "paid")}
                      >
                      </input>
                      <label className="form-check-label" htmlFor="">
                        Paid
                 </label>
                      {errors.payment && (<p className="radioCheck">{errors.payment}</p>)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ln_solid"></div>

              {isSubmitting ? (<div id="cover-spin"></div>) : (<div className="item form-group">
                <div className="col-md-6 col-sm-6 offset-md-3 btton">
                  <button type="submit"
                    className="btn btn-warning"
                    disabled={!isValid}
                    style={{ backgroundColor: "rgb(238, 112, 9)" }}
                  >
                    <p style={{ height: "9px", color: "white", fontWeight: "400" }}>Submit</p>
                  </button> <button
                    className="btn btn-secondary"
                    type="reset"
                  >
                    Reset
                </button>

                </div>
              </div>)}

            </form>
          </div>
        )}
    </Formik>

  );
}

export default GenarateOperation;