import axios from "axios";
import { useEffect, useState } from "react"
import AddButton from "../addbutton"
import DeleteButton from "../deleteButton"
import { BASE_URL } from '../../utils/requests';
import EditButton from "../editbutton"
import { Account } from '../../types/account'

function AccountCard() {

    const [accounts, setAccounts] = useState<Account[]>([]);

    const accountsUrl = '/api/account';

    useEffect(() => {
        axios.get(`${BASE_URL}/api/account`)
            .then(response => {
                setAccounts(response.data);
            });
    }, []);

    return (
        <div className="component-card">
            <h2 className="title">Your Accounts</h2>
            <div className="d-flex text-white">
                <div className="me-3"><h4>Add a new Account</h4></div>
                <div><AddButton /></div>
            </div>
            <div>
                <table className="card-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Code</th>
                            <th>Bank Branch</th>
                            <th>Bank</th>
                            <th>Type</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(account => {
                            return (
                                <tr key={account.id}>
                                    <td>{account.user.displayName}</td>
                                    <td>{account.code}</td>
                                    <td>{account.bank_branch}</td>
                                    <td>{account.bank}</td>
                                    <td>{account.accountType}</td>
                                    <td>
                                        <EditButton id={account.id}/>
                                    </td>
                                    <td>
                                        <DeleteButton id={account.id} url={accountsUrl} />
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