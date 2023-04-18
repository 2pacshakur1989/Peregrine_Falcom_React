import React, { useState,useContext } from "react";
import './Navbar.css';
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import FlightSearchForm from "../flights/FlightSearchForm";
import { AuthContext } from "../authentication/AuthContext";
import { Admin } from "../admins/Admin";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Home } from "./Home";
import CustomerProfile from "../customers/CustomerProfile";
import MyTickets from "../customers/MyTickets";
import { MyFlights } from "../flights/MyFlights";
import AirlineProfile from "../airlines/AirlineProfile";

const Navbar = () => {
    const [LoginLink, setLogin] = useState(false);
    const [SignupLink, setSignup] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);
    const [GetAllFlightsLink, setFlights] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a new state variable
    const {user, logout} = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const {payloadData, setRealodUpdatedData} = useContext(AuthContext);
    

    const handleLogout = () => {
        logout();
        Cookies.remove('token')
    };

    const handleLoginLink = (event) =>{
        event.preventDefault();
        setLogin(true);
        setActiveComponent("login");
    };

    const handleSignupClick = (event) => {
        event.preventDefault();
        setSignup(true);
        setActiveComponent("signup");
    };

    const handleAllFlightsClick = (event) => {
        event.preventDefault();
        setFlights(true);
        setActiveComponent("flights")
    };

    const handleLoginSuccess = () => {
      console.log("User logged in successfully.");  
        setIsLoggedIn(true);
        setActiveComponent(null)
    };

    const handleHome = (event) => {
      event.preventDefault();
      setActiveComponent("/");
    };

    const handleCustomer = (event) => {
      event.preventDefault();
      setShowDropdown(!showDropdown);
    };

    const handleProfileClick = (event) => {
      event.preventDefault();
      setActiveComponent("customerprofile");
      setRealodUpdatedData(true);
    };

    const handleAirlineProfileClick = (event) => {
      event.preventDefault();
      setActiveComponent("airlineprofile");
      setRealodUpdatedData(true);
    };

    const handleTicketsClick = (event) => {
      event.preventDefault();
      setActiveComponent("tickets");
    }

    const handleMyFlightsClick = (event) => {
      event.preventDefault();
      setActiveComponent("myflights")
    }


    
    return (
        <div>
            <nav>
                <ul>
                <div id="mainP">
          <span>
          <Link id="main" to="/about" onClick={handleHome}>About us</Link>        
          <Link id="main" to="/flights" onClick={handleAllFlightsClick}>Flights</Link>
          <Link id="main" to="/airlines">Airlines</Link>
          {user && ( 
             <p id="logoutP"> <Link id="Logout" href="/" onClick={handleLogout}>
                Logout
              </Link></p>
          )}
          </span>

          {/* Display the Customer link if the user is a customer */}
          {user && payloadData && String(payloadData.roles) === "customer" && (
            <div>
            <p id="profileP">
            <Link id="profile" to="/customer" onClick={handleCustomer}>{payloadData.username}
            </Link>
            </p>  
            <div className="dropdown">
              {showDropdown && (
                <div id="dropdown" className="dropdown-content">
                  <Link id="drop" to="/customerprofile" onClick={handleProfileClick}>Profile</Link>
                  <Link id="drop" to="/tickets" onClick={handleTicketsClick}>Tickets</Link>
                </div>
              )}
            </div>
            </div> 
          )}

          {/* Display the Admin link if the user is an admin */}
          {user && payloadData && String(payloadData.roles) === "admin" && (
            <div className="dropdown">
              {showDropdown && (
                <div id="dropdown" className="dropdown-content">
                  <Link id="drop" to="/">Profile</Link>
                  <Link id="drop" to="/">Tickets</Link>
                </div>
              )}
            </div>
          )}

          {/* Display the Airline link if the user is an airline */}
          {user && payloadData && String(payloadData.roles) === 'airline' && (
            <div>
            <p id="profileP">
            <Link id="profile" to="/customer" onClick={handleCustomer}>{payloadData.username}
            </Link>
            </p>  
            <div className="dropdown">
              {showDropdown && (
                <div id="dropdown" className="dropdown-content">
                  <Link id="drop" to="/airlineprofile" onClick={handleAirlineProfileClick}>Profile</Link>
                  <Link id="drop" to="/myflights" onClick={handleMyFlightsClick} >MyFlights </Link>
                </div>
              )}
            </div>
            </div>
          )}


          {/* Display the Login and Signup links if the user is not logged in */}
          {!user && (
            <p id="loginP">
              <Link id="Login" href="/login" onClick={handleLoginLink}>
                Login
              </Link>
            </p>
          )}
          {!user && (
            <p id="signupP">
              <Link id="Signup" href="/signup" onClick={handleSignupClick}>
                Signup
              </Link>
            </p>
          )}
        </div>
                </ul> 
            </nav>
            <br/>
            
            {/* Conditionally render the components based on the value of isLoggedIn */}
            {activeComponent === "flights" && <FlightSearchForm/>}
            {activeComponent === "tickets" && <MyTickets clicked="clicked"/>}
            {activeComponent === "myflights" && <MyFlights clicked="clicked"/>}
            {activeComponent === "signup" && <SignUp/>}
            {activeComponent === "/" && <Home/>}
            {activeComponent === "login" && <Login handleLoginSuccess={handleLoginSuccess}/>}
            {activeComponent === "customerprofile" && <CustomerProfile/>}
            {activeComponent === "airlineprofile" && <AirlineProfile/>}
            {isLoggedIn && payloadData && String(payloadData.roles) === "admin" && <Admin />}
            {/* {isLoggedIn && payloadData && String(payloadData.roles) === "airline" && <Airline />} */}

        </div>
    );
};

export default Navbar;