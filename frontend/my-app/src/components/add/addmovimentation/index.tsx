import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { AddMovimentationsAxios } from '../../../services/authservice';
import { getCustomParseMovimentation } from "../../../utils/parser";
import { sleep } from "../../../services/dataservice";

const AddMovimentation: React.FC = () => {
    let navigate: NavigateFunction = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);

    //Init da instance
    const initialValues: any = {
        code: '',
        bank_branch: '',
        bank: '',
        value: 0,
        due_date: '',
        paidValue: 0,
        paymentDate: '',
        name: '',
        description: '',
        transactionType: ''
    };

    const validationSchema = Yup.object().shape({
        code: Yup.string().test("len", "Bank code must contains 3 characters",
            (val: any) =>
                val &&
                val.toString().length === 3
        ).required("Required field!"),
        bank_branch: Yup.string().test("len", "Agency number must contains 5 characters.",
            (val: any) =>
                val &&
                val.toString().length === 5
        ).required("Required field!"),
        bank: Yup.string().test("len", "Bank name must contains 3-20 characters.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        ).required("Required field!"),
        value: Yup.string().test("len", "Transaction Value must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 1 &&
                val >= 0
        ).required("Required field!"),
        paidValue: Yup.string().test("len", "Paid Value must be valid",
            (val: any) =>
                val &&
                val.toString().length >= 1 &&
                val >= 0
        ),
        name: Yup.string().test("len", "Category name must contains 3-20 characters.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        ).required("Required field!"),
        description: Yup.string().test("len", "Description must contains at least 1 character",
            (val: any) =>
                val &&
                val.toString().length >= 1
        ).required("Required field!"),
        transactionType: 
            Yup.string().test("len", "Transaction Type must be valid (0 for Revenue, 1 for Expense, 2 for Transfer)",
            (val: any) =>
                val &&
                val.toString().length == 1
        ).required("Required field!"),
    });

    const handleRegister = (formValue: any) => {
        AddMovimentationsAxios(getCustomParseMovimentation(formValue)).then(async (response) => {
            toast.info('Registered with success');
            setSuccessful(true);

            await sleep();
            navigate("/Movimentation");
            window.location.reload();
        },
            (error) => {
                toast.info("Error, try again!");
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
                                    <label htmlFor="bank"> Account Bank </label>
                                    <Field name="bank" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="bank"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bank_branch"> Account Agency </label>
                                    <Field name="bank_branch" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="bank_branch"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="code"> Account Code </label>
                                    <Field name="code" type="number" className="form-control" />
                                    <ErrorMessage
                                        name="code"
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
                                    <label htmlFor="name"> Category name </label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="paymentDate"> Payment Date </label>
                                    <Field
                                        name="paymentDate"
                                        type="text"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="paymentDate"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="due_date"> Due Date </label>
                                    <Field
                                        name="due_date"
                                        type="text"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="due_date"
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
                                        type="text"
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