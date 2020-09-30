import React, { useState, useEffect } from "react";
import * as posmachineActions from "../../actions/posmachine.action";
import loading from '../../assets/image/loading.gif'
import Table from '../Table';
import { server } from "../../constants";
import * as moment from 'moment'
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
export default (props) => {
    const posmachineReducer = useSelector(
        ({ posmachineReducer }) => posmachineReducer
    );
    const dispatch = useDispatch();
    // const [data, setData] = React.useState(() => makeData(20))
    // const [originalData] = React.useState(data)
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        let values = { _id: rowIndex, column: columnId, value: value }
        dispatch(posmachineActions.inline_update(values));

    }
    React.useEffect(() => {
        setSkipPageReset(false)
    }, [posmachineReducer.result])
    useEffect(() => {
        if (localStorage.getItem(server.TOKEN_KEY) === null) {
            return props.history.push("/login");
        }
        dispatch(posmachineActions.index());
    }, []);
    function confirmDelete(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(posmachineActions.remove(id));
                swal("Poof! Your POS Machine data has been deleted!", {
                    icon: "success",
                });
            }
        });
    }
    const columns = React.useMemo(
        () => [
            {
                Header: 'Alias',
                accessor: 'alias', // accessor is the "key" in the data
            },
            {
                Header: 'Serial number',
                accessor: 'serial_number',
            },
            {
                Header: 'Created Date',
                accessor: 'created',
                Cell: ({ cell: { value } }) => {
                    return moment(value).format('MMMM Do YYYY, h:mm:ss a')
                }
            },
            {
                Header: 'Action',
                accessor: '_id',
                Cell: ({ cell: { value } }) => {
                    // alert(id)
                    return <><Link to={"/posmachine/update/" + value} type="button"
                        class="btn btn-primary" style={{ 'margin-right': '5px' }}
                        onClick={() => dispatch(posmachineActions.clearState())}
                    ><i class="fa fa-edit"></i>{' '}
                        Edit
                        </Link>
                        <Link type="button" class="btn btn-danger" onClick={() => confirmDelete(value)}>
                            <i class="fa fa-trash"></i>{' '}  Delete
                    </Link></>
                }
            },
        ],
        []
    )
    const Holdon = (columns) => {
        if (posmachineReducer.result) {
            return <Table columns={columns} data={posmachineReducer.result}
                parent_action={posmachineActions}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
            />
        } else {
            return <img class="img-fluid img-rounded"
                src={loading} width="30%" />
        }
    }
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Pos Machine Data</h1>
                        </div>
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"></h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm">
                                            <Link to="/posmachine/create">
                                                <button type="submit" className="btn btn-default">
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    {Holdon(columns)}
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};