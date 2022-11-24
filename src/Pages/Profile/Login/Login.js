import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';

const Login = () => {
    const { user, loading, loginWithEmailPassword } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleLogin = data => {
        loginWithEmailPassword(data.email, data.password)
            .then(result => {
                const user = result.user
                console.log(user);
            })
            .catch(error => console.error(error))

    }
    return (
        <section className="bg-white dark:bg-gray-900 pb-8">
            <div className="w-[400px] flex items-center justify-center min-h-screen px-6 mx-auto shadow-md shadow-gray-600">

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






                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Login
                        </button>

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