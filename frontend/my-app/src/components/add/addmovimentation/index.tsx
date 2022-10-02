import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { User } from "../../../types/user";
import { UserAuthenticate } from '../../../services/authservice';

const AddMovimentation: React.FC = () => {
    let navigate: NavigateFunction = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);

    const sleep = () => new Promise(r => setTimeout(r, 2000));

    //Init da instance
    const initialValues: any = {
        account: 0,
        value: 0,
        paidValue: 0,
        due_date: '',
        paymentDate: '',
        category: '',
        description: '',
        transactionType: ''
    };

    const validationSchema = Yup.object().shape({
        account: Yup.string().test("len", "Account must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        ).required("Required field!"),
        value: Yup.string().test("len", "Value must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 1
        )
            .required("Required field!"),
        paidValue: Yup.string().test("len", "Value must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 1
        )
            .required("Required field!"),
        due_date: Yup.string().test("len", "Value must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 1
        )
            .required("Required field!"),
        paymentDate: Yup.string().test("len", "Value must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 1
        )
            .required("Required field!"),
        category: Yup.string().test("len", "Value must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 1
        )
            .required("Required field!"),
        description: Yup.string().test("len", "Value must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 1
        )
            .required("Required field!"),
        transactionType: Yup.string().test("len", "Value must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 1
        )
            .required("Required field!"),
    });

    const handleRegister = (formValue: any) => {
        UserAuthenticate(formValue).then(async (response) => {
            toast.info(response.data);
            setSuccessful(true);

            await sleep();
            navigate("/");
            window.location.reload();
        },
            (error) => {
                toast.info(error);
                setSuccessful(false);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h1>Register a new transaction!</h1>
                {/* Validation */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}//Regras
                    onSubmit={handleRegister}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="account"> Account </label>
                                    <Field name="account" type="number" className="form-control" />
                                    <ErrorMessage
                                        name="account"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="value"> Value R$ </label>
                                    <Field name="value" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="value"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="paidValue"> Paid Value R$ </label>
                                    <Field
                                        name="paidValue"
                                        type="number"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category"> Category </label>
                                    <Field
                                        name="category"
                                        type="text"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="category"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description"> Description </label>
                                    <Field
                                        name="description"
                                        type="text"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="transactionType"> Transaction type </label>
                                    <Field
                                        name="transactionType"
                                        type="number"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="transactionType"
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

export default AddMovimentation;