// import React, { useState, useContext, useEffect } from 'react'
// import { AuthContext } from '../authentication/AuthContext'
// import Cookies from 'js-cookie';
// import './AllCustomers.css';

// export const AllCustomers = (props) => {
//     const { user, payloadData } = useContext(AuthContext);
//     const [customers , setCustomers] = useState('');
//     const [customerDetails, setCustomerDetails] = useState([]);
//     const [message, setResponseMsg] = useState('');
//     const { clicked } = props;

//     useEffect(() => {
//         if (clicked === "clicked") {
//           handleGetAllCustomers();
//         }
//       }, [clicked]);

//     const handleGetAllCustomers = () =>{
//     if(user && payloadData && String(payloadData.roles) === 'admin'){
//         fetch(`http://localhost:8000/api/customers/`,{
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${Cookies.get("token")}`,
//             },  
//         })
//         .then((response) => response.json())
//         .then((data) => {
//           setCustomers(data);
//           console.log(data);
//           const customersIds = data.map((customers) => customers.id);
//           Promise.all(
//             customersIds.map((customerId) =>
//               fetch(`http://localhost:8000/api/customers/?customer_id=${customerId}`,{
//                 method: "GET",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${Cookies.get("token")}`,
//                 },  
//             })
//                 .then((response) => response.json()))
//           ).then((customerDetails) => setCustomerDetails(customerDetails));
//         })
//         .catch((error) => {
//           console.log(error);
//         });}

//     function CustomerSearch(props) {
//         const { customers } = props;
//         const [selectedId, setSelectedId] = useState(null);
//         const [searchId, setSearchId] = useState('');
      
//         const handleChange = (event) => {
//           setSelectedId(event.target.value);
//         };
      
//         const handleSearch = () => {
//           const customer = customers.find(c => c.id === parseInt(searchId));
//           if (customer) {
//             setSelectedId(customer.id);
//           } else {
//             // handle error
//           }
//         };
//     }}
//     return (
//       <div>
//         <table >
//           <thead id='display'>
//             <tr>
//               <th>Customer id</th>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Address</th>
//               <th>Phone Number</th>
//             </tr>
//           </thead>
//           <tbody id='result'>
//             {customers.length > 0 ? (
//               customers.map((customer, index) => (
//                 <tr key={customer.id}>
//                   <td>{customerDetails[index]?.id}</td>
//                   <td>{customerDetails[index]?.first_name}</td>
//                   <td>{customerDetails[index]?.last_name}</td>
//                   <td>{customerDetails[index]?.address}</td>
//                   <td>{customerDetails[index]?.phone_no}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No customers found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     );    
// }





// import React, { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../authentication/AuthContext';
// import Cookies from 'js-cookie';
// import './AllCustomers.css';

// export const AllCustomers = (props) => {
//   const { user, payloadData } = useContext(AuthContext);
//   const [customers, setCustomers] = useState([]);
//   const [customerDetails, setCustomerDetails] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [searchId, setSearchId] = useState('');
//   const [message, setResponseMsg] = useState('');
//   const { clicked } = props;

//   useEffect(() => {
//     if (clicked === "clicked") {
//       handleGetAllCustomers();
//     }
//   }, [clicked]);

//   const handleGetAllCustomers = () => {
//     if(user && payloadData && String(payloadData.roles) === 'admin') {
//       fetch(`http://localhost:8000/api/customers/`,{
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },  
//       })
//       .then((response) => response.json())
//       .then((data) => {
//         setCustomers(data);
//         console.log(data);
//         const customersIds = data.map((customers) => customers.id);
//         Promise.all(
//           customersIds.map((customerId) =>
//             fetch(`http://localhost:8000/api/customers/?customer_id=${customerId}`,{
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${Cookies.get("token")}`,
//               },  
//             })
//             .then((response) => response.json())
//           )
//         )
//         .then((customerDetails) => setCustomerDetails(customerDetails));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     }
//   };

//   const handleSearch = () => {
//     const customer = customers.find((c) => c.id === parseInt(searchId));
//     if (customer) {
//       setSelectedId(customer.id);
//     } else {
//       // handle error
//     }
//   };

//   const handleReset = () => {
//     setSearchId('');
//     setSelectedId(null);
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="searchId">Search by ID: </label>
//         <input 
//           type="text" 
//           name="searchId" 
//           value={searchId}
//           onChange={(event) => setSearchId(event.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//         {selectedId && (
//           <button onClick={handleReset}>Reset</button>
//         )}
//       </div>


//       <div>
//         <label htmlFor="customers">Select a customer: </label>
//         <select 
//           name="customers" 
//           id="customers"
//           value={selectedId || ''}
//           onChange={(event) => setSelectedId(event.target.value)}
//         >
//           <option value="">Select a customer</option>
//           {customers.map((customer) => (
//             <option 
//               key={customer.id}
//               value={customer.id}
//             >
//               {customer.first_name} {customer.last_name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {selectedId && (
//         <table>

          
//   <tbody id='result'>

//                 <tr key={customer.id}>
//                   <td>{customerDetails.id}</td>
//                   <td>{customerDetails[index]?.first_name}</td>
//                   <td>{customerDetails[index]?.last_name}</td>
//                   <td>{customerDetails[index]?.address}</td>
//                   <td>{customerDetails[index]?.phone_no}</td>

//     </tr>
//   </tbody>
// </table>)}

//   </div>
// );
// }











// import React, { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../authentication/AuthContext';
// import Cookies from 'js-cookie';
// import GetCustomers from '../customers/GetCustomers';
// import './AllCustomers.css';

// export const AllCustomers = (props) => {
//   const { user, payloadData } = useContext(AuthContext);
//   const [customer, setCustomer] = useState([]);
//   const [message, setResponseMsg] = useState('');
//   const { clicked } = props;

//   const handleCustomerSelect = (customerId) => {
//     setCustomer(customerId);
//   };

//   useEffect(() => {
//     if (clicked === "clicked") {
//       handleSelect();
//     }
//   }, [clicked]);

//   const handleSelect = async (event) => {
 
    
  
//     if(user && payloadData && String(payloadData.roles) === 'admin') {
//       fetch(`http://localhost:8000/api/customers/?customer_id=${customer}`,{
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },  
//       })
//       .then((response) => response.json())
//       .then((data) => {
//         setCustomer(data);
//         // console.log(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     }
//   };



