import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../ContextAPI/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../../Hooks/useToken';
import Loader from '../../../Components/Loader';

const Signup = () => {
    const { user, loading, signupWithEmailPassword, updateUser, signupWithGoogle } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [errorPassword, setPasswordError] = useState("")
    // const [offLoading, setOffLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const from = location.state?.from?.pathname || '/'
    const [signupUserEmail, setSignupUserEmail] = useState('')
    const [token] = useToken(signupUserEmail);
    if (token) {
        navigate(from, { replace: true });
    }

    // console.log(token, signupUserEmail);

    const key = process.env.REACT_APP_IMGBB_KEY;

    const handleSignup = data => {
        signupWithEmailPassword(data.email, data.password)
            .then(result => {
                const user = result.user
                saveUser(data.name, data.email, data.role, data.image[0])
            })
            .catch(error => {
                const errorMessage = error.message;
                if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                    setPasswordError('You Have a Already Account')
                    // setOffLoading(false)
                }
            })

    }

    // image hosting to imageBB
    const saveUser = (name, email, role, image) => {
        const formData = new FormData()
        formData.append('image', image)
        const uri = `https://api.imgbb.com/1/upload?key=${key}`
        // console.log(uri);
        fetch(uri, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const image = imgData.data.url
                if (imgData.success) {
                    const user = {
                        name,
                        email,
                        role,
                        verify: false,
                        image
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
                            setSignupUserEmail(user.email)
                            // console.log(data);
                        })
                }
                updateProfile(name, image)
            })
    }


    // update user profile
    const updateProfile = (name, image) => {
        const profile = {
            displayName: name, photoURL: image
        }
        updateUser(profile)
            .then(result => {
                toast.success('User Signup Successfully')
                reset()
            })
            .catch(error => console.log(error))
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
                            setSignupUserEmail(userInfo.email)
                        }
                        else if (data.status === false) {
                            newSaveUser(userInfo)
                            toast.success('User Signup Successfully')
                        }
                    })

            })
            .catch(err => console.log(err))
    }


    const newSaveUser = (userInfo) => {
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
                setSignupUserEmail(userInfo.email)
            })
    }

    return (

        <section className="bg-white dark:bg-gray-900 pb-12 pt-4">
            {
                loading && <Loader></Loader>
            }
            <div className="w-full md:w-[400px] flex items-center justify-center p-8 mx-auto shadow-md shadow-gray-600">

                <form onSubmit={handleSubmit(handleSignup)} className="w-full max-w-md">
                    <h1 className='text-blue-900 dark:text-white text-2xl font-bold text-center'>SignUp</h1>

                    <div class="relative flex items-center mt-8">
                        <span class="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>

                        <input
                            {...register('name', { required: 'Name is Required' })}
                            type="text" name='name' class="block w-full py-3 text-gray-700 bg-white border rounded-md px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Full Name" required />
                    </div>
                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}

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



                    <div className="relative flex items-center mt-4">
                        <span class="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>

                        <select
                            {...register('role', { required: 'User or Seller Required' })}
                            name='role'
                            id="small" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-400 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                            <option selected value="user">I am a User</option>
                            <option value="seller">I am a Seller</option>
                        </select>
                    </div>
                    {errors.role && <p className='text-red-600'>{errors.role.message}</p>}

                    <label for="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-md cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>

                        <input
                            {...register('image', { required: 'User Image Required' })}
                            id="dropzone-file" name='image' type="file" className="dark:text-gray-400" required />
                    </label>
                    {errors.image && <p className='text-red-600'>{errors.image.message}</p>}
                    {errorPassword && <p className='text-red-600'>{errorPassword}</p>}

                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign Up
                        </button>

                        <p className='text-center dark:text-white mt-2'><small>or Signup With</small></p>

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
                                Already have an account? <Link className='text-sm text-blue-500 hover:underline dark:text-blue-400' to='/login'>LogIn</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>

    );
};

export default Signup;