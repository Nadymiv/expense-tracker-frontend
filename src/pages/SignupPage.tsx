import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuth(); // беремо register З КОНТЕКСТУ, не з authApi напряму
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await register({ email, password }); // контекст сам зробить signup+login+navigate
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Помилка реєстрації");
        }
    };

    return (
        <div className="auth-shell">
            <h2>Реєстрація</h2>
            {error && <p className="error-text">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Зареєструватися</button>
            </form>
            <p>
                Вже є акаунт? <Link to="/login">Увійти</Link>
            </p>
        </div>
    );
};
