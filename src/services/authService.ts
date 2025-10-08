import type { User } from "../types";
import { api } from "./api";

export interface LoginResponse {
  success: boolean;
  authUrl: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

class AuthService {
  async initiateLogin(): Promise<string> {
    const response = await api.get<LoginResponse>("/auth/google");
    return response.data.authUrl;
  }

  setToken(token: string): void {
    console.log("Setting token:", token);
    localStorage.setItem("token", token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  getToken(): string | null {
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
    return token;
  }

  removeToken(): void {
    console.log("Removing token");
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
  }

  async getProfile(): Promise<User> {
    console.log("API headers:", api.defaults.headers);
    const response = await api.get<{ success: boolean; user: User }>(
      "/auth/profile"
    );
    return response.data.user;
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
  }
}

export const authService = new AuthService();
