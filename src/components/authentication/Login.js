import React, { useState } from 'react';
import './Login.css';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          Cookies.set('token', data, { httpOnly: true });
          console.log('Received token:', data);
          const decodedToken = jwt_decode(data.token);
          console.log(decodedToken);
          // console.log(data.payload);
          // const token = Cookies.get("token");
          // const decodedToken = jwt_decode(token);
        } else {
          setErrorMessage('One of the details is incorrect');
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <form id="logindiv" onSubmit={handleSubmit}>
        <label id='username' htmlFor="username">Username&nbsp;</label>
        <input  type="text" id="box" name="username" value={username} onChange={handleUsernameChange} required/>
        <br/>
        <label id='password' htmlFor="password">Password&nbsp;</label>
        <input type="password" id="box" name="password" value={password} onChange={handlePasswordChange} required/>
        <br/>
        <input id='login' type="submit" value="Login" />
      </form> 
      <br/>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}


