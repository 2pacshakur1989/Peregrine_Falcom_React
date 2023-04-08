// import React from 'react'
// import { useState } from 'react'
// import './Signup.css';


// export default function SignUp() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password1, setPassword1] = useState('');
//   const [password2, setPassword2] = useState('');
//   const [first_name, setFirstname] = useState('');
//   const [last_name, setLastname] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone_no, setPhonenumber] = useState('');
//   const [credit_card_no, setCreditcard] = useState('');
//   const [errors, setErrors] = useState({});
//   const [responseMsg, setResponseMsg] = useState('');
//   const [showForm, setShowForm] = useState(true);
//   const [message, setMessage] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetch('http://localhost:8000/api/customers/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, email, password1, password2, first_name, last_name, address, phone_no, credit_card_no })
//     })
//     .then(response => response.json())
//     .then(data => {
//       // setMessage('Customer created successfully');
//       setShowForm(false);
//     })
//     .then(data => {
//       // handle successful customer creation
//       console.log(data);
//       setResponseMsg('Customer created successfully'); // set the response message to state
//     })
//     .catch(error => {
//       console.log(error.response);
//       // Update the error messages state variable with the errors from the backend
//       setErrors(error.response.data)
//       });
//       // setResponseMsg('Failed to create customer'); // set the response message to state
//   };
//   const handleUsernameChange = (event) => {
//       setUsername(event.target.value);
//     };

//   const handleEmailChange = (event) =>{
//       setEmail(event.target.value);
//   };

//   const handlePassword1Change = (event) =>{
//       setPassword1(event.target.value);
//   };

//   const handlePassword2Change = (event) =>{
//       setPassword2(event.target.value);
//   };

//   const handleFirstnameChange = (event) =>{
//       setFirstname(event.target.value);
//   };

//   const handleLastnameChange = (event) =>{
//       setLastname(event.target.value);
//   };

//   const handleAddressChange = (event) =>{
//       setAddress(event.target.value);
//   };

//   const handlePhonenumberChange = (event) =>{
//       setPhonenumber(event.target.value);
//   };

//   const handleCreditcardChange = (event) =>{
//       setCreditcard(event.target.value);
//   };

  
//   return (
//     <div>
//       {showForm ? (
//         <form id='signupform' onSubmit={handleSubmit}>
// <label id='field' htmlFor="username">Username</label>
// <input type="text" name="username" value={username} onChange={handleUsernameChange} required/>
// <label id='field' htmlFor='email'>Email</label>
// <input type='text' id="email" name="email" value={email} onChange={handleEmailChange} required/>
// <label id='field' htmlFor='password1'>Password</label>
// <input type='password' id='password1' name='password1' value={password1} onChange={handlePassword1Change} required/>
// <label id='field' htmlFor='password2'>Confirm password</label>
// <input type='password' id='password2' name='password2' value={password2} onChange={handlePassword2Change} required/>
// <label id='field' htmlFor='first_name'>First name</label>
// <input type='text' id='first_name' name='first_name' value={first_name} onChange={handleFirstnameChange} required/>
// <label id='field' htmlFor='last_name'>Last name</label>
// <input type='text' id='last_name' name='last_name' value={last_name} onChange={handleLastnameChange} required/>
// <label id='field' htmlFor='address'>Address</label>
// <input type='text' id='address' name='address' value={address} onChange={handleAddressChange} required/>
// <label id='field' htmlFor='phone_no'>Phone number</label>
// <input type='text' id='phone_no' name='phone_no' value={phone_no} onChange={handlePhonenumberChange} required/>
// <label id='field' htmlFor='credit_card_no'>Credit card</label>
// <input type='text' id='credit_card_no' name='credit_card_no' value={credit_card_no} onChange={handleCreditcardChange} required/>

// <input id='create' type='submit' name='Create Profile' value='Create profile'/>
//     </form>
//       ) : (
//         <p>{message}
//         </p>
        
//       )}
//     </div>
    
