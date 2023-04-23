import React, { useState, useContext } from 'react';
import { AuthContext } from '../authentication/AuthContext';
import Cookies from 'js-cookie';
import GetCustomers from '../customers/GetCustomers';
import AddCustomer from './AddCustomer';
import './AllCustomers.css';

export const AllCustomers = (props) => {
  const { user, payloadData } = useContext(AuthContext);
  const [customer, setCustomer] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [message, setResponseMsg] = useState('');
  const [activeComponent, setActiveComponent] = useState('');
  const { customerRemoved } = props;

  // customerRemoved(false);

  const handleAddClick = (event) => {
    event.preventDefault();
    setActiveComponent(activeComponent === 'addcustomer' ? '' : 'addcustomer');
  };



  const handleRemoveCustomer = ( customerId) => {
    
    if(customerId && user && payloadData && String(payloadData.roles) === 'admin'){
      fetch(`http://localhost:8000/api/customers/?id=${customerId}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        }})
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResponseMsg('Customer deleted successfully');
          setTimeout(() => {
            setResponseMsg('');
            customerRemoved();
          }, 2000);
          
        })
        .catch((error) => {
          console.log(error);
        });}}


  const handleCustomerSelect = (customerId) => {
    setSearchId('');
    fetch(`http://localhost:8000/api/customers/?customer_id=${customerId}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },  
    })
    .then((response) => response.json())
    .then((data) => {
      setCustomer(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleSelect = async () => {
    if(user && payloadData && String(payloadData.roles) === 'admin') {
      if (searchId) {
        fetch(`http://localhost:8000/api/customers/?customer_id=${searchId}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },  
        })
        .then((response) => response.json())
        .then((data) => {
          setCustomer(data);
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        setCustomer(null);
      }
    }
  };

return (
  <div className="table-container">
    <p id='removedsuccessfully'>{message}</p>
    <div>
    <button id='adminaddcustomer' onClick={handleAddClick}>
      {activeComponent === 'addcustomer' ? 'Hide' : 'Add customer'} 
    </button>
    {activeComponent === 'addcustomer' && <AddCustomer />}
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
    <GetCustomers onCustomerSelect={handleCustomerSelect}/>
    <br></br>
    </div>
    {customer && (
      <div>
          <button id='removecustomerbutton' onClick={() => handleRemoveCustomer(customer.id)}>Remove Customer</button>

      {/* <table id='result'>
        <tbody>
          <tr>
            <td>Customer ID:</td>
            <td>{customer.id}</td>
          </tr>
          <tr>
            <td>Customer Name:</td>
            <td>{customer.first_name} {customer.last_name}</td>
          </tr>
          <tr>
            <td>Address:</td>
            <td>{customer.address}</td>
          </tr>
          <tr>
            <td>Phone Number:</td>
            <td>{customer.phone_no}</td>
          </tr>
          <tr>
            <td>User ID:</td>
            <td>{customer.user_id}</td>
          </tr>
        </tbody>
      </table> */}

        <p id='customeresults'>
          
            <label id='customerfield'>Customer ID:</label>
            <span id='customerX'>{customer.id}</span>
     
            <label id='customerfield'>Customer Name:</label>
            <span id='customerX'>{customer.first_name} {customer.last_name}</span>

            <label id='customerfield'>Address:</label>
            <span id='customerX'>{customer.address}</span>

            <label id='customerfield'>Phone Number:</label>
            <span id='customerX'>{customer.phone_no}</span>

            <label id='customerfield'>User Id:</label>
            <span id='customerX'>{customer.user_id}</span>

      </p>
      </div>
      
    )}
    
  </div>
);
};

