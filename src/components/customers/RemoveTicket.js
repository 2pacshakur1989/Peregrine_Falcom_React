import React, { useContext, useState } from 'react';
import { AuthContext } from '../authentication/AuthContext';
import Cookies from 'js-cookie';

export const RemoveTicket = (props) => {
    const { ticketId } = props;
    const { user, payloadData } = useContext(AuthContext);
    console.log(props.ticketId);
    
    const handleRemoveTicket = () => {
      if (user && payloadData && payloadData.roles === "customer"){
        fetch(`http://localhost:8000/api/tickets/?id=${ticketId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
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
          } else if (response.status === 200) {

            
            setResponseMsg("Customer updated successfully");
            setTimeout(() => {
              setResponseMsg("");
            }, 3000);
            window.location.href = '/';
    
          }})
          .catch((error) => {
            console.log(error);
          })
      }
    }
  return (
    <button onClick={handleRemoveTicket}>Remove Ticket</button>
  )
}
