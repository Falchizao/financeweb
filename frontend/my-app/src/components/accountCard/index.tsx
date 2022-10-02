import { useEffect, useState } from "react"
import AddButton from "../addbutton"
import DeleteButton from "../deleteButton"
import EditButton from "../editbutton"
import { Account } from '../../types/account'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { GetAllAccounts } from '../../services/authservice';


function AccountCard() {
    let navigate: NavigateFunction = useNavigate();
    const [accounts, setAccounts] = useState<Account[]>([]);

    const accountsUrl = '/api/account';

    useEffect(() => {
        const userToken = localStorage.getItem('@FinanceWeb::user'); 
        if (!userToken) {
            navigate("/");
            window.location.reload();
        }
        GetAllAccounts().then(response => {
            setAccounts(response.data);
        });

    }, [navigate]);

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
                            {/* <th>Edit</th> */}
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
                                    {/* <td>
                                        <EditButton id={account.id}/>
                                    </td> */}
                                    <td>
                                        <DeleteButton id={account.id} deletionSector={1} />
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