// import React, { useState, useEffect } from "react";

// const GetAllFlights = () => {
//   const [flights, setFlights] = useState([]);

//   useEffect(() => {
//     const fetchFlights = async () => {
//       const response = await fetch("http://localhost:8000/api/flights/");
//       const data = await response.json();
//       console.log(data); 
//       setFlights(data);
//     };

//     fetchFlights();
//   }, []);

//   return (
//     <div>
//       <h2>All Flights</h2>
//       {flights.map((flight) => (
//         <div key={flight.id}>
//           <p>{flight.id}</p>
//           <p>{flight.airline_company_name}</p>
//           <p>{flight.origin_country_name}</p>
//           <p>{flight.destination_country_name}</p>
//           <p>{flight.departure_time}</p>
//           <p>{flight.landing_time}</p>
//           <p>{flight.remaining_tickets}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GetAllFlights;


import React, { useState, useEffect } from "react";

const GetAllFlights = ({ url }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); 
      setFlights(data);
    };

    fetchFlights();
  }, [url]);

  return (
    <div>
      <h1>Flights</h1>
      {flights.map((flight) => (
        <div key={flight.id}>
          <p>{flight.id}</p>
          <p>{flight.airline_company_name}</p>
          <p>{flight.origin_country_name}</p>
          <p>{flight.destination_country_name}</p>
          <p>{flight.departure_time}</p>
          <p>{flight.landing_time}</p>
          <p>{flight.remaining_tickets}</p>
        </div>
      ))}
    </div>
  );
};

export default GetAllFlights;


