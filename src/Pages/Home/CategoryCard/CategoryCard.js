import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    return (
        <div className="max-w-lg p-4 shadow-md dark:bg-gray-900 dark:text-gray-100 rounded-md">
            <div className="space-y-4">
                <div className="space-y-2">
                    <img src={category.image} alt="" className="block h-48 object-cover object-center w-full rounded-md dark:bg-gray-500" />

                </div>
                <div className="flex justify-between items-center pb-4 border-bottom">
                    <div className="flex items-center">
                        <Link to={`/categories/${category.categoryId}`} className="mb-0 hover:text-orange-700 capitalize dark:text-gray-100 font-bold text-2xl">{category.name}</Link>
                    </div>
                    <Link to={`/categories/${category.categoryId}`} className='font-bold hover:text-orange-700'>See All</Link>
                </div>

            </div>
        </div>
    );
};

export default CategoryCard;