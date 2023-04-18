import React, { useContext, useState, useEffect } from 'react'
import GetCountries from '../countries/GetCountries';
import { AuthContext } from '../authentication/AuthContext';
import Cookies from 'js-cookie';
import './AddFlightForm.css';
import { MyFlights } from './MyFlights';

export const AddFlightForm = () => {

    const { user, payloadData } = useContext(AuthContext);

    const [errors, setErrors] = useState([]);
    const [airlineCompanyId, setAirlineCompanyId] = useState('');
    const [originCountryId, setOriginCountryId] = useState('');
    const [destinationCountryId, setDestinationCountryId] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [landingTime, setLandingTime] = useState('');
    const [remainingTickets, setRemainigTickets] = useState('');

    const fetchAirlineId = () =>{
        if( user && payloadData && String(payloadData.roles === 'airline')){
            fetch(`http://localhost:8000/api/airlines/?user_id=${payloadData.user_id}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Cookies.get('token')}`,
                
                }, 
            })
            .then((response) => response.json())
            .then(data => {
                setAirlineCompanyId(data.airline_data.id);
              })
            .catch(error => {
                console.error(error);
              });
            }}
    
            useEffect(() => {
                  fetchAirlineId();});
                
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if ( user && payloadData && String(payloadData.roles === 'airline')){
            fetch(`http://localhost:8000/api/flights/`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify({
                  airline_company_id: airlineCompanyId,
                  origin_country_id: originCountryId,
                  destination_country_id: destinationCountryId,
                  departure_time: departureTime,
                  landing_time: landingTime,
                  remaining_tickets: remainingTickets
                }), 
            })
            .then((response) => response.json())
            .then(data => {
                if(data){
                    setErrors(data);
                }
                else{
                    setErrors([]);
                    
                }
              })
            .catch(error => {
                console.error(error);
              });

        }

    }

    const handleOriginCountrySelect = (countryId) => {
        setOriginCountryId(countryId);
      };
    
    const handleDestinationCountrySelect = (countryId) => {
        setDestinationCountryId(countryId);
      };
    
    
      const handleDepartureTimeChange = (event) => {
        setDepartureTime(event.target.value);
      };
    
      const handleLandingTimeChange = (event) => {
        setLandingTime(event.target.value);
      };

      const handleRemainingTickets = (event) => {
        setRemainigTickets(event.target.value);
      };

      const clearForm = () => {
        document.getElementById("AddForm").reset();
        setOriginCountryId("");
        setDestinationCountryId("");
        setAirlineCompanyId("");
        setDepartureTime("");
        setLandingTime("");
      };

  return (
    <div>      
        <form id='AddForm'  onSubmit={handleSubmit}>



    <label id='origin' >
     <span>From</span>
      <GetCountries onCountrySelect={handleOriginCountrySelect}/>
      <input type="hidden" value={originCountryId} onChange={(e) => setOriginCountryId(e.target.value)} />
    </label>
    <br/>
      
    <label id='destination'>
      <span>To</span>
      <GetCountries 
      onCountrySelect={handleDestinationCountrySelect} />
      <input type="hidden" value={destinationCountryId} onChange={(e) => setDestinationCountryId(e.target.value)} />
    </label>
    <br/>


    
    <label >
    <span>Depart</span>
    <br/>
      <input id='departure' type="datetime-local" value={departureTime} onChange={handleDepartureTimeChange} />   
    </label>
    <br/>

    <label>
    <span>Land</span>
    <br/>
      <input id='landing' type="datetime-local" value={landingTime} onChange={handleLandingTimeChange} />
    </label>
    <br/>

    <label>
    <span>Tickets</span>
    <br/>
      <input id='tickets' type="number" value={remainingTickets} onChange={handleRemainingTickets} />
    </label>
    <br/>

    <button id='addflight' type="submit">Add Flight</button>
    <button id='clear' type="button" onClick={clearForm}>Clear</button>

  </form>
  </div>
  )
 
}
