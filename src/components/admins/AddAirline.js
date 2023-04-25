import React, { useState, useContext, useReducer } from 'react';
import { AuthContext } from "../authentication/AuthContext";
import Cookies from 'js-cookie';
import GetCountries from '../countries/GetCountries';
import './AddAirline.css';

function AddAirline() {

  function formReducer(state, action) {
    switch (action.type) {
      case 'SET_USERNAME':
        return { ...state, username: action.payload };
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_NEW_PASSWORD':
        return { ...state, password1: action.payload };
      case 'SET_CONFIRM_PASSWORD':
        return { ...state, password2: action.payload };
      case 'SET_NAME':
        return { ...state, name: action.payload };
      case 'SET_COUNTRY':
        return { ...state, country_id: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  const { user, payloadData } = useContext(AuthContext);
  

  const [state, dispatch] = useReducer(formReducer, {
    username: '',
    email: '',
    password1: '',
    password2: '',
    name: '',
    country_id: '',

  });

  const [errors, setErrors] = useState('');
  const [responseMsg, setResponseMsg] = useState('');


  const handleSetCountry = (countryId) =>{
    dispatch({ type: 'SET_COUNTRY', payload: countryId });
  };


  const handleAddAirline = (event) => {
    event.preventDefault();
    setResponseMsg('');
    setErrors({});
    if(user && payloadData && String(payloadData.roles) === 'admin'){
    fetch(`http://localhost:8000/api/airlines/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({
        username: state.username,
        email: state.email,
        password1: state.password1,
        password2: state.password2,
        name: state.name,
        country_id: state.country_id,
       })
    })

    .then(response => {
      if (response.status === 400) {
        
        return response.json().then(data => {
          console.log(data);
          if (data && (data.non_field_errors || data.username || data.email || data.address || data.name || data.password1 || data.password2 || data.country_id)) {
            setErrors(data);
            console.log("Errors exist");
            console.log(data);
          }
        });
      } else if (response.status === 201) {
        setErrors({});
        
        setResponseMsg("Airline added successfully");
        setTimeout(() => {
          setResponseMsg("");
          window.location.href = '/';
        }, 3000);
      }})
      .catch(error => {
        console.error(error);
      })};}

  return (
    <div>
{Object.keys(errors).length > 0 ? (
  <ul>
    {Object.keys(errors).map((key) => (
      <p key={key}>
        <span id='erroraddairline'>{errors[key]}</span> 
      </p>
    ))}
  </ul>
) : (
  <>
    <p id='addairlinesuccess'>{responseMsg}</p>
  </>
)}
 
    <form id='adminaddairlineform' onSubmit={(e) => handleAddAirline(e)}>
      <label id='airlinefield1' htmlFor="username"></label>
      <input placeholder='Username' id='inputfieldairline' type="text" name="AIRLINE" defaultValue={state.username} onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })} required/>

      <label id='airlinefield1' htmlFor='email'></label>
      <input placeholder='Email' id='inputfieldairline' type='text'  name="AIRLINE" defaultValue={state.email} onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })} required/>
      
      <label id='new1' htmlFor='new_password'></label>
      <input placeholder='Password' type='password' id='inputfieldairline' name='new_password' defaultValue={state.password1} onChange={(e) => dispatch({ type: 'SET_NEW_PASSWORD', payload: e.target.value })}/>

      <label id='confirm1' htmlFor='confirm_password'></label>
      <input placeholder='Confirm password' type='password' id='inputfieldairline' name='confirm_password' defaultValue={state.password2} onChange={(e) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value })}/>

      <label id='namefield1' htmlFor='name'></label>
      <input placeholder='Name' type='text' id='inputfieldairline' name='first_name' defaultValue={state.name} onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })} required/>  

<label  htmlFor='Country'></label>
  <GetCountries id='country1' onCountrySelect={handleSetCountry} selectedCountryId={state.country_id}  />
  <p></p>
  <input type='hidden' id='country1' name='country' 
    onChange={(e) => {
      dispatch({ type: 'SET_COUNTRY', payload: e.target.value });
    }} 
    required
  /> 
      <input id='createairlinebutton' type='submit' name='Update Profile' value='Create profile'/>
    </form>

 
</div> 
       
  );
}

export default AddAirline;