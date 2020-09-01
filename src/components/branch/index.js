import React, { useState, useEffect } from "react";
import * as branchActions from "../../actions/branch.action";
import { server } from "../../constants";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import swal from "sweetalert";
import Table from '../Table';
import './branch.css'
import loading from '../../assets/image/loading.gif'
export default (props) => {
    const branchReducer = useSelector(
        ({ branchReducer }) => branchReducer
    );
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    useEffect(() => {
        if (localStorage.getItem(server.TOKEN_KEY) === null) {
            return props.history.push("/login");
        }
        dispatch(branchActions.Index())

    }, []);
    useEffect(() => {
        setData(branchReducer.result)
    }, [branchReducer.result])

    function confirmDelete(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(branchActions.Remove(id));
                swal("Poof! Your Branch data has been deleted!", {
                    icon: "success",
                });
            }
        });
    }
    const columns = React.useMemo(
        () => [
            {
                Header: "Front Image",
                accessor: "frontimage",
                Cell: ({ cell: { value } }) => <img class="img-fluid img-rounded"
                    width={200} src={process.env.REACT_APP_BRANCH_FRONT_IMAGE_PATH + '/' + value} />
            },
            {
                Header: 'Name',
                accessor: 'name', // accessor is the "key" in the data
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Pos Machine',
                accessor: 'pos_machines',
                Cell: ({ cell: { value } }) => {
                    return value.map(data => {
                        return <span key={data} className="badge">{data.alias}</span>
                    })
                }
            },
            {
                Header: 'Action',
                accessor: '_id',
                Cell: ({ cell: { value } }) => {
                    // alert(id)
                    return <><Link to={"/branch/update/" + value} type="button"
                        class="btn btn-primary" style={{ 'margin-right': '5px' }}
                        onClick={() => dispatch(branchActions.clearState())}
                    >
                        Edit
                        </Link>
                        <Link type="button" class="btn btn-danger" onClick={() => confirmDelete(value)}>
                            Delete
                    </Link></>
                }
            },
        ],
        []
    )
    const Holdon = (columns) => {
        if (branchReducer.result) {
            return <Table columns={columns} data={branchReducer.result} />
        } else {
            return <img class="img-fluid img-rounded"
                src={loading} />
        }
    }
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">

                            <h1 className="m-0 text-dark">Branch Data</h1>
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

                                    <div className="card-tools">
                                        <div className="input-group input-group-sm">

                                            <Link to="/branch/create">
                                                <button type="submit" className="btn btn-default">
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-body">
                                    {Holdon(columns, data)}
                                </div>

                            </div>

                            {/* /.card */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};