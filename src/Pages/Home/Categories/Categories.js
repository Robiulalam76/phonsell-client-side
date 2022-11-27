import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { SyncLoader } from 'react-spinners';
import CategoryCard from '../CategoryCard/CategoryCard';

const Categories = () => {
    const { data: categories = [], refetch, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories')
            const data = await res.json()
            return data
        }
    })


    if (isLoading) {
        return <div className='flex justify-center p-6'><SyncLoader color="#36d7b7" /></div>
    }

    // console.log(categories);
    return (
        <div className='m-8'>
            <h1 className='text-3xl font-bold dark:text-white text-gray-900 pb-4'>Categories</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    ></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Categories;