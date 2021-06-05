import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { SetCurrentPage, SetNavigationLink } from '../../store/action/navigation';

const ViewOperations = ({ location }) => {
    const queryData = queryString.parse(location.search);
    const dispatch = useDispatch();
    dispatch(SetCurrentPage(`Home/>Registered Patients Table/>${queryData.name}`));
    dispatch(SetNavigationLink(`/view-operations?page=1&pageSize=8`))
    const [personID, setPersonID] = useState(null);
    const [personName, setPersonName] = useState(null);
    const [date, setdate] = useState(null);
    const [hospital, sethospital] = useState(null);
    const [status, setstatus] = useState(null);
    const [payType, setPayType] = useState(null);
    const [eye, setEye] = useState(null)

    useEffect(() => {
        const getOperation = async () => {
            setPersonName(queryData.name);
            setPersonID(queryData.id)
            sethospital(queryData.hospital);
            setdate(queryData.date.substr(0, 10));
            setPayType(queryData.payType);
            setstatus(queryData.status);
            setEye(queryData.eye);
        };
        getOperation();
        return null;
    }, [])
    return (
        <div class="col-md-12 col-sm-12 ">
            <div className="">
                <h2 className="mainTopicI" style={{color: "rgb(39, 38, 38)",
  fontWeight: "300",
  textShadow:" 2px 2px 2px rgb(189, 185, 185)",
  textAlign: "center",
  marginLeft: "-80px"}}>View Operation</h2>
                
                <div className="clearfix"></div>
            </div>
            
            <br />
            <form id="demo-form2" data-parsley-validate className="form-horizontal form-label-left">
                <div className="item form-group">
                    <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">ID</label>
                    <div className="col-md-4 col-sm-4 ">
                        <input style={{backgroundColor:"white"}} type="text" class="form-control" disabled="disabled" placeholder="Phone Number" value = {personID} />
                    </div>
                </div>

                <div className="item form-group">
                    <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align" >Name</label>
                    <div className="col-md-4 col-sm-4 ">
                        <input style={{backgroundColor:"white"}} type="text" class="form-control" disabled="disabled" placeholder="Name" value = {personName}/>
                    </div>
                </div>


                <div className="item form-group">
                    <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Hospital</label>
                    <div className="col-md-4 col-sm-4 ">
                        <input style={{backgroundColor:"white"}} type="text" class="form-control" disabled="disabled" placeholder="Hospital" value = {hospital}/>
                    </div>
                </div>

                <div className="item form-group">
                    <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Operation Date</label>
                    <div className="col-md-4 col-sm-4 ">
                        <input style={{backgroundColor:"white"}} type="text" class="form-control" disabled="disabled" placeholder="Operation Date"value = {date} />
                    </div>
                </div>

                <div className="item form-group">
                    <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Pay Type</label>
                    <div className="col-md-4 col-sm-4 ">
                        <input style={{backgroundColor:"white"}} type="text" class="form-control" disabled="disabled" placeholder="Pay Type" value = {payType}/>
                    </div>
                </div>

                <div className="item form-group">
                    <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Post Ops Status</label>
                    <div className="col-md-4 col-sm-4 ">
                        <input style={{backgroundColor:"white"}} type="text" class="form-control" disabled="disabled" placeholder="Read-Only Input"value = {status} />
                    </div>
                </div>

                <div className="item form-group">
                    <label for="middle-name" className="col-form-label col-md-3 col-sm-3 label-align">Operated Eye</label>
                    <div className="col-md-4 col-sm-4 ">
                        <input style={{backgroundColor:"white"}} type="text" class="form-control" disabled="disabled" placeholder="Operated Eye" value = {eye} />
                    </div>
                </div>

            </form>
        </div>


    );
}

export default ViewOperations;