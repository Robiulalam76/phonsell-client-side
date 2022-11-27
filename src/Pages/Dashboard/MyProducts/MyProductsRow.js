import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyProductsRow = ({ product, handleRemoveProduct }) => {
    const { _id, time, seller, verify, email, categoryId, brand, name, image, price, location, sold, condition, used, originalPrice, model, authenticity, features, description, } = product;
    // console.log(_id);
    const handleAdvertise = () => {
        const advertiseProduct = {
            serviceId: _id,
            time, seller, verify, email, categoryId, brand, name, image, price, location, sold, condition, used, originalPrice, model, authenticity, features, description,
        }

        // console.log(advertiseProduct);
        fetch('http://localhost:5000/advertise', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(advertiseProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
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
                <div className="text-left">{sold}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <Link className="text-left">
                    <button onClick={() => handleAdvertise()} className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Advertise</button>
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