import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { ContextData } from '../CommonContext/Context';
import { ToastContainer } from 'react-toastify';

export default function Header() {

    const { isLogin, setIsLogin } = useContext(ContextData);
    const navigate = useNavigate();

    const logout = () => {
        setIsLogin(false);
        navigate('/');
        localStorage.removeItem('loginUser')
    }

    return (
        <>
            <ToastContainer/>
            <Navbar fluid rounded bg-white className='top-0 z-10 sticky border-b border-gray-200 dark:border-gray-600'>
                <Navbar.Brand className='bg-white'>
                    <Link to="/">
                        <img src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg" className="mr-3 h-16 sm:h-16" alt="Flowbite React Logo" />
                    </Link>
                </Navbar.Brand>
                <div className="flex md:order-2">

                    {
                        isLogin
                            ?
                            <>
                                <Dropdown
                                    arrowIcon={false}
                                    inline
                                    label={
                                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" className='ms-3' rounded />
                                    }
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm">Bonnie Green</span>
                                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                                    </Dropdown.Header>
                                    <Dropdown.Item>Dashboard</Dropdown.Item>
                                    <Dropdown.Item>Settings</Dropdown.Item>
                                    <Dropdown.Item>Earnings</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={ logout }>Sign out</Dropdown.Item>
                                </Dropdown>
                                <Navbar.Toggle />
                            </>
                            :
                            <>
                                <Link to="/login">
                                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-3">Login</button>
                                </Link>

                                <Link to="/register">
                                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                                </Link>
                            </>

                    }
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/add-quiz" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add Quiz</Link>
                        </li>
                        <li>
                            <Link to="/view-quiz" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">View Quiz</Link>
                        </li>
                        <li>
                            <Link to="/play-quiz" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Play Quiz</Link>
                        </li>
                    </ul>
                </div>
            </Navbar>
        </>
    )
}
