import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../authentication/AuthContext";
import Cookies from "js-cookie";
import './MyTickets.css';


export const MyTickets = (props) => {
  const [tickets, setTickets] = useState([]);
  const [flightDetails, setFlightDetails] = useState([]);
  const [message, setResponseMsg] = useState('');
  const { user, payloadData } = useContext(AuthContext);
  const { clicked } = props;

  const handleRemoveTicket = (ticketId) => {

    if (user && payloadData && String(payloadData.roles) === "customer"){
      
      fetch(`http://localhost:8000/api/tickets/?id=${ticketId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then(response => {
        if (response.status === 200) {

          
          setResponseMsg("Ticket removed successfully");
          setTimeout(() => {
            setResponseMsg("");
          }, 3000);
          handleGetTickets();
          
  
        }})
        .catch((error) => {
          console.log(error);
        })};

    };
  useEffect(() => {
    if (clicked === "clicked") {
      handleGetTickets();
    }
  }, [clicked]);


  const handleGetTickets = () => {
    if (user && payloadData && String(payloadData.roles) === "customer") {
      fetch(`http://localhost:8000/api/tickets/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTickets(data);
          console.log(data)
          const flightIds = data.map((ticket) => ticket.flight_id);
          Promise.all(
            flightIds.map((flightId) =>
              fetch(`http://localhost:8000/api/flights/?id=${flightId}`)
                .then((response) => response.json())
            )
          ).then((flightDetails) => setFlightDetails(flightDetails));
        })
        .catch((error) => {
          console.log(error);
        });
        
    }
  };

  return (
    <div>
      <p><span id="message">{message}</span></p>
      <br />
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <div key={ticket.id} className="result">
            <br />
            <a id="display">
              <button id="removeticket" onClick={() => handleRemoveTicket(ticket.id)}>Remove Ticket</button>
              <p className="info">FlightId-{flightDetails[index]?.id}</p>
              <p className="info">
                {flightDetails[index]?.origin_country_name}
              </p>
              <p className="info">
                {flightDetails[index]?.destination_country_name}
              </p>
              <p className="info">
                {flightDetails[index]?.airline_company_name}
              </p>
              <p className="info">{flightDetails[index]?.departure_time}</p>
              <p className="info">{flightDetails[index]?.landing_time}</p>
            </a>
          </div>
        ))
      ) : (
        <p id="notickets">No tickets found</p>
      )}
    </div>
  );  
};

export default MyTickets;

