import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';

import Table from './Table';
import {  getPatientViaOptions } from '../Services/patientsService';
import Pagination from './pagination';
import { GetAllPatients } from '../store/action/allPatients';

import './style.css';

const DataTable = ({ link, queryData, url, mainTopic, stringForprint }) => {
    const dispatch = useDispatch();
    dispatch(GetAllPatients());
    const column = [

        {
            path: 'name', lable: 'Name', content: patient =>
                (
                    <a href={`/${url}/${patient._id}?id=${patient._id}&name=${patient.name}&phone=${patient.phone}&district=${patient.district.name}&gender=${patient.gender}&register_date=${patient.registerDate}&dob=${patient.dob}`}>{patient.title}. {patient.name}</a>
                )
        },
        {
            path: '_id', lable: 'ID'
        },
        {
            lable: "Age", content: patient => {
                const curruntYear = new Date().getFullYear();
                const dob = patient.dob;
                const birthYeat = Number(dob.substr(0, 4));
                const age = curruntYear - birthYeat;
                return age;
            }
        },
        {
            path: 'phone', lable: 'Phone'
        },
        {
            lable: 'District', content: patient => {
                return patient.district.name;
            }
        },
        {
            lable: "Registered Date",
            content: patient => {
                const date = patient.registerDate.substr(0, 10);
                return date;
            }
        }

    ];

    const [patients, setPatients] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [searchedPatients, setSearchedPatients] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    var [loading, setLoading] = useState(true);
    const [activePrintButton, setactivePrintButton] = useState();

    const allpatients = useSelector(state => state.allpatients.allPatients);


    const handlePageChange = page => {
        setCurrentPage(page);
    };
    const onChange = (query) => {
        setSearchValue(query);

    };
    const handleChangeOfStartDate = (data) => {
        setStartDate(data)

    }
    const handleChangeOfEndDate = (data) => {
        setEndDate(data)
    }

    const onClick = () => {
        if (searchValue) {
            const searchedPatient = allpatients.filter(m => m.name.toLowerCase().startsWith(searchValue.toLowerCase()));
            setTotalCount(searchedPatient.length)
            setPatients(searchedPatient);
        }
    }
    const clearDates = () => {
        setEndDate();
        setStartDate();
    }
    const onClickThePublishButton = async () => {

        if (startDate < endDate) {
            setCurrentPage(1);
            const { data } = await getPatientViaOptions(startDate, endDate, currentPage, queryData.pageSize);
            const totalCount = data.total;
            const patients = data.content;
            setPatients(patients);
            setTotalCount(totalCount);
            setactivePrintButton("setActive");
        }
        else {
            setEndDate();
            setStartDate();
            toast.error("invalid Date Range");

            setactivePrintButton();
        }
        return null;

    }
    const getData = async () => {
        if (queryData.fromDate === "undefined" && queryData.toDate === "undefined") {
            const { data } = await getPatientViaOptions("", "", queryData.page, queryData.pageSize);
            const totalCount = data.total;
            const patients = data.content;
            setPatients(patients);
            setTotalCount(totalCount);
        }

        else {
            const { data } = await getPatientViaOptions(queryData.fromDate, queryData.toDate, queryData.page, queryData.pageSize);
            const totalCount = data.total;
            const patients = data.content;
            setPatients(patients);
            setTotalCount(totalCount);
        }

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
            <div className="">
                <h2 className="mainTopicP">{mainTopic}</h2>
                <hr/>

                <div className="clearfix"></div>
            </div>

            <div className="col-md-9">
                <form>
                    <label className="datePicker">Select Range :</label>
                    <input
                        className="date-picker"
                        type="date"
                        name="startdate"
                        onChange={e => handleChangeOfStartDate(e.currentTarget.value)}

                    />
                    <input
                        className="date-picker"
                        type="date"
                        name="enddate"
                        onChange={e => handleChangeOfEndDate(e.currentTarget.value)}
                    />
                    <button
                        className="date_button"
                        type="button"
                        onClick={onClickThePublishButton}
                        disabled={!startDate || !endDate}
                    >
                        Find
                </button>
                    <input
                        className="date_reset"
                        type="reset" value="Reset"
                        onClick={clearDates}
                    />

                </form>

                <input
                    type=" text"
                    name="search_box"
                    placeholder="  Search here ..."
                    className="search"
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

                <div className="data-table">

                    {(totalCount) ? (<Table
                        Columns={column}
                        data={patients}
                    />) : <h6>No Data Content</h6>}
                </div>
                {(patients) ? (<Pagination
                    itemCount={totalCount}
                    pageSize={8}
                    currentPage={queryData.page}
                    onPageChange={handlePageChange}
                    url={`${link}?fromDate=${startDate}&toDate=${endDate}&page=${currentPage}&pageSize=${8}`}
                />) : null}
                {/* {!startDate && !endDate && stringForprint && <p>Select range for print details in range</p>} */}
                {!startDate && !endDate && stringForprint && <p>Select range for print details in range</p>}
                {!startDate && endDate && <p>Select Start Date</p>}
                {!endDate && startDate && <p>Select End Date</p>}
                {startDate > endDate && <p>Invalid Data range</p>}
                {totalCount && stringForprint && startDate && endDate && !activePrintButton && startDate < endDate && <p>Click find to Apply</p>}
                {totalCount && stringForprint && startDate && endDate && activePrintButton && startDate < endDate &&
                    <a href={`/printpatients?startdate=${startDate}&enddate=${endDate}&page=${currentPage}&pageSize=${""}`}>
                        <button
                            type="button" style={{ marginBottom: "1em" }} className="btn btn-warning" style={{ color: "white", backgroundColor: "rgb(238, 112, 9)" }}
                        >
                            <p style={{ height: "9px", fontWeight: "400" }}>Print in Date range</p>
                        </button>
                    </a>}


                {totalCount && stringForprint && <a href={`/printallpatients`}>
                    <button
                        type="button" style={{ marginBottom: "1em" }} className="btn btn-warning" style={{ color: "white", backgroundColor: "rgb(238, 112, 9)" }}>
                        <p style={{ height: "9px", fontWeight: "400" }}>Print all Details</p>
                    </button>
                </a>}


            </div>
        </div>
    );
}

export default DataTable;