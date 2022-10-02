import GithubLogo from '../../assets/img/github.svg' ;
import { Link } from 'react-router-dom';
import './styles.css'
import LogoutBtn from '../LogoutBtn';

function NavBar() {
    return (
        <header>
            <div className="falchi-navbar-container">
                    <p>Finance Web</p>
                    <Link className="btn btn-primary" to="/Home">Home</Link>
                    <Link className="btn btn-primary" to="/Account">Account</Link>
                    <Link className="btn btn-primary" to="/Category">Category</Link>
                    <Link className="btn btn-primary" to="/Movimentation">Movimentation</Link>
                    <LogoutBtn/>
                    <div className='d-flex'>
                        <p>
                            Repository <a href='https://github.com/Falchizao/FinanceWeb'> <img src={GithubLogo} alt="Falchi" width="60" /></a>
                        </p>
                    </div>

            </div>
        </header>

    );
}

export default NavBar;