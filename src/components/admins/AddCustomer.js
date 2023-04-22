import React from 'react'
import { useState } from 'react'
import './AddCustomer.css';

export default function AddCustomer() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone_no, setPhoneNumber] = useState('');
  const [credit_card_no, setCreditCard] = useState('');
  const [errors, setErrors] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    fetch('http://localhost:8000/api/customers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password1, password2, first_name, last_name, address, phone_no, credit_card_no })
    })

    .then(response => {
      if (response.status === 400) {
        return response.json().then(data => {
          if (data && (data.non_field_errors || data.username || data.credit_card_no || data.phone_no || data.email)) {
            setErrors(data);
            console.log("Errors exist");
            console.log(data);
          }
        });
      } else if (response.status === 201) {
        setShowForm(false);
        setResponseMsg("Customer created successfully, click the `Login` tab to log in");
        // setTimeout(() => {
        //   setResponseMsg("");
        // }, 3000);
      }
    })

    .catch(error => {
      console.log(error);
    });
  };
  
  const handleUserNameChange = (event) => {
      setUserName(event.target.value);
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

  const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
      setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
      setAddress(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
      setPhoneNumber(event.target.value);
  };

  const handleCreditCardChange = (event) => {
      setCreditCard(event.target.value);
  };


  return (
<div>
{Object.keys(errors).length > 0 ? (
  <ul>
    {Object.keys(errors).map((key) => (
      <p key={key}>
        <span id='erroraddcustomer'>{errors[key]}</span> 
      </p>
    ))}
  </ul>
) : (
  <>
    <p id='addcustomersuccess'>{responseMsg}</p>
  </>
)}


  {showForm ? (
    <form id='addcustomerform' onSubmit={handleSubmit}>
      <label id='field2' htmlFor="username"></label>
      <input type="text" name="username" placeholder='Username' value={username} onChange={handleUserNameChange} required/>
      <label id='field2' htmlFor='email'></label>
      <input type='text' name="email" placeholder='Email' value={email} onChange={handleEmailChange} required/>
      <label id='field2' htmlFor='password1'></label>
      <input type='password' id='password1' name='password1' placeholder='Password' value={password1} onChange={handlePassword1Change} required/>
      <label id='field2' htmlFor='password2'></label>
      <input type='password' id='password2' name='password2' placeholder='Confirm password' value={password2} onChange={handlePassword2Change} required/>
      <label id='field2' htmlFor='first_name'></label>
      <input type='text' id='first_name' name='first_name' placeholder='First name' value={first_name} onChange={handleFirstNameChange} required/>
      <label id='field2' htmlFor='last_name'></label>
      <input type='text' id='last_name' name='last_name' placeholder='Last name' value={last_name} onChange={handleLastNameChange} required/>
      <label id='field2' htmlFor='address'></label>
      <input type='text' id='address' name='address' placeholder='Address' value={address} onChange={handleAddressChange} required/>
      <label id='field2' htmlFor='phone_no'></label>
      <input type='text' id='phone_no' name='phone_no' placeholder='Phone number' value={phone_no} onChange={handlePhoneNumberChange} required/>
      <label id='field2' htmlFor='credit_card_no'></label>
      <input type='text' id='credit_card_no' name='credit_card_no' placeholder='Credit card number' value={credit_card_no} onChange={handleCreditCardChange} required/>
      <label id='field2' htmlFor='sybut'></label>
      <input id='createcustomerbutton' type='submit' name='Create Profile' value='Create profile'/>
    </form>
    
  ) : (
    <p></p>
  )}
</div> 
  )
}