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
import './SignUp.css';

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
          if (data && (data.non_field_errors || data.username || data.credit_card_no || data.phone_no || data.email)) {
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
<div>
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
    <form id='signupform' onSubmit={handleSubmit}>
      <label id='field' htmlFor="username">Username</label>
      <input type="text" name="username" value={username} onChange={handleUserNameChange} required/>
      <label id='field' htmlFor='email'>Email</label>
      <input type='text'  name="email" value={email} onChange={handleEmailChange} required/>
      <label id='field' htmlFor='password1'>Password</label>
      <input type='password' id='password1' name='password1' value={password1} onChange={handlePassword1Change} required/>
      <label id='field' htmlFor='password2'>Confirm password</label>
      <input type='password' id='password2' name='password2' value={password2} onChange={handlePassword2Change} required/>
      <label id='field' htmlFor='first_name'>First name</label>
      <input type='text' id='first_name' name='first_name' value={first_name} onChange={handleFirstNameChange} required/>
      <label id='field' htmlFor='last_name'>Last name</label>
      <input type='text' id='last_name' name='last_name' value={last_name} onChange={handleLastNameChange} required/>
      <label id='field' htmlFor='address'>Address</label>
      <input type='text' id='address' name='address' value={address} onChange={handleAddressChange} required/>
      <label id='field' htmlFor='phone_no'>Phone number</label>
      <input type='text' id='phone_no' name='phone_no' value={phone_no} onChange={handlePhoneNumberChange} required/>
      <label id='field' htmlFor='credit_card_no'>Credit card</label>
      <input type='text' id='credit_card_no' name='credit_card_no' value={credit_card_no} onChange={handleCreditCardChange} required/>
      <input id='create' type='submit' name='Create Profile' value='Create profile'/>
    </form>
    
  ) : (
    <p></p>
  )}
</div> 
  )
}