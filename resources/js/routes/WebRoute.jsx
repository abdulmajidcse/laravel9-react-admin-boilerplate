import { Routes, Route } from "react-router-dom";
import ErrorPage from "./../pages/ErrorPage";
import GroupLayout from "../components/layouts/GroupLayout";
import Dashboard from "../pages/auth/Dashboard";
import CategoryList from "../pages/auth/category/CategoryList";
import CategoryCreate from "../pages/auth/category/CategoryCreate";
import CategoryEdit from "../pages/auth/category/CategoryEdit";
import ProductList from "../pages/auth/product/ProductList";
import ProductCreate from "../pages/auth/product/ProductCreate";
import ProductEdit from "../pages/auth/product/ProductEdit";
import AuthProfile from "../pages/auth/AuthProfile";
import UpdatePassword from "../pages/auth/UpdatePassword";
import ProductLayout from "../components/layouts/auth/ProductLayout";
import AuthMiddleware from "../components/middlewares/AuthMiddleware";

const WebRoute = () => {
    return (
        <>
            <Routes>
                <Route path="auth" element={<AuthMiddleware />}>
                    <Route index element={<Dashboard />} />
                    <Route path="profile" element={<AuthProfile />} />
                    <Route
                        path="update-password"
                        element={<UpdatePassword />}
                    />

                    {/* categories routes */}
                    <Route path="categories" element={<GroupLayout />}>
                        <Route index element={<CategoryList />} />
                        <Route path="create" element={<CategoryCreate />} />
                        <Route
                            path=":categoryId/edit"
                            element={<CategoryEdit />}
                        />
                    </Route>

                    {/* products routes */}
                    <Route path="products" element={<ProductLayout />}>
                        <Route index element={<ProductList />} />
                        <Route path="create" element={<ProductCreate />} />
                        <Route
                            path=":productId/edit"
                            element={<ProductEdit />}
                        />
                    </Route>
                </Route>

                {/* Not Found /404 */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default WebRoute;
