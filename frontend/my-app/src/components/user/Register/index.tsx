import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { User } from "../../../types/user";
import { UserAuthenticate } from '../../../services/authservice';

const Register: React.FC = () => {
    let navigate: NavigateFunction = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);

    const sleep = () => new Promise(r => setTimeout(r, 2000));

    //Init da instance
    const initialValues: User = {
        id: 0,
        username: '',
        displayName: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().test("len", "Nome de usuário deve conter entre 3 e 20 caracteres.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        ).required("Campo obrigatório!"),
        password: Yup.string().test("len", "A senha deve possuir entre 3 e 20 caracteres.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        )
            .required("Campo obrigatório!"),
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
                                    <label htmlFor="username"> Nome de usuário </label>
                                    <Field name="username" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="displayName"> Nome de display </label>
                                    <Field name="displayName" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="displayName"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"> Senha </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>
                                <div className="form-group m-1">
                                    <button type="submit" className="btn btn-primary btn-block">Registrar</button>
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;