import Category from './pages/CategoryPage';
import Account from './pages/AccountPage';
import Movimentation from './pages/MovimentationPage';
import User from './pages/UserPage';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function WebRoutes() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<Home />  } >    
                </Route>
                <Route path="/Category" element={<Category />}>                                         
                </Route>
                <Route path="/Account" element={<Account />}>                                         
                </Route>
                <Route path="/Movimentation" element={<Movimentation />}>                                         
                </Route>
                <Route path="/Login" element={<User />}>                                         
                </Route>
            </Routes>        
        </BrowserRouter>
    );
}
export default WebRoutes;