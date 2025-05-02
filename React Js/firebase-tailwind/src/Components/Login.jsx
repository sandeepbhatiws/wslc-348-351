import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextData } from './CommonContext/Context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import GoggleLogin from './GoggleLogin';

export default function Login() {

    const { isLogin, setIsLogin } = useContext(ContextData);
    const [buttonLoading, setButtonLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate('/');
        }
    }, [])

    const loginUser = (event) => {
        event.preventDefault();
        setButtonLoading(true);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, event.target.email.value, event.target.password.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setButtonLoading(false);
                // ...
                setIsLogin(true);
                localStorage.setItem('loginUser', JSON.stringify(user))
                toast.success('Login User succussfully.')
                navigate('/play-quiz');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setButtonLoading(false);
                toast.error(errorMessage);
                // ..
            });

        event.target.reset();
    }

    return (
        <>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                    <div class="flex flex-col justify-center">
                        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
                        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                        <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more about our app
                            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                    <div>
                        <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                                Sign in to Quiz App
                            </h2>
                            <form class="mt-8 space-y-6" onSubmit={loginUser}>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div class="flex justify-center">
                                    <button type="submit" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={buttonLoading ? 'disabled' : ''}>
                                        {buttonLoading ? 'Loading...' : 'Login to your account'} </button>
                                </div>
                                <div class="flex justify-center">
                                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                                        Not registered yet? <Link to="/register" class="text-blue-600 hover:underline dark:text-blue-500">Create Account</Link>
                                    </div>
                                </div>
                                <GoggleLogin/>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
