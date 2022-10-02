import GithubLogo from '../../assets/img/github.svg';
import { Link } from 'react-router-dom';
import './styles.css'
import LogoutBtn from '../LogoutBtn';
import { useState, useEffect } from 'react';

function NavBar() {

    let userName: string = '';
    const [name, setName] = useState(userName);

    useEffect(() => {
        userName = JSON.parse(localStorage.getItem('@FinanceWeb::nameuser')|| '{}');
        if (userName) {
            setName(userName);
        }

    }, [name]);


    return (
        <header>
            <div className="falchi-navbar-container">
                <p>Finance Web</p>
                <Link className="btn btn-primary" to="/Home">Home</Link>
                <Link className="btn btn-primary" to="/Account">Account</Link>
                <Link className="btn btn-primary" to="/Category">Category</Link>
                <Link className="btn btn-primary" to="/Movimentation">Movimentation</Link>
                <LogoutBtn />
                <div>
                    <div className='d-flex'>
                        <p>
                            Repository <a href='https://github.com/Falchizao/FinanceWeb'> <img src={GithubLogo} alt="Falchi" width="60" /></a>
                        </p>
                    </div>
                    <div className='title'>Welcome {name}!</div>
                </div>
            </div>
        </header>

    );
}

export default NavBar;