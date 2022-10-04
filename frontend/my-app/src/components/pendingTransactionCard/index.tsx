import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Movimentation } from "../../types/movimentation";
import DeleteButton from "../deleteButton"
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { PendingMovimentations } from '../../services/authservice';
import './styles.css'

function PendingTransactionsCard() {
    let navigate: NavigateFunction = useNavigate();
    const max = new Date();
    const min = new Date(new Date().setDate(new Date().getDate() - 365)); //For datePicker
    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);
    const [pendingMovimentations, setMov] = useState<Movimentation[]>([]);
    const [totalPending, setPending] = useState<number>(0);

    useEffect(() => {
        const userToken = localStorage.getItem('@FinanceWeb::user');
        if (!userToken) {
            navigate("/");
            window.location.reload();
        }

        const dmin = minDate.toISOString().slice(0, 10);
        const dmax = maxDate.toISOString().slice(0, 10);

        const fetchMovimentations = async () => {
            const response = await PendingMovimentations(dmin, dmax)
            const movimentations = response.data
            const pendings =  response.data.reduce((acc : any, obj : any) => acc + obj.value, 0)
                
            setMov(movimentations)
            setPending(pendings)
        }

        fetchMovimentations()

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
            <h3 className="title">Total outstanding: R${totalPending}</h3>
            <div>
                <table className="card-table">
                    <thead>
                        <tr>
                            <th>Account Code</th>
                            <th>Value</th>
                            <th>Due Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Delete</th>
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
                                    <td>
                                        <DeleteButton id={mov.id} deletionSector={2}/>
                                    </td>
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