import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';

import Table from '../../Shared/Table';
import { getOperations, getOperationsViaOptions } from '../../Services/operationService';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '../../Shared/pagination';
import { GetAllOperations } from '../../store/action/allPatients';
import { SetCurrentPage } from '../../store/action/navigation';

const OperationDataTable = ({ location }) => {
    const dispatch = useDispatch();
    dispatch(GetAllOperations());
    dispatch(SetCurrentPage(`Home/>Registered Operations Table`));

    const column = [

        {
            path: 'name', lable: 'Name', content: operations =>
                (
                    <a href={`/view-single-operation/${operations._id}?id=${operations.patient._id}&name=${operations.patient.name}&hospital=${operations.hospital.name}&date=${operations.date}&payType=${operations.payType}&status=${operations.status}&eye=${operations.eye}`}>{operations.patient.name}</a>
                )
        },
        {
            path: 'name', lable: 'Hospital', content: operations => (
                operations.hospital.name
            )
        },
        {
            path: 'date', lable: 'Date', content: operations => (
                operations.date.substr(0, 10)
            )
        },
        {
            path: 'payType', lable: 'Categorie'
        },
        {
            path: 'eye', lable: 'Operated Eye'
        }
    ];


    const [operations, setOperations] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    var [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [activePrintButton, setactivePrintButton] = useState();


    const queryData = queryString.parse(location.search);
    const getData = async () => {
        const { data: operations } = await getOperations(queryData.page, queryData.pageSize);
        setOperations(operations.content);
        setTotalCount(operations.total);
    }
   

    const allOperationsList = useSelector(state => state.allpatients.allOperations);
    const handlePageChange = async page => {
        setCurrentPage(page);

    };
    const onChange = (query) => {
        setSearchValue(query);

    }
    const handleChangeOfStartDate = (data) => {
        setStartDate(data)
    }
    const handleChangeOfEndDate = (data) => {
        setEndDate(data)
    }
    const clearDates = () => {
        setEndDate();
        setStartDate();
    }

    const onClickThePublishButton = async () => {
        if (startDate < endDate) {
            const { data } = await getOperationsViaOptions(startDate, endDate, "", currentPage, queryData.pageSize);
            const totalCount = data.total;
            const operations = data.content;
            setOperations(operations);
            setTotalCount(totalCount);
            setactivePrintButton("setActive");
        }
        else {
            toast.error("Invalid Date Range");

            setactivePrintButton();
        }
    }
    const onClick = () => {
        if (searchValue) {
            const searchedOperations = allOperationsList.filter(m => m.patient.name.toLowerCase().startsWith(searchValue.toLowerCase()));
            setTotalCount(searchedOperations.length)
            setOperations(searchedOperations);
        }
    }
    if (loading) {
        return (
            <div id="cover-spin"></div>)
    }
    return (

        <div>
            <div className="col-md-9">
                <div className="">
                    <h2 className="" style={{color: "rgb(39, 38, 38)",
  fontWeight: "300",
  textShadow:" 2px 2px 2px rgb(189, 185, 185)",
  textAlign: "center",
  marginLeft: "-80px"}}>Operations Have Done</h2>
<hr/>
                    <ul className="nav navbar-right panel_toolbox">
                    </ul>
                    <div className="clearfix"></div>
                </div>
                <br />
                <form>
                    <label className="datePicker1">Select Range :</label>
                    <input
                        className="date-picker"
                        type="date"
                        name="startdate"
                        onChange={e => handleChangeOfStartDate(e.currentTarget.value)}
                    />
                    <input
                        className="date-picker2"
                        type="date"
                        name="enddate"
                        onChange={e => handleChangeOfEndDate(e.currentTarget.value)}
                    />
                    <button
                        className="date_buttonVO"
                        type="button"
                        onClick={onClickThePublishButton}
                        disabled={!startDate || !endDate}
                    >
                        Find
                </button>
                    <button
                        className="date_reset"
                        type="reset"
                        disabled={!startDate || !endDate}
                        onClick={clearDates}
                    >
                        Reset
                </button>
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
                        data={operations}
                    />) : <h6>No Data Content</h6>}
                </div>
                {(operations) ? (<Pagination
                    itemCount={totalCount}
                    pageSize={8}
                    currentPage={queryData.page}
                    onPageChange={handlePageChange}
                    url={`?fromDate=${startDate}&toDate=${endDate}&page=${currentPage}&pageSize=${8}`}
                />) : null}
                {!startDate && !endDate && <p>Select range for print details in range</p>}
                {!startDate && endDate && <p>Select Start Date</p>}
                {!endDate && startDate && <p>Select End Date</p>}
                {startDate > endDate && <p>Invalid Data range</p>}
                {totalCount && startDate && endDate && !activePrintButton && startDate < endDate && <p>Click find to Apply</p>}

                {totalCount && startDate && endDate && activePrintButton && startDate < endDate &&
                    <a href={`/printoperations?fromDate=${startDate}&toDate=${endDate}&payType=${""}&page=${currentPage}`}> <button  //&paytype=${values.payment}
                        type="button" style={{ marginBottom: "1em" }} className="btn btn-warning" style={{ color: "white", backgroundColor: "rgb(238, 112, 9)" }}
                    >
                        <p style={{ height: "9px", fontWeight: "400" }}>Print Range Operation</p>
                    </button>  </a>}
                {totalCount && <a href={`/printAlloperations`}> <button  //&paytype=${values.payment}
                    type="button" style={{ marginBottom: "1em" }} className="btn btn-warning" style={{ color: "white", backgroundColor: "rgb(238, 112, 9)" }}
                >
                    <p style={{ height: "9px", fontWeight: "400" }}>Print All Operations</p>
                </button>  </a>}
            </div>
        </div>
    );

}

export default OperationDataTable;