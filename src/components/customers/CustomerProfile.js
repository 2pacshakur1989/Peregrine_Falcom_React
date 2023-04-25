import React, { useState, useEffect, useContext, useReducer } from 'react';
import { AuthContext } from "../authentication/AuthContext";
import Cookies from 'js-cookie';
import './CustomerProfile.css';

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
        <span id='updateprofilerror'>{errors[key]}</span> 
      </p>
    ))}
  </ul>
) : (
  <>
    <p id='updateprofilesuccess'>{responseMsg}</p>
  </>
)}
  {showForm ? (
    <div id='moveform'>
    <form id='customerupdateform' onSubmit={(e) => handleUpdate(e)}>
      <label id='field' htmlFor="username"></label>
      <input placeholder='Username' id='input' type="text" name="username" defaultValue={state.username} onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })} required/>

      <label id='field5' htmlFor='email'></label>
      <input placeholder='' type='text' id='input' name="email" defaultValue={state.email} onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })} required/>

      <label id='field5' htmlFor='current_password'></label>
      <input placeholder='Current password' type='password' id='input' name='current_password' defaultValue={state.current_password} onChange={(e) => dispatch({ type: 'SET_CURRENT_PASSWORD', payload: e.target.value })}/>

      <label id='field5' htmlFor='new_password'></label>
      <input placeholder='New password' type='password' id='input' name='new_password' defaultValue={state.password1} onChange={(e) => dispatch({ type: 'SET_NEW_PASSWORD', payload: e.target.value })}/>

      <label id='field5' htmlFor='confirm_password'></label>
      <input placeholder='Confirm passwotd' type='password' id='input' name='confirm_password' defaultValue={state.password2} onChange={(e) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value })}/>

      <label id='field5' htmlFor='first_name'></label>
      <input placeholder='First name' type='text' id='input' name='first_name' defaultValue={state.first_name} onChange={(e) => dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })} required/>

      <label id='field5' htmlFor='last_name'></label>
      <input placeholder='Last name' type='text' id='input' name='last_name' defaultValue={state.last_name} onChange={(e) => dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })} required/>

      <label id='field5' htmlFor='address'></label>
      <input placeholder='Address' type='text' id='input' name='address' defaultValue={state.address} onChange={(e) => dispatch({ type: 'SET_ADDRESS', payload: e.target.value })} required/>

      <label id='field5' htmlFor='phone_no'></label>
      <input placeholder='Phone number' type='text' id='input' name='phone_no' defaultValue={state.phone_no} onChange={(e) => dispatch({ type: 'SET_PHONE_NO', payload: e.target.value })} required/>

      <label id='field5' htmlFor='credit_card_no'></label>
      <input placeholder='Credit Card' type='text' id='input' name='credit_card_no' defaultValue={state.credit_card_no} onChange={(e) => dispatch({ type: 'SET_CREDIT_CARD', payload: e.target.value })} required/>
      <label id='field5' htmlFor='Update Profile'></label>
      <input id='customerupdatebutton' type='submit' name='Update Profile' value='Update profile'/>
    </form>
    
    </div> 
  ) : (
    <p></p>
  )}
 
</div> 

       
  );
}

export default CustomerProfile;
