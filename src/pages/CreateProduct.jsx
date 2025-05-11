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
    const [imageFiles, setImageFiles] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Salva il prodotto base
            const res = await axiosInstance.post("/products", form);
            const newProductId = res.data.id;

            // 2. Carica le immagini (una per una o tutte insieme)
            for (let file of imageFiles) {
                const data = new FormData();
                data.append("file", file);
                await axiosInstance.post(`/products/${newProductId}/images`, data);
            }

            navigate("/products");
        } catch (err) {
            console.error("Errore nella creazione:", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Crea nuovo prodotto</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Titolo" value={form.title} onChange={handleChange} required /><br />
                <textarea name="description" placeholder="Descrizione" value={form.description} onChange={handleChange} required /><br />
                <input type="number" name="price" placeholder="Prezzo" value={form.price} onChange={handleChange} required /><br />
                <input
                    type="file"
                    multiple
                    onChange={(e) => setImageFiles([...e.target.files])}
                />
                <button type="submit">Salva</button>
            </form>
            {imageFiles.map((file, index) => (
                <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    style={{ width: "100px", margin: "5px" }}
                />
            ))}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
