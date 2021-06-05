import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import AreaChart from './AreaChart/AreaChart.jsx';

import { getOperationCountForChart } from '../../Services/operationService';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllPatients, GetAllOperations } from '../../store/action/allPatients';
import { SetCurrentPage } from '../../store/action/navigation';

import 'react-circular-progressbar/dist/styles.css';
import './style.css';
import '../../style.css';

const HomePage = () => {
  const dispatch = useDispatch();
  dispatch(GetAllPatients());
  dispatch(GetAllOperations());
  dispatch(SetCurrentPage("Home"));
  const [curruntMonthFullOperations, setCurruntMonthFullOperations] = useState(0);
  var [loading, setLoading] = useState(true);

  const patients = useSelector(state => state.allpatients.patientsCount);
  const operation = useSelector(state => state.allpatients.operationsCount);

  const getData = async () => {
    var month = new Date().toLocaleDateString();
    var curruntMonth = month.substr(0, 1);
    const { data: operationArray } = await getOperationCountForChart();
    var curruntMonthFullOperations = operationArray[curruntMonth - 1].count;
    setCurruntMonthFullOperations(curruntMonthFullOperations);
  }

  useEffect(() => {
    getData().then(() => setLoading(loading = false));
    return null;
  }, []);

  const patientCount = patients
  const monthlyOperations = curruntMonthFullOperations;
  const AllOperationts = operation;
  if (loading) {
    return (
      <div id="cover-spin"></div>)
  }
  return (
    <div className="body">

      <div style={{ marginLeft: 15 }} >
        <div className="row mainRow">
          <div className="col-3">
            <div className="card border-secondary mb-2  cardR" >
              <div className="col-12 card_test">
                <br />

                <br />
                <CircularProgressbar value={patientCount} text={`${patientCount}`} maxValue={1000} />
                <br />
                <br />
                <h6>All Patients</h6>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="card border-secondary mb-2 " >
              <div className="col-12 card_test">
                <br />
                <br />
                <CircularProgressbar value={AllOperationts} text={`${AllOperationts}`} maxValue={1000} />
                <br />
                <br />
                <h6>All Operations</h6>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="card border-secondary mb-2 " >
              <div className="col-12 card_test">
                <br />
                <br />
                <CircularProgressbar value={monthlyOperations} text={`${monthlyOperations}`} />
                <br />
                <br />
                <h6>This month Operations</h6>
              </div>
            </div>
          </div>

        </div>
      </div>
      <br /><br />
      <div className="row">
        <div className="col-9">
          <AreaChart />
        </div>
      </div>


    </div>

  );

}




export default HomePage;