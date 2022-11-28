import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';

const ProductReportModal = ({ modalData, closeModal }) => {
    const { user, logout } = useContext(AuthContext)
    const { _id, time, seller, verify, email, categoryId, brand, name, image, price, location, sold, condition, used, originalPrice, model, authenticity, features, description, } = modalData;

    const handleSubmit = (event) => {
        event.preventDefault()
        const reportText = event.target.report.value

        const report = {
            serviceId: _id,
            reportText,
            seller,
            email,
            categoryId,
            brand,
            serviceName: name,
            reporterName: user?.displayName,
            reporterImage: user?.photoURL,
            reporterEmail: user?.email,
            image,
            price,
            location,
            sold,
            condition,
            used,
            originalPrice,
            model, authenticity, features, description, verify, time
        }

        fetch('https://phonsell-server-robiulalam76.vercel.app/reports', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify(report)
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
                    toast.success(`${name} Report Successfully`)
                    closeModal(false)
                }
            })
    }
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50 flex min-h-full justify-center p-4 items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <form onSubmit={handleSubmit} className="w-full mt-3 p-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Report of {modalData.name}</h3>
                        <div>
                            <textarea
                                name="report" id="" cols="30" rows="10"
                                className='block w-full mt-3 py-3 bg-white border rounded-md px-3 text-gray-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 h-32 resize-none'
                                placeholder='Please Enter Your Report.....'
                            ></textarea>
                        </div>
                        <div className='flex justify-end items-center'>
                            <button onClick={() => closeModal(false)} type='submit' className="mt-4 mr-4 justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm">Cancel</button>

                            <button type='submit' className="mt-4 justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 sm:text-sm">Submit Report</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default ProductReportModal;