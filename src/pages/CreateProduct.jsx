import { useState, useCallback, useMemo } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateProduct() {
    const initialForm = useMemo(() => ({
        title: "",
        description: "",
        price: "",
        imageUrl: ""
    }), []);

    const [form, setForm] = useState(initialForm);
    const [uploading, setUploading] = useState(false);
    const [, setProductImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleMultipleImageUpload = useCallback(async (files) => {
        if (!files.length) return;

        setUploading(true);
        setError("");

        try {
            setImageFiles(prevFiles => [...prevFiles, ...files]);

            if (id) {
                const uploadPromises = files.map(async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    const res = await axiosInstance.post(`/products/${id}/images`, formData);
                    return res.data;
                });

                const results = await Promise.all(uploadPromises);
                setProductImages(prev => [...prev, ...results]);
            }
        } catch (err) {
            console.error("Errore upload immagine:", err);
            setError("Errore durante il caricamento dell'immagine");
        } finally {
            setUploading(false);
        }
    }, [id]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setError("");

        try {
            const productResponse = await axiosInstance.post("/products", form);
            const newProductId = productResponse.data.id;

            if (imageFiles.length) {
                const uploadPromises = imageFiles.map(file => {
                    const data = new FormData();
                    data.append("file", file);
                    return axiosInstance.post(`/products/${newProductId}/images`, data);
                });

                await Promise.all(uploadPromises);
            }

            navigate("/products");
        } catch (err) {
            console.error("Errore nella creazione:", err);
            setError("Errore durante la creazione del prodotto");
        }
    }, [form, imageFiles, navigate]);

    const previewImages = useMemo(() => (
        imageFiles.map((file, index) => (
            <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                style={{ width: "300px", margin: "5px" }}
            />
        ))
    ), [imageFiles]);

    return (
        <div className="create-product-container">
            <h2>Crea nuovo prodotto</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <input
                        name="title"
                        placeholder="Titolo"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        placeholder="Descrizione"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="price"
                        placeholder="Prezzo"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleMultipleImageUpload(Array.from(e.target.files))}
                        disabled={uploading}
                    />
                </div>
                <button type="submit" disabled={uploading}>
                    {uploading ? "Caricamento..." : "Salva"}
                </button>
            </form>
            <div className="preview-container">
                {previewImages}
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}