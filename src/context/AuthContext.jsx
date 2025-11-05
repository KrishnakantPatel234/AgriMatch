// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend URL - ab port 5000 par hai
  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/auth/login/success`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log('Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.open(`${BACKEND_URL}/auth/google`, '_self');
  };

  const logout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/auth/logout`, {
        withCredentials: true
      });
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};