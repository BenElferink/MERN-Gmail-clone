import { createContext, useState, useEffect } from 'react';

export const TokenContext = createContext();

export const TokenProvider = (props) => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  console.log(`🌐 Current Token: ${token}`);

  useEffect(() => {
    window.localStorage.setItem('token', token);
    console.log(`🌐 Token saved to Local Storage: ${token}`);
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>{props.children}</TokenContext.Provider>
  );
};
