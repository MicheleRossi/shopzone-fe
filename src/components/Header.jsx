import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
    const { isAuthenticated, logout, roles } = useAuth();
    const location = useLocation();

    return (
        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
            <Link to="/">Home</Link> | <Link to="/products">Prodotti</Link>{" "}
            {roles.includes("ROLE_ADMIN") && (
                <Link to="/admin/create-product">Crea Prodotto</Link>
            )}
            {isAuthenticated ? (
                <>
                    | <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>| <Link
                    to="/login"
                    state={{ from: location }}
                >
                    Login
                </Link></>
            )}
        </header>
    );
}
