// import React, { useState } from "react";
// import './Navbar.css';
// import Login from "../authentication/Login";
// import SignUp from "../authentication/SignUp";
// import FlightSearchForm from "../flights/FlightSearchForm";
// import Customer from "../customers/Customer";

// const Navbar = () => {
//     const [LoginLink, setLogin] = useState(false);
//     const [SignupLink, setSignup] = useState(false);
//     const [activeComponent, setActiveComponent] = useState(null);
//     const [GetAllFlightsLink, setFlights] = useState(false);
    

//     const handleLoginLink = (event) =>{
//         event.preventDefault();
//         setLogin(true);
//         setSignup(false);
//         setFlights(false);
//         setActiveComponent("login");
//     };

//     const handleSignupClick = (event) => {
//         event.preventDefault();
//         setSignup(true);
//         setLogin(false);
//         setFlights(false);
//         setActiveComponent("signup");
//     };


//     const handleAllFlightsClick = (event) => {
//         event.preventDefault();
//         setFlights(true);
//         setLogin(false);
//         setSignup(false);
//         setActiveComponent("flights")
//     };

//   return (
//     <div>
//     <nav>
//       <ul>
//       <div id="mainP">
//           <a id="main" href="/">Home</a>
//           <a id="main" href="/flights" onClick={handleAllFlightsClick}>Flights</a>
//           <a id="main" href="/airlines">Airlines</a>
//       <p id="loginP"> <a id="Login" href="/login" onClick={handleLoginLink}>Login</a></p>
//       <p id="signupP"> <a id="Signup" href="/signup" onClick={handleSignupClick}>Signup</a></p></div>
//       </ul> 
//     </nav>
//     <br/>
//     {activeComponent === "flights" && <FlightSearchForm/>}
//     {activeComponent === "signup" && <SignUp/>}
//     {activeComponent === "login" && <Login/>}
//     </div>
    
//   );
// };

// export default Navbar;







// import React, { useState,useContext } from "react";
// import './Navbar.css';
// import Login from "../authentication/Login";
// import SignUp from "../authentication/SignUp";
// import FlightSearchForm from "../flights/FlightSearchForm";
// import Customer from "../customers/Customer";
// import { AuthContext } from "../authentication/AuthContext";
// import { Admin } from "../admins/Admin";
// import { Airline } from "../airlines/Airline";

// const Navbar = () => {
//     const [LoginLink, setLogin] = useState(false);
//     const [SignupLink, setSignup] = useState(false);
//     const [activeComponent, setActiveComponent] = useState(null);
//     const [GetAllFlightsLink, setFlights] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a new state variable
//     const [isLoggegOut, setLoggedOut] = useState(false);
//     const {user, logout} = useContext(AuthContext);

//     const handleLogout = () => {
//         logout();
//     }


//     const handleLoginLink = (event) =>{
//         event.preventDefault();
//         setLogin(true);
//         setSignup(false);
//         setFlights(false);
//         setActiveComponent("login");
//     };

//     const handleSignupClick = (event) => {
//         event.preventDefault();
//         setSignup(true);
//         setLogin(false);
//         setFlights(false);
//         setActiveComponent("signup");
//     };

//     const handleAllFlightsClick = (event) => {
//         event.preventDefault();
//         setFlights(true);
//         setLogin(false);
//         setSignup(false);
//         setActiveComponent("flights")
//     };

//     // This function is called when the user logs in successfully
//     const handleLoginSuccess = () => {
//       console.log("User logged in successfully.");
//         setIsLoggedIn(true);
//         setActiveComponent(null)
//     };

//     const handleLogoutProcess = () =>{
//       console.log("user logged out successfully")
//       setLoggedOut(true);
//       setActiveComponent('logout')
//     }
    
//     return (
//         <div>
//             <nav>
//                 <ul>
//                     <div id="mainP">
//                         <a id="main" href="/">Home</a>
//                         <a id="main" href="/flights" onClick={handleAllFlightsClick}>Flights</a>
//                         <a id="main" href="/airlines">Airlines</a>

//                         {/* Show the Customer component if the user is logged in */}
//                         {isLoggedIn && <a id="main" href="/customer">Customer</a>}
//                         {isLoggedIn && <p id="logoutP"> <a id="Logout" href="/" onClick={handleLogout}>Logout</a></p>}
                        

//                         {/* Hide the Login and Signup components if the user is logged in */}
//                         {!isLoggedIn && <p id="loginP"> <a id="Login" href="/login" onClick={handleLoginLink}>Login</a></p>}
//                         {!isLoggedIn && <p id="signupP"> <a id="Signup" href="/signup" onClick={handleSignupClick}>Signup</a></p>}
//                     </div>
//                 </ul> 
//             </nav>
//             <br/>
            
