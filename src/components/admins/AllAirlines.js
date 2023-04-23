import React, { useState, useContext } from 'react';
import { AuthContext } from '../authentication/AuthContext';
import Cookies from 'js-cookie';
import GetCustomers from '../customers/GetCustomers';
import AddCustomer from './AddCustomer';
import './AddAirline.css';
import GetAirlines from '../airlines/GetAirlines';
import AddAirline from './AddAirline';


export const AllAirlines = (props) => {
  const { user, payloadData } = useContext(AuthContext);
  const [airline, setAirline] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [message, setResponseMsg] = useState('');
  const [activeComponent, setActiveComponent] = useState('');
  const { airlineRemoved } = props;

  // airlineRemoved(false);

  const handleAddClick = (event) => {
    event.preventDefault();
    setActiveComponent(activeComponent === 'addairline' ? '' : 'addairline');
  };



  const handleRemoveAirline = (airlineId) => {
    
    if(airlineId && user && payloadData && String(payloadData.roles) === 'admin'){
      fetch(`http://localhost:8000/api/airlines/?id=${airlineId}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        }})
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResponseMsg('Airline deleted successfully');
          setTimeout(() => {
            setResponseMsg('');
            airlineRemoved();
          }, 2000);
          
        })
        .catch((error) => {
          console.log(error);
        });}}


  const handleAirlineSelect = (airlineId) => {
    setSearchId('');
    fetch(`http://localhost:8000/api/airlines/?id=${airlineId}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },  
    })
    .then((response) => response.json())
    .then((data) => {
      setAirline(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleSelect = async () => {
    if(user && payloadData && String(payloadData.roles) === 'admin') {
      if (searchId) {
        fetch(`http://localhost:8000/api/airlines/?id=${searchId}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },  
        })
        .then((response) => response.json())
        .then((data) => {
          setAirline(data);
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        setAirline(null);
      }
    }
  };

return (
  <div className="table-container">
    <p id='removedsuccessfully'>{message}</p>
    <div>
    <button id='adminaddairline' onClick={handleAddClick}>
      {activeComponent === 'addairline' ? 'Hide' : 'Add airline'} 
    </button>
    {activeComponent === 'addairline' && <AddAirline />}
  </div>
    <div id='searchcustomer'>
      <input id='move'
        type="text"
        value={searchId}
        onChange={(event) => setSearchId(event.target.value)}
        placeholder="Search by ID"
      />
      <button id='customersearchbutton' onClick={handleSelect}>Search</button>
    </div>
    <br></br>
    <div id='selectcustomer'>
    <GetAirlines onAirlineCompanySelect={handleAirlineSelect}/>
    <br></br>
    </div>
    {airline && (
      <div>
      <button id='removeairlinebutton' onClick={() => handleRemoveAirline(airline.id)}>Remove airline</button>
      <p id='airlineresults'>
          
          <label id='airlinefield'>Airline ID:</label>
          <span id='airlineX'>{airline.id}</span>
   
          <label id='airlinefield'>Name:</label>
          <span id='airlineX'>{airline.name}</span>

          <label id='airlinefield'>Country ID:</label>
          <span id='airlineX'>{airline.country_id}</span>
    </p>
      </div>
    )}
    
  </div>
);
};

