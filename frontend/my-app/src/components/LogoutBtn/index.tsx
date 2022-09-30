import { useNavigate } from 'react-router-dom';


const history = useNavigate();

function Logout() {
    localStorage.removeItem("@FinanceWeb::user");
    history("/login");
}

export default Logout