//             {/* Conditionally render the components based on the value of isLoggedIn */}
//             {activeComponent === "flights" && <FlightSearchForm/>}
//             {activeComponent === "signup" && <SignUp/>}
//             {activeComponent === "login" && <Login handleLoginSuccess={handleLoginSuccess}/>}
//             {isLoggedIn && <Customer />}
//         </div>
//     );
// };

// export default Navbar;















import React, { useState,useContext } from "react";
import './Navbar.css';
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import FlightSearchForm from "../flights/FlightSearchForm";
import Customer from "../customers/Customer";
import { AuthContext } from "../authentication/AuthContext";
import { Admin } from "../admins/Admin";
import { Airline } from "../airlines/Airline";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Home } from "./Home";

const Navbar = () => {
    const [LoginLink, setLogin] = useState(false);
    const [SignupLink, setSignup] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);
    const [GetAllFlightsLink, setFlights] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a new state variable
    const [isLoggegOut, setLoggedOut] = useState(false);
    const {user, logout, payloadData} = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        Cookies.remove('token')
    }
    // console.log(payloadData.user_id)


    const handleLoginLink = (event) =>{
        event.preventDefault();
        setLogin(true);
        setSignup(false);
        setFlights(false);
        setActiveComponent("login");
    };

    const handleSignupClick = (event) => {
        event.preventDefault();
        setSignup(true);
        setLogin(false);
        setFlights(false);
        setActiveComponent("signup");
    };

    const handleAllFlightsClick = (event) => {
        event.preventDefault();
        setFlights(true);
        setLogin(false);
        setSignup(false);
        setActiveComponent("flights")
    };


    // This function is called when the user logs in successfully
    const handleLoginSuccess = () => {
      console.log("User logged in successfully.");
      
        setIsLoggedIn(true);
        setActiveComponent(null)
    };

    const handleHome = (event) => {
      event.preventDefault();
      setActiveComponent("/");
    }

    const handleCustomer = (event) => {
      event.preventDefault();
      setActiveComponent("customer")
    }

   
    
    return (
        <div>
            <nav>
                <ul>
                <div id="mainP">
          <span><Link id="main" to="/" onClick={handleHome}>About us</Link>    
         
          <Link id="main" to="/flights" onClick={handleAllFlightsClick}>Flights</Link>
          
          <Link id="main" to="/airlines">Airlines</Link>
          </span>

          {/* Display the Customer link if the user is a customer */}
          {user && payloadData && String(payloadData.roles) === "customer" && (
            <p id="profileP">
            <Link id="profile" to="/customer" onClick={handleCustomer}>{payloadData.username}</Link>
            </p>
            
          )}

          {/* Display the Admin link if the user is an admin */}
          {user && payloadData && String(payloadData.roles) === 'admin' && (
            <p id="profileP">
             <Link id="profile" to="{payloadData.username">{payloadData.username}</Link>
            </p>
          )}

          {/* Display the Airline link if the user is an airline */}
          {user && payloadData && String(payloadData.roles) === 'airline' && (
            <p id="profileP">
               <Link id="profile" to="{payloadData.username">{payloadData.username}</Link>
            </p>
          )}

          {/* Display the Logout link if the user is logged in */}
          {user && (
            <p id="logoutP">
              <a id="Logout" href="/" onClick={handleLogout}>
                Logout
              </a>
            </p>
          )}

          {/* Display the Login and Signup links if the user is not logged in */}
          {!user && (
            <p id="loginP">
              <a id="Login" href="/login" onClick={handleLoginLink}>
                Login
              </a>
            </p>
          )}
          {!user && (
            <p id="signupP">
              <a id="Signup" href="/signup" onClick={handleSignupClick}>
                Signup
              </a>
            </p>
          )}
        </div>
                </ul> 
            </nav>
            <br/>
            
            {/* Conditionally render the components based on the value of isLoggedIn */}
            {activeComponent === "flights" && <FlightSearchForm/>}
            {activeComponent === "signup" && <SignUp/>}
            {activeComponent === "/" && <Home/>}
            {activeComponent === "login" && <Login handleLoginSuccess={handleLoginSuccess}/>}
            {activeComponent === "customer" && <Customer/>}
            {isLoggedIn && payloadData && String(payloadData.roles) === "customer" && <Customer />}
            {isLoggedIn && payloadData && String(payloadData.roles) === "admin" && <Admin />}
            {isLoggedIn && payloadData && String(payloadData.roles) === "airline" && <Airline />}

        </div>
    );
};

export default Navbar;
