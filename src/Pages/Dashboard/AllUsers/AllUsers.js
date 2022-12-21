import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import AllUsersRow from './AllUsersRow';

const AllUsers = () => {
    const { user, logout } = useContext(AuthContext)

    // load wishlist
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://phonsell-server.vercel.app/all-users')
            const data = await res.json()
            return data
        }
    })

    // remove wishlist
    const handleRemoveUser = (id) => {
        fetch(`https://phonsell-server.vercel.app/all-users/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('access-token')}`
            },
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    toast.error('User Unuthorized Access')
                    return logout()
                }
                return res.json()
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('User Remove Successfully')
                    refetch()
                }
            })
    }

    if (isLoading) {
        return <div className='absolute top-[30%] right-[50%] flex justify-center min-h-screen p-6'><SyncLoader color="#36d7b7" /></div>
    }
    return (
        <div className=' bg-white dark:bg-gray-800 min-h-screen py-12 px-6'>
            <div class="overflow-x-auto relative w-full md:max-w-[700px] mx-auto">
                <header className="py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800 dark:text-white">All Users</h2>
                </header>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                IMAGE
                            </th>
                            <th scope="col" class="py-3 px-6">
                                NAME
                            </th>
                            <th scope="col" class="py-3 px-6">
                                EMAIL
                            </th>
                            <th scope="col" class="py-3 px-6">
                                ROLE
                            </th>
                            <th scope="col" class="py-3 px-6">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <AllUsersRow
                                key={user._id}
                                user={user}
                                handleRemoveUser={handleRemoveUser}
                            ></AllUsersRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                users.length === 0 &&
                <h1 className='text-center dark:text-white text-xl mt-3 font-bold'>No Users</h1>
            }
        </div>
    );
};

export default AllUsers;