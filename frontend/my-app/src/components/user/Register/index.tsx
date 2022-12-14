import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { User } from "../../../types/user";
import { UserAuthenticate } from '../../../services/authservice';
import { sleep } from "../../../services/dataservice";
import './styles.css'

const Register: React.FC = () => {
    let navigate: NavigateFunction = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);

    //Init da instance
    const initialValues: User = {
        id: 0,
        username: '',
        displayName: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().test("len", "Username must contains 3-20 caracteres.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        ).required("Required field!"),
        password: Yup.string().test("len", "Password must contains 3-20 caracteres.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
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
                toast.info(error.response.data);
                setSuccessful(false);
            }
        );
    };

    return (
        <div className="container m-5">
            <div className="col-md-12">
                <div className="card card-container bg-navyblue">
                    <h1>FinanceWeb Register</h1>
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
                                        <label htmlFor="username"> Username </label>
                                        <Field name="username" type="text" className="form-control me-1" />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="displayName"> Display Name </label>
                                        <Field name="displayName" type="text" className="form-control me-1" />
                                        <ErrorMessage
                                            name="displayName"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password"> Password </label>
                                        <Field
                                            name="password"
                                            type="password"
                                            className="form-control me-1"
                                        />
                                        <ErrorMessage
                                            name="password"
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
        </div>
    );
};

export default Register;