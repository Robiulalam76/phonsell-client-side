import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import MyWishlist from "../../Pages/Dashboard/MyWishlist/MyWishlist";
import Home from "../../Pages/Home/Home/Home";
import Products from "../../Pages/Products/Products/Products";
import Login from "../../Pages/Profile/Login/Login";
import Signup from "../../Pages/Profile/Signup/Signup";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import PriveteRoute from "../PriveteRoute/PriveteRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            { path: '/', element: <Home></Home> },
            { path: '/home', element: <Home></Home> },
            {
                path: '/categories/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`),
                element: <PriveteRoute><Products></Products></PriveteRoute>
            },
            { path: '/login', element: <Login></Login> },
            { path: '/signup', element: <Signup></Signup> },
        ]
    },
    {
        path: '/dashboard',
        element: <PriveteRoute><DashboardLayout></DashboardLayout></PriveteRoute>,
        children: [
            { path: '/dashboard/my-products', element: <PriveteRoute><MyProducts></MyProducts></PriveteRoute> },
            { path: '/dashboard/addProduct', element: <PriveteRoute><AddProduct></AddProduct></PriveteRoute> },
            { path: '/dashboard/my-wishlist', element: <PriveteRoute><MyWishlist></MyWishlist></PriveteRoute> },
            { path: '/dashboard/my-orders', element: <PriveteRoute><MyOrders></MyOrders></PriveteRoute> },
            { path: '/dashboard/all-users', element: <PriveteRoute><AllUsers></AllUsers></PriveteRoute> },
            { path: '/dashboard/all-sellers', element: <PriveteRoute><AllSellers></AllSellers></PriveteRoute> },
        ]
    }
])

export default router;