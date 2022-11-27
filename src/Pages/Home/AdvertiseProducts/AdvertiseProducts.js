import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import AdvertiseProductCard from './AdvertiseProductCard';
import axios from 'axios'

const AdvertiseProducts = () => {
    const [advertiseProducts, setAdvertiseProducts] = useState([])

    // data fetch with axios
    useEffect(() => {
        axios.get('http://localhost:5000/advertiseProducts')
            .then(data => setAdvertiseProducts(data.data))
    }, [])

    return (
        <>
            {
                advertiseProducts.length > 0 &&
                <div className='p-8 mx-auto'>
                    <h1 className='text-3xl font-bold dark:text-white text-gray-900 pb-4'>Advertise</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            advertiseProducts.map(advertiseProduct => <AdvertiseProductCard
                                key={advertiseProduct._id}
                                advertiseProduct={advertiseProduct}
                            ></AdvertiseProductCard>)
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default AdvertiseProducts;