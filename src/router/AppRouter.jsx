import { BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import App from "../App";
import ProductList from "../pages/ProductList";
import LoginPage from "../auth/LoginPage";
import AdminDashboard from "../pages/AdminDashboard";
import PrivateRoute from "../auth/PrivateRoute";
import RequireRole from "../auth/RequireRole";
import CreateProduct from "../pages/CreateProduct";
import EditProduct from "../pages/EditProduct.jsx";


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/login" element={<LoginPage />} />

                {/*Accessibile solo agli utenti admin*/}
                <Route path="/admin"
                    element={
                        <RequireRole role="ROLE_ADMIN">
                            <Outlet />
                        </RequireRole>
                    }
                >
                    <Route index element={<AdminDashboard />} />
                    <Route path="create-product" element={<CreateProduct />} />
                    <Route path="edit-product/:id" element={<EditProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}