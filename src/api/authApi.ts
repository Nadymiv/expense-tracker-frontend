import axiosClient from "./axiosClient";

export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export const authApi = {
    // Виправлено URL на /auth/login та /auth/signup
    login: (data: AuthRequest) =>
        axiosClient.post<AuthResponse>("/auth/login", data),
    register: (data: AuthRequest) =>
        axiosClient.post<{ email: string }>("/auth/signup", data),
};
