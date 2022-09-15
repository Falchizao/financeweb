import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Movimentation } from "../../types/movimentation";
import { BASE_URL } from "../../utils/requests";
import DeleteButton from "../deleteButton"
import EditButton from "../editbutton"
import { toast } from 'react-toastify'
import './styles.css'

function PendingTransactionsCard() {

    const max = new Date();
    const min = new Date(new Date().setDate(new Date().getDate() - 365)); //For datePicker
    const transactionUrl = '/api/movimentation';

    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);

    const [pendingMovimentations, setMov] = useState<Movimentation[]>([]);

    useEffect(() => {
        const dmin = minDate.toISOString().slice(0, 10);
        const dmax = maxDate.toISOString().slice(0, 10);
    
        let urlfind = BASE_URL.concat(transactionUrl);
        axios.get(`${urlfind}/pending?minDate=${dmin}&maxDate=${dmax}`)
            .then(response => {
                console.log(response);
                setMov(response.data);
                toast.info("Fetching succeded");
            });
    }, [minDate, maxDate]);

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
                            <th>Edit</th>
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
                                        <EditButton id={mov.id}/>
                                    </td>
                                    <td>
                                        <DeleteButton id={mov.id} url={transactionUrl} />
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