import React , {useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import OtpContext from '../contexts/contexts/OtpContext';

function EmailLinkPage({open , onClose}) {
    const [email , setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSentMsg, setEmailSentMsg] = useState('');

    const {setOtp} = useContext(OtpContext);

    const navigate = useNavigate();

    if(!open){
      return null;
    }


    //function for sending email
    const sendEmail = async (email) => {
      try {
        fetch('http://localhost:3001/sendOTP'
          ,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email})
          }
        )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if(data.success){
            //first store the token in the local storage
            localStorage.setItem('token', data.token);
            setEmailSentMsg('Email sent successfully');
            setTimeout(() => {

            //improved over local storage
            setOtp({email});
              setEmailError('');
              setEmailSentMsg('');
              setEmail('');
              navigate('/otpVerification');
            }, 3000);
          }
        })
        .catch((error) => {
          setEmailError('Error sending email. Try again later.');
          setTimeout(() => {
            setEmailError('');
          }, 3000)
      })
      } catch (error) {
        setEmailError(error.message);
        setTimeout(() => {
          setEmailError('');
        }, 3000);
      }
    }

    //function to access getUser API
    const verifyUser =  (e) => {
      try{
        e.preventDefault();
        if(email.trim() === ''){
          setEmailError("The email address you entered isn't connected to an account.")
          setTimeout(() => {
            setEmailError('');
          }, 3000);
          return
        }
        else if(!email.includes('@') || !email.includes('.') || email.length < 11 || email.length > 50){
          setEmailError("This is not a proper email address. Try again with a proper email address");
          setTimeout(() => {
            setEmailError('');
          }, 3000);
  
          return
        }

        //use fetch api to make http request to the server
        //http://localhost:3001/user/user
        fetch('http://localhost:3001/user/is-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({email})
        })
        .then((response)=>{
          return response.json();
        })
        .then( (data)=>{
          console.log(data);

          //if user is found, then close the pop up
          if(data){
            //onClose();
            sendEmail(email);
          }
          else{
            setEmailError("The email address you entered isn't connected to an account.");
            setTimeout(() => {
              setEmailError('');
            }, 3000);
          }
        })
        .catch((error)=>{
          console.log(error);
          setEmailError(error.message);
          return
        })

      }
      catch(error){
        console.log(error);
        setEmailError(error.message);
        return
      }
    }

  return (
    <>
      <div className='modal-overlay'></div>
      <div className='forgot-password-div'>
        <h1>Forgot Password</h1>
        <p>It will be a quick run!</p>
        <input className='input-field' placeholder='Enter email here' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        {emailError && <p className='error-msg error'>{emailError}</p>}
        {emailSentMsg && <p className='success'>{emailSentMsg}</p>}
        <div>
          <button className='btn' onClick={verifyUser}>Send Email</button>
          <button className='alert-btn btn' onClick={onClose}>Cancel</button>
        </div>
    </div>
    </>
  )
}

export default EmailLinkPage
