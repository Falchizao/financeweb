import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Movimentation } from "../../types/movimentation";
import DeleteButton from "../deleteButton"
import EditButton from "../editbutton"
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { PendingMovimentations } from '../../services/authservice';
import './styles.css'

function PendingTransactionsCard() {
    let navigate: NavigateFunction = useNavigate();
    const max = new Date();
    const min = new Date(new Date().setDate(new Date().getDate() - 365)); //For datePicker
    const transactionUrl = '/api/movimentation';

    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);

    const [pendingMovimentations, setMov] = useState<Movimentation[]>([]);

    useEffect(() => {
        const userToken = localStorage.getItem('@FinanceWeb::user'); 
        if (!userToken) {
            navigate("/");
            window.location.reload();
        }

        const dmin = minDate.toISOString().slice(0, 10);
        const dmax = maxDate.toISOString().slice(0, 10);
    
        PendingMovimentations(dmin, dmax).then(response => {
            setMov(response.data);
        });
    }, [minDate, maxDate, navigate]);

    return (
        <div className="component-card">
            <h2 className="title">Pending Transactions</h2>
            <div className="d-flex">
                <div className="falchi-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => setMinDate(date)}
                        className="falchi-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="falchi-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => setMaxDate(date)}
                        className="falchi-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>
            <div>
                <table className="card-table">
                    <thead>
                        <tr>
                            <th>Account Code</th>
                            <th>Value</th>
                            <th>Due Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            {/* <th>Edit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {pendingMovimentations.map(mov => {
                            return (
                                <tr key={mov.id}>
                                    <td>{mov.account.code}</td>
                                    <td>R$ {mov.value.toFixed(2)}</td>
                                    <td>{mov.due_date}</td>
                                    <td>{mov.category.name}</td>
                                    <td>{mov.description}</td>
                                    {/* <td>
                                        <EditButton id={mov.id}/>
                                    </td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PendingTransactionsCard