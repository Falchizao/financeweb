import WebRoutes from "./Routes";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
    <WebRoutes />
    </>
  );
}

export default App;
