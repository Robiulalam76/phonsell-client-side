import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';

const AddProduct = () => {
    const { user, loading } = useContext(AuthContext)
    const [userInfo, serUserInfo] = useState({})
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const getTime = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return strTime;
    }


    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                serUserInfo(data)
            })
    }, [user?.email])

    // Product add function
    const handleAddProduct = (data) => {

        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)
        const uri = `https://api.imgbb.com/1/upload?key=cb1d02f9d4fd8fd69411c15e571d60bf`
        fetch(uri, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const image = imgData.data.url
                if (imgData.success) {
                    const product = {
                        name: data.name,
                        brand: data.brand,
                        price: data.price,
                        orginalPrice: data.originalPrice,
                        categoryId: data.categoryId,
                        Model: data.model,
                        condition: data.condition,
                        used: data.used,
                        location: data.location,
                        authenticity: data.authenticity,
                        features: data.features,
                        description: data.description,
                        time: getTime(new Date),
                        sold: "Available",
                        image: image,
                        email: userInfo?.email,
                        verify: userInfo?.verify,
                        seller: userInfo?.name,
                    }

                    console.log(product);

                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.acknowledged) {
                                toast.success('Product Add Successfully')
                                reset()
                            }
                        })
                }
            })
    }
    return (
        <section className="bg-white dark:bg-gray-800 pb-12 px-6 w-full mx-auto">
            <div className="flex justify-center w-full lg:ml-28">
                <form onSubmit={handleSubmit(handleAddProduct)} className="w-full max-w-md md:max-w-[800px] mt-4">

                    <h1 className='text-blue-900 dark:text-white text-2xl font-bold'>Add Product</h1>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div>
                            <div class="relative flex items-center mt-8 md:mt-0">
                                <input
                                    {...register('name', { required: 'Name is Required' })}
                                    type="text" name='name' class="block w-full py-3 text-gray-700 bg-white border rounded-md px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Product Name" required />
                            </div>
                            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}

                            <div className='grid grid-cols-3 gap-4 mt-4'>

                                {/* // categoryId */}
                                <div className="relative">
                                    {/* <small>Category</small> */}
                                    <select
                                        {...register('categoryId', { required: 'category is Required' })}
                                        name='categoryId'
                                        id="categoryId" class="block w-full px-3 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-400 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                        {/* <option  value="1">Apple</option> */}
                                        <option value="1">Apple</option>
                                        <option value="2">Xiaomi</option>
                                        <option value="3">Samsung</option>
                                    </select>
                                </div>
                                {errors.categoryId && <p className='text-red-600'>{errors.categoryId.message}</p>}

                                <div className="relative ">
                                    <input
                                        {...register('price', { required: 'price is Required' })}
                                        type="number" name='price' className="block w-full py-3 text-gray-700 bg-white border rounded-md px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="price" required />
                                </div>
                                {errors.price && <p className='text-red-600'>{errors.price.message}</p>}

                                <div className="relative">
                                    <input
                                        {...register('originalPrice', {
                                            required: 'Original Price is Required',
                                        })}
                                        type="number" name='originalPrice' className="block w-full px-3 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="originalPrice" required />
                                </div>
                                {errors.originalPrice && <p className='text-red-600'>{errors.originalPrice.message}</p>}
                            </div>


                            <div className='grid grid-cols-2 gap-4 mt-4'>
                                <div className="relative">
                                    <input
                                        {...register('brand', { required: 'Brand Name is Required' })}
                                        type="text" name='brand' className="block w-full py-3 text-gray-700 bg-white border rounded-md px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Brand Name" required />
                                </div>
                                {errors.brand && <p className='text-red-600'>{errors.brand.message}</p>}


                                <div className="relative">
                                    <input
                                        {...register('model', {
                                            required: 'Model Name is Required',
                                        })}
                                        type="text" name='model' className="block w-full px-3 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Model Name" required />
                                </div>
                                {errors.model && <p className='text-red-600'>{errors.model.message}</p>}
                            </div>


                            <div className='grid grid-cols-2 gap-4 mt-4'>
                                <div className="relative">
                                    <input
                                        {...register('used', {
                                            required: 'used of time is Required',
                                        })}
                                        type="text" name='used' className="block w-full px-3 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Used of Time" required />
                                </div>
                                {errors.used && <p className='text-red-600'>{errors.used.message}</p>}


                                <div className="relative">
                                    <input
                                        {...register('location', {
                                            required: 'location is Required',
                                        })}
                                        type="text" name='location' className="block w-full px-3 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="location" required />
                                </div>
                                {errors.location && <p className='text-red-600'>{errors.location.message}</p>}
                            </div>


                            <div className="relative flex items-center mt-4">
                                <textarea
                                    {...register('condition', {
                                        required: 'condition is Required',
                                    })}
                                    cols="30" rows="10"
                                    type="text" name='condition' className="block w-full px-3 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 h-24 resize-none" placeholder="Product condition" required
                                ></textarea>
                            </div>
                            {errors.condition && <p className='text-red-600'>{errors.condition.message}</p>}

                            {/* // authenticity */}
                            <div className="relative flex items-center mt-4">
                                <textarea
                                    {...register('authenticity', {
                                        required: 'authenticity is Required',
                                    })}
                                    cols="30" rows="10"
                                    type="text" name='authenticity' className="block w-full px-3 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 h-24 resize-none" placeholder="Product authenticity" required
                                ></textarea>
                            </div>
                            {errors.authenticity && <p className='text-red-600'>{errors.authenticity.message}</p>}
                        </div>

                        <div>


                            {/* // features */}
                            <div className="relative flex items-center md:mt-0">
                                <textarea
                                    {...register('features', {
                                        required: 'features is Required',
                                    })}
                                    cols="30" rows="10"
                                    type="text" name='features' className="block w-full px-3 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 h-24 resize-none" placeholder="Product features" required
                                ></textarea>
                            </div>
                            {errors.features && <p className='text-red-600'>{errors.features.message}</p>}


                            {/* // description */}
                            <div className="relative flex items-center mt-4">
                                <textarea
                                    {...register('description', {
                                        required: 'description is Required',
                                    })}
                                    cols="30" rows="10"
                                    type="text" name='description' className="block w-full px-3 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 min-h-44 " placeholder="Product description" required
                                ></textarea>
                            </div>
                            {errors.description && <p className='text-red-600'>{errors.description.message}</p>}


                            <label for="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>

                                <input
                                    {...register('image', { required: 'User Image Required' })}
                                    id="dropzone-file" name='image' type="file" className="dark:text-gray-400" required />
                            </label>
                            {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                        </div>
                    </div>

                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddProduct;