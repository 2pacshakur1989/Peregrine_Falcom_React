// import React, { useState, useContext } from 'react';
// import { AuthContext } from './AuthContext';
// import './Login.css';

// export default function Login({ handleLoginSuccess }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const { login } = useContext(AuthContext);
//   const { storePayloadData } = useContext(AuthContext);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     fetch('http://localhost:8000/api/login/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password })
//     })
//       .then(response => response.json())
//       .then(data => {
//         // console.log(data.payload)
//         if (data.access_token) {
//           login(data.access_token);
//           storePayloadData(data.payload);
//           handleLoginSuccess();
//         } else {
//           setErrorMessage('One of the details is incorrect');
//           setTimeout(() => {
//             setErrorMessage('');
//           }, 2000);
//         }
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   return (
//     <div>
//       <form id="logindiv" onSubmit={handleSubmit}>
//         <label id='username' htmlFor="username">Username&nbsp;</label>
//         <input  type="text" id="box" name="username" value={username} onChange={handleUsernameChange} required/>
//         <br/>
//         <label id='password' htmlFor="password">Password&nbsp;</label>
//         <input type="password" id="box" name="password" value={password} onChange={handlePasswordChange} required/>
//         <br/>
//         <input id='login' type="submit" value="Login" />
//       </form>
//       <br/>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//     </div>
//   );
// }










import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Login.css';

export default function Login({ handleLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useContext(AuthContext);
  const { storePayloadData } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data.payload)
        if (data.access_token) {
          login(data.access_token);
          storePayloadData(data.payload);
          handleLoginSuccess();
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
