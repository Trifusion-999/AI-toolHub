import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  verificationCode?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  verifyCode: (code: string) => boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Mock users database
const mockUsers = [
  // Normal Users
  { id: '1', username: 'user1', password: 'pass123', email: 'user1@test.com', role: 'user' as const, isVerified: true },
  { id: '2', username: 'user2', password: 'welcome123', email: 'user2@test.com', role: 'user' as const, isVerified: true },
  { id: '3', username: 'testuser', password: 'user@123', email: 'testuser@test.com', role: 'user' as const, isVerified: true },
  { id: '4', username: 'normaluser', password: '12345678', email: 'normaluser@test.com', role: 'user' as const, isVerified: true },
  { id: '5', username: 'rajesh_user', password: 'test@pass', email: 'rajesh@test.com', role: 'user' as const, isVerified: true },
  { id: '6', username: 'aman@example.com', password: 'Aman@123', email: 'user1@test.com', role: 'user' as const, isVerified: true },
  { id: '7', username: 'avinash@example.com', password: 'Avinsah@123', email: 'user2@test.com', role: 'user' as const, isVerified: true },
  // Admin Users
  { id: '6', username: 'admin1', password: 'admin@123', email: 'admin1@test.com', role: 'admin' as const, isVerified: true },
  { id: '7', username: 'admin2', password: 'root@admin', email: 'admin2@test.com', role: 'admin' as const, isVerified: true },
  { id: '8', username: 'superadmin', password: 'super@123', email: 'superadmin@test.com', role: 'admin' as const, isVerified: true },
  { id: '9', username: 'rajesh_admin', password: 'admin#321', email: 'rajesh.admin@test.com', role: 'admin' as const, isVerified: true },
  { id: '10', username: 'administrator', password: '1234admin', email: 'administrator@test.com', role: 'admin' as const, isVerified: true },
  { id: '11', username: 'avinash@example.com', password: 'Avinash@123', email: 'admin1@test.com', role: 'admin' as const, isVerified: true },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const verificationCode = generateVerificationCode();
      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
        verificationCode,
        isVerified: false
      };
      
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      toast.success(`Login successful! Verification code: ${verificationCode}`);
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    const existingUser = mockUsers.find(u => u.username === username || u.email === email);
    
    if (existingUser) {
      toast.error('Username or email already exists');
      return false;
    }

    const verificationCode = generateVerificationCode();
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      role: 'user',
      verificationCode,
      isVerified: false
    };

    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    toast.success(`Registration successful! Verification code: ${verificationCode}`);
    return true;
  };

  const verifyCode = (code: string): boolean => {
    if (user && user.verificationCode === code) {
      const verifiedUser = { ...user, isVerified: true, verificationCode: undefined };
      setUser(verifiedUser);
      localStorage.setItem('currentUser', JSON.stringify(verifiedUser));
      toast.success('Account verified successfully!');
      return true;
    }
    toast.error('Invalid verification code');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      verifyCode,
      isAuthenticated: !!user?.isVerified,
      isAdmin: user?.role === 'admin' && user?.isVerified
    }}>
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