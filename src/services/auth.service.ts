// import { data } from "react-router-dom";

const API_URL = "https://journee-main.onrender.com/api/auth";

export interface AuthResponse {
  token: string;
  email: string;
  userId: string;
  firstname: string;
  lastname: string;
}

export const authService = {
    
  async register(firstname: string, lastname: string, email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Registration failed");
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  async getCurrentUser() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
},

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

};


