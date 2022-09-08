import GithubLogo from '../../assets/img/github.svg' ;
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="navbar navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" ></button>
            <div className=" text-white" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link className="btn btn-primary btn-lg" to="/">Home</Link>
                <Link className="btn btn-primary btn-lg" to="/Account">Account</Link>
                <Link className="btn btn-primary btn-lg" to="/Category">Category</Link>
                <Link className="btn btn-primary btn-lg" to="/User">User</Link>
                <Link className="btn btn-primary btn-lg" to="/Movimentation">Movimentation</Link>
                <a href='https://github.com/Falchizao/FinanceWeb'> <img src={GithubLogo} alt="Falchi" width="60" /></a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;