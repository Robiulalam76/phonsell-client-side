import React from 'react';
import { Link } from 'react-router-dom';

const AllUsersRow = ({ user, handleRemoveUser }) => {
    const { _id, name, image, email, role, } = user;
    return (
        <tr>
            <td className="p-2 whitespace-nowrap">
                <img className="rounded-full w-8" src={image} width="40" height="40" alt="Alex Shatov" />
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{name}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{email}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{role}</div>
            </td>

            <td className="p-2 whitespace-nowrap">
                <Link className="text-left">
                    <button onClick={() => handleRemoveUser(_id)} className='py-1 px-3 bg-red-600 hover:bg-red-700 rounded-md text-white'>Delete</button>
                </Link>
            </td>

        </tr>
    );
};

export default AllUsersRow;