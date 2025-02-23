import React from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';


import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HomePage from './pages/HomePage';
import EmployeePage from './pages/EmployeePage';
import VendorPage from './pages/VendorPage';
import LoginPage from './pages/LoginPage';
import EmailLogList from './components/Email/EmailLogList';
import NavBar from './components/NavBar/NavBar';

function App() {

  const navigate = useNavigate();
  
    const handleLogout =() =>{
      console.log("shdjhsbdhasbd");
        localStorage.removeItem("token");
        
        navigate("/login");

    }

  return (
    <div>
      <NavBar handleLogout={handleLogout}/>
      <div className="container  mt-3">
        <Routes>
          <Route path="/" exact element={<HomePage/>} />
          <Route path="/employees" element={<EmployeePage/>} />
          <Route path="/vendors" element={<VendorPage/>} />
          <Route path='/vendors/emails' element={<EmailLogList/>}/>
          <Route path="login" element={<LoginPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
