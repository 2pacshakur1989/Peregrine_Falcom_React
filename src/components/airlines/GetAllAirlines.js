// import React, {useState, useEffect} from "react";

// const GetAllAirlines = () => {
//     const [airlines, setAirlines] = useState([]);
  
//     useEffect(() => {
//       const fetchAirlines = async () => {
//         const response = await fetch("http://localhost:8000/api/airlines/");
//         const data = await response.json();
//         console.log(data); 
//         setAirlines(data);
//       };
  
//       fetchAirlines();
//     }, []);
  
//     return (
//       <div>
//         <h2>All Airlines</h2>
//         {airlines.map((airlinecompany) => (
//           <div key={airlinecompany.id}>
//             <p>{airlinecompany.id}</p>
//             <p>{airlinecompany.name}</p>
//             <p>{airlinecompany.country_id.name}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default GetAllAirlines;