import React, { useState,useContext } from "react";
import './Navbar.css';
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import FlightSearchForm from "../flights/FlightSearchForm";
import { AuthContext } from "../authentication/AuthContext";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Home } from "./Home";
import CustomerProfile from "../customers/CustomerProfile";
import { MyFlights } from "../flights/MyFlights";
import AirlineProfile from "../airlines/AirlineProfile";
import { AddFlightForm } from "../flights/AddFlightForm";
import MyTickets from "../customers/MyTickets";
import { AllCustomers } from "../admins/AllCustomers";
import { AllAirlines } from "../admins/AllAirlines";
import { AllAdmins } from "../admins/AllAdmins";

const Navbar = () => {
  
    const [activeComponent, setActiveComponent] = useState(null);
    const [activeComponent2, setActiveComponent2] = useState(null);
    const {user, logout} = useContext(AuthContext);
    const {payloadData, setRealodUpdatedData} = useContext(AuthContext);
    const [flightAdded, setFlightAdded] = useState(false);
    const [flightUpdated, setFlightUpdated] = useState(false);


    const handleLogout = () => {
        logout();
        Cookies.remove('token')
    };

    const handleLoginLink = (event) =>{
        event.preventDefault();
        setActiveComponent("login");
        setActiveComponent2('');
    };

    const handleSignupClick = (event) => {
        event.preventDefault();
        setActiveComponent("signup");
    };

    const handleAllFlightsClick = (event) => {
        event.preventDefault();
        setActiveComponent("flights");
        setActiveComponent2('');
    };

    const handleLoginSuccess = () => {
      console.log("User logged in successfully.");  
        setActiveComponent(null);
    };

    const handleHome = (event) => {
      event.preventDefault();
      setActiveComponent("/");
      setActiveComponent2('');
    };

    const handleCustomer = (event) => {
      event.preventDefault();
      setActiveComponent2('');
    };

    const handleProfileClick = (event) => {
      event.preventDefault();
      setActiveComponent("customerprofile");
      setRealodUpdatedData(true);
      setActiveComponent2('');
    };

    const handleAirlineProfileClick = (event) => {
      event.preventDefault();
      setActiveComponent("airlineprofile");
      setRealodUpdatedData(true);
      setActiveComponent2('');
    };

    const handleTicketsClick = (event) => {
      event.preventDefault();
      setActiveComponent("tickets");
      setActiveComponent2('');
    };

    const handleMyFlightsClick = (event) => {
      event.preventDefault();
      setActiveComponent("myflights");
      setActiveComponent2("addflightform");    
    };

    const handleAllCustomersClick = (event) => {
      event.preventDefault();
      setActiveComponent("allcustomers");
    };

    const handleAllAirlinesClick = (event) => {
      event.preventDefault();
      setActiveComponent("allairlines");
    };

    const handleAllAdminsClick = (event) => {
      event.preventDefault();
      setActiveComponent("alladmins");
    };


    return (
        <div>
            <nav>
                <ul>
                <div id="mainP">


          <span>
          <Link id="main" to="/about" onClick={handleHome}>About us</Link> &nbsp;&nbsp;&nbsp;&nbsp;       
          <Link id="main" to="/flights" onClick={handleAllFlightsClick}>Flights</Link>
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
                <div id="dropdown" className="dropdown-content">
                  <Link id="drop" to="/customerprofile" onClick={handleProfileClick}>Profile</Link>
                  <Link id="drop" to="/tickets" onClick={handleTicketsClick}>Tickets</Link>
                </div>
            </div>
            </div> 
          )}





          {/* Display the Admin link if the user is an admin */}
          {user && payloadData && String(payloadData.roles) === "admin" && (
            <div>
            <p id="profileP">
            <Link id="profile" to="/customer" onClick={handleCustomer}>{payloadData.username}
            </Link>
            </p> 
            <div className="dropdown">
                <div id="dropdown" className="dropdown-content">
                  <Link id="drop" to="/alladmins" onClick={handleAllAdminsClick}>Admins</Link>
                  <Link id="drop" to="/allairlines" onClick={handleAllAirlinesClick}>Airlines</Link>
                  <Link id="drop" to="/allcustomers" onClick={handleAllCustomersClick}>Customers</Link>
                </div>
            </div>
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
                <div id="dropdown" className="dropdown-content">
                  <Link id="drop" to="/airlineprofile" onClick={handleAirlineProfileClick}>Profile</Link>
                  <Link id="drop" to="/myflights" onClick={handleMyFlightsClick} >MyFlights </Link>
                </div>
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
            {activeComponent2 === "addflightform" && <AddFlightForm onSuccess={setFlightAdded}/>}
            {activeComponent === "flights" && <FlightSearchForm/>}
            {activeComponent === "myflights" && <MyFlights clicked="clicked" flightAdded={flightAdded} onUpdate={setFlightUpdated} flightUpdated={flightUpdated}/>}
            {activeComponent === "tickets" && <MyTickets clicked="clicked" />}
            {activeComponent === "signup" && <SignUp/>}
            {activeComponent === "/" && <Home/>}
            {activeComponent === "login" && <Login handleLoginSuccess={handleLoginSuccess}/>}
            {activeComponent === "customerprofile" && <CustomerProfile/>}
            {activeComponent === "airlineprofile" && <AirlineProfile/>}

            {activeComponent === "allcustomers" && <AllCustomers  />}
            
            {activeComponent === "allairlines" && <AllAirlines />}

            {activeComponent === "alladmins" && <AllAdmins />}
        </div>
    );
};

export default Navbar;