//   return (
//     <div>
//       <label id='origin'>
//         <span>Customer</span>
//         <GetCustomers onCustomerSelect={handleCustomerSelect}/>
//         <input type="hidden" value={customer} onChange={(e) => setCustomer(e.target.value)} />
//         <button onClick={handleSelect}>Select Customer</button>
//         {customer && (
//           <div>
//             <h2>Customer Details:</h2>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Customer ID</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Address</th>
//                   <th>Phone Number</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{customer.id}</td>
//                   <td>{customer.first_name}</td>
//                   <td>{customer.last_name}</td>
//                   <td>{customer.address}</td>
//                   <td>{customer.phone_number}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </label>
//     </div>
//   );  
// }






// import React, { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../authentication/AuthContext';
// import Cookies from 'js-cookie';
// import GetCustomers from '../customers/GetCustomers';
// import './AllCustomers.css';

// export const AllCustomers = (props) => {
//   const { user, payloadData } = useContext(AuthContext);
//   const [customer, setCustomer] = useState([]);
//   const [searchId, setSearchId] = useState('');
//   const [message, setResponseMsg] = useState('');
//   const { clicked } = props;
//   console.log(customer);

//   const handleCustomerSelect = (customerId) => {
//     setSearchId('');
//     setCustomer(customerId);
//   };

//   useEffect(() => {
//     if (clicked === "clicked") {
//       handleSelect();
//     }
//   }, [clicked]);

//   const handleSelect = async (event) => {
//     if(user && payloadData && String(payloadData.roles) === 'admin') {
//       const customerId = searchId || customer;
//       console.log(searchId);
//       fetch(`http://localhost:8000/api/customers/?customer_id=${customerId}`,{
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },  
//       })
//       .then((response) => response.json())
//       .then((data) => {
//         setCustomer(data);
//         // console.log(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     }
//   };

//   return (
//     <div>
//       <label>
//         <span>Customer</span>
//         <GetCustomers onCustomerSelect={handleCustomerSelect}/>
//         <input type="hidden" value={customer} onChange={(e) => setCustomer(e.target.value)} />
//         <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Search by ID" />
//         <button onClick={handleSelect}>Select Customer</button>
//         {customer && (
          
//           <div id='results'>
//             <table id='table'>
//               <thead id='thead'>
//                 <tr>
//                   <th>Customer ID</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Address</th>
//                   <th>Phone Number</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{customer.id}</td>
//                   <td>{customer.first_name}</td>
//                   <td>{customer.last_name}</td>
//                   <td>{customer.address}</td>
//                   <td>{customer.phone_no}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </label>
//     </div>
//   );  
// }










import React, { useState, useContext } from 'react';
import { AuthContext } from '../authentication/AuthContext';
import Cookies from 'js-cookie';
import GetCustomers from '../customers/GetCustomers';
import AddCustomer from './AddCustomer';
import './AllCustomers.css';

export const AllCustomers = () => {
  const { user, payloadData } = useContext(AuthContext);
  const [customer, setCustomer] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [message, setResponseMsg] = useState('');
  const [activeComponent, setActiveComponent] = useState('');

  const handleAddClick = (event) => {
    event.preventDefault();
    setActiveComponent(activeComponent === 'addcustomer' ? '' : 'addcustomer');

  }

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
    <GetCustomers onCustomerSelect={handleCustomerSelect} />
    <br></br>
    </div>
    {customer && (
      <table id='result'>
       
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
        <br></br>
       <button id='removecustomerbutton'>Remove Customer</button>
      
      </table>
    )}
    
  </div>
);
};

