import { useEffect, useState } from "react";
import { Movimentation } from "../../types/movimentation";
import AddButton from "../addbutton"
import DeleteButton from "../deleteButton"
import EditButton from "../editbutton"
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { GetMovimentations } from '../../services/authservice';

function TransactionsCard(){
    let navigate: NavigateFunction = useNavigate();
    const [movimentations, setMov] = useState<Movimentation[]>([]);
    const transactionUrl = '/api/movimentation';

    useEffect(() => {
        const userToken = localStorage.getItem('@FinanceWeb::user'); 
        if (!userToken) {
            navigate("/");
            window.location.reload();
        }
        GetMovimentations().then(response => {
            setMov(response.data);
        });
    }, [navigate]);


    return (
        <div className="component-card">
            <h2 className="title">All Transactions</h2>
            <div className="d-flex text-white">
                <div className="me-3"><h4>Add a new Movimentation</h4></div>
                <div><AddButton /></div>
            </div>
            <div>
                <table className="card-table">
                    <thead>
                        <tr>
                            <th>Account</th>
                            <th>Value</th>
                            <th>Payment Day</th>
                            <th>Due Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            {/* <th>Edit</th>
                            <th>Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {movimentations.map(mov => {
                            return (
                                <tr key={mov.id}>
                                    <td>{mov.account.code}</td>
                                    <td>R$ {mov.value.toFixed(2)}</td>
                                    <td>{mov.paymentDate}</td>
                                    <td>{mov.due_date}</td>
                                    <td>{mov.category.name}</td>
                                    <td>{mov.description}</td>
                                    {/* <td>
                                        <EditButton id={mov.id}/>
                                    </td> */}
                                    {/* <td>
                                        <DeleteButton id={mov.id} url={transactionUrl} />
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

export default TransactionsCard