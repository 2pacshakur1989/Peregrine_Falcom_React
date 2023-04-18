// import React, { useState, useContext } from 'react'
// import { AuthContext } from '../authentication/AuthContext'
// import Cookies from 'js-cookie';

// export const MyFlights = () => {
//     const [ myflights, setMyFlights ] = useState('');
//     const { user , payloadData } = useContext(AuthContext);
//     const [flightDetails, setFlightDetails] = useState([]);
//     const [airlineId, setAirlineId] = useState('');
//     const [message, setResponseMsg] = useState('');

//     const handleRemoveFlight = (flightId) => {
//       console.log(user);
//       console.log(payloadData);
//       // console.log(typeof ticketId);
    
//       if (user && payloadData && String(payloadData.roles) === "airline") {
//         fetch(`http://localhost:8000/api/flights/?id=${flightId}`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         })
//           .then((response) => {
//             if (response.status === 200) {
//               setResponseMsg("Flight removed successfully");
//               setTimeout(() => {
//                 setResponseMsg("");
//               }, 3000);
//               MyFlights();
//             }
//           })
//           .catch((error) => {
//             console.log(error);
//           });
    
//     if (user && payloadData && String(payloadData.roles) === "airline") {
//       fetch(
//         `http://localhost:8000/api/airlines/?user_id=${payloadData.user_id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setAirlineId(data);
//           console.log(data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//       fetch(
//         `http://localhost:8000/api/flights/?my=${airlineId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setMyFlights(data);
//           console.log(data);
//         })
//         .then((flightDetails) => setFlightDetails(flightDetails))

//         .catch((error) => {
//           console.log(error);
//         });
//         }
//       }
//     };
    


//     return (
//       <div>
//         <p><span id="message">{message}</span></p>
//         <br />
//         {myflights.length > 0 ? (
//           myflights.map((flight, index) => (
//             <div key={flight.id} className="result">
//               <br />
//               <a id="display">
//                 <button id="removeticket" onClick={() => handleRemoveFlight(flight.id)}>Remove Flight</button>
//                 <p className="info">FlightId-{flightDetails[index]?.id}</p>
//                 <p className="info">
//                   {flightDetails[index]?.origin_country_name}
//                 </p>
//                 <p className="info">
//                   {flightDetails[index]?.destination_country_name}
//                 </p>
//                 <p className="info">
//                   {flightDetails[index]?.airline_company_name}
//                 </p>
//                 <p className="info">{flightDetails[index]?.departure_time}</p>
//                 <p className="info">{flightDetails[index]?.landing_time}</p>
//               </a>
//             </div>
//           ))
//         ) : (
//           <p id="notickets">No flights found</p>
//         )}
//       </div>
//     ); 
// }






















import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../authentication/AuthContext'
import Cookies from 'js-cookie';
import { AddFlightForm } from './AddFlightForm';

export const MyFlights = (props) => {
    const [ myflights, setMyFlights ] = useState('');
    const { user , payloadData } = useContext(AuthContext);
    const [flightDetails, setFlightDetails] = useState([]);
    const [airlineId, setAirlineId] = useState('');
    const [message, setResponseMsg] = useState('');
    const NoFlights = "No flights found"
    const { clicked } = props;
    // console.log(user);
    // console.log(payloadData);

    const handleRemoveFlight = (flightId) => {
      console.log(flightId);
      if (user && payloadData && String(payloadData.roles) === "airline") {
        fetch(`http://localhost:8000/api/flights/?id=${flightId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
          .then((response) => {
            if (response.status === 200) {
              setResponseMsg("Flight removed successfully");
              setTimeout(() => {
                setResponseMsg("");
              }, 3000);
              // fetch the flights again after deleting the flight
              fetchFlights();
            }else if(response.status === 404){
              setResponseMsg("Flight cannot be removed as it has an active/purchased tickets");
              setTimeout(() => {
                setResponseMsg("");
              }, 3000);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    useEffect(() => {
      if (clicked === "clicked") {
        fetchFlights();
      }
    }, [clicked]);

    const fetchFlights = () => {
      if (user && payloadData && String(payloadData.roles) === "airline") {
        fetch(
          `http://localhost:8000/api/airlines/?user_id=${payloadData.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
    
        .then((response) => response.json())
        .then((data) => {
            setAirlineId(data.airline_data.id);
            fetch(
              `http://localhost:8000/api/flights/?my=${data.airline_data.id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("token")}`,
                },
              }
            )
            .then((response) => response.json())
            .then((data) => {
              setMyFlights(data);
              const flightIds = data.map((myflights) => myflights.id);
              Promise.all(
                flightIds.map((flightId) =>
                  fetch(`http://localhost:8000/api/flights/?id=${flightId}`)
                    .then((response) => response.json())
                )
              ).then((flightDetails) => setFlightDetails(flightDetails));
            })
        })
              // console.log(data.airline_data.id);

        .catch((error) => {
        console.error(error);  
        });

        
      }
    };
    
    


    return (
      <div>
        <p><span id="message">{message}</span></p>
        <AddFlightForm/>
        <br />
        {myflights.length > 0 ? (
          myflights.map((flight, index) => (
            <div key={flight.id} className="result">
              <br />
              <a id="display">
                <button id="removeticket" onClick={() => handleRemoveFlight(flight.id)}>Remove Flight</button>
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
                <p className="info">Tickets - {flightDetails[index]?.remaining_tickets}</p>
              </a>
            </div>
          ))
        ) : (
          <p id="notickets">{message}</p>
        )}
      </div>
    ); 
}
