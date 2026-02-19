import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password, userType) => {
    // Mock login - in real app, would validate against backend
    const mockUser = {
      email,
      userType, // 'student' or 'organization'
      name: userType === 'student' ? 'John Doe' : 'Green Valley High School',
      totalHours: userType === 'student' ? 42.5 : null,
      isPremium: false,
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    return true;
  };

  const signup = (email, password, name, userType) => {
    // Mock signup
    const mockUser = {
      email,
      userType,
      name,
      totalHours: userType === 'student' ? 0 : null,
      isPremium: false,
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const upgradeToPremium = () => {
    setUser({ ...user, isPremium: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        upgradeToPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
