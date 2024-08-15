import React , { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

// Icons
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

function ContactForm() {
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [message , setMessage] = useState('');
    const [error , setError] = useState('');
    const [success , setSuccess] = useState('');
    const [loading , setLoading] = useState(false);

    const handleSend = () => {
        setLoading(true);
        const url = 'http://localhost:3001/contactUs';

        fetch(url , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            },
            body : JSON.stringify({
                firstName : firstName,
                lastName : lastName,
                email : email,
                phone : phone,
                message : message
            })
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            if(data.success){
                setSuccess(data.message);
                setError('');
            }else{
                setError(data.message);
                setSuccess('');
            }
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setError('Something went wrong');
            setLoading(false);
        })
    }

  return (
    <div className='contact-form-div'>
      <Typography variant='h4' align='left' gutterBottom>Get In Touch</Typography>
      <Typography variant="caption" display="block" gutterBottom>
        24/7 we will answer your questions and problems
      </Typography>
      <div className='first-last'>

        <Box
          sx={{
            width: 200,
            maxWidth: '100%',
            marginTop: 1,
            marginBottom: 1
          }}
        >
          <TextField
            value={firstName}
            onChange={(e)=> setFirstName(e.target.value)}
            fullWidth
            label="First Name"
            placeholder='First Name'
            id="firstName"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            width: 200,
            maxWidth: '100%',
            marginTop: 1,
            marginBottom: 1
          }}
        >
          <TextField
            onChange={(e)=> setLastName(e.target.value)}
            value={lastName}
            fullWidth
            label="Last Name"
            placeholder='Last Name'
            id="lastName"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIndOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

      </div>

      <Box
        sx={{
          width: 430,
          maxWidth: '100%',
          marginTop: 1,
          marginBottom: 1
        }}
      >
        <TextField
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
          fullWidth
          label="Email"
          placeholder='Email'
          id="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          width: 430,
          maxWidth: '100%',
          marginTop: 1,
          marginBottom: 1
        }}
      >
        <TextField
            onChange={(e)=> setPhone(e.target.value)}
            value={phone}
          fullWidth
          label="Phone"
          placeholder='Phone'
          id="phone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIphoneOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: 430 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
            onChange={(e)=> setMessage(e.target.value)}
        value={message}
          id="outlined-multiline-static"
          label="Describe your concern"
          multiline
          rows={4}
        />
      </Box>

      <Button variant="contained" disabled={loading} 
                sx={{ width: 430 , height:60}} 
                endIcon={<SendIcon />}
                onClick={handleSend}>{loading ? 'Sending...' : 'Send'}</Button>
      {success &&
      <div className='success-div'>
        <Typography variant='caption' color='success'>{success}</Typography>
      </div>
      }
      {error &&
      <div className='error-div'>
        <Typography variant='caption' color='error'>{error}</Typography>
      </div>
      }
    </div>  
  )
}

export default ContactForm;
