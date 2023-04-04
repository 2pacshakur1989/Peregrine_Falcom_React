import React, {useState, useEffect} from "react";
import GetAllFlights from "./GetAllFlights";
import GetCountries from "../countries/GetCountries";

const GetFlightsByOriginCountry = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountrySelect = (countryId) => {
        setSelectedCountry(countryId);
    };
    return(
        <div>
            <GetCountries onCountrySelect={handleCountrySelect}/>
        </div>
    )

};

export default GetFlightsByOriginCountry






// import React, {useState, useEffect} from "react";
// import GetAllFlights from "./GetAllFlights";
// import GetCountries from "../countries/GetCountries";

// const GetFlightsByOriginCountry = () => {
//     const [selectedCountry, setSelectedCountry] = useState(null);

//     const handleCountrySelect = (countryId) => {
//         setSelectedCountry(countryId);
//     };
//     return(
//         <div>
//             <GetCountries onCountrySelect={handleCountrySelect}/>
//             {/* {selectedCountry && 
//             (<GetAllFlights url={`http://localhost:8000/api/flights/?origin=${selectedCountry}`}/>)} */}
//         </div>
//     )

// };

// export default GetFlightsByOriginCountry