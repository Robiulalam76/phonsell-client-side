import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import MyProductsRow from './MyProductsRow';

const MyProducts = () => {
    const { user, logout } = useContext(AuthContext)

    // load wishlist
    const { data: myProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['myProducts'],
        queryFn: async () => {
            const res = await fetch(`https://phonsell-server-robiulalam76.vercel.app/my-products?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    // remove Product
    const handleRemoveProduct = (id) => {
        fetch(`https://phonsell-server-robiulalam76.vercel.app/products/${id}`, {
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
                    handleAdvertiseDelete(id)
                    toast.success('Product Remove Successfully')
                    refetch()
                }
            })
    }

    // if product advertise then delete
    const handleAdvertiseDelete = (id) => {
        // console.log(id);
        fetch(`https://phonsell-server-robiulalam76.vercel.app/advertiseProducts/${id}`, {
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
                    console.log(data);
                }
            })
    }


    if (isLoading) {
        return <div className='absolute top-[30%] right-[50%] flex justify-center min-h-screen p-6'><SyncLoader color="#36d7b7" /></div>
    }

    return (
        <div className="bg-white pb-12 px-6 w-full mx-auto">
            <div className="flex justify-center mx-auto bg-white">

                <div className="p-3">
                    <header className="py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">My Products</h2>
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
                                        <div className="font-semibold text-left">SALES STATUS</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">PROMOTE</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">ACTION</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {
                                    myProducts.map(product => <MyProductsRow
                                        key={product._id}
                                        product={product}
                                        handleRemoveProduct={handleRemoveProduct}
                                    ></MyProductsRow>)
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        myProducts.length === 0 &&
                        <h1 className='text-center text-xl mt-3 font-bold'>No Your Products</h1>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyProducts;