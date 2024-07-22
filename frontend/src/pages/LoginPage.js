import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
// import ReactDOM from 'react-dom';
import EmailLinkPage from './EmailLinkPage';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError , setPasswordError] = useState('');
  const [isApprovedByAdmin, setIsApprovedByAdmin] = useState('');

  //state variable for opening and closing the send email modal
  const [isOpenModel , setIsOpenModel] = useState(false);

  const navigate = useNavigate();
  const user = {email, password};

  const validateInputs = (e)=>{
    try {
      e.preventDefault();
      if(email.trim() === ''){
        setEmailError("The email address can not be empty.")
        setTimeout(() => {
          setEmailError('');
        }, 3000);
        return
      }
      else if(!email.includes('@') || !email.includes('.') || email.length < 5 || email.length > 50){
        setEmailError("This is not a proper email address. Try again with a proper email address");
        setTimeout(() => {
          setEmailError('');
        }, 3000);

        return
      }
      else if(password.trim() === ''){
        setPasswordError("Empty Password. Try again with a valid password. Or click on   Forgot Password to reset your password.");
        setTimeout(() => {
          setPasswordError('');
        }, 3000);
        return
      }

      //check if password contains a number, a special character and a capital letter
      else if(!password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/)){
        setPasswordError("Password must contain a number, a special character and a capital letter.");
        setTimeout(() => {
          setPasswordError('');
        }, 3000);
        return
      }

      else{
        //use fetch api to make http request to the server
        fetch('http://localhost:3001/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(user)
        })
        .then((response)=>{
          return response.json();
        })
        .then((data)=>{ 
          console.log(data);
          if(data.success && data.isApprovedByAdmin){
            setIsApprovedByAdmin('');
            localStorage.setItem('token', data.token);

            //if user is admin then navigate to the approve user page else navigate to the homepage
            if(data.isAdmin){
              navigate("/AdminHome");
            }
            else{
              navigate("/homepage");
            }
          }
          else{
            setIsApprovedByAdmin(data.message);
            setTimeout(() => {
              setIsApprovedByAdmin('');
            }, 3000);
          }
        })
        .catch((error)=>{
          setIsApprovedByAdmin("An error occurred. Try again later.");
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='login-main-div'>
      
      <h1 id='facebook-logo-txt'>MART</h1>
      <div className='login-div'>
            <div className='login-fields-div'>
              <p>Log into MART</p>
              <form onSubmit={validateInputs}>
                  <label htmlFor='email-field'>Email</label>
                  <input className='email input-field' id='email-field' autoFocus placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  {emailError && <p className='error-msg'>{emailError}</p>}

                  <label htmlFor='password-field'>Password</label>
                  <input className='password input-field' id='password-field' placeholder='Password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  {passwordError && <p className='error-msg'>{passwordError}</p>}
                  <button className='login-btn btn' onClick={validateInputs}>Log In</button>

                  {/* admin approve message */}
                  {isApprovedByAdmin && <p className='error-msg'>{isApprovedByAdmin}</p>}
              </form>
            </div>
            <div className='signup-link-div'>
              <Link className='link' onClick={()=> setIsOpenModel(true)}>Forgot Password? - </Link>
              <Link className='link' to= "/signup">Sign Up for MART</Link>
            </div>
            <EmailLinkPage open={isOpenModel} onClose={()=> setIsOpenModel(false)}/>
          </div>
    </div>
  )
}

export default LoginPage
