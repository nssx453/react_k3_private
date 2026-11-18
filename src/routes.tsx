import { createBrowserRouter } from "react-router";
import MainLayout from './pages/MainLayout';
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreateProductPage from "./pages/CreateProductPage";
import Homepage from "./pages/Homepage";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "./pages/LoginPage";




export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Homepage
            },
            {
                path: 'products',
                Component: ProductsPage
            },
            {
                path: 'products/create',
                Component: CreateProductPage
            },
            {
                path: 'products/:id',
                Component: ProductPage
            },
            {
                path: 'login',
                Component: LoginPage
            },
            {
                Component: PrivateRoute,
                children: [
                    {
                        path: 'profile',
                        Component: ProfilePage
                    }
                ]
            },
            {
                path: '*',
                element: <div>ERROR 404</div>
            }
        ]
    }
])

