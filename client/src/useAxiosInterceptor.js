
import axios from "axios";
import  { useContext, useEffect } from 'react';
import { AuthContext } from "./context/AuthContext";


const useAxiosInterceptor = () => {
    const { token } = useContext(AuthContext);
  
    useEffect(() => {
      setAuthHeader(token);
    }, [token]);
  };
  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  
  export default useAxiosInterceptor;