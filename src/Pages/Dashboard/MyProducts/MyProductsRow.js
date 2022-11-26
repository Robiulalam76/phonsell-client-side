import React from 'react';
import { Link } from 'react-router-dom';

const MyProductsRow = ({ product, handleRemoveProduct }) => {
    const { _id, name, image, price, originalPrice, location, sold } = product
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
                <div className="text-left">{sold}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <Link className="text-left">
                    <button className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Advertise</button>
                </Link>
            </td>
            <td className="p-2 whitespace-nowrap">
                <Link className="text-left">
                    <button onClick={() => handleRemoveProduct(_id)} className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Delete</button>
                </Link>
            </td>
        </tr>
    );
};

export default MyProductsRow;