import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import supabase from '../lib/supabaseClient';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const userData = {
          id: session.user.id,
          username: session.user.user_metadata?.username || '',
          email: session.user.email,
          role: (session.user.user_metadata?.role as 'user' | 'admin') || 'user',
          avatar: session.user.user_metadata?.avatar,
        } as User;
        setUser(userData);
      } else {
        setUser(null);
      }
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Login error:', error.message);
      return { success: false, message: error.message };
    }
    if (data.user) {
      const userData = {
        id: data.user.id,
        username: data.user.user_metadata?.username || '',
        email: data.user.email,
        role: (data.user.user_metadata?.role as 'user' | 'admin') || 'user',
        avatar: data.user.user_metadata?.avatar,
      } as User;
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: 'Login failed' };
  };

  const register = async (username: string, email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          role: 'user',
        },
      },
    });
    if (error) {
      console.error('Registration error:', error.message);
      return { success: false, message: error.message };
    }
    if (data.user) {
      const userData = {
        id: data.user.id,
        username,
        email,
        role: 'user' as const,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      } as User;
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: 'Registration failed' };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
