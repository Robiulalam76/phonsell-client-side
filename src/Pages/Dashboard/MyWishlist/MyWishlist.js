import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import MyWishlistRow from './MyWishlistRow';

const MyWishlist = () => {
    const { user, logout } = useContext(AuthContext)

    // load wishlist
    const { data: wishlist = [], isLoading, refetch } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const res = await fetch(`https://phonsell-server-robiulalam76.vercel.app/my-wishlist?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    // remove wishlist
    const handleRemoveWishlist = (id) => {
        fetch(`https://phonsell-server-robiulalam76.vercel.app/wishlist/${id}`, {
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
                    toast.success('Weshlist Remove Successfully')
                    refetch()
                }
            })
    }

    if (isLoading) {
        return <div className='absolute top-[30%] right-[50%] flex justify-center min-h-screen p-6'><SyncLoader color="#36d7b7" /></div>
    }
    // console.log(wishlist);

    return (
        <div className="bg-white dark:bg-gray-800 min-h-screen py-12 px-6">
            <div className="overflow-x-auto relative w-full md:max-w-[700px] mx-auto">

                <div className="p-3">
                    <header className="py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">My Wishlist</h2>
                    </header>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-900 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">IMAGE</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">NAME</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">PRICE</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">ORIGINAL</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">LOCATION</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">ACTION</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">PAYMENT</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {
                                    wishlist.map(w => <MyWishlistRow
                                        key={w._id}
                                        wishlist={w}
                                        handleRemoveWishlist={handleRemoveWishlist}
                                    ></MyWishlistRow>)
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        wishlist.length === 0 &&
                        <h1 className='text-center text-xl mt-3 font-bold'>No Wishlist Your Product</h1>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyWishlist;