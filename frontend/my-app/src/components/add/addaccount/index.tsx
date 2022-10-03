import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { AddAccountAxios } from '../../../services/authservice';
import { getCustomParse } from "../../../utils/parser";

const AddAccount: React.FC = () => {
    let navigate: NavigateFunction = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);
    const sleep = () => new Promise(r => setTimeout(r, 2000));

    //Init da instance
    const initialValues: any = {
        bank: '',
        code: '',
        agency: '',
        type: ''
    };

    const validationSchema = Yup.object().shape({
        bank: Yup.string().test("len", "Nome do banco deve conter entre 3 e 20 caracteres.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        ).required("Campo obrigatório!"),
        code: Yup.string().test("len", "O código deve possuir entre 3 e 20 caracteres.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        )
            .required("Campo obrigatório!"),
        agency: Yup.string().test("len", "A agencia deve possuir 5 caracteres.",
            (val: any) =>
                val &&
                val.toString().length === 5
        )
            .required("Campo obrigatório!"),
        type: Yup.string().test("len", "O tipo deve ser válido",
            (val: any) =>
                val &&
                val.toString().length < 10
        )
            .required("Campo obrigatório!"),
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
                toast.info(error);
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