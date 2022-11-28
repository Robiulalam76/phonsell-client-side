import React from 'react';
import { Link } from 'react-router-dom';

const MyOrdersRow = ({ order, handleRemoveOrder }) => {
    const { _id, serviceId, payment, sold, serviceName, serviceLocation, image, price, originalPrice } = order;
    // console.log(serviceId);
    return (
        <tr>
            <td className="p-2 whitespace-nowrap">
                <img className="rounded-full w-8" src={image} width="40" height="40" alt="Alex Shatov" />
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{serviceName}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left text-rose-600 font-bold">${price}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium text-gray-500">${originalPrice}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{serviceLocation}</div>
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
                <Link className="text-left">
                    <button onClick={() => handleRemoveOrder(_id)} className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Delete</button>
                </Link>
            </td>
            <td className="p-2 whitespace-nowrap">
                {
                    payment ?
                        <Link className="text-left">
                            <button className='py-1 px-3 bg-gray-400 rounded-md text-white'>Paid</button>
                        </Link>
                        :
                        <Link to={`/dashboard/orders/payment/${serviceId}`} className="text-left">
                            <button className='py-1 px-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white'>Pay</button>
                        </Link>
                }
            </td>
        </tr>
    );
};

export default MyOrdersRow;