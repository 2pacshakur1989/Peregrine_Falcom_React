import React, { useState, useEffect, useContext } from 'react';
import SignUp from '../authentication/SignUp';
import { AuthContext } from "../authentication/AuthContext";
import Cookies from 'js-cookie';

function UpdateCustomer() {
  const [customer, setCustomer] = useState({});
  const [user, setUser] = useState({});
  // const [showUpdateForm, setShowUpdateForm] = useState(false);
  const {payloadData} = useContext(AuthContext);

  useEffect(() => {
    // make API request to get customer data
    fetch(`http://localhost:8000/api/customers/?username=${payloadData.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setCustomer(data.customer_data);
        setUser(data.user_data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // const handleUpdateClick = () => {
  //   setShowUpdateForm(true);
  // }

  return (
    <div>
        {console.log(customer)}
        {console.log(user)}
        <SignUp 
        username={user.username} 
        email={user.email}
        first_name={customer.first_name}
        last_name={customer.last_name}
        address={customer.address}
        phone_no={customer.phone_no}
        credit_card_no={customer.credit_card_no}
        />
      
    </div>
  );
}

export default UpdateCustomer;
