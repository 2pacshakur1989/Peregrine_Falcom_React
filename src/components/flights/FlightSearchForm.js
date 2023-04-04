import React, { useState } from 'react';
import axios from 'axios';
import GetCountries from '../countries/GetCountries';
import GetAirlines from '../airlines/GetAirlines';

const FlightSearchForm = () => {
  const [selectedOriginCountry, setSelectedOriginCountry] = useState('');
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState('');
  const [selectedAirlineCompany, setSelectedAirlineCompany] = useState('');
  const [selectedDepartureTime, setSelectedDepartureTime] = useState('');
  const [selectedLandingTime, setSelectedLandingTime] = useState('');
  const [flights, setFlights] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    event.preventDefault();
    if (
      !selectedOriginCountry &&
      !selectedDestinationCountry &&
      !selectedAirlineCompany &&
      !selectedDepartureTime &&
      !selectedLandingTime
    ) {
      alert('Please select at least one search parameter');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/flights/?origin_country_id=${selectedOriginCountry}&destination_country_id=${selectedDestinationCountry}&airline_company_id=${selectedAirlineCompany}&departure_time=${selectedDepartureTime}&landing_time=${selectedLandingTime}`
      );
      setFlights(response.data);
      // if (response.data.length === 0) {
      //   alert('No flights found');
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOriginCountrySelect = (countryId) => {
    setSelectedOriginCountry(countryId);
  };

  const handleDestinationCountrySelect = (countryId) => {
    setSelectedDestinationCountry(countryId);
  };

  const handleAirlineCompanySelect = (airlineCompanyId) => {
    setSelectedAirlineCompany(airlineCompanyId);
  };

  const handleDepartureTimeChange = (event) => {
    setSelectedDepartureTime(event.target.value);
  };

  const handleLandingTimeChange = (event) => {
    setSelectedLandingTime(event.target.value);
  };

  return (
    <div>
    
      <form onSubmit={handleSubmit}>
        <label>
          From
          <GetCountries onCountrySelect={handleOriginCountrySelect} />
          <input type="hidden" value={selectedOriginCountry} onChange={(e) => setSelectedOriginCountry(e.target.value)} />
        </label>
        <label>
          To
          <GetCountries onCountrySelect={handleDestinationCountrySelect} />
          <input type="hidden" value={selectedDestinationCountry} onChange={(e) => setSelectedDestinationCountry(e.target.value)} />
        </label>
        <label>
          Airline Company Id:
          <GetAirlines onAirlineCompanySelect={handleAirlineCompanySelect}/>
          <input type="hidden" value={selectedAirlineCompany} onChange={(e) => setSelectedAirlineCompany(e.target.value)} />
        </label>
        <label>
          Departure Time:
          <input type="datetime-local" value={selectedDepartureTime} onChange={handleDepartureTimeChange} />
        </label>
        <label>
          Landing Time:
          <input type="datetime-local" value={selectedLandingTime} onChange={handleLandingTimeChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
  {flights.length > 0 ? (
    flights.map((flight) => (
      <div key={flight.id}>
        <p>{flight.id}</p>
        <p>{flight.airline_company_name}</p>
        <p>{flight.origin_country_name}</p>
        <p>{flight.destination_country_name}</p>
        <p>{flight.departure_time}</p>
        <p>{flight.landing_time}</p>
        <p>{flight.remaining_tickets}</p>
      </div>
    ))
  ) : (
    <p>No flights found</p>
  )}
</ul>
    </div>
  );
};

export default FlightSearchForm;



