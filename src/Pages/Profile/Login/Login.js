import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import useToken from '../../../Hooks/useToken';

const Login = () => {
    const { user, loading, loginWithEmailPassword, signupWithGoogle } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [errorPassword, setPasswordError] = useState("")
    // const [offLoading, setOffLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const from = location.state?.from?.pathname || '/'
    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail);
    // console.log(loginUserEmail, token);
    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        loginWithEmailPassword(data.email, data.password)
            .then(result => {
                const user = result.user
                toast.success('User Login Successfully')
                setLoginUserEmail(user.email)
                reset()

            })
            .catch(error => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                if (errorMessage === "Firebase: Error (auth/wrong-password).") {
                    setPasswordError("Password is Wrong Try again")
                    // setOffLoading(false)
                }
                if (errorMessage === "Firebase: Error (auth/user-not-found).") {
                    setPasswordError('User is Not Found')
                    // setOffLoading(false)
                }
            })
    }


    // signup with google
    const handleGoogleSignup = () => {
        signupWithGoogle(googleProvider)
            .then(result => {
                const userInfo = result.user
                fetch(`https://phonsell-server.vercel.app/check-user?email=${userInfo.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === true) {
                            toast.success('User Login Successfully')
                            setLoginUserEmail(userInfo.email)
                        }
                        else if (data.status === false) {
                            saveUser(userInfo)
                            toast.success('User Signup Successfully')
                        }
                    })

            })
            .catch(err => console.log(err))
    }

    // console.log(errorPassword);
    const saveUser = (userInfo) => {
        toast.success('User Signup Successfully')
        const user = {
            name: userInfo.displayName,
            email: userInfo.email,
            role: 'user',
            verify: false,
            image: userInfo.photoURL
        }
        fetch('https://phonsell-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setLoginUserEmail(userInfo.email)
            })
    }
    return (
        <section className="bg-white dark:bg-gray-900 pt-4 pb-12">
            {
                loading && <Loader></Loader>
            }
            <div className="w-full md:w-[400px] flex items-center justify-center p-6 mx-auto shadow-md shadow-gray-600">

                <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-md">
                    <h1 className='text-blue-900 dark:text-white text-2xl font-bold text-center'>Login</h1>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input
                            {...register('email', { required: 'Email is Required' })}
                            type="email" name='email' className="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" required />
                    </div>
                    {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input
                            {...register('password', {
                                required: 'Password is Required', minLength: { value: 6, message: 'Password at least 6 Charecters' }
                            })}
                            type="password" name='password' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" required />
                    </div>
                    {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    {errorPassword && <p className='text-red-600'>{errorPassword}</p>}






                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Login
                        </button>

                        <div className='grid grid-cols-2 gap-4'>
                            <div onClick={handleGoogleSignup} className='mt-4 flex justify-center rounded-md bg-white border-gray-blue-900 border py-1'>
                                <img className='w-6 mr-4' src="https://img.icons8.com/fluency/2x/google-logo.png" alt="" />
                                <button className="font-bold">
                                    Google
                                </button>
                            </div>
                            <div className='mt-4 flex justify-center rounded-md bg-white border-gray-blue-900 border py-1'>
                                <img className='w-6 mr-4' src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
                                <button className="font-bold">
                                    Github
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 text-center ">
                            <p className="text-sm text-gray-900 hover:underline dark:text-gray-400">
                                are you new user? <Link className='text-sm text-blue-500 hover:underline dark:text-blue-400' to='/signup'>Signup</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;