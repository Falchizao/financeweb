import Category from './pages/CategoryPage';
import Account from './pages/AccountPage';
import Movimentation from './pages/MovimentationPage';
import User from './pages/UserPage';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes as Links, Route} from "react-router-dom";

function Routes() {
    return (
        <Router>
            <Links >
                <Route path="/" >
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
            </Links>        
        </Router>
    );
}

export default Routes;