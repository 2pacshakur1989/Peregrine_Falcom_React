// import React, { useState, useEffect, useContext } from 'react';
// import SignUp from '../authentication/SignUp';
// import { AuthContext } from "../authentication/AuthContext";
// import Cookies from 'js-cookie';

// function CustomerProfile() {
//   const [customer, setCustomer] = useState({});
//   const [user, setUser] = useState({});
//   const {payloadData} = useContext(AuthContext);

//   useEffect(() => {
//     // make API request to get customer data
//     fetch(`http://localhost:8000/api/customers/?username=${payloadData.username}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${Cookies.get('token')}`,
//       },
//     })
//       .then(response => response.json())
//       .then(data => {
//         setCustomer(data.customer_data);
//         setUser(data.user_data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);



//   return (
//     <div>

      
//     </div>
//   );
// }

// export default CustomerProfile;

















// import React, { useState, useEffect, useContext, useReducer } from 'react';
// import { AuthContext } from "../authentication/AuthContext";
// import Cookies from 'js-cookie';

// function CustomerProfile() {
//   const [customer, setCustomer] = useState({});
//   const [user, setUser] = useState({});
//   const {payloadData} = useContext(AuthContext);


  // const [username, setUserName] = useReducer('');
  // const [email, setEmail] = useReducer('');
  // const [currentPassword, setCurrentPassword] = useReducer('');
  // const [newPassword, setNewPassword] = useReducer('');
  // const [confirmPassword, setConfirmPassword] = useReducer('');
  // const [first_name, setFirstName] = useReducer('');
  // const [last_name, setLastName] = useReducer('');
  // const [address, setAddress] = useReducer('');
  // const [phone_no, setPhoneNumber] = useReducer('');
  // const [credit_card_no, setCreditCard] = useReducer('');
//   const [errors, setErrors] = useState('');
//   const [responseMsg, setResponseMsg] = useState('');
//   const [showForm, setShowForm] = useState(true);

//   // console.log(payloadData.username)
//   useEffect(() => {
//     // make API request to get customer data
//     fetch(`http://localhost:8000/api/customers/?username=${payloadData.username}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${Cookies.get('token')}`,
//       },
//     })
//       .then(response => response.json())
//       .then(data => {
//         setCustomer(data.customer_data);
//         setUser(data.user_data);
//         setUserName(user.username);
//         setEmail(user.email);
//         setFirstName(customer.first_name);
//         setLastName(customer.last_name);
//         setAddress(customer.address);
//         setPhoneNumber(customer.phone_no);
//         setCreditCard(customer.credit_card_no);


//       })
//       .catch(error => {
//         console.error(error);
//       });
//     }, [user.username, user.email, customer.first_name, customer.last_name, customer.address, customer.phone_no, customer.credit_card_no, payloadData.username, user]);


//   const handleUpdate = (event) => {
//     event.preventDefault();
//     fetch(`http://localhost:8000/api/customers/?id=${customer.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${Cookies.get('token')}`,
//       },
//       body: JSON.stringify({ username, email, currentPassword, newPassword, confirmPassword, first_name, last_name, address, phone_no, credit_card_no })
//     })

//     .then(response => {
//       if (response.status === 400) {
//         return response.json().then(data => {
//           if (data && (data.non_field_errors || data.username || data.credit_card_no || data.phone_no || data.email)) {
//             setErrors(data);
//             console.log("Errors exist");
//             console.log(data);
//           }
//         });
//       } else if (response.status === 201) {
//         setShowForm(false);
//         setResponseMsg("Customer created successfully, click the `Login` tab to log in");
//         setTimeout(() => {
//           setResponseMsg("");
//         }, 3000);
//       }
//     })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   const handleUserNameChange = (event) => {
//     setUserName(event.target.value);
//   };

// const handleEmailChange = (event) => {
//     setEmail(event.target.value);
// };

// const handleCurrentPasswordChange = (event) => {
//     setCurrentPassword(event.target.value);
// };

// const handleNewPasswordChange = (event) => {
//     setNewPassword(event.target.value);
// };

// const handleConfirmPasswordChange = (event) => {
//   setConfirmPassword(event.target.value);
// };

// const handleFirstNameChange = (event) => {
//     setFirstName(event.target.value);
// };

// const handleLastNameChange = (event) => {
//     setLastName(event.target.value);
// };

// const handleAddressChange = (event) => {
//     setAddress(event.target.value);
// };

// const handlePhoneNumberChange = (event) => {
//     setPhoneNumber(event.target.value);
// };

