import React, { useState, useEffect, useContext, useReducer } from 'react';
import { AuthContext } from "../authentication/AuthContext";
import Cookies from 'js-cookie';
import GetCountries from '../countries/GetCountries';
import './AirlineProfile.css';

function AirlineProfile() {

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
      case 'SET_NAME':
        return { ...state, name: action.payload };
      case 'SET_COUNTRY':
        return { ...state, country_id: action.payload };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  const [airlineId, setAirlineId] = useState({});
  const {payloadData} = useContext(AuthContext);
  

  const [state, dispatch] = useReducer(formReducer, {
    username: '',
    email: '',
    current_password: '',
    password1: '',
    password2: '',
    name: '',
    country_id: '',

  });

  const [errors, setErrors] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [showForm, setShowForm] = useState(true);
  const {reloadUpdatedData} = useContext(AuthContext);
  const [country, setCountry] = useState('');

  // const handleSetCountry = (countryId) =>{
      
  //     <GetCountries onCountrySelect={handleSetCountry} selectedCountryId={countryId}/>
  // };

  const handleSetCountry = (countryId) =>{
    dispatch({ type: 'SET_COUNTRY', payload: countryId });
  };

  useEffect(() => {
    // make API request to get customer data
    
    if (payloadData && payloadData.username && (reloadUpdatedData === true)) {
    fetch(`http://localhost:8000/api/airlines/?user_id=${payloadData.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setAirlineId(data.airline_data.id);
        // console.log(data.airline_data.id);
        dispatch({ type: 'SET_USERNAME', payload: data.user_data.username });
        dispatch({ type: 'SET_EMAIL', payload: data.user_data.email });
        dispatch({ type: 'SET_CURRENT_PASSWORD', payload: data.user_data.current_password });
        dispatch({ type: 'SET_NEW_PASSWORD', payload: data.user_data.password1 });
        dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: data.user_data.password2 });
        dispatch({ type: 'SET_NAME', payload: data.airline_data.name });
        dispatch({ type: 'SET_COUNTRY', payload: data.airline_data.country_id });

      })
      .catch(error => {
        console.error(error);
      });
      
    }}, [payloadData, reloadUpdatedData]);
    

  const handleUpdate = (event) => {
    console.log(airlineId);
    event.preventDefault();
    setResponseMsg('');
    setErrors({});
    fetch(`http://localhost:8000/api/airlines/?id=${airlineId}`, {
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
        name: state.name,
        country_id: state.country_id,
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
        
        setResponseMsg("Airline updated successfully");
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
    <form id='airlineupdateform' onSubmit={(e) => handleUpdate(e)}>
      <label id='airlinefield' htmlFor="username">Username</label>
      <input id='AIRLINE' type="text" name="AIRLINE" defaultValue={state.username} onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })} required/>

      <label id='airlinefield' htmlFor='email'>Email</label>
      <input id='AIRLINE' type='text'  name="AIRLINE" defaultValue={state.email} onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })} required/>

      <label id='current' htmlFor='current_password'>Current Password</label>
      <input type='password' id='AIRLINE' name='current_password' defaultValue={state.current_password} onChange={(e) => dispatch({ type: 'SET_CURRENT_PASSWORD', payload: e.target.value })}/>
      
      <label id='new' htmlFor='new_password'>New password</label>
      <input type='password' id='AIRLINE' name='new_password' defaultValue={state.password1} onChange={(e) => dispatch({ type: 'SET_NEW_PASSWORD', payload: e.target.value })}/>

      <label id='confirm' htmlFor='confirm_password'>Confirm password</label>
      <input type='password' id='AIRLINE' name='confirm_password' defaultValue={state.password2} onChange={(e) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value })}/>

      <label id='namefield' htmlFor='name'>Name</label>
      <input type='text' id='airlinename' name='first_name' defaultValue={state.name} onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })} required/>  

<label id='country' htmlFor='Country'>Country</label>
  <GetCountries onCountrySelect={handleSetCountry} selectedCountryId={state.country_id}  />
  <p></p>
  <input type='hidden' id='AIRLINEz' name='country' 
    onChange={(e) => {
      dispatch({ type: 'SET_COUNTRY', payload: e.target.value });
    }} 
    required
  />


      
      <input id='create' type='submit' name='Update Profile' value='Update profile'/>
    </form>
    
  ) : (
    <p></p>
  )}
 
</div> 
       
  );
}

export default AirlineProfile;