import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import report from '../../../assests/icon/report.png'
import AdvertiseBookNowModal from './AdvertiseBookNowModal';
import AdvertiseReportModal from './AdvertiseReportModal';

const AdvertiseProductCard = ({ advertiseProduct }) => {
    const { time, seller, verify, email, categoryId, brand, name, image, price, location, sold, condition, used, originalPrice, model, authenticity, features, description, } = advertiseProduct;
    const { user, logout } = useContext(AuthContext)
    const [modalData, setModalData] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [sellerVerify, setSellerVerify] = useState({})

    // order modal close 
    const closeModal = (data) => {
        if (data === null) {
            setModalData(data)
        }
        else if (data === false) {
            setShowModal(data)
        }
    }

    // load user
    useEffect(() => {
        fetch(`http://localhost:5000/verify-users?email=${email}`)
            .then(res => res.json())
            .then(data => {
                const sellerInfo = data.filter(seller => setSellerVerify(seller.verify))
                // console.log(sellerInfo);
            })
    }, [email])

    // load wishlist
    const { data: wishlist = [], refetch } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/wishlist')
            const data = await res.json()
            return data
        }
    })

    const wishlised = wishlist.find(w => w.serviceId === advertiseProduct.serviceId)


    // handle wishlist 
    const handleWishlist = () => {
        const wishlist = {
            serviceId: advertiseProduct.serviceId,
            wishlisterEmail: user?.email,
            categoryId,
            brand,
            name,
            image,
            price,
            location,
            sold,
            condition,
            used,
            originalPrice,
            model,
            authenticity,
            features,
            description,
        }
        fetch('http://localhost:5000/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify(wishlist)
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
                    toast.success('Weshlist add Successfully')
                    refetch()
                }
            })
    }

    // remove wishlist
    const handleRemoveWishlist = (id) => {
        fetch(`http://localhost:5000/wishlist/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('access-token')}`
            },
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    toast.error('User Unuthorized Access')
                    return logout()
                }
                return res.json()
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Weshlist Remove Successfully')
                    refetch()
                }
            })
    }

    return (
        <div className="rounded-md shadow-md w-full bg-gray-300 dark:bg-gray-900 dark:text-gray-100 mx-auto">
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center">
                    <div className="ml-4">
                        <div className='flex items-center'>
                            <h2 className="text-sm font-semibold leading-none">{seller}</h2>
                            {sellerVerify &&
                                <img className='w-4' src="https://cdn-icons-png.flaticon.com/512/5290/5290058.png" alt="" />
                            }
                        </div>
                        <span className="inline-block text-xs leading-none dark:text-gray-400">{email}</span>
                    </div>
                </div>
                <small>{time}</small>
            </div>
            <img src={image} alt="" className="object-cover object-center w-full h-48 dark:bg-gray-500" />
            <div className="p-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className='dark:text-white font-bold text-xl'>{name}</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button type="button" title="Wishlist" className="flex items-center justify-center">

                            {
                                wishlised?.serviceId === advertiseProduct.serviceId ?
                                    <img onClick={() => handleRemoveWishlist(wishlised?.serviceId)} className="w-6 h-6" src="https://img.icons8.com/emoji/2x/heart-suit.png" alt="" />
                                    :
                                    <svg onClick={() => handleWishlist()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=" w-6 h-6 fill-current">
                                        <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                    </svg>
                            }
                        </button>

                        <button onClick={() => setShowModal(true)} type="button" title="Report" className="flex items-center justify-center">
                            <img className='w-7' src={report} alt="" />
                        </button>
                    </div>

                </div>
                <div className="flex items-center dark:text-white justify-start pt-3 pb-1">
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Price: ${price}</h1>
                        <small>Original: ${originalPrice}</small>
                        <p>used: {used}</p>
                        <p>location: {location}</p>
                    </div>

                </div>

                <div className='flex items-center justify-between pt-3 pb-1'>
                    <Link onClick={() => setModalData(advertiseProduct)}>
                        <button className='bg-blue-600 text-white hover:bg-blue-700 px-3 rounded-md py-1'>Book now</button>
                    </Link>
                    <Link className='flex items-center text-gray-900 dark:text-white hover:text-orange-600'>
                        <img className='w-5' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/next-icon-3208452-2707515.png" alt="" />
                        <span>See Details</span>
                    </Link>
                </div>

            </div>
            {
                modalData &&
                <AdvertiseBookNowModal
                    modalData={modalData}
                    closeModal={closeModal}
                ></AdvertiseBookNowModal>
            }
            {
                showModal &&
                <AdvertiseReportModal
                    modalData={advertiseProduct}
                    closeModal={closeModal}
                ></AdvertiseReportModal>
            }
        </div>
    );
};

export default AdvertiseProductCard;