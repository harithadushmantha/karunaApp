import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';

import Table from '../../Shared/Table';
import { getOperationsByStatus } from '../../Services/operationService';
import { getOperations } from '../../Services/operationService';
import Pagination from '../../Shared/pagination';
import { savePostofs } from '../../Services/postOfService';
import { SetCurrentPage } from '../../store/action/navigation';

import './style.css';
import { GetAllOperations } from '../../store/action/allPatients';

const MarkPostOps = ({ location }) => {
    const dispatch = useDispatch();
    dispatch(GetAllOperations());
    dispatch(SetCurrentPage("Home/>Update PostOps"));
    const ButtonName = (state) => {
        if (state === "pending")
            return "Update to week";
        else if (state === "week")
            return "Update to Month";
    }
    const column = [

        {
            path: 'patient.name', lable: 'Name'
        },
        {
            path: 'patient._id', lable: 'NIC Number'
        },
        {
            path: 'hospital.name', lable: 'Hospital'
        },
        {
            path: 'eye', lable: 'Operated Eye'
        },
        {
            path: 'status', lable: 'status'
        },
        {
            lable: "PoastOps Update", content: operation =>

                (operation.status !== "month" ?
                    <button
                        style={{ backgroundColor: "rgb(238, 112, 9)", color: "white" }}
                        type="button" className="btn btn-warning"
                        disabled={(operation.status === "month")}
                        onClick={async () => {
                            const year = new Date().getFullYear();
                            const m = new Date().toLocaleDateString();
                            const month = Number(m.substr(0, 1));
                            const day = new Date().getDate();
                            const postOfday = `${year}-${month}-${day}`;

                            const test = operation.status;

                            const obj = {
                                type: (test === "pending") ? "week" : "month",
                                patientId: operation.patient._id,
                                operationId: operation._id,
                                date: postOfday
                            }
                            const originalOps = operations;
                            const filterd = operations.filter(o => o._id === operation._id);
                            if (operation.status === "pending") {
                                filterd[0].status = "week";
                            }
                            else if (operation.status === "week") {
                                filterd[0].status = "month";
                            }
                            try {
                                setTest(false);
                                await savePostofs(obj);
                                toast.success("Successfuly Updated");
                                setTest(true);
                            } catch (error) {
                                toast.error(error.message);
                                setoperations(originalOps);
                                window.location.reload();
                            }
                        }}
                    >
                        <p style={{ height: "9px", fontWeight: "400" }}>{ButtonName(operation.status)}</p>
                    </button> : <p>Done</p>
                )
        }

    ];
    const handlePageChange = page => {
        setCurrentPage(page);
    };
    const queryData = queryString.parse(location.search)
    const [test, setTest] = useState(true);
    const [operations, setoperations] = useState([]);
    const [postOps, setPostOps] = useState([
        { _id: 1, name: "pending" },
        { _id: 3, name: "week" }]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [option, setOption] = useState("undifined");
    var [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");


    const getData = async () => {

        if (queryData.status === "undifined") {
            const { data } = await getOperations(queryData.page, queryData.pageSize);
            const operations = data.content;
            setoperations(operations);
            setTotalCount(data.total);
        }
        else {
            const { data: operations } = await getOperationsByStatus(queryData.status, queryData.page, queryData.pageSize);
            setoperations(operations.content);
            setTotalCount(operations.total);
            setOption(queryData.status);
        }
    }
    const onChange = (query) => {
        setSearchValue(query);

    };
    const allOperations = useSelector(state => state.allpatients.allOperations);
    const onClick = () => {
        if (searchValue) {
            const searchedIllnesses = allOperations.filter(m => m.patient.name.toLowerCase().startsWith(searchValue.toLowerCase()));
            setTotalCount(searchedIllnesses.length)
            setoperations(searchedIllnesses);
        }
    }

    useEffect(() => {

        getData().then(() => setLoading(loading = false));
        return null;
    }, []);


    const getDataToHandleChange = async (status) => {
        setLoading(loading = true);
        const { data: operations } = await getOperationsByStatus(status, currentPage, queryData.pageSize);
        setoperations(operations.content);
        setTotalCount(operations.total);
    }
    const handleChange = async ({ currentTarget: input }) => {
        getDataToHandleChange(input.value).then(() => setLoading(loading = false));
        setOption(input.value);
    };

    if (loading) {
        return (
            <div id="cover-spin"></div>)
    }
    return (
        <div>
            <div className="col-md-9">
                <h2 className="mainTopicPO">Mark PostOps</h2>
                <hr className="line" />
            </div>
            {test ? <div><div className="col-md-4 status">
                Show <label>
                    <select
                        className="form-control"
                        name="type"
                        onChange={handleChange}
                    >
                        <option>Select PostOps</option>
                        {postOps.map(p => (
                            <option value={p.name}>
                                {p.name}
                            </option>))}
                    </select>
                </label> Patients
           </div>
                <input
                    type=" text"
                    name="search_box"
                    placeholder="  Search here ..."
                    className="searchInpostops"
                    onChange={e => onChange(e.currentTarget.value)}
                    value={searchValue}
                >
                </input>
                <button
                    className="searchbuttoninpostops"
                    type="button"
                    onClick={onClick}
                    disabled={!searchValue}
                >
                    <SearchIcon />
                    Search
            </button>

                <div className="data-table1">
                    {
                        operations && (<Table
                            Columns={column}
                            data={operations}
                        />
                        )
                    }
                </div>

                <Pagination
                    itemCount={totalCount}
                    pageSize={8}
                    currentPage={queryData.page}
                    onPageChange={handlePageChange}
                    url={`update-postops?status=${option}&page=${currentPage}&pageSize=${8}`}
                /></div> : <div id="cover-spin"></div>}
        </div>
    )
}

export default MarkPostOps;