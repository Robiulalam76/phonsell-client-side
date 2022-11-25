import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
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
            { path: '/dashboard/addProduct', element: <PriveteRoute><AddProduct></AddProduct></PriveteRoute> },
        ]
    }
])

export default router;