import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
  const [password , setPassword] = useState('');
  const [passwordError , setPasswordError] = useState('');
  const [passwordResetMsg , setPasswordResetMsg] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');
  const [confirmPasswordError , setConfirmPasswordError] = useState('');
  const [passwordResetError , setPasswordResetError] = useState('');

  const navigate = useNavigate();

  //onCancel navigate user back to the login page
  const onCancel = () => {
    navigate('/login');
  }

  //validate field values
  const validateInputs = async (password , confirmPassword) => {
    //check if password field is empty
    if (password === '') {
      setPasswordError('Password field cannot be empty');
      setTimeout(() => {
        setPasswordError('');
      }, 3000);
      return
    }
    //check if password contains a number, a special character and a capital letter
    else if (!password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/)) {
      setPasswordError("Password must contain a number, a special character and a capital letter.");
      setTimeout(() => {
        setPasswordError('');
      }, 3000);
      return
    }

    //check password length
    else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setTimeout(() => {
        setPasswordError('');
      }, 3000);
      return
    }

    //check if password and confirm password are the same
    else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match. Try again with the same password.");
      setTimeout(() => {
        setConfirmPasswordError('');
      }, 3000);
      return
    }
  }

  //reset password
  const resetPassword = async () => {
    try {
      //first of all validate the inputs
      await validateInputs(password , confirmPassword);

      //if all inputs are valid, reset password by calling backend API
      //this is a PUT API call to reset password
      fetch('http://localhost:3001/user/reset-password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ password , confirmPassword })
        }
      )
      .then((response)=>response.json())
      .then((data)=>{
        if(data.success){
          setPasswordResetMsg(data.message);
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
        else{
          setPasswordResetError(data.message);
        }
      })
      .catch((error)=>{
        setPasswordResetError('Failed to reset password');
      })

    } catch (error) {
      setPasswordResetError('Failed to reset password');
    }
  }


  return (
    <>
      <div className='modal-overlay'></div>
      <div className='forgot-password-div'>
        <h1>Reset Password</h1>
        <p>It will be a quick run!</p>
        <input className='input-field' type='password' placeholder='New Password Here' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        {passwordError && <p className='error-msg error'>{passwordError}</p>}

        <input className='input-field' type='password' placeholder='Confirm New Password Here' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        {confirmPasswordError && <p className='error-msg error'>{confirmPasswordError}</p>}

        {passwordResetMsg && <p className='success'>{passwordResetMsg}</p>}
        {passwordResetError && <p className='error-msg error'>{passwordResetError}</p>}

        <div>
          <button className='btn' onClick={resetPassword}>Confirm</button>
          <button className='alert-btn btn' onClick={onCancel} >Cancel</button>
        </div>
    </div>
    </>
  )
}

export default ResetPassword
