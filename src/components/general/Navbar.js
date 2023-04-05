import React, { useState } from "react";
import './Navbar.css';
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import FlightSearchForm from "../flights/FlightSearchForm";

const Navbar = () => {
    const [LoginLink, setLogin] = useState(false);
    const [SignupLink, setSignup] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);
    const [GetAllFlightsLink, setFlights] = useState(false);
    

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

  return (
    <div>
    <nav>
      <ul>
      <div id="mainP">
          <a id="main" href="/">Home</a>
          <a id="main" href="/flights" onClick={handleAllFlightsClick}>Flights</a>
          <a id="main" href="/airlines">Airlines</a>
      <p id="loginP"> <a id="Login" href="/login" onClick={handleLoginLink}>Login</a></p>
      <p id="signupP"> <a id="Signup" href="/signup" onClick={handleSignupClick}>Signup</a></p></div>
      </ul> 
    </nav>
    <br/>
    {activeComponent === "flights" && <FlightSearchForm/>}
    {activeComponent === "signup" && <SignUp/>}
    {activeComponent === "login" && <Login/>}
    </div>
    
  );
};

export default Navbar;

