import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';

import Table from '../../Shared/Table';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '../../Shared/pagination';
import { getIllnesses } from '../../Services/illnessesService';
import { GetAllIllnesses } from '../../store/action/allPatients';
import { SetCurrentPage } from '../../store/action/navigation';

import '../../Shared/style.css';

const PatientsTableForViewReports = ({ location }) => {
    const dispatch = useDispatch();
    dispatch(GetAllIllnesses());
    dispatch(SetCurrentPage(`Home/>Registered Patients Table`));
    const column = [

        {
            path: 'name', lable: 'Name', content: illness =>
                (

                    <a href={`/view-single-report/${illness._id}?id=${illness.patient._id}&name=${illness.patient.name}&age=${5}&ref_error=${illness.reflectiveErrorType}&ipd=${illness.IPD}&glaucoma=${illness.glaucoma}&sprint=${illness.sprint}&diabetics=${illness.diabetics}&cardiac=${illness.cardiac}&oneEye=${illness.oneEye}&iop=${illness.IOP}&hypertension=${illness.hypertension}&l_v_accuaracy=${illness.leftVisualAccuaracy}&r_v_accuaracy=${illness.rightVisualAccuaracy}&l_catract=${illness.leftCatract}&r_catract=${illness.rightCatract}&doctor=${illness.doctor.name}`}>{illness.patient.name}</a>
                )
        },
        {
            lable: 'Checked Date', content: illness => {
                const date = illness.checkedDate.substr(0, 10);
                return date;
            }
        },
        {
            lable: 'Checked By', content: illness =>
                (
                    illness.doctor.name
                )
        }

    ];


    const [patients, setPatients] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    var [loading, setLoading] = useState(true);

    const allpatients = useSelector(state => state.allpatients.allIllnesses);
    //console.log("ALL",allpatients)
    const queryData = queryString.parse(location.search);

    const handlePageChange = page => {
        setCurrentPage(page)
    };
    const onChange = (query) => {
        setSearchValue(query);

    }

    const onClick = () => {
        if (searchValue) {
            const searchedPatient = allpatients.filter(m => m.patient.name.toLowerCase().startsWith(searchValue.toLowerCase()));
            setTotalCount(searchedPatient.length)
            setPatients(searchedPatient);
        }
    }

    const getData = async () => {
        const { data } = await getIllnesses(queryData.page, queryData.pageSize);
        setPatients(data.content);
        setTotalCount(data.total);
    }
    useEffect(() => {
        getData().then(() => setLoading(loading = false));
        return null;
    }, []);
    if (loading) { 
        return (
            <div id="cover-spin"></div>) 
    }
    return (
        <div>
            <div className="col-md-9">
                <div className="">
                    <h2 className="mainTopicP" style={{color: "rgb(39, 38, 38)",
  fontWeight: "300",
  textShadow:" 2px 2px 2px rgb(189, 185, 185)",
  textAlign: "center",
  marginLeft: "-80px"}}>Registered Patients for View Reports</h2>
  <hr/>
                    <ul className="nav navbar-right panel_toolbox">
                    </ul>
                    <div className="clearfix"></div>
                </div>
                <input
                    type=" text"
                    name="search_box"
                    placeholder="  Search here ..."
                    className="search2"
                    onChange={e => onChange(e.currentTarget.value)}
                    value={searchValue}
                >
                </input>
                <button
                    className="searchbutton"
                    type="button"
                    onClick={onClick}
                    disabled={!searchValue}
                >
                    <SearchIcon />
                    Search
            </button>

                {(totalCount) ? (<div className="data-table">
                    <Table
                        Columns={column}
                        data={patients}
                    />
                </div>) : <h6>No Data</h6>}
                {(patients) ? (<Pagination
                    itemCount={totalCount}
                    pageSize={8}
                    currentPage={queryData.page}
                    onPageChange={handlePageChange}
                    url={`?page=${currentPage}&pageSize=${8}`}
                />) : null}
            </div>
        </div>
    );
}

export default PatientsTableForViewReports;