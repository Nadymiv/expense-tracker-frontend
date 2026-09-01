import { createContext, useState, type ReactNode } from "react";
import { authApi, type AuthRequest } from "../api/authApi";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: AuthRequest) => Promise<void>;
    register: (userData: AuthRequest) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Ініціалізуємо token прямо з localStorage, без useEffect
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );
    // isLoading можна зробити завжди false, бо ми вже знаємо токен синхронно
    const [isLoading] = useState(false);

    const login = async (credentials: AuthRequest) => {
        // res — це об'єкт Axios, а JSON з бекенду лежить у res.data
        const res = await authApi.login(credentials);

        const token = res.data.token;

        localStorage.setItem("token", token);
        setToken(token);
    };

    const register = async (userData: AuthRequest) => {
        // 1. Створюємо акаунт
        await authApi.register(userData);
        // 2. Одразу логінимось, щоб отримати JWT токен
        await login(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
