import React from "react";
import './style.css';


const Error = ({ touched, message }) => {
  if (!touched) {
    return <div className="form-message invalid">&nbsp;</div>;
  }
  if (message) {
    return <div><hr className="hr"/><div className="form-message invalid">{message} </div></div>;
    
  }
  return <hr className="hrvalid"/>;
};

export default Error;

/*√ */