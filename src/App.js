import { AuthContext } from "./components/authentication/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
import FlightSearchForm from './components/flights/FlightSearchForm';
import Customer from './components/customers/Customer';

import './App.css';

import General from './components/general/General';


function App() {


  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<General />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/flights" element={<FlightSearchForm />} />
            <Route path="/customer" element={<Customer />} />
            {/* <Route path="/" element={<Logout />} /> */}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
