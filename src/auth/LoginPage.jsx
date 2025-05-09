import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    // Aggiungiamo dei console.log per debug
    console.log("Location state:", location.state);
    console.log("Current pathname:", location.pathname);

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axiosInstance.post("/auth/login", {
                username,
                password,
            });

            const token = res.data;
            login(token);

            console.log("Redirecting to:", from); // Debug
            navigate(from, { replace: true });
        } catch (err) {
            setError("Credenziali non valide");
        }
    };


    return (
        <div style={{ padding: "2rem" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default LoginPage;
