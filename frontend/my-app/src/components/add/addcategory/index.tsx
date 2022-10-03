import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { AddCategoryAxios } from '../../../services/authservice';

const AddCategory: React.FC = () => {
    let navigate: NavigateFunction = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);

    const sleep = () => new Promise(r => setTimeout(r, 2000));

    //Init da instance
    const initialValues: any = {
        name: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().test("len", "Category name must contains 3-20 caracteres.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        ).required("Required field!"),
    });

    const handleRegister = (formValue: any) => {
        AddCategoryAxios(formValue).then(async (response) => {
            toast.info('Registered with success');
            setSuccessful(true);
            await sleep();
            navigate("/Category");
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
                <h1>Register a new category!</h1>
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
                                    <label htmlFor="name"> Category Name </label>
                                    <Field name="name" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="name"
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

export default AddCategory;