const API_URL = import.meta.env.VITE_API_URL;

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
}

class ApiService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  private async safeJson<T = unknown>(response: Response): Promise<T | null> {
    const text = await response.text();
    if (!text) {
      return null;
    }
    try {
      return JSON.parse(text) as T;
    } catch {
      return null;
    }
  }

  private getTokenFromHeaders(response: Response, headerNames: string[]): string | null {
    for (const name of headerNames) {
      const value = response.headers.get(name);
      if (!value) continue;
      if (value.toLowerCase().startsWith('bearer ')) {
        return value.slice(7).trim();
      }
      return value.trim();
    }
    return null;
  }

  private getAccessTokenFromResponse(response: Response): string | null {
    return this.getTokenFromHeaders(response, ['authorization', 'x-access-token', 'access-token']);
  }

  private getRefreshTokenFromResponse(response: Response): string | null {
    return this.getTokenFromHeaders(response, ['x-refresh-token', 'refresh-token']);
  }

  /**
   * Realiza login
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // para HttpOnly cookies
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await this.safeJson<{ message?: string }>(response);
      throw new Error(error?.message || response.statusText || 'Erro ao fazer login');
    }

    const data = await this.safeJson<AuthResponse>(response);
    if (data?.access_token) {
      this.saveTokens(data.access_token, data.refresh_token);
      return data;
    }

    const accessToken = this.getAccessTokenFromResponse(response);
    const refreshToken = this.getRefreshTokenFromResponse(response);
    if (!accessToken) {
      throw new Error('Resposta inválida ao fazer login');
    }
    this.saveTokens(accessToken, refreshToken || undefined);
    const user = await this.request<User>('/me');
    return { access_token: accessToken, refresh_token: refreshToken || '', user };
  }

  /**
   * Realiza registro
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await this.safeJson<{ message?: string }>(response);
      throw new Error(error?.message || response.statusText || 'Erro ao registrar');
    }

    const data = await this.safeJson<AuthResponse>(response);
    if (data?.access_token) {
      this.saveTokens(data.access_token, data.refresh_token);
      return data;
    }

    const accessToken = this.getAccessTokenFromResponse(response);
    const refreshToken = this.getRefreshTokenFromResponse(response);
    if (!accessToken) {
      throw new Error('Resposta inválida ao registrar');
    }
    this.saveTokens(accessToken, refreshToken || undefined);
    const user = await this.request<User>('/me');
    return { access_token: accessToken, refresh_token: refreshToken || '', user };
  }

  /**
   * Faz login com Google
   */
  async googleLogin(token: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const error = await this.safeJson<{ message?: string }>(response);
      throw new Error(error?.message || response.statusText || 'Erro ao fazer login com Google');
    }

    const data = await this.safeJson<AuthResponse>(response);
    if (data?.access_token) {
      this.saveTokens(data.access_token, data.refresh_token);
      return data;
    }

    const accessToken = this.getAccessTokenFromResponse(response);
    const refreshToken = this.getRefreshTokenFromResponse(response);
    if (!accessToken) {
      throw new Error('Resposta inválida ao fazer login com Google');
    }
    this.saveTokens(accessToken, refreshToken || undefined);
    const user = await this.request<User>('/me');
    return { access_token: accessToken, refresh_token: refreshToken || '', user };
  }

  /**
   * Atualiza o access token usando o refresh token
   */
  async refreshAccessToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('Refresh token não disponível');
    }

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      this.clearTokens();
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    const data = await this.safeJson<{ access_token?: string }>(response);
    if (!data?.access_token) {
      throw new Error('Resposta inválida ao renovar sessão.');
    }
    localStorage.setItem(this.accessTokenKey, data.access_token);

    return data.access_token;
  }

  /**
   * Faz logout
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.getAccessToken() ? { Authorization: `Bearer ${this.getAccessToken()}` } : {}),
        },
        body: refreshToken ? JSON.stringify({ refresh_token: refreshToken }) : undefined,
        credentials: 'include',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Faz requisição com autenticação automática
   */
  async request<T = any>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const accessToken = this.getAccessToken();

    const headers = new Headers(options.headers || {});
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    headers.set('Content-Type', 'application/json');

    let response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    // Se receber 401, tenta renovar token
    if (response.status === 401) {
      try {
        const newAccessToken = await this.refreshAccessToken();
        headers.set('Authorization', `Bearer ${newAccessToken}`);

        response = await fetch(`${API_URL}${url}`, {
          ...options,
          headers,
          credentials: 'include',
        });
      } catch (error) {
        this.clearTokens();
        window.location.href = '/';
        throw error;
      }
    }

    if (!response.ok) {
      const error = await this.safeJson<{ message?: string }>(response);
      throw new Error(error?.message || response.statusText || 'Erro na requisição');
    }

    const data = await this.safeJson<T>(response);
    if (data === null) {
      throw new Error('Resposta vazia do servidor');
    }
    return data;
  }

  /**
   * Salva tokens no armazenamento
   */
  private saveTokens(accessToken?: string, refreshToken?: string): void {
    if (accessToken) {
      localStorage.setItem(this.accessTokenKey, accessToken);
    }
    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  /**
   * Obtém o access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  /**
   * Obtém o refresh token (para debugging)
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  /**
   * Verifica se está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Limpa tokens
   */
  clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}

export const api = new ApiService();
