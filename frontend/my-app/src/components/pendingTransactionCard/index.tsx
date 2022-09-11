import axios from "axios";
import { useEffect, useState } from "react";
import { Movimentation } from "../../types/movimentation";
import { BASE_URL } from "../../utils/requests";
import DeleteButton from "../deleteButton"
import EditButton from "../editbutton"
import './styles.css'

function PendingTransactionsCard() {

    const [pendingMovimentations, setMov] = useState<Movimentation[]>([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/movimentation`)
            .then(response => {
                setMov(response.data.content);
            });
    }, []);

    return (
        <div className="component-card">
            <h2 className="title">Pending Transactions</h2>
            <div>
                <table className="card-table">
                    <thead>
                        <tr className="pe-10">
                            <th className="nd">Account</th>
                            <th className="nd">Value</th>
                            <th className="nd">Due Date</th>
                            <th className="nd">Category</th>
                            <th className="nd">Description</th>
                            <th className="nd">Edit</th>
                            <th className="nd">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingMovimentations.map(mov => {
                            return (
                                <tr key={mov.id}>
                                    <td>{mov.account.code}</td>
                                    <td>{mov.value}</td>
                                    <td>{mov.due_date}</td>
                                    <td>{mov.category.name}</td>
                                    <td>{mov.description}</td>
                                    <td>
                                        <EditButton id={mov.id}/>
                                    </td>
                                    <td>
                                        <DeleteButton id={mov.id} />
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