import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: ""
    });

    useEffect(() => {
        axiosInstance.get(`/products/${id}`).then(res => setForm(res.data));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/products/${id}`, form);
            navigate("/products");
        } catch (err) {
            console.error("Errore aggiornamento:", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Modifica prodotto</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" value={form.title} onChange={handleChange} required /><br />
                <textarea name="description" value={form.description} onChange={handleChange} required /><br />
                <input type="number" name="price" value={form.price} onChange={handleChange} required /><br />
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required /><br />
                <button type="submit">Salva modifiche</button>
            </form>
        </div>
    );
}