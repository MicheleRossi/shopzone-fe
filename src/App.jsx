// src/App.jsx
import Header from "./components/Header.jsx";

function App() {
    return (
        <div style={{ padding: "2rem" }}>
            <Header />
            <h1>Ecofish</h1>
            <p>Benvenuto nel nostro catalogo prodotti</p>
        </div>
    );
}

export default App;

// import { useEffect, useState } from "react";
//
// function App() {
//     const [products, setProducts] = useState([]);
//
//     useEffect(() => {
//         fetch("http://localhost:8080/api/products")
//             .then(res => res.json())
//             .then(setProducts)
//             .catch(err => console.error("Errore nel caricamento prodotti:", err));
//     }, []);
//
//     return (
//         <div style={{ padding: "2rem" }}>
//             <h1>Prodotti disponibili</h1>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
//                 {products.map(p => (
//                     <div key={p.id} style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
//                         <img src={p.imageUrl} alt={p.title} style={{ width: "100%" }} />
//                         <h2 style={{ fontSize: "1.1rem" }}>{p.title}</h2>
//                         <p>{p.description}</p>
//                         <p><strong>€ {p.price.toFixed(2)}</strong></p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// export default App;

