import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { _id, seller, verify, email, categoryId, brand, name, image, price, location, sold, condition, used, orginalPrice, Model, authenticity, features, description, } = product;


    const { data: wishlist = [], refetch } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/wishlist')
            const data = await res.json()
            return data
        }
    })

    const wishlised = wishlist.find(w => w.serviceId === product._id)


    const handleWishlist = () => {
        const wishlist = {
            serviceId: _id,
            categoryId,
            brand,
            name,
            image,
            price,
            location,
            sold,
            condition,
            used,
            orginalPrice,
            Model,
            authenticity,
            features,
            description,
        }
        fetch('http://localhost:5000/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishlist)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Weshlist add Successfully')
                    refetch()
                }
            })
    }

    const handleRemoveWishlist = (id) => {
        fetch(`http://localhost:5000/wishlist/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Weshlist Remove Successfully')
                    refetch()
                }
            })
    }
    return (
        <div className="rounded-md shadow-md sm:w-96 dark:bg-gray-900 dark:text-gray-100 mx-auto">
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center">
                    <div className="ml-4">
                        <div className='flex items-center'>
                            <h2 className="text-sm font-semibold leading-none">{seller}</h2>
                            {verify &&
                                <img className='w-4' src="https://cdn-icons-png.flaticon.com/512/5290/5290058.png" alt="" />
                            }
                        </div>
                        <span className="inline-block text-xs leading-none dark:text-gray-400">{email}</span>
                    </div>
                </div>
                <button title="Open options" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                        <path d="M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z"></path>
                        <path d="M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z"></path>
                        <path d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z"></path>
                    </svg>
                </button>
            </div>
            <img src={image} alt="" className="object-cover object-center w-full h-48 dark:bg-gray-500" />
            <div className="p-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className='dark:text-white font-bold text-xl'>{name}</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button type="button" title="Like post" className="flex items-center justify-center">

                            {
                                wishlised?.serviceId === _id ?
                                    <img onClick={() => handleRemoveWishlist(wishlised?.serviceId)} className="w-5 h-5" src="https://img.icons8.com/emoji/2x/heart-suit.png" alt="" />
                                    :
                                    <svg onClick={() => handleWishlist()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=" w-5 h-5 fill-current">
                                        <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                    </svg>
                            }
                        </button>

                        <button type="button" title="Share post" className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z"></path>
                            </svg>
                        </button>
                    </div>

                </div>
                <div className="flex items-center dark:text-white justify-between pt-3 pb-1">
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Price: ${price}</h1>
                        <small>Official: ${orginalPrice}</small>
                        <p>used: {used}</p>
                        <p>location: {location}</p>
                    </div>
                    <div>
                        <Link>
                            <button className='bg-blue-600 hover:bg-blue-700 px-3 rounded-md py-1'>See Details</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default ProductCard;