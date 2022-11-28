import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import About from "../../Pages/About/About";
import Blogs from "../../Pages/Blogs/Blogs";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import MyWishlist from "../../Pages/Dashboard/MyWishlist/MyWishlist";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ReportedItems from "../../Pages/Dashboard/ReportedItems/ReportedItems";
import Home from "../../Pages/Home/Home/Home";
import Products from "../../Pages/Products/Products/Products";
import Login from "../../Pages/Profile/Login/Login";
import Signup from "../../Pages/Profile/Signup/Signup";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import AdminRoute from "../AdminRoute/AdminRoute";
import PriveteRoute from "../PriveteRoute/PriveteRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import UserRoute from "../UserRoute/UserRoute";

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
                loader: ({ params }) => fetch(`https://phonsell-server-robiulalam76.vercel.app/categories/${params.id}`),
                element: <PriveteRoute><Products></Products></PriveteRoute>
            },
            { path: '/about', element: <About></About> },
            { path: '/blogs', element: <Blogs></Blogs> },
            { path: '/login', element: <Login></Login> },
            { path: '/signup', element: <Signup></Signup> },
        ]
    },
    {
        path: '/dashboard',
        element: <PriveteRoute><DashboardLayout></DashboardLayout></PriveteRoute>,
        children: [
            { path: '/dashboard/my-products', element: <SellerRoute><MyProducts></MyProducts></SellerRoute> },
            { path: '/dashboard', element: <PriveteRoute><Dashboard></Dashboard> </PriveteRoute> },
            { path: '/dashboard/addProduct', element: <SellerRoute><AddProduct></AddProduct></SellerRoute> },

            { path: '/dashboard/my-wishlist', element: <UserRoute><MyWishlist></MyWishlist></UserRoute> },
            { path: '/dashboard/my-orders', element: <UserRoute><MyOrders></MyOrders></UserRoute> },

            {
                path: '/dashboard/orders/payment/:id',
                loader: ({ params }) => fetch(`https://phonsell-server-robiulalam76.vercel.app/orders/${params.id}`),
                element: <UserRoute><Payment></Payment></UserRoute>
            },

            { path: '/dashboard/all-users', element: <AdminRoute><AllUsers></AllUsers></AdminRoute> },
            { path: '/dashboard/all-sellers', element: <AdminRoute><AllSellers></AllSellers></AdminRoute> },
            { path: '/dashboard/reported-items', element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute> },


        ]
    }
])

export default router;