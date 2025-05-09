import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async () => {
        if (!imageFile) return;
        const data = new FormData();
        data.append("file", imageFile);
        const res = await axiosInstance.post("/upload", data);
        return res.data; // image URL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageUrl = await handleImageUpload();
            const productToSend = { ...form, imageUrl };
            await axiosInstance.post("/products", productToSend);
            navigate("/products");
        } catch (err) {
            setError("Errore nella creazione del prodotto");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Crea nuovo prodotto</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Titolo" value={form.title} onChange={handleChange} required /><br />
                <textarea name="description" placeholder="Descrizione" value={form.description} onChange={handleChange} required /><br />
                <input type="number" name="price" placeholder="Prezzo" value={form.price} onChange={handleChange} required /><br />
                <input type="file" onChange={(e) => setImageFile(e.target.files[0])} required /><br />
                <button type="submit">Salva</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
