import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';

const CheckoutForm = ({ order }) => {
    const { user, logout } = useContext(AuthContext)
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [paymentSpinner, setPaymentSpinner] = useState(false)
    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();
    const { _id, serviceId, name, email, serviceName, serviceLocation, image, price } = order;

    // console.log(serviceId);
    // sound
    function playSound() {
        // console.log('object');
        const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=success-1-6297.mp3');
        audio.play();
    }


    const handleUpdateSalesStatus = () => {
        fetch(`https://phonsell-server.vercel.app/my-orders/${serviceId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify({ transactionId })
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
                    handleUpdateProduct(serviceId)
                }
            })
    }
    // console.log(serviceId);

    const handleUpdateProduct = (serviceId) => {
        fetch(`https://phonsell-server.vercel.app/products/${serviceId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    toast.error('User Unuthorized Access')
                    return logout()
                }
                return res.json()
            })
            .then(data => {

                //    console.log(data);
            })
    }


    const handleUpdateAdvertiseProduct = (serviceId) => {
        fetch(`https://phonsell-server.vercel.app/advertiseProducts/${serviceId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    toast.error('User Unuthorized Access')
                    return logout()
                }
                return res.json()
            })
            .then(data => {
                // console.log(data);
            })
    }

    // console.log(serviceId);


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://phonsell-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setClientSecret(data.clientSecret)
            });
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setPaymentSpinner(true)

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );

        // console.log(paymentIntent);

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {

            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                orderId: serviceId
            }
            fetch('https://phonsell-server.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('access-token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.acknowledged) {
                        setPaymentSpinner(false)
                        toast.success('Congrats! Your Payment Successfull')
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                        handleUpdateSalesStatus()
                        playSound()
                        handleUpdateAdvertiseProduct(serviceId)
                        navigate('/dashboard/my-orders')
                    }
                })
        }
        setProcessing(false);


    }

    return (
        <>
            {
                paymentSpinner === true && <Loader></Loader>
            }
            <form className='bg-blue-100 p-8 rounded-md' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='mt-8 bg-green-600 hover:bg-green-700 px-2 py-1 text-white rounded-md w-full'
                    type="submit"
                    disabled={!stripe}>
                    Payment
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
        </>
    );
};

export default CheckoutForm;