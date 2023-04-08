import React, { useState, useEffect, useContext } from 'react';
import SignUp from '../authentication/SignUp';
import { AuthContext } from "../authentication/AuthContext";
import Cookies from 'js-cookie';

function Customer() {
  const [customer, setCustomer] = useState({});
  const [user, setUser] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const {payloadData} = useContext(AuthContext);
  // console.log(payloadData.username)

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

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  }

  return (
    <div>

      {showUpdateForm && (
        <SignUp first_name={customer.first_name}
          isUpdate={true}
          customer={customer}
        />
      )}
    </div>
  );
}

export default Customer;
