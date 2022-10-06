import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { AddMovimentationsAxios, GetAllAccounts, GetCategories } from '../../../services/authservice';
import { getCustomParseMovimentation } from "../../../utils/parser";
import { sleep } from "../../../services/dataservice";
import { Account } from "../../../types/account";
import { Category } from "../../../types/category";

const AddMovimentation: React.FC = () => {
    let navigate: NavigateFunction = useNavigate();
    const [successful, setSuccessful] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const types = [{ id: '0', name: 'Receita' }, { id: '1', name: 'Despesa' }, { id: '2', name: 'Transferência' }];
    useEffect(() => {
        const userToken = localStorage.getItem('@FinanceWeb::user');
        if (!userToken) {
            navigate("/");
            window.location.reload();
        }
        GetAllAccounts().then(response => {
            setAccounts(response.data);
            console.log(accounts);
        });

        GetCategories().then(response => {
            setCategories(response.data);
        });

    }, [navigate]);

    let typeSelected = 0;
    let typeList = types.length > 0
        && types.map((item: any, i: any) => {
            return (
                <option key={i} value={item.id}>{item.name}</option>
            )
        }, this);
    let selectType = (e: any) => {
        typeSelected = e.target.selectedIndex;
    }

    let accSelected = 0;
    let accList = accounts.length > 0 && accounts.map((item, i) => {
        console.log(item)
        return (
            <option key={i} value={item.id}>{item.bank.concat(' - ')
            .concat(item.bank_branch)
            .concat(' - ')
            .concat(item.code)}</option>
        )
    }, this);
    let selectAcc = (e: any) => {
        accSelected = e.target.selectedIndex;
    }

    let categorySelected = 0;
    let categoryList = categories.length > 0
        && categories.map((item, i) => {
            return (
                <option key={i} value={item.id}>{item.name}</option>
            )
        }, this);
    let selectCategory = (e: any) => {
        categorySelected = e.target.selectedIndex;
    }


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
            Yup.string().oneOf(['0', '1', '2'], "Transaction Type must be valid (0 for Revenue, 1 for Expense, 2 for Transfer)")
                .required("Required field!"),
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
                toast.info(error.response.data);
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
                                {/* <div className="form-group"> */}
                                {/* <label htmlFor="type" style={{ display: "block" }}>
                                        Account Type
                                    </label>
                                    <select
                                        name="types"
                                        value={values.color}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ display: "block" }}
                                    >
                                        <option value="" label="Select a color">
                                            Select a type{" "}
                                        </option>
                                        <option value="red" label="red">
                                            {" "}
                                            red
                                        </option>
                                        <option value="blue" label="blue">
                                            blue
                                        </option>
                                        <option value="green" label="green">
                                            green
                                        </option>
                                    </select>
                                    { && <div className="input-feedback">{errors.color}</div>}
                                </div> */}
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
                                {/* <div className="form-group">
                                    <label htmlFor="type" style={{ display: "block" }}>
                                        Account Type
                                    </label>
                                    <select
                                        name="types"
                                        value={values.color}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ display: "block" }}
                                    >
                                        <option value="" label="Select a color">
                                            Select a type{" "}
                                        </option>
                                        <option value="red" label="red">
                                            {" "}
                                            red
                                        </option>
                                        <option value="blue" label="blue">
                                            blue
                                        </option>
                                        <option value="green" label="green">
                                            green
                                        </option>
                                    </select>
                                    { && <div className="input-feedback">{errors.color}</div>}
                                </div> */}
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
                                <div className=" mb-2">
                                    <div><label htmlFor="type" className="m-1"> Category </label></div>
                                    <select onChange={selectCategory}>
                                        {categoryList}
                                    </select>
                                </div>
                                <div className="mt-1 mb-2">
                                    <div><label htmlFor="type" className="m-1"> Account </label></div>
                                    <select onChange={selectAcc}>
                                        {accList}
                                    </select>
                                </div>
                                
                                <div className="mt-1 mb-4">
                                    <div><label htmlFor="type" className="m-1"> Type </label></div>
                                    <select onChange={selectType}>
                                        {typeList}
                                    </select>
                                </div>
                                {/* <div className="form-group">
                                    <label htmlFor="type" style={{ display: "block" }}>
                                        Account Type
                                    </label>
                                    <select
                                        name="types"
                                        value={values.color}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ display: "block" }}
                                    >
                                        <option value="" label="Select a color">
                                            Select a type{" "}
                                        </option>
                                        <option value="red" label="red">
                                            {" "}
                                            red
                                        </option>
                                        <option value="blue" label="blue">
                                            blue
                                        </option>
                                        <option value="green" label="green">
                                            green
                                        </option>
                                    </select>
                                    { && <div className="input-feedback">{errors.color}</div>}
                                </div> */}
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