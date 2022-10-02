import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { UserLogin } from '../../../services/authservice';
import { toast } from "react-toastify";

type Props = {}

const Login: React.FC<Props> = () => {
    let navigate: NavigateFunction = useNavigate();

    const init: {
        username: string;
        password: string;
    } = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Required field!"),
        password: Yup.string().required("Required field!"),
    });

    const handleLogin = (formValue: { username: string; password: string }) => {
        UserLogin(formValue).then(
            () => {
                navigate("/home");
                window.location.reload();
            },
            (error) => {
                toast.info("Not found in system!");
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <h1>FinanceWeb Login</h1>
                <Formik
                    initialValues={init}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className="form-control" />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className=" m-1">
                            <a href="/register"> Not registered? </a>
                            <div className="form-group mt-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    <span>Login</span>
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;