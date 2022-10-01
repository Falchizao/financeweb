import Category from './pages/CategoryPage';
import Account from './pages/AccountPage';
import Movimentation from './pages/MovimentationPage';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/Loginpage';

function WebRoutes() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/Home" element={<Home />  } >    
                </Route>
                <Route path="/Category" element={<Category />}>                                         
                </Route>
                <Route path="/Account" element={<Account />}>                                         
                </Route>
                <Route path="/Movimentation" element={<Movimentation />}>                                         
                </Route>
                <Route path="/" element={<LoginPage />}>                                         
                </Route>
                <Route path="/Register" element={<RegisterPage />}>                                         
                </Route>
            </Routes>        
        </BrowserRouter>
    );
}
export default WebRoutes;