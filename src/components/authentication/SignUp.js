import React from 'react'
import { useState } from 'react'
import '.SignUp.css';
import { ToolTip } from '../general/ToolTip';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function SignUp() {
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
          if (data && (data.non_field_errors || data.username || data.credit_card_no || data.phone_no || data.email || data.address || data.first_name || data.last_name || data.password1 || data.password2)) {
            setErrors(data);
            console.log("Errors exist");
            console.log(data);
          }
        });
      } else if (response.status === 201) {
        setShowForm(false);
        setResponseMsg("Customer created successfully, click the `Login` tab to log in");
        setTimeout(() => {
          setResponseMsg("");
          window.location.href = '/';
        }, 3000);
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
  <HelmetProvider>
<div>
<Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Helmet>
{Object.keys(errors).length > 0 ? (
  <ul>
    {Object.keys(errors).map((key) => (
      <li key={key}>
        <span id='error'>{errors[key]}</span> 
      </li>
    ))}
  </ul>
) : (
  <>
    <p id='success'>{responseMsg}</p>
  </>
)}


  {showForm ? (
//     <form id='signupform' onSubmit={handleSubmit}>
//       {/* <label id='field' htmlFor="username">Username</label> */}
//       <input id='inputfield' type="text" name="username" value={username} onChange={handleUserNameChange} required/>
    
//      { <ToolTip text={"Username should contain 8-20 characters, English letters and number only"}><span id='tooltiplacement' class="material-symbols-outlined">
// Help
// </span></ToolTip>}

//       {/* <label id='field' htmlFor='email'>Email</label> */}
//       <input id='inputfield' type='text'  name="email" value={email} onChange={handleEmailChange} required/>
 
//      { <ToolTip text={"Username should contain 8-20 characters, English letters and number only"}><span id='tooltiplacement' class="material-symbols-outlined">
// Help
// </span></ToolTip>}
//       <label id='field' htmlFor='password1'>Password</label>
//       <input type='password' id='password1' name='password1' value={password1} onChange={handlePassword1Change} required/>
//       <label id='field' htmlFor='password2'>Confirm password</label>
//       <input type='password' id='password2' name='password2' value={password2} onChange={handlePassword2Change} required/>
//       <label id='field' htmlFor='first_name'>First name</label>
//       <input type='text' id='first_name' name='first_name' value={first_name} onChange={handleFirstNameChange} required/>
//       <label id='field' htmlFor='last_name'>Last name</label>
//       <input type='text' id='last_name' name='last_name' value={last_name} onChange={handleLastNameChange} required/>
//       <label id='field' htmlFor='address'>Address</label>
//       <input type='text' id='address' name='address' value={address} onChange={handleAddressChange} required/>
//       <label id='field' htmlFor='phone_no'>Phone number</label>
//       <input type='text' id='phone_no' name='phone_no' value={phone_no} onChange={handlePhoneNumberChange} required/>
//       <label id='field' htmlFor='credit_card_no'>Credit card</label>
//       <input type='text' id='credit_card_no' name='credit_card_no' value={credit_card_no} onChange={handleCreditCardChange} required/>
//       <input id='create' type='submit' name='Create Profile' value='Create profile'/>
//     </form>
    
<form id='signupform' onSubmit={handleSubmit}>

<input placeholder='Username' id='inputfield' type="text" name="username" value={username} onChange={handleUserNameChange} required/>
{ <ToolTip text={"Username should contain 8-20 characters, English letters and number only"}><span id='tooltiplacement' className="material-symbols-outlined">
Help
</span></ToolTip>}

<input placeholder='Email' id='inputfield' type='text'  name="email" value={email} onChange={handleEmailChange} required/>
{ <ToolTip text={"Make sure the email is valid"}><span id='tooltiplacement' className="material-symbols-outlined">
Help
</span></ToolTip>}

<input placeholder='Password' type='password' id='inputfield' name='password1' value={password1} onChange={handlePassword1Change} required/>
{ <ToolTip text={"Passowrd should contain 8-30 characters, English letters(Upper/lower) and numbers only"}><span id='tooltiplacement' className="material-symbols-outlined">
Help
</span></ToolTip>}

<input placeholder='Confirm password' type='password' id='inputfield' name='password2' value={password2} onChange={handlePassword2Change} required/>
{ <ToolTip text={"Confirm passowrd"}><span id='tooltiplacement' className="material-symbols-outlined">
Help
</span></ToolTip>}

<input placeholder='First name' type='text' id='inputfield' name='first_name' value={first_name} onChange={handleFirstNameChange} required/>
{ <ToolTip text={"English letters only, no shorter than 3 letters"}><span id='tooltiplacement' className="material-symbols-outlined">
Help
</span></ToolTip>}

<input placeholder='Last name' type='text' id='inputfield' name='last_name' value={last_name} onChange={handleLastNameChange} required/>
{ <ToolTip text={"English letters only, no shorter than 3 letters"}><span id='tooltiplacement' className="material-symbols-outlined">
Help
</span></ToolTip>}

<input placeholder='Address' type='text' id='inputfield' name='address' value={address} onChange={handleAddressChange} required/>
{ <ToolTip text={"English letters numbers, and dots only"}><span id='tooltiplacement' className="material-symbols-outlined">
Help
</span></ToolTip>}

<input placeholder='Phone number'type='text' id='inputfield' name='phone_no' value={phone_no} onChange={handlePhoneNumberChange} required/>
{ <ToolTip text={"Phone number can contain numbers and '-' character"}><span id='tooltiplacement' className="material-symbols-outlined">
Help
</span></ToolTip>}

<input placeholder='Credit card' type='text' id='inputfield' name='credit_card_no' value={credit_card_no} onChange={handleCreditCardChange} required/>
{ <ToolTip text={"credit card can contain numbers and '-' character, 12-20 characters long"}><span id='tooltiplacement' className="material-symbols-outlined">
Help
</span></ToolTip>}

<input id='create' type='submit' name='Create Profile' value='Create profile'/>
</form>



  ) : (
    <p></p>
  )}
</div> 
</HelmetProvider>
  )
}