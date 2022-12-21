import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';

const MyProductsRow = ({ product, handleRemoveProduct }) => {
    const { user, logout } = useContext(AuthContext)
    const { _id, time, seller, verify, email, categoryId, brand, name, image, price, location, sold, condition, used, originalPrice, model, authenticity, features, description, } = product;
    const [advertisePermit, setAdvertisePermit] = useState(true)

    const refetch = () => {
        fetch(`https://phonsell-server.vercel.app/advertiseProducts/${_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.serviceId === _id) {
                    setAdvertisePermit(false)
                }
            })
    }

    // data fetch with
    useEffect(() => {
        fetch(`https://phonsell-server.vercel.app/advertiseProducts/${_id}`)
            .then(res => res.json())
            .then(data => {
                if (data.serviceId === _id) {
                    setAdvertisePermit(false)
                }
            })
    }, [])


    const handleAdvertise = () => {
        const advertiseProduct = {
            serviceId: _id,
            time, seller, verify, email, categoryId, brand, name, image, price, location, sold, condition, used, originalPrice, model, authenticity, features, description,
        }

        // console.log(advertiseProduct);
        fetch('https://phonsell-server.vercel.app/advertise', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify(advertiseProduct)
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    toast.error('User Unuthorized Access')
                    return logout()
                }
                return res.json()
            })
            .then(data => {
                if (data.acknowledged) {
                    refetch()
                    toast.success('Product Advertised Successfully')
                }
            })
    }
    return (
        <tr>
            <td className="p-2 whitespace-nowrap">
                <img className="rounded-full w-8" src={image} width="40" height="40" alt="Alex Shatov" />
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{name}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left text-rose-600 font-bold">${price}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium text-gray-500">${originalPrice}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{location}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                {
                    sold === 'Unavailable' ?
                        <div className="text-left text-gray-600">Sold</div>
                        :
                        <div className="text-left">Available</div>
                }
            </td>
            <td className="p-2 whitespace-nowrap">
                {
                    sold === 'Unavailable' ?
                        <Link>
                            <button disabled className='py-1 px-2 bg-yellow-700 rounded-md text-white'>No Access</button>
                        </Link>
                        :
                        <Link className="text-left">
                            {advertisePermit ?
                                <button onClick={() => handleAdvertise()} className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Advertise</button>
                                :
                                <button disabled={!advertisePermit} className='py-1 px-2 bg-gray-500 rounded-md text-white'>Advertised</button>
                            }
                        </Link>
                }
            </td>
            <td className="p-2 whitespace-nowrap">
                <Link className="text-left">
                    <button onClick={() => handleRemoveProduct(_id)} className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Delete</button>
                </Link>
            </td>
        </tr >
    );
};

export default MyProductsRow;