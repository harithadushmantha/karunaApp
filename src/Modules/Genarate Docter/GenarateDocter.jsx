import React from 'react';
import * as Yup from 'yup';
import '../Auth/CSS/custom.min.css';
import { Formik } from 'formik';
import { Docregister } from '../../Services/docService';
import Error from '../../Shared/error';

const validationSchema = Yup.object().shape({

  Docterusername: Yup.string()
    .required(" Docter User Name is Requird")
    .min(5, "Minimum lenght is 5")
    .max(15," Max lenght is 15")
    .matches(/^[A-Za-z _]+$/, "Not valid")
    .trim(),

  Docterphonenumber: Yup.string()
    .required("Docter Phonenumber is Required")
    .matches(/^[0-9]{10}$/, 'Phone number Must be valid')

    .trim(),
})

const GenarateDocter = () => {
  return (
    <div>

      <Formik
        initialValues={{ Docterusername: "", Docterphonenumber: "" }}
        validationSchema={validationSchema}

        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await Docregister(values);
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
          isSubmitting,errors,touched
        }) => (

            <div className="col-md-12 col-sm-12 ">
              <div className="">
                <h2 className="mainTopicP" style={{color: "rgb(39, 38, 38)",
  fontWeight: "300",
  textShadow:" 2px 2px 2px rgb(189, 185, 185)",
  textAlign: "center",
  marginLeft: "-80px"}}>Genarate Docter</h2>
  <hr/>
                <ul className="nav navbar-right panel_toolbox"> </ul>
                <div className="clearfix"></div>
              </div>

              <form data-parsley-validate className="form-horizontal form-label-left" onSubmit={handleSubmit} onReset={resetForm}>
                <br />

                <div className="item form-group title">
                  <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Docter Name </label>
                  <div className="col-md-5 col-sm-5 ">
                    <input className="form-control"
                      type="text"
                      name="Docterusername"
                      placeholder="Docter Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Docterusername}
                    ></input><Error touched={touched.Docterusername} message={errors.Docterusername} />
                  </div>
                </div>

                <div className="item form-group title">
                  <label className="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Phone Number </label>
                  <div className="col-md-5 col-sm-5 ">
                    <input className="form-control"
                      type="text"
                      name="Docterphonenumber"
                      placeholder="Phonenumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Docterphonenumber}
                    ></input><Error touched={touched.Docterphonenumber} message={errors.Docterphonenumber} />
                  </div>
                </div>
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

export default GenarateDocter;