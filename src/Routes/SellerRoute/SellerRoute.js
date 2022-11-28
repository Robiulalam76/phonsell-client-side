import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../ContextAPI/AuthProvider/AuthProvider";
import useSeller from "../../Hooks/useSeller";

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSeller, isLoading] = useSeller(user?.email)
    const location = useLocation()

    if (loading || isLoading) {
        return <div className='w-full h-full flex justify-center items-center'><SyncLoader color="#36d7b7" /></div>
    }

    if (user && isSeller) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};


export default SellerRoute;