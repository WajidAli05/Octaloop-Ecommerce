import React, { useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  UserContext  from '../contexts/UserContext';


function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpVerifiedMsg , setOtpVerifiedMsg] = useState('');

  const {user} = useContext(UserContext);

  //function for handling input change
  const handleInputChange = (e) => {
    const value = e.target.value;

    //show error if user enters letters or special characters
    if (isNaN(value)) {
      setOtpError('The OTP is invalid. Please enter a valid OTP.');
      console.log('The OTP is invalid. Please enter a valid OTP.');
      setTimeout(() => {
        setOtpError('');
      }, 3000);
      return;
    }

    setOtp(value);
  };


  //function to handle back button click
  const handleBackClick = () => {
    navigate('/login');
  };

  //function to verify OTP
  const verifyOTP = (e) => {
    try {
      if (otp.trim() === '') {
        setOtpError('The OTP is empty. Enter the OTP sent to your email address.');
        setTimeout(() => {
          setOtpError('');
        }, 3000);
        return;
      }

      //call verify OTP API
      fetch('http://localhost:3001/verifyOTP' , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body : JSON.stringify({email : user.email , otp : otp})
      })
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        if(data.success){
          console.log(user.email);
          setOtpVerifiedMsg('OTP verified successfully');
          setTimeout(() => {
            setOtpVerifiedMsg('');
            setOtp('');
            setOtpError('');
            navigate('/resetPassword');
          }, 3000);
        }
        else{
          setOtpError('The OTP is invalid. Please enter a valid OTP.');
          setTimeout(() => {
            setOtpError('');
          }, 3000);
        }
      })
      .catch((error)=>{
        setOtpError('Error verifying OTP. Try again later.');
        setTimeout(() => {
          setOtpError('');
        }, 3000);
      })

    } catch (error) {
      setOtpError(error.message);
      setTimeout(() => {
        setOtpError('');
      }, 3000);
    }
  };

  return (
    <div className='otp-div'>
      <h1>Verify OTP</h1>
      <p>We have sent you an OTP for verification</p>
      <input
        className='input-field'
        placeholder='OTP here'
        value={otp}
        onChange={handleInputChange}
        maxLength={6}
      />
      {otpError && <p className='error'>{otpError}</p>}
      {otpVerifiedMsg && <p className='success'>{otpVerifiedMsg}</p>}
      <div>
        <button className='btn' onClick={verifyOTP}>Verify</button>
        <button className='alert-btn btn' onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
}

export default OtpVerification;
