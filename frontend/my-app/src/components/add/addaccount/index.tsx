import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { AddAccountAxios } from '../../../services/authservice';
import { getCustomParse } from "../../../utils/parser";
import { sleep } from "../../../services/dataservice";

const AddAccount: React.FC = () => {
    let navigate: NavigateFunction = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);

    //Init da instance
    const initialValues: any = {
        bank: '',
        code: '',
        agency: '',
        type: ''
    };

    const validationSchema = Yup.object().shape({
        bank: Yup.string().test("len", "Bank name must contains 3-20 characters.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        ).required("Required field!"),
        code: Yup.string().test("len", "Bank code must contains 3 characters.",
            (val: any) =>
                val &&
                val.toString().length === 3
        )
            .required("Required field!"),
        agency: Yup.string().test("len", "Agency number must contains 5 characters.",
            (val: any) =>
                val &&
                val.toString().length === 5
        )
            .required("Required field!"),
        type:
        Yup.string().oneOf(['0','1','2'], "Type must be valid (0 for CC, 1 for CP, 2 for CASA)")
            .required("Required field!"),
    });

    const handleRegister = (formValue: any) => {

        AddAccountAxios(getCustomParse(formValue)).then(async (response) => {
            toast.info('Registered with success');
            setSuccessful(true);
            await sleep();
            navigate("/Account");
            window.location.reload();
        },
            (error) => {
                toast.info(error.response.data);
                setSuccessful(false);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h1>Register a new Account!</h1>
                {/* Validation */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="bank"> Bank </label>
                                    <Field name="bank" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="bank"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="code"> Code </label>
                                    <Field name="code" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="code"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="agency"> Agency </label>
                                    <Field
                                        name="agency"
                                        type="text"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="agency"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type"> Type </label>
                                    <Field
                                        name="type"
                                        type="text"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="type"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group m-1">
                                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default AddAccount;