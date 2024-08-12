import './App.css';
import React from 'react';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import ApproveUser from './pages/ApproveUser'
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';
import UsersTable from './pages/TableView';
import AdminHome from './pages/AdminHome';
import ExpendedProduct from './components/ExpendedProduct';
import Cart from './components/Cart';
import Footer from './components/Footer';
import About from './components/About';

import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element = {<SignupPage />}/>
        <Route index  path="/login" element = {<LoginPage />}/>
        <Route path='/resetPassword' element = {<ResetPassword />} />
        <Route path='/otpVerification' element = {<OtpVerification />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/homepage/:productName" element={<ExpendedProduct />} />
        <Route path="/approveUser" element={<ApproveUser />} />
        <Route path='/usersTableView' element = {<UsersTable />} />
        <Route path='/AdminHome' element = {<AdminHome />} />
        <Route path='/cart' element = {<Cart />} />
        <Route path='/about' element = { <About /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;