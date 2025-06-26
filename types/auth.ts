export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    email?: string;
    first_name?: string;
    last_name?: string;
    pk?: number;
  };
  isAuthenticated: boolean;
  hydrated: boolean;

  setHydrated: (value: boolean) => void;
  login: (data: { email: string; password: string }) => Promise<void>;
  refreshTokens: () => Promise<string | null>;
  logout: () => Promise<void>;
}
