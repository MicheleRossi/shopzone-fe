import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            console.log('Token decodificato:', decoded);
            const tokenRoles = decoded?.authorities || decoded?.roles || [];
            console.log('Ruoli estratti:', tokenRoles);
            setRoles(tokenRoles);
        } else {
            setRoles([]);
        }
    }, [token]);


    const login = (jwtToken) => {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setRoles([]);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated, roles }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
