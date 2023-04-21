// import React from "react";

// export default function MyTcikets () {
//   const [flights, setFlights] = useState([]);

//     const handleGetTickets = (event) => {
//         event.preventDefault();
//         if (user && payloadData && String(payloadData.roles) === "customer") {
//         fetch(`http://localhost:8000/api/tickets/`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${Cookies.get('token')}`,
//             },
//           })
//           .then(response => response.json())
//           .then(data => {
//             setFlights(data);
//           })
//           .catch(error =>{
//             console.log(error);
//           })
        
//         };
//     }

//     return(
//       <div>
//     flights.map((flight) => (
//   <div key={flight.id} className="flight-result">

// <a id='addticket' >
// <p className='flight-info'>FlighID {flight.id}</p>
// <p className='flight-info'>{flight.origin_country_name}</p>
// <p className='flight-info'>{flight.destination_country_name}</p>
// <p className='flight-info'>{flight.airline_company_name}</p>
// <p className='flight-info'>{flight.departure_time}</p>
// <p className='flight-info'>{flight.landing_time}</p>
// <p className='flight-info'>Tickets - {flight.remaining_tickets}</p>
// </a>
// </div>
//       </div>
//     );
    
// }



// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../authentication/AuthContext";
// import Cookies from "js-cookie";

// export default function MyTickets() {
//   const [flights, setFlights] = useState([]);
//   const { user, payloadData} = useContext(AuthContext);

//   const handleGetTickets = (event) => {
//     event.preventDefault();
//     if (user && payloadData && String(payloadData.roles) === "customer") {
//       fetch(`http://localhost:8000/api/tickets/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setFlights(data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   useEffect(() => {
//     handleGetTickets();
//   }, []);

//   return (
//     <div>
//       {flights.map((flight) => (
//         <div key={flight.id} className="flight-result">
//           <a id="addticket">
//             <p className="flight-info">FlighID {flight.id}</p>
//             <p className="flight-info">{flight.origin_country_name}</p>
//             <p className="flight-info">{flight.destination_country_name}</p>
//             <p className="flight-info">{flight.airline_company_name}</p>
//             <p className="flight-info">{flight.departure_time}</p>
//             <p className="flight-info">{flight.landing_time}</p>
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }





// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../authentication/AuthContext";
// import Cookies from "js-cookie";

// export default function MyTickets(props) {
//   const [flights, setFlights] = useState([]);
//   const { user, payloadData} = useContext(AuthContext);
//   const { clicked } = props;

//   const handleGetTickets = (event) => {
//     event.preventDefault();
//     if (user && payloadData && String(payloadData.roles) === "customer") {
//       fetch(`http://localhost:8000/api/tickets/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setFlights(data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };
//     if (clicked === "clicked"){
//       handleGetTickets();
//     };

  
 

//   return (
//     <div>
//       {flights.map((flight) => (
//         <div key={flight.id} className="flight-result">
//           <a id="addticket">
//             <p className="flight-info">FlighID {flight.id}</p>
//             <p className="flight-info">{flight.origin_country_name}</p>
//             <p className="flight-info">{flight.destination_country_name}</p>
//             <p className="flight-info">{flight.airline_company_name}</p>
//             <p className="flight-info">{flight.departure_time}</p>
//             <p className="flight-info">{flight.landing_time}</p>
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }








// export const MyTickets = (props) => {
//   const [flights, setFlights] = useState([]);
//   const { user, payloadData} = useContext(AuthContext);
//   const { clicked } = props;

//   const handleGetTickets = () => {

//     if (user && payloadData && String(payloadData.roles) === "customer") {
//       fetch(`http://localhost:8000/api/tickets/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setFlights(data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }}

//     if (clicked === "clicked"){
//       handleGetTickets();
//     };


//   return (
//     <div>
//     {flights.map((flight) => (
//       <div key={flight.id} className="flight-result">
//         <a id="addticket">
//           <p className="flight-info">FlighID {flight.id}</p>
//           <p className="flight-info">{flight.origin_country_name}</p>
//           <p className="flight-info">{flight.destination_country_name}</p>
//           <p className="flight-info">{flight.airline_company_name}</p>
//           <p className="flight-info">{flight.departure_time}</p>
//           <p className="flight-info">{flight.landing_time}</p>
//         </a>
//       </div>
//     ))}
//   </div>
//   )
//   }

// export default MyTickets;


// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../authentication/AuthContext";
// import Cookies from "js-cookie";
// import { RemoveTicket } from "./RemoveTicket";
// import './MyTickets.css';


// export const MyTickets = (props) => {
//   const [flights, setFlights] = useState([]);
//   const { user, payloadData} = useContext(AuthContext);
//   const { clicked } = props;

//   useEffect(() => {
//     if (clicked === "clicked") {
//       handleGetTickets();
//     }
//   }, [clicked]);

//   const handleGetTickets = () => {
//     if (user && payloadData && String(payloadData.roles) === "customer") {
//       fetch(`http://localhost:8000/api/tickets/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setFlights(data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   return (
//     <div>
//       {flights.map((flight) => (
//         <div key={flight.id} className="result">
//           <a >
//             <p className="info">{flight.id}</p>
//             <p className="info">{flight.origin_country_name}</p>
//             <p className="info">{flight.destination_country_name}</p>
//             <p className="info">{flight.airline_company_name}</p>
//             <p className="info">{flight.departure_time}</p>
//             <p className="info">{flight.landing_time}</p>
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyTickets;

// import React, { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../authentication/AuthContext";
// import Cookies from "js-cookie";
// import { RemoveTicket } from "./RemoveTicket";
// import './MyTickets.css';


// export const MyTickets = (props) => {
//   const [tickets, setTickets] = useState([]);
//   const [flightDetails, setFlightDetails] = useState([]);
//   const { user, payloadData } = useContext(AuthContext);
//   const { clicked } = props;

//   useEffect(() => {
//     if (clicked === "clicked") {
//       handleGetTickets();
//     }
//   }, [clicked]);

//   const handleGetTickets = () => {
//     if (user && payloadData && String(payloadData.roles) === "customer") {
//       fetch(`http://localhost:8000/api/tickets/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setTickets(data);
//           const flightIds = data.map((ticket) => ticket.flight_id);
//           Promise.all(
//             flightIds.map((flightId) =>
//               fetch(`http://localhost:8000/api/flights/?id=${flightId}`)
//                 .then((response) => response.json())
//             )
//           ).then((flightDetails) => setFlightDetails(flightDetails));
//         })
//         .catch((error) => {
//           console.log(error);
//         });
        
//     }
//   };

//   return (
//     <div>
//       {tickets.map((ticket, index) => (
//         <div key={ticket.id} className="result">
//           <a id="display">
//             {<RemoveTicket ticket={ticket.id}/>}
//             <p className="info">FlightId-{flightDetails[index]?.id}</p>
//             <p className="info">
//               {flightDetails[index]?.origin_country_name}
//             </p>
//             <p className="info">
//               {flightDetails[index]?.destination_country_name}
//             </p>
//             <p className="info">
//               {flightDetails[index]?.airline_company_name}
//             </p>
//             <p className="info">{flightDetails[index]?.departure_time}</p>
//             <p className="info">{flightDetails[index]?.landing_time}</p>
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyTickets;







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
    console.log(ticketId);
    console.log(user);
    console.log(payloadData);
    // console.log(typeof ticketId);

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

