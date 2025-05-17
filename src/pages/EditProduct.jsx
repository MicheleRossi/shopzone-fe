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
    const [uploading, setUploading] = useState(false);
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/products/${id}`).then(res => {
            setForm(res.data);
            setProductImages(res.data.images || []);
        });
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleMultipleImageUpload = async (files) => {
        setUploading(true);
        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const res = await axiosInstance.post(`/products/${id}/images`, formData);
                setProductImages((prev) => [...prev, res.data]);
            } catch (err) {
                console.error("Errore upload immagine:", err);
            }
        }
        setUploading(false);
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

    const handleDeleteImage = async (imageId) => {
        if (!window.confirm("Vuoi davvero eliminare questa immagine?")) return;
        try {
            await axiosInstance.delete(`/product-images/${imageId}`);
            setProductImages(productImages.filter((img) => img.id !== imageId));
        } catch (err) {
            console.error("Errore eliminazione immagine:", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Modifica prodotto</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" value={form.title} onChange={handleChange} required /><br />
                <textarea name="description" value={form.description} onChange={handleChange} required /><br />
                <input type="number" name="price" value={form.price} onChange={handleChange} required /><br />
                {/* <input name="imageUrl" value={form.imageUrl} onChange={handleChange} required /><br />*/}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                        const files = Array.from(e.target.files);
                        handleMultipleImageUpload(files);
                    }}
                    disabled={uploading}
                />
                {productImages.length > 0 && productImages.map((img) => (
                    <div key={img.id} style={{ position: "relative" }}>
                        <img
                            src={img.url}
                            alt="img"
                            style={{ width: "100px", height: "100px", objectFit: "cover", border: "1px solid #ccc" }}
                        />
                        <button
                            style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                background: "red",
                                color: "white",
                                border: "none",
                                cursor: "pointer"
                            }}
                            onClick={() => handleDeleteImage(img.id)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <button type="submit">Salva modifiche</button>
            </form>
        </div>
    );
}