// const handleCreditCardChange = (event) => {
//     setCreditCard(event.target.value);
// };


//   return (
//     <div>
// {Object.keys(errors).length > 0 ? (
//   <ul>
//     {Object.keys(errors).map((key) => (
//       <li key={key}>
//         <span id='error'>{errors[key]}</span> 
//       </li>
//     ))}
//   </ul>
// ) : (
//   <>
//     <p id='success'>{responseMsg}</p>
//   </>
// )}
//   {showForm ? (
//     <form id='signupform' onSubmit={handleUpdate}>
//       <label id='field' htmlFor="username">Username</label>
//       <input type="text" name="username" defaultValue={username} onChange={handleUserNameChange} required/>

//       <label id='field' htmlFor='email'>Email</label>
//       <input type='text'  name="email" defaultValue={email} onChange={handleEmailChange} required/>

//       <label id='field' htmlFor='current_password'>Current Password</label>
//       <input type='password' id='current_password' name='current_password' value={currentPassword} onChange={handleCurrentPasswordChange}/>

//       <label id='field' htmlFor='new_password'>New password</label>
//       <input type='password' id='new_password' name='new_password' value={newPassword} onChange={handleNewPasswordChange}/>

//       <label id='field' htmlFor='confirm_password'>Confirm password</label>
//       <input type='password' id='confirm_password' name='confirm_password' value={confirmPassword} onChange={handleConfirmPasswordChange}/>

//       <label id='field' htmlFor='first_name'>First name</label>
//       <input type='text' id='first_name' name='first_name' defaultValue={first_name} onChange={handleFirstNameChange} required/>

//       <label id='field' htmlFor='last_name'>Last name</label>
//       <input type='text' id='last_name' name='last_name' defaultValue={last_name} onChange={handleLastNameChange} required/>

//       <label id='field' htmlFor='address'>Address</label>
//       <input type='text' id='address' name='address' defaultValue={address} onChange={handleAddressChange} required/>

//       <label id='field' htmlFor='phone_no'>Phone number</label>
//       <input type='text' id='phone_no' name='phone_no' defaultValue={phone_no} onChange={handlePhoneNumberChange} required/>

//       <label id='field' htmlFor='credit_card_no'>Credit card</label>
//       <input type='text' id='credit_card_no' name='credit_card_no' defaultValue={credit_card_no} onChange={handleCreditCardChange} required/>
      
//       <input id='create' type='submit' name='Update Profile' value='Update profile'/>
//     </form>
    
//   ) : (
//     <p></p>
//   )}
 
// </div> 
       
//   );
// }

// export default CustomerProfile;



























import React, { useState, useEffect, useContext, useReducer } from 'react';
import { AuthContext } from "../authentication/AuthContext";
import Cookies from 'js-cookie';

