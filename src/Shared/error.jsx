import React from "react";
import '../Styles/style.css';

const Error = ({ touched, message }) => {
  if (!touched) {
    return <div className="form-message invalid">&nbsp;</div>;
  }
  if (message) {
    return <div className="form-message invalidone">{message}</div>;
  }
  return <div className="form-message "> <hr className="validone"></hr> </div>;
};

export default Error;

/* √ */