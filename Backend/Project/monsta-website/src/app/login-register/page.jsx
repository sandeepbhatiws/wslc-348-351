"use client";
import React, { useEffect } from 'react'
import "./login-register.css"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import axios, { toFormData } from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginRegister } from '../ReduxToolkit/loginSlice';

export default function page() {

    const router = useRouter();
    const dispatch = useDispatch();
    let userToken = useSelector((state) => state.login.token)

    const loginUser = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/api/website/users/login', event.target)
            .then((result) => {
                if (result.data._status) {
                    toast.success(result.data._message);
                    dispatch(loginRegister({ user_token: result.data._token, user_name: result.data._data.name }))
                    router.push('/my-dashboard');
                } else {
                    toast.error(result.data._message);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong !!');
            });

        // Cookies.set('user_token', 123456789);
        // router.push('/my-dashboard');
    }

    const userRegister = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/api/website/users/register', event.target)
            .then((result) => {
                if (result.data._status) {
                    toast.success(result.data._message);
                    dispatch(loginRegister({ user_token: result.data._token, user_name: result.data._data.name }))
                    router.push('/my-dashboard');
                } else {
                    toast.error(result.data._message);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong !!');
            });

        // Cookies.set('user_token', 123456789);
        // router.push('/my-dashboard');
    }

    useEffect(() => {
        var getCookies = Cookies.get('user_token');
        if (getCookies) {
            router.push('/my-dashboard');
        }
    }, []);


    return (
        <div>

            <div className="breadcrumbs_area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb_content">
                                <h3>My account</h3>
                                <ul>
                                    <li><a href="index.html">home</a></li>
                                    <li> {">"}</li>
                                    <li>My account</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="customer_login">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-md-6">
                            <div className="account_form">
                                <h2>login</h2>
                                <form onSubmit={loginUser}>
                                    <p>
                                        <label>Username or email <span>*</span></label>
                                        <input type="text" name='email' />
                                    </p>
                                    <p>
                                        <label>Passwords <span>*</span></label>
                                        <input type="password" name='password' />
                                    </p>
                                    <div className="login_submit">
                                        <a href="#">Lost your password?</a>
                                        <label htmlFor="remember">
                                            <input id="remember" type="checkbox" />
                                            Remember me
                                        </label>
                                        <button type="submit">login</button>

                                    </div>

                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="account_form register">
                                <h2>Register</h2>
                                <form onSubmit={userRegister}>
                                    <p>
                                        <label>Name <span>*</span></label>
                                        <input type="text" name='name' />
                                    </p>
                                    <p>
                                        <label>Email address  <span>*</span></label>
                                        <input type="text" name='email' />
                                    </p>
                                    <p>
                                        <label>Passwords <span>*</span></label>
                                        <input type="password" name='password' />
                                    </p>
                                    <div className="login_submit">
                                        <button type="submit">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
