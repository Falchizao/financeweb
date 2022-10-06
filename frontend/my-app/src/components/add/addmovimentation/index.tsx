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

    let accSelected: number = 0;
    let typeSelected: number = 0;
    let categorySelected: number = 0;

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
        });

        GetCategories().then(response => {
            setCategories(response.data);
            
        });

    }, [navigate]);

    let typeList = types.length > 0
        && types.map((item: any, i: any) => {
            return (
                <option key={i} value={item.id}>{item.name}</option>
            )
        }, this);
    let selectType = (e: any) => {
        typeSelected = e.target.value;
    }

    let accList = accounts.length > 0 && accounts.map((item, i) => {
        return (
            <option key={i} value={item.id}>{item.bank.concat(' - ')
            .concat(item.code)
            .concat(' - ')
            .concat(item.bank_branch)}</option>
        )
    }, this);
    let selectAcc = (e: any) => {
        accSelected = e.target.value;
    }

    let categoryList = categories.length > 0
        && categories.map((item, i) => {
            return (
                <option key={i} value={item.id}>{item.name}</option>
            )
        }, this);
    let selectCategory = (e: any) => {
        categorySelected = e.target.value;
    }

    //Init da instance formik
    const initialValues: any = {
        value: 0,
        due_date: '',
        paidValue: 0,
        paymentDate: '',
        description: '',
    };

    const validationSchema = Yup.object().shape({
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
        ).required("Required field!"),
        description: Yup.string().test("len", "Description must contains at least 1 character",
            (val: any) =>
                val &&
                val.toString().length >= 1
        ).required("Required field!"),
    });

    const handleRegister = (formValue: any) => {
        debugger;
        if(accounts.length > 0 && accSelected === 0)accSelected = accounts[0].id;
        if(categories.length > 0 && categorySelected === 0) categorySelected = categories[0].id;
        AddMovimentationsAxios(getCustomParseMovimentation(formValue,typeSelected,accSelected, categorySelected)).then(async (response) => {
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
                                    <label htmlFor="value"> Value R$ </label>
                                    <Field name="value" type="text" className="form-control" placeholder="value"/>
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
                                        type="text"
                                        className="form-control"
                                        placeholder="paid value"
                                    />
                                    <ErrorMessage
                                        name="paidValue"
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
                                        placeholder="yyyy-mm-dd"
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
                                        placeholder="yyyy-mm-dd"
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
                                        placeholder="description"
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