//   )
// }


















import React from 'react'
import { useState } from 'react'
import './Signup.css';


export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [phone_no, setPhonenumber] = useState('');
  const [credit_card_no, setCreditcard] = useState('');
  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/api/customers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password1, password2, first_name, last_name, address, phone_no, credit_card_no })
    })
    .then(response => response.json())
      
    .then(data => {
      // handle successful customer creation
      console.log(data);
      setErrors(data)
      // setShowForm(false);
      setResponseMsg('Customer created successfully'); // set the response message to state
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
      // Update the error messages state variable with the errors from the backend
      setErrors(error.response)
      });
      // setResponseMsg('Failed to create customer'); // set the response message to state
  };
  const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
  };

  const handlePassword1Change = (event) => {
      setPassword1(event.target.value);
  };

  const handlePassword2Change = (event) => {
      setPassword2(event.target.value);
  };

  const handleFirstnameChange = (event) => {
      setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
      setLastname(event.target.value);
  };

  const handleAddressChange = (event) => {
      setAddress(event.target.value);
  };

  const handlePhonenumberChange = (event) => {
      setPhonenumber(event.target.value);
  };

  const handleCreditcardChange = (event) => {
      setCreditcard(event.target.value);
  };

  
  return (
<div>
  {/* {console.log(errors)} */}
  {Object.keys(errors).length > 0 && (
    <ul>
      {Object.keys(errors).map((key) => (
        <li key={key}>
          {key === 'non_field_errors' ? (
            errors[key]
          ) : (
            <>{key}: {errors[key]}</>
          )}
        </li>
      ))}
    </ul>
  )}
  {showForm ? (
    <form id='signupform' onSubmit={handleSubmit}>
      <label id='field' htmlFor="username">Username</label>
      <input type="text" name="username" value={username} onChange={handleUsernameChange} required/>
      {errors.username && <p id='error' className="error">{errors.username}</p>}
      <label id='field' htmlFor='email'>Email</label>
      <input type='text' id="email" name="email" value={email} onChange={handleEmailChange} required/>
      {errors.email && <p className="error">{errors.email}</p>}
      <label id='field' htmlFor='password1'>Password</label>
      <input type='password' id='password1' name='password1' value={password1} onChange={handlePassword1Change} required/>
      {errors.password1 && <p className="error">{errors.password1}</p>}
      <label id='field' htmlFor='password2'>Confirm password</label>
      <input type='password' id='password2' name='password2' value={password2} onChange={handlePassword2Change} required/>
      {errors.password2 && <p className="error">{errors.password2}</p>}
      <label id='field' htmlFor='first_name'>First name</label>
      <input type='text' id='first_name' name='first_name' value={first_name} onChange={handleFirstnameChange} required/>
      {errors.first_name && <p className="error">{errors.first_name}</p>}
      <label id='field' htmlFor='last_name'>Last name</label>
      <input type='text' id='last_name' name='last_name' value={last_name} onChange={handleLastnameChange} required/>
      {errors.last_name && <p className="error">{errors.last_name}</p>}
      <label id='field' htmlFor='address'>Address</label>
      <input type='text' id='address' name='address' value={address} onChange={handleAddressChange} required/>
      {errors.address && <p className="error">{errors.address}</p>}
      <label id='field' htmlFor='phone_no'>Phone number</label>
      <input type='text' id='phone_no' name='phone_no' value={phone_no} onChange={handlePhonenumberChange} required/>
      {errors.phone_no && <p className="error">{errors.phone_no}</p>}
      <label id='field' htmlFor='credit_card_no'>Credit card</label>
      <input type='text' id='credit_card_no' name='credit_card_no' value={credit_card_no} onChange={handleCreditcardChange} required/>
      {errors.credit_card_no && <p className="error">{errors.credit_card_no}</p>}
      <input id='create' type='submit' name='Create Profile' value='Create profile'/>
    </form>
  ) : (
    <p></p>
  )}
</div> 
  )
}