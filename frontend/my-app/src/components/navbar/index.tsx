import GithubLogo from '../../assets/img/github.svg';
import { Link } from 'react-router-dom';
import './styles.css'
import LogoutBtn from '../LogoutBtn';
import { useState, useEffect } from 'react';

function NavBar() {

    let userName: string = '';
    const [name, setName] = useState(userName);

    useEffect(() => {
        userName = JSON.parse(localStorage.getItem('@FinanceWeb::nameuser') || '{}');
        if (userName) {
            setName(userName);
        }

    }, [name]);


    return (
        <header>
            <div className="falchi-navbar-container">
                <h1 className='title ms-3'>Finance Web</h1>
                <Link className="btn btn-primary" to="/Home">Home</Link>
                <Link className="btn btn-primary" to="/Account">Account</Link>
                <Link className="btn btn-primary" to="/Category">Category</Link>
                <Link className="btn btn-primary" to="/Movimentation">Movimentation</Link>
                <div className='title'>
                    <div >Welcome</div>
                    <div>{name}!</div>
                </div>
                <a href='https://github.com/Falchizao/FinanceWeb'> <img src={GithubLogo} alt="Falchi" width="60" /></a>
                <LogoutBtn/>
            </div>
        </header>

    );
}

export default NavBar;