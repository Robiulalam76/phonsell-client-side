import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(stripePromise);

const Payment = () => {
    const order = useLoaderData();
    const navigation = useNavigation();
    const { _id, serviceId, name, email, brand, serviceName, originalPrice, serviceLocation, image, price } = order;
    // console.log(order);
    return (
        <div className='bg-blue-50 mx-auto p-4'>
            <div className='w-full md:w-fit mx-auto'>
                <h1 className='font-bold text-xl md:text-3xl text-blue-600 text-center'>Making {serviceName} Payments</h1>
                <p className='text-left text-xl'><small>Price: ${price}</small></p>
                <p className='text-left text-xl'><small>Original Price: ${originalPrice}</small></p>
                <p className='text-left text-xl'><small>Brand Name: ${brand}</small></p>
            </div>
            <div className='w-full md:w-96 my-12 mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;