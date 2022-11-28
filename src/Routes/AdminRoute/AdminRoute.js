import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";
import { AuthContext } from '../../ContextAPI/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isLoading] = useAdmin(user?.email)
    const location = useLocation()

    if (loading || isLoading) {
        return <div className='w-full h-full flex justify-center items-center'><SyncLoader color="#36d7b7" /></div>
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;