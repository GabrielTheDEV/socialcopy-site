import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { api } from "@/services/api";

interface User {
  id?: string;
  email?: string;
  name?: string;
  username?: string;
  avatar?: string | null;
  coins?: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeUser = (raw?: (User & Record<string, unknown>) | null): User => {
  if (!raw) return {};

  const username =
    (raw.username as string | undefined) ||
    ((raw as Record<string, unknown>).userName as string | undefined) ||
    (raw.name as string | undefined);

  return {
    id: raw.id,
    email: raw.email,
    name: raw.name || username,
    username,
    avatar: (raw.avatar as string | null | undefined) ?? null,
    coins: typeof raw.coins === 'number' ? raw.coins : undefined,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inicializa auth ao montar
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (api.isAuthenticated()) {
          const userData = normalizeUser(await api.request<User>('/me'));
          setUser(userData);
          return;
        }

        const refreshToken = api.getRefreshToken();
        if (refreshToken) {
          await api.refreshAccessToken();
          const userData = normalizeUser(await api.request<User>('/me'));
          setUser(userData);
        }
      } catch (err) {
        console.error("Erro na inicialização de autenticação:", err);
        api.clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.login({ email, password });
      let userData: User = normalizeUser(response.user);

      try {
        const meData = normalizeUser(await api.request<User>('/me'));
        userData = { ...userData, ...meData };
      } catch (meError) {
        console.warn('Falha ao carregar /me após login:', meError);
      }

      setUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.register({ name, email, password });
      let userData: User = normalizeUser(response.user);

      try {
        const meData = normalizeUser(await api.request<User>('/me'));
        userData = { ...userData, ...meData };
      } catch (meError) {
        console.warn('Falha ao carregar /me após registro:', meError);
      }

      setUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao registrar';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await api.logout();
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: api.isAuthenticated(),
    error,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
