import Category from './pages/CategoryPage';
import Account from './pages/AccountPage';
import Movimentation from './pages/MovimentationPage';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/Loginpage';
import AddCategoryPage from './pages/Add/Category';
import AddMovimentationPage from './pages/Add/Movimentation';
import AddAccountPage from './pages/Add/Account';

function WebRoutes() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<LoginPage />}>
                </Route>
                <Route path="/Register" element={<RegisterPage />}>
                </Route>
                <Route path="/Home" element={<Home />} >
                </Route>
                <Route path="/Category" element={<Category />}>
                </Route>
                <Route path="/Account" element={<Account />}>
                </Route>
                <Route path="/Movimentation" element={<Movimentation />}>
                </Route>
                <Route path="/Register/Account" element={<AddAccountPage />}>
                </Route>
                <Route path="/Register/Category" element={<AddCategoryPage />}>
                </Route>
                <Route path="/Register/Movimentation" element={<AddMovimentationPage />}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default WebRoutes;