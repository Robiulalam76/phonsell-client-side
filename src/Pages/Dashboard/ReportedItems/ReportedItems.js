import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import ReportedItemsRow from './ReportedItemsRow';

const ReportedItems = () => {
    const { user } = useContext(AuthContext)

    // load wishlist
    const { data: reports = [], isLoading, refetch } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reports')
            const data = await res.json()
            return data
        }
    })


    // delete report product for user report
    const handleReportDelete = (id) => {
        fetch(`http://localhost:5000/reports/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    handleProductDelete(id)
                    handleDeleteAdvertiseProduct(id)
                    refetch()
                }
            })
    }

    // delete product for report
    const handleProductDelete = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Product Deleted Successfully')
                    refetch()
                }
            })
    }


    // delete advertise product for report
    const handleDeleteAdvertiseProduct = id => {
        fetch(`http://localhost:5000/advertiseProducts/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                }
            })
    }


    if (isLoading) {
        return <div className='absolute top-[30%] right-[50%] flex justify-center min-h-screen p-6'><SyncLoader color="#36d7b7" /></div>
    }
    return (
        <div className=' bg-white dark:bg-gray-800 min-h-screen py-12 px-6'>
            <div class="overflow-x-auto relative w-full md:max-w-fit mx-auto">
                <header className="py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800 dark:text-white">Reported Items</h2>
                </header>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                IMAGE
                            </th>
                            <th scope="col" class="py-3 px-6">
                                NAME
                            </th>
                            <th scope="col" class="py-3 px-6">
                                PRICE
                            </th>
                            <th scope="col" class="py-3 px-6">
                                SOLD
                            </th>
                            <th scope="col" class="py-3 px-6">
                                LOCATION
                            </th>
                            <th scope="col" class="py-3 px-6">
                                REPORT
                            </th>
                            <th scope="col" class="py-3 px-6">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports.map(report => <ReportedItemsRow
                                key={report._id}
                                report={report}
                                handleReportDelete={handleReportDelete}
                            ></ReportedItemsRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                reports.length === 0 &&
                <h1 className='text-center dark:text-white text-xl mt-3 font-bold'>No Reprted Items</h1>
            }
        </div>
    );
};

export default ReportedItems;