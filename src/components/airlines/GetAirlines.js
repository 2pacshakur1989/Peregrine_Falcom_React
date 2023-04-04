import React, { useState, useEffect } from "react";

const GetAirlines = ({ onAirlineCompanySelect }) => {
  const [airlines, setAirlineCompany] = useState([]);

  useEffect(() => {
    const fetchAirlineCompany = async () => {
      const response = await fetch("http://localhost:8000/api/airlines/");
      const data = await response.json();
      setAirlineCompany(data);
    };

    fetchAirlineCompany();
  }, []);


  const handleAirlineCompanySelect = (event) => {
    const selectedAirlineCompany = event.target.value;
    onAirlineCompanySelect(selectedAirlineCompany);
  };

  return (
    <div>
      <label htmlFor="airline-company-select">Select an airline company:</label>
      <select id="airline-company-select" onChange={handleAirlineCompanySelect}>
        {airlines.map((airlinecompany) => (
          <option key={airlinecompany.id} value={airlinecompany.id}>
            {airlinecompany.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GetAirlines;
