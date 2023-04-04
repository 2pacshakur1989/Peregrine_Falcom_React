import React, { useState } from "react";
import GetAirlines from "../airlines/GetAirlines";
import GetAllFlights from "./GetAllFlights";

const GetFlightsByAirline = () => {
  const [selectedAirlineCompanyId, setSelectedAirlineCompanyId] = useState(null);

  const handleAirlineCompanySelect = (airlineCompanyId) => {
    setSelectedAirlineCompanyId(airlineCompanyId);
  };

  return (
    <div>
      <GetAirlines onAirlineCompanySelect={handleAirlineCompanySelect}/>
      {selectedAirlineCompanyId && (
        <GetAllFlights url={`http://localhost:8000/api/flights/?airline=${selectedAirlineCompanyId}`}/>
      )}
    </div>
  );
};

export default GetFlightsByAirline;
