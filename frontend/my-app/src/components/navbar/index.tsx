import GithubLogo from '../../assets/img/github.svg' ;
import { Link } from 'react-router-dom';
import './styles.css'

function NavBar() {
    return (
        <header>
            <div className="falchi-navbar-container">
                    <p>Finance Web</p>
                    <Link className="btn btn-primary" to="/">Home</Link>
                    <Link className="btn btn-primary" to="/Account">Account</Link>
                    <Link className="btn btn-primary" to="/Category">Category</Link>
                    <Link className="btn btn-primary" to="/Movimentation">Movimentation</Link>
                    <Link className="btn btn-primary" to="/Login">LogOut</Link>
                    <div className='d-flex'>
                        <p>
                            Repositório: <a href='https://github.com/Falchizao/FinanceWeb'> <img src={GithubLogo} alt="Falchi" width="60" /></a>
                        </p>
                    </div>

            </div>
        </header>

    );
}

export default NavBar;