import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import close from '../../../assests/icon/close.png'

const AdvertiseBookNowModal = ({ modalData, closeModal }) => {
    const { user, logout } = useContext(AuthContext)
    const { serviceId, time, seller, verify, email: sellerEmail, categoryId, brand, name: serviceName, image, price, location: serviceLocation, sold, condition, used, originalPrice, model, authenticity, features, description, } = modalData
    console.log(modalData);


    // sound
    function playSound() {
        // console.log('object');
        const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3');
        audio.play();
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const email = event.target.email.value
        const number = event.target.number.value
        const location = event.target.location.value

        const order = {
            name,
            serviceId,
            serviceName,
            email, number,
            location, price,
            brand, image,
            serviceLocation, sold,
            time, seller,
            verify, sellerEmail,
            categoryId, condition,
            used, originalPrice, model, authenticity, features, description
        }
        fetch('https://phonsell-server-robiulalam76.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    toast.error('User Unuthorized Access')
                    return logout()
                }
                return res.json()
            })
            .then(data => {
                if (data.acknowledged) {
                    playSound()
                    toast.success(`${serviceName} Order Successfully`)
                    closeModal(null)
                }
            })
    }
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50 flex min-h-full justify-center p-4 items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                    <div className="mt-3 p-4">
                        <div className='flex justify-between items-center pb-2'>
                            <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">{serviceName}</h3>
                            <Link onClick={() => closeModal(null)} type="button" className="dark:text-black">
                                <img className='w-6' src={close} alt="" />
                            </Link>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full">

                            <div>

                                <input type="text" name='name'
                                    value={user?.displayName} readOnly disabled
                                    className='block w-full mt-3 py-3 bg-white border rounded-md px-3 text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' required />

                                <input type="text" name='email'
                                    value={user?.email} readOnly disabled
                                    className='block w-full mt-3 py-3 bg-white border rounded-md px-3 text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' required />

                                <div className='grid grid-cols-2 gap-4'>
                                    <span
                                        className='block text-left mb-3 w-full mt-3 py-3 bg-white border rounded-md px-3 text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                    >{serviceName}</span>

                                    <span
                                        className='block text-left mb-3 w-full mt-3 py-3 bg-white border rounded-md px-3 text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                    >Price: ${price}</span>
                                </div>

                                <span className=' text-gray-900'>Phone Number</span>
                                <input type="number" name='number'
                                    className='block w-full mb-3 py-3 bg-white border rounded-md px-3 text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                    placeholder='Your Number' required />

                                <span className=' text-gray-900 mt-3'>Location</span>
                                <input type="text" name='location'
                                    className='block w-full py-3 bg-white border rounded-md px-3 text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                    placeholder='Your Location' required />
                            </div>


                            <button type='submit' className="mt-4 w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm">Submit Order</button>
                        </form>
                    </div>

                </div>
            </div>

        </div >
    );
};

export default AdvertiseBookNowModal;