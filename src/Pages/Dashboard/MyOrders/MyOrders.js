import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import MyOrdersRow from './MyOrdersRow';

const MyOrders = () => {
    const { user, logout } = useContext(AuthContext)

    // load wishlist
    const { data: myOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['myOrders'],
        queryFn: async () => {
            const res = await fetch(`https://phonsell-server.vercel.app/my-orders?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    // remove wishlist
    const handleRemoveOrder = (id) => {
        fetch(`https://phonsell-server.vercel.app/my-orders/${id}`, {
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
                    toast.success('Order Remove Successfully')
                    refetch()
                }
            })
    }

    if (isLoading) {
        return <div className='absolute top-[30%] right-[50%] flex justify-center min-h-screen p-6'><SyncLoader color="#36d7b7" /></div>
    }
    return (
        <div className="bg-white dark:bg-gray-800 min-h-screen pb-12 px-6 w-full mx-auto">
            <div className="flex overflow-x-auto justify-center md:max-w-fit mx-auto">

                <div className="p-3">
                    <header className="py-4 border-b border-gray-100">
                        <h2 className="font-semibold dark:text-white text-gray-900">My Orders</h2>
                    </header>
                    <div className="overflow-x-auto md:overflow-hidden max-w-fit">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-900 bg-white">
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
                                        <div className="font-semibold text-left">SALES STATUS</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">ACTION</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">PAYMENT</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y dark:text-white">
                                {
                                    myOrders.map(order => <MyOrdersRow
                                        key={order._id}
                                        order={order}
                                        handleRemoveOrder={handleRemoveOrder}
                                    ></MyOrdersRow>)
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        myOrders.length === 0 &&
                        <h1 className='text-center text-xl mt-3 dark:text-white text-gray-900 font-bold'>No Orders</h1>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyOrders;