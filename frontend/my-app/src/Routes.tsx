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
                <Route path="/Home" >
                    <Home />                     
                </Route>
                <Route path="/Category">
                    <Category />                     
                </Route>
                <Route path="/Account">
                    <Account />                     
                </Route>
                <Route path="/Movimentation">
                    <Movimentation />                     
                </Route>
                <Route path="/User">
                    <User />                     
                </Route>
            </Routes>        
        </BrowserRouter>
    );
}

export default WebRoutes;