import React from 'react';
import { Link } from 'react-router-dom';

const AllSellersRow = ({ seller, handleRemoveSeller, handleVerify }) => {
    const { _id, name, image, email, verify, } = seller;
    // console.log(_id);
    return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img className="rounded-full w-8" src={image} width="40" height="40" alt="Alex Shatov" />
            </th>
            <td class="py-4 px-6">
                {name}
            </td>
            <td class="py-4 px-6">
                {email}
            </td>
            <td className="py-4 px-6">
                {
                    verify ?
                        <Link className="text-left">
                            Verified
                        </Link>
                        :
                        <Link className="text-left">
                            <button onClick={() => handleVerify(_id)} className='py-1 px-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white'>Verify</button>
                        </Link>
                }
            </td>
            <td class="py-4 px-6">
                <Link className="text-left">
                    <button onClick={() => handleRemoveSeller(_id)} className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Delete</button>
                </Link>
            </td>
        </tr>
    );
};

export default AllSellersRow;