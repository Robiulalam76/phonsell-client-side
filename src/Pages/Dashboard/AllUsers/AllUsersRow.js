import React from 'react';
import { Link } from 'react-router-dom';

const AllUsersRow = ({ user, handleRemoveUser }) => {
    const { _id, name, image, email, role, } = user;
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
            <td class="py-4 px-6">
                {role}
            </td>

            <td class="py-4 px-6">
                <Link className="text-left">
                    <button onClick={() => handleRemoveUser(_id)} className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Delete</button>
                </Link>
            </td>
        </tr>
    );
};

export default AllUsersRow;