import React from 'react'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';

function SignupPage() {
  const [registerationMessage, setRegisterationMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  //state variable for profile image
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageError, setProfileImageError] = useState('');
  const navigate = useNavigate();

//---------------------------------Functions--------------------------------//

const checkWhiteSpacesInFields = async (firstName, lastName, username, email, password, confirmPassword) => {
  //check if only spaces are entered in the fields
  if (firstName.trim().includes(' ')) {
    setFirstNameError("Can not contain spaces.");
    setTimeout(() => {
      setFirstNameError('');
    }, 3000);
    return

  }

  else if (lastName.trim().includes(' ')) {
    setLastNameError("Can not contain spaces.");
    setTimeout(() => {
      setLastNameError('');
    }, 3000);
    return
  }

  // else if (username.trim().includes(' ')) {
  //   setUsernameError("Can not contain spaces.");
  //   setTimeout(() => {
  //     setUsernameError('');
  //   }, 3000);
  //   return
  // }

  else if (email.trim().includes(' ')) {
    setEmailError("Can not contain spaces.");
    setTimeout(() => {
      setEmailError('');
    }, 3000);
    return
  }

  else if (password.trim().includes(' ')) {
    setPasswordError("Can not contain spaces.");
    setTimeout(() => {
      setPasswordError('');
    }, 3000);
    return
  }

  else if (confirmPassword.trim().includes(' ')) {
    setConfirmPasswordError("Can not contain spaces.");
    setTimeout(() => {
      setConfirmPasswordError('');
    }, 3000);
    return
  }
}

const checkEmptyFields = async (firstName, lastName, dob, username, email, password, confirmPassword , profileImage) => {

  //check if any field is empty
  if (firstName.trim() === '') {
    setFirstNameError("First Name can not be empty.")
    setTimeout(() => {
      setFirstNameError('');
    }, 3000);
    return
  }

  else if (lastName.trim() === '') {
    setLastNameError("Last Name can not be empty.")
    setTimeout(() => {
      setLastNameError('');
    }, 3000);
    return
  }

  else if (dob.trim() === '') {
    setDobError("Date of Birth can not be empty.")
    setTimeout(() => {
      setDobError('');
    }, 3000);
    return
  }

  else if (username.trim() === '') {
    setUsernameError("Username can not be empty.")
    setTimeout(() => {
      setUsernameError('');
    }, 3000);
    return
  }
  else if (email.trim() === '') {
    setEmailError("The email address can not be empty.")
    setTimeout(() => {
      setEmailError('');
    }, 3000);
    return
  }

  else if (password.trim() === '') {
    setPasswordError("Empty Password. Try again with a valid password. Or click on   Forgot Password to reset your password.");
    setTimeout(() => {
      setPasswordError('');
    }, 3000);
    return
  }

  else if (confirmPassword.trim() === '') {
    setConfirmPasswordError("Empty Confirm Password. Try again with a valid password. Or click on   Forgot Password to reset your password.");
    setTimeout(() => {
      setConfirmPasswordError('');
    }, 3000);
    return
  }

  else if(!profileImage){
    setProfileImageError("Profile Image can not be empty.")
    setTimeout(() => {
      setProfileImageError('');
    }, 3000);
    return
  
  }

}

const checkIfUserAlreadyRegistered = async (email) => {
  //check if the user is already registered
  await fetch('http://localhost:3001/user/is-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ email })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    })
}

const postNewUserToServer = async (newUser) => {
  const formData = new FormData();
  formData.append('firstName', newUser.firstName);
  formData.append('lastName', newUser.lastName);
  formData.append('dob', newUser.dob);
  formData.append('username', newUser.username);
  formData.append('email', newUser.email);
  formData.append('password', newUser.password);
  formData.append('profileImage', newUser.profileImage);

  //use fetch api to make http request to the server
  fetch('http://localhost:3001/user/register', {
    //have not set headers because in this case the browser will automatically set the headers
    method: 'POST',
    body: formData
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setRegisterationMessage("User registered successfully");

      //after a delay of 3 seconds, redirect the user to the login page
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    })
}


  const validateInputsAndPostUserdataToServer = async (e) => {
    try {
      e.preventDefault();
      //check if any field is empty
      await checkEmptyFields(firstName, lastName, dob, username, email, password, confirmPassword , profileImage);

      //check white spaces in the fields
      await checkWhiteSpacesInFields(firstName, lastName, username, email, password, confirmPassword);

      //check if email contains @, .com and is between 11 and 50 characters
      if (!email.includes('@') || !email.includes('.') || email.length < 11 || email.length > 50) {
        setEmailError("This is not a proper email address. Try again with a proper email address");
        setTimeout(() => {
          setEmailError('');
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

      //check if user is already registered or not
      else if (!checkIfUserAlreadyRegistered(email)) {
        setEmailError("This email address is already registered. Try again with a different email address.");
        setTimeout(() => {
          setEmailError('');
        }, 3000);
        return
      }

      //if all fields are valid, send the data to the server
      else {

        const newUser = {
          firstName,
          lastName,
          dob,
          username,
          email,
          password,
          profileImage
        }

        await postNewUserToServer(newUser);
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
          <p>Sign Up on MART</p>
          <form action='/user/register' enctype='multipart/form-data' onSubmit={validateInputsAndPostUserdataToServer}>
            <label htmlFor='firstName-field'>First Name</label>
            <input className='input-field' id='firstName-field' name='first-name'   placeholder='First Name' value={firstName} onChange={(e) => {
              setFirstName(e.target.value);
            }} />
            {firstNameError && <p className='error-msg'>{firstNameError}</p>}

            <label htmlFor='lastName-field'>Last Name</label>
            <input className='input-field' id='lastName-field' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            {lastNameError && <p className='error-msg'>{lastNameError}</p>}

            <label htmlFor='dob-field'>Date of Birth</label>
            <input className='input-field' id='dob-field' type='date' placeholder='Date of Birth' value={dob} onChange={(e) => setDob(e.target.value)} />
            {dobError && <p className='error-msg'>{dobError}</p>}

            <label htmlFor='username-field'>Username</label>
            <input className='input-field' id='username-field' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            {usernameError && <p className='error-msg'>{usernameError}</p>}

            <label htmlFor='email-field'>Email</label>
            <input className='input-field' id='email-field' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <p className='error-msg'>{emailError}</p>}

            <label htmlFor='password-field'>Password</label>
            <input className='input-field' id='password-field' placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <p className='error-msg'>{passwordError}</p>}

            <label htmlFor='confirm-password-field'>Confirm Password</label>
            <input className='input-field' id='confirm-password-field' placeholder='Confirm Password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {confirmPasswordError && <p className='error-msg'>{confirmPasswordError}</p>}

            {/* add a file input field for profile image */}
            <label htmlFor='profile-image-field' className='input-field'>Profile Image</label>
            <input type='file' id='profile-image-field' onChange={(e) => {
              setProfileImage(e.target.files[0]);
            }} />
            {profileImageError && <p className='error-msg'>{profileImageError}</p>}

            <button className='btn' type='submit'>Sign Up</button>
            {registerationMessage && <p>{registerationMessage}</p>}

          </form>


        </div>
        <div className='signup-link-div'>
          <Link className='link' to="/login">Already have an account?</Link>
        </div>
      </div>
    </div>
  )
}

export default SignupPage

