import React from 'react'
import { useState } from 'react'

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
      setMessage('Customer created successfully');
      setShowForm(false);
    })
    .then(data => {
      // handle successful customer creation
      console.log(data);
      setResponseMsg('Customer created successfully'); // set the response message to state
    })
    .catch(error => {
      // handle  error
      console.error(error);
      setResponseMsg('Failed to create customer'); // set the response message to state
    });
  };
  const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };

  const handleEmailChange = (event) =>{
      setEmail(event.target.value);
  };

  const handlePassword1Change = (event) =>{
      setPassword1(event.target.value);
  };

  const handlePassword2Change = (event) =>{
      setPassword2(event.target.value);
  };

  const handleFirstnameChange = (event) =>{
      setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) =>{
      setLastname(event.target.value);
  };

  const handleAddressChange = (event) =>{
      setAddress(event.target.value);
  };

  const handlePhonenumberChange = (event) =>{
      setPhonenumber(event.target.value);
  };

  const handleCreditcardChange = (event) =>{
      setCreditcard(event.target.value);
  };

  

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit}>
<label htmlFor="username">Username:</label>
<input type="text" id="username" name="username" value={username} onChange={handleUsernameChange}/>
<br/>
<label htmlFor='email'>Email</label>
<input type='text' id="email" name="email" value={email} onChange={handleEmailChange}/>
<br/>
<label htmlFor='password1'>Password</label>
<input type='password' id='password1' name='password1' value={password1} onChange={handlePassword1Change}/>
<br/>
<label htmlFor='password2'>Confirm password</label>
<input type='password' id='password2' name='password2' value={password2} onChange={handlePassword2Change}/>
<br/>
<label htmlFor='first_name'>First name</label>
<input type='text' id='first_name' name='first_name' value={first_name} onChange={handleFirstnameChange}/>
<br/>
<label htmlFor='last_name'>Last name</label>
<input type='text' id='last_name' name='last_name' value={last_name} onChange={handleLastnameChange}/>
<br/>
<label htmlFor='address'>Address</label>
<input type='text' id='address' name='address' value={address} onChange={handleAddressChange}/>
<br/>
<label htmlFor='phone_no'>Phone number</label>
<input type='text' id='phone_no' name='phone_no' value={phone_no} onChange={handlePhonenumberChange}/>
<br/>
<label htmlFor='credit_card_no'>Credit card</label>
<input type='text' id='credit_card_no' name='credit_card_no' value={credit_card_no} onChange={handleCreditcardChange}/>
<br/>
<br/>
<input type='submit' name='Create Profile'/>
    </form>
      ) : (
        <p>{message}</p>
      )}
    </div>
  )
}
