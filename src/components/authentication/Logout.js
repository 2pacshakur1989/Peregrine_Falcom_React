// import React, { useContext } from 'react';
// import { AuthProvider } from './AuthContext';
// import Cookies from 'js-cookie';

// export default function Logout() {
//   const { setUser } = useContext(AuthProvider);

//   const handleLogout = () => {
//     // Remove the user from the context and clear the token cookie
//     setUser(null);
//     Cookies.remove('access_token');
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// }



// import React, { useContext } from 'react';
// import { AuthContext } from './AuthContext';
// export default function Logout() {
//   const { setUser } = useContext(AuthContext); // import the AuthContext object and get the setUser function
//   const history = useNavigate();

//   const handleLogout = () => {
//     setUser(null); // set the user to null to indicate that they're logged out
//     localStorage.removeItem('user'); // remove the user from local storage
//     // Cookies.remove('access_token');
//     history.push('/'); // redirect to the home page
//   };

//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from './AuthContext';

// export default function Logout() {
//   const { user, setUser } = useContext(AuthContext);

//   const handleLogout = () => {
//     setUser(null);
  
//   };

//   return (
//     <div>
//       <button onClick={handleLogout}>Logout {user && user.username}</button>
//     </div>
//   );
// }



// export default function Logout() {
//   const { handleLogout } = useContext(AuthContext);
//   const history = useNavigate();

//   useEffect(() => {
//     handleLogout();
//     history.push('/');
//   }, [handleLogout, history]);

//   return <div>Logging out...</div>;
// }


// import { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

// const Logout = () => {
//   const { logout } = useContext(AuthContext);
//   const history = useNavigate();

//   const handleLogout = () => {
//     logout();
//     history.push('/');
//   };

//   return (
//     <button onClick={handleLogout}></button>
//   );
// };

// export default Logout;