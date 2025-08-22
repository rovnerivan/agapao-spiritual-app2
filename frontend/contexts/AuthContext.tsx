import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  googleId: string;
  countryCode?: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (googleId: string) => Promise<void>;
  setCountry: (countryCode: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('agapao_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('agapao_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (googleId: string) => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll create a mock user
      // In production, this would call the backend register endpoint
      const mockUser: User = {
        id: `user_${Date.now()}`,
        googleId,
        createdAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('agapao_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setCountry = async (countryCode: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, countryCode };
    setUser(updatedUser);
    localStorage.setItem('agapao_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agapao_user');
  };

  const value = {
    user,
    isLoading,
    login,
    setCountry,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