function CustomerProfile() {

  function formReducer(state, action) {
    switch (action.type) {
      case 'SET_USERNAME':
        return { ...state, username: action.payload };
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_CURRENT_PASSWORD':
        return { ...state, current_password: action.payload };
      case 'SET_NEW_PASSWORD':
        return { ...state, password1: action.payload };
      case 'SET_CONFIRM_PASSWORD':
        return { ...state, password2: action.payload };
      case 'SET_FIRST_NAME':
        return { ...state, first_name: action.payload };
      case 'SET_LAST_NAME':
        return { ...state, last_name: action.payload };
      case 'SET_ADDRESS':
        return { ...state, address: action.payload };
      case 'SET_PHONE_NO':
        return { ...state, phone_no: action.payload };
      case 'SET_CREDIT_CARD':
        return { ...state, credit_card_no: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  const [customerId, setCustomerId] = useState({});
  const {payloadData} = useContext(AuthContext);
  

  const [state, dispatch] = useReducer(formReducer, {
    username: '',
    email: '',
    current_password: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
    address: '',
    phone_no: '',
    credit_card_no: '',
  });

  const [errors, setErrors] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [showForm, setShowForm] = useState(true);
  const {reloadUpdatedData} = useContext(AuthContext);
  const { storePayloadData } = useContext(AuthContext);

  // console.log(payloadData.username)
  useEffect(() => {
    // make API request to get customer data
    
    if (payloadData && payloadData.username && (reloadUpdatedData === true)) {
    fetch(`http://localhost:8000/api/customers/?user_id=${payloadData.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setCustomerId(data.customer_data.id);
        dispatch({ type: 'SET_USERNAME', payload: data.user_data.username });
        dispatch({ type: 'SET_EMAIL', payload: data.user_data.email });
        dispatch({ type: 'SET_CURRENT_PASSWORD', payload: data.user_data.current_password });
        dispatch({ type: 'SET_NEW_PASSWORD', payload: data.user_data.password1 });
        dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: data.user_data.password2 });
        dispatch({ type: 'SET_FIRST_NAME', payload: data.customer_data.first_name });
        dispatch({ type: 'SET_LAST_NAME', payload: data.customer_data.last_name });
        dispatch({ type: 'SET_ADDRESS', payload: data.customer_data.address });
        dispatch({ type: 'SET_PHONE_NO', payload: data.customer_data.phone_no });
        dispatch({ type: 'SET_CREDIT_CARD', payload: data.customer_data.credit_card_no });


      })
      .catch(error => {
        console.error(error);
      });
      
    }}, [payloadData, reloadUpdatedData]);
    

   

  const handleUpdate = (event) => {
    event.preventDefault();
    setResponseMsg('');
    setErrors({});
    fetch(`http://localhost:8000/api/customers/?id=${customerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({
        username: state.username,
        email: state.email,
        current_password: state.current_password,
        password1: state.password1,
        password2: state.password2,
        first_name: state.first_name,
        last_name: state.last_name,
        address: state.address,
        phone_no: state.phone_no,
        credit_card_no: state.credit_card_no 
       })
    })

    .then(response => {
      if (response.status === 400) {
        
        return response.json().then(data => {
          console.log(data);
          if (data && !data.current_password && !data.password1 && !data.password2) {
            setErrors(data);
            console.log("Errors exist");
            console.log(data);
          }
        });
      } else if (response.status === 201) {
        setErrors({});
        setShowForm(false);
        
        setResponseMsg("Customer updated successfully");
        setTimeout(() => {
          setResponseMsg("");
        }, 3000);
        window.location.href = '/';

      }else if (response.status === 304) {
        setErrors({});
        setResponseMsg("Incorrect current password");
      }
    })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
{Object.keys(errors).length > 0 ? (
  <ul>
    {Object.keys(errors).map((key) => (
      <p key={key}>
        <span id='error'>{errors[key]}</span> 
      </p>
    ))}
  </ul>
) : (
  <>
    <p id='success'>{responseMsg}</p>
  </>
)}
  {showForm ? (
    <form id='signupform' onSubmit={(e) => handleUpdate(e)}>
      <label id='field' htmlFor="username">Username</label>
      <input type="text" name="username" defaultValue={state.username} onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })} required/>

      <label id='field' htmlFor='email'>Email</label>
      <input type='text'  name="email" defaultValue={state.email} onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })} required/>

      <label id='field' htmlFor='current_password'>Current Password</label>
      <input type='password' id='current_password' name='current_password' defaultValue={state.current_password} onChange={(e) => dispatch({ type: 'SET_CURRENT_PASSWORD', payload: e.target.value })}/>

      <label id='field' htmlFor='new_password'>New password</label>
      <input type='password' id='new_password' name='new_password' defaultValue={state.password1} onChange={(e) => dispatch({ type: 'SET_NEW_PASSWORD', payload: e.target.value })}/>

      <label id='field' htmlFor='confirm_password'>Confirm password</label>
      <input type='password' id='confirm_password' name='confirm_password' defaultValue={state.password2} onChange={(e) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value })}/>

      <label id='field' htmlFor='first_name'>First name</label>
      <input type='text' id='first_name' name='first_name' defaultValue={state.first_name} onChange={(e) => dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })} required/>

      <label id='field' htmlFor='last_name'>Last name</label>
      <input type='text' id='last_name' name='last_name' defaultValue={state.last_name} onChange={(e) => dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })} required/>

      <label id='field' htmlFor='address'>Address</label>
      <input type='text' id='address' name='address' defaultValue={state.address} onChange={(e) => dispatch({ type: 'SET_ADDRESS', payload: e.target.value })} required/>

      <label id='field' htmlFor='phone_no'>Phone number</label>
      <input type='text' id='phone_no' name='phone_no' defaultValue={state.phone_no} onChange={(e) => dispatch({ type: 'SET_PHONE_NO', payload: e.target.value })} required/>

      <label id='field' htmlFor='credit_card_no'>Credit card</label>
      <input type='text' id='credit_card_no' name='credit_card_no' defaultValue={state.credit_card_no} onChange={(e) => dispatch({ type: 'SET_CREDIT_CARD', payload: e.target.value })} required/>
      
      <input id='create' type='submit' name='Update Profile' value='Update profile'/>
    </form>
    
  ) : (
    <p></p>
  )}
 
</div> 
       
  );
}

export default CustomerProfile;
