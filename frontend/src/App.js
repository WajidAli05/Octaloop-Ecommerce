import './App.css';
import React from 'react';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import ApproveUser from './pages/ApproveUser'
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';
import UsersTableView from './components/UsersTableView';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect } from 'react';

import { Routes, Route} from "react-router-dom";

function App() {

  useEffect(() => {
    // navigate("/login");
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path='/signup' element = {<SignupPage />}/>
        <Route path="/approveUser" element={<ApproveUser />} />
        <Route index  path="/login" element = {<LoginPage />}/>
        <Route path='/otpVerification' element = {<OtpVerification />} />
        <Route path='/resetPassword' element = {<ResetPassword />} />
        <Route path='/usersTableView' element = {<UsersTableView />} />
        <Route path='/adminDashboard' element = {<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
