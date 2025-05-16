import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const { roles } = useAuth();
    const isAdmin = roles.includes("ROLE_ADMIN");
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const actionButton = {
        padding: "0.5rem",
        margin: "0.25rem",
        backgroundColor: "transparent",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
        display: "inline-block"
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?")) return;
        try {
            await axiosInstance.delete(`/products/${id}`);
            setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
        } catch (err) {
            console.error("Errore eliminazione prodotto:", err);
        }
    };

    useEffect(() => {
        axiosInstance.get("/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error("Errore caricamento prodotti:", err));
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Prodotti disponibili</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {products.map(product => (
                    <div key={product.id} style={{ border: "1px solid #ccc", padding: "1rem", width: "220px" }}>
                        {product.images?.length > 0 && (
                            <img
                                src={`${BASE_URL}${product.images[0].url}`}
                                alt={product.title}
                                style={{ width: "100%", height: "150px", objectFit: "cover" }}
                            />
                        )}
                        <h3>{product.title}</h3>
                        <p style={{ fontSize: "0.9rem" }}>{product.description}</p>
                        <strong>€ {product.price.toFixed(2)}</strong>
                        {isAdmin && (
                            <div style={{ marginTop: "0.5rem" }}>
                                <Link
                                    to={`/admin/edit-product/${product.id}`}
                                    style={actionButton}
                                    aria-label={`Modifica ${product.title}`}
                                >
                                    ✏️ Modifica
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    style={actionButton}
                                    aria-label={`Elimina ${product.title}`}
                                >
                                    🗑️ Elimina
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}