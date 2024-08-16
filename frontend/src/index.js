import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";
//import OTP context provider
import OtpContextProvider from './contexts/provider/OtpContextProvider';
import UsersContextProvider from './contexts/provider/UsersContextProvider';
import { CartProvider } from './contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <UsersContextProvider>
        <OtpContextProvider>
          <CartProvider >
            <App />
          </CartProvider>
        </OtpContextProvider>
      </UsersContextProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals