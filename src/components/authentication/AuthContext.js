// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (user) => {
//     console.log("User logged in:", user);
//     setUser(user);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   const value = {
//     user,
//     login,
//     logout
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


// import React, { createContext, useState, useEffect, } from 'react';

// export const AuthContext = createContext('');

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (token) {
//       const userData = JSON.parse(atob(token.split('.')[1]));
//       setUser(userData);
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogin = (user) => {
//     setUser(user);
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setIsLoggedIn(false);
//     localStorage.removeItem('token');
//   };

//   const value = {
//     user,
//     isLoggedIn,
//     handleLogin,
//     handleLogout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


// import { createContext } from 'react';

// export const AuthContext = createContext ({
//   isLoggedIn: false,
//   login: () => {},
//   logout: () => {}
// })

// import { createContext, useReducer } from "react";

// export const AuthContext = createContext()

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { user:action.payload }
//     case 'LOGOUT':
//       return { user: null}
//     default :
//       return state
//   }
// }

// export const AuthContextProvider = ({ children }) => {
//   const [state,dispatch] = useReducer(authReducer, {
//     user: null
//   })
//   console.log('AuthContext state: ', state)

//   return (
//     <AuthContext.Provider value={{...state, dispatch}}>
//       { children }
//     </AuthContext.Provider>
//   )
// }



// import { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [ setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = (userData) => {
//     setUser(userData);
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setUser(null);
//     setIsLoggedIn(false);
//   };

//   const value = {  isLoggedIn, login, logout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };



import React, { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [payloadData, setPayloadData] = useState(null);

  const login = (token) => {
    const decodedToken = jwt_decode(token);
    console.log(decodedToken)
    setUser(decodedToken);
    Cookies.set('token', token);
  };

  const storePayloadData = (payload) => {
    // console.log(payload);
    setPayloadData(payload);
  };

  const logout = () => {
    console.log('token')
    fetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error logging out');
        }
        setUser(null);
        setPayloadData(null);
        // console.log("dataremoved")
        // Cookies.remove('token')
        // console.log('token')
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, storePayloadData, payloadData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;