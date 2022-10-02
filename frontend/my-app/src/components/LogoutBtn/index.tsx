import logoutButton from '../../assets/img/logout.svg'
import {Logout} from '../../services/authservice';
import './styles.css'


function handleClick() {
    Logout();
}

function LogoutBtn(){
    return(
        <div className="falchi-logout-btn" onClick={() => handleClick()}>
            <img src={logoutButton} alt="logout" />    
        </div>
    )
}

export default LogoutBtn