import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as branchActions from "../../actions/branch.action";
import { server } from "../../constants";
import Select from 'react-select'
export default (props) => {
    const dispatch = useDispatch();
    const [multiselect, setMultiselect] = useState([])
    const branchReducer = useSelector(
        ({ branchReducer }) => branchReducer
    );

    useEffect(() => {
        if (localStorage.getItem(server.TOKEN_KEY) === null) {
            return props.history.push("/login");
        }
        const { id } = props.match.params;
        // dispatch(branchActions.getDropdownPOS())
        dispatch(branchActions.getSingleBranch(id))
        dispatch(branchActions.clearState());
        // dispatch(branchActions.getSingleBranch(id))

    }, []);
    useEffect(() => {
        if (branchReducer.result) {
            let initial_image = { file_obj: '', frontimage: branchReducer.result.frontimage }
            showPreviewImage(initial_image)

        }
    }, [branchReducer])
    const showPreviewImage = (values) => {
        return (
            <img
                id="frontimage"
                src={
                    values.file_obj != null
                        ? values.file_obj
                        : process.env.REACT_APP_BRANCH_FRONT_IMAGE_PATH + '/' + values.frontimage
                }
                class="img-fluid"
                width={300}
            />
        );
    };
    const renderSelectwithSelected = () => {
        {
            console.log(branchReducer.result)
            if (branchReducer.result) {
                return (
                    <div class="form-group ">
                        <Select
                            name="pos_machines"
                            defaultValue={branchReducer.result
                                ? branchReducer.result.pos_machines.map(val => {
                                    return {
                                        'value': val._id,
                                        'label': val.alias
                                    }
                                }) : null}
                            onChange={setMultiselect}

                            isMulti
                            closeMenuOnSelect={false}
                            options={branchReducer.options
                                ? branchReducer.options : null}
                        />
                    </div>

                )
            } else {
                return null; // or loading graphic
            }
        }
    }
    const showForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
    }) => {
        return (
            <form role="form" onSubmit={handleSubmit}>
                <div class="card-body">
                    <input
                        type="hidden"
                        name="_id"
                        onChange={handleChange}
                        value={values._id}
                    />
                    <div className="form-group input-group has-feedback">
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                            className="form-control"
                            placeholder="Branch Name"
                            className={
                                errors.alias && touched.alias
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                        />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-building"></span>
                            </div>
                        </div>
                        {errors.alias && touched.alias ? (
                            <small id="passwordHelp" class="text-danger">
                                {errors.name}
                            </small>
                        ) : null}
                    </div>
                    <div className="form-group input-group has-feedback">
                        <textarea
                            name="address"
                            onChange={handleChange}
                            value={values.address}
                            className="form-control"
                            placeholder="Address"
                            className={
                                errors.address && touched.address
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                        ></textarea>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-building"></span>
                            </div>
                        </div>
                        {errors.serial_number && touched.serial_number ? (
                            <small id="passwordHelp" class="text-danger">
                                {errors.address}
                            </small>
                        ) : null}
                    </div>
                    <div className="form-group input-group has-feedback">
                        <input
                            type="text"
                            name="tel"
                            onChange={handleChange}
                            value={values.tel}
                            className="form-control"
                            placeholder="Branch Telephone"
                            className={
                                errors.tel && touched.tel
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                        />
                        <div class="input-group-append col-3">
                            <div class="input-group-text">
                                <span class="fas fa-phone"></span>
                            </div>
                        </div>
                        {errors.tel && touched.tel ? (
                            <small id="passwordHelp" class="text-danger">
                                {errors.tel}
                            </small>
                        ) : null}
                    </div>
                    {renderSelectwithSelected()}
                    <div class="form-group ">
                        {showPreviewImage(values)}
                    </div>

                    <div class="form-group ">

                        <div class="input-group col-5">
                            <div class="custom-file">
                                <input type="file"
                                    onChange={e => {
                                        e.preventDefault();
                                        setFieldValue("frontimage", e.target.files[0]); // for upload
                                        setFieldValue(
                                            "file_obj",
                                            URL.createObjectURL(e.target.files[0])
                                        ); // for preview image
                                    }} name="frontimage"
                                    className={
                                        errors.frontimage && touched.frontimage
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    accept="image/*" id="exampleInputFile" />
                                <label class="custom-file-label" for="exampleInputFile">Choose Front Image</label>
                            </div>

                        </div>
                    </div>

                    <div class="row">
                        <div class="offset-md-4 col-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                class="btn btn-primary btn-block"
                            >
                                Add
                             </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">

                            <h1 className="m-0 text-dark">Create Branch Data</h1>
                        </div>
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </div>
            <div className="content">
                <div class="card card-primary">
                    <div class="card-header">

                    </div>


                    <Formik
                        enableReinitialize={true}
                        initialValues={
                            branchReducer.result
                                ? branchReducer.result
                                : { name: "", tel: "", address: "" }
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            let formData = new FormData();
                            formData.append("id", branchReducer.result._id);
                            formData.append("name", values.name);
                            formData.append("tel", values.tel);
                            formData.append("address", values.address);
                            let result = multiselect.map(arr => arr.value)

                            formData.append("pos_machines", result)
                            if (values.frontimage) {
                                formData.append("frontimage", values.frontimage);
                            }
                            dispatch(branchActions.Update(formData, props.history));
                            setSubmitting(false);
                        }}
                    // validationSchema={Create_Schema}
                    >
                        {/* {this.showForm()}            */}
                        {(props) => showForm(props)}
                    </Formik>
                </div>
                {/* /.card */}
            </div>
        </div>
    );
};
