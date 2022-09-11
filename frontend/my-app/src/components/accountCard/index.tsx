import axios from "axios";
import { useEffect, useState } from "react"
import AddButton from "../addbutton"
import DeleteButton from "../deleteButton"
import { BASE_URL } from '../../utils/requests';
import EditButton from "../editbutton"
import { Account } from '../../types/account'

function AccountCard() {

    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/account`)
            .then(response => {
                setAccounts(response.data.content);
            });
    }, []);

    return (
        <div className="component-card">
            <h2 className="title">Your Accounts</h2>
            <div className="d-flex text-white">
                <AddButton /> <h4>  Add a new Account</h4>
            </div>
            <div>
                <table className="card-table">
                    <thead>
                        <tr className="pe-10">
                            <th className="nd">User</th>
                            <th className="nd">Code</th>
                            <th className="nd">Bank Branch</th>
                            <th className="nd">Bank</th>
                            <th className="nd">Type</th>
                            <th className="nd">Edit</th>
                            <th className="nd">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(account => {
                            return (
                                <tr key={account.code}>
                                    <td>{account.user.displayname}</td>
                                    <td>{account.user.displayname}</td>
                                    <td>{account.bank_branch}</td>
                                    <td>{account.bank}</td>
                                    <td>{account.accountType}</td>
                                    <td>
                                        <EditButton id={account.id}/>
                                    </td>
                                    <td>
                                        <DeleteButton id={account.id} />
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

export default AccountCard