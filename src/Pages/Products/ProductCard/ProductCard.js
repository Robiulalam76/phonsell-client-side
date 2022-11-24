import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const ProductCard = ({ product }) => {
    const { _id, categoryId, brand, name, image, price, location, sold, condition, used, orginalPrice, Model, authenticity, features, description, } = product;


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
                    // console.log(data);
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
                    console.log(data);
                    refetch()
                }
            })
    }
    return (
        <div className="rounded-md shadow-md sm:w-96 dark:bg-gray-900 dark:text-gray-100 mx-auto">
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-2">
                    <img src="https://source.unsplash.com/50x50/?portrait" alt="" className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-700" />
                    <div className="-space-y-1">
                        <h2 className="text-sm font-semibold leading-none">leroy_jenkins72</h2>
                        <span className="inline-block text-xs leading-none dark:text-gray-400">Somewhere</span>
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
            <img src={image} alt="" className="object-cover object-center w-full h-72 dark:bg-gray-500" />
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
                        <button type="button" title="Add a comment" className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
                            </svg>
                        </button>
                        <button type="button" title="Share post" className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z"></path>
                            </svg>
                        </button>
                    </div>

                </div>
                <div className="flex flex-wrap items-center pt-3 pb-1">
                    <div className="flex items-center space-x-2">
                        <div className="flex -space-x-1">
                            <img alt="" className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-800" src="https://source.unsplash.com/40x40/?portrait?1" />
                            <img alt="" className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-800" src="https://source.unsplash.com/40x40/?portrait?2" />
                            <img alt="" className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-800" src="https://source.unsplash.com/40x40/?portrait?3" />
                        </div>
                        <span className="text-sm">Liked by
                            <span className="font-semibold">Mamba UI</span>and
                            <span className="font-semibold">86 others</span>
                        </span>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default ProductCard;