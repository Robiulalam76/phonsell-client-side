import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../ContextAPI/AuthProvider/AuthProvider';
import useUser from '../../Hooks/useUser';

const UserRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isUser, isLoading] = useUser(user?.email)
    const location = useLocation()
    console.log(isUser);

    if (loading || isLoading) {
        return <div className='w-full h-full flex justify-center items-center'><SyncLoader color="#36d7b7" /></div>
    }

    if (user && isUser) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default UserRoute;