import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { CartContext } from '../Context API/CommonContext';

export default function Header() {

    const [categories, setCategories] = useState([]);

    const { cartItems } = useContext(CartContext);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/categories.php')
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch((error) => {
                toast.error('Something went Wrong !!');
            })
    }, []);

    return (
        <>
            <ToastContainer />
            <div className='container-fluid header bg-black text-white position-sticky top-0 z-3'>
                <div className='row'>
                    <div className='col-12'>
                        <nav class="navbar navbar-expand-lg">
                            <div class="container-fluid">
                                <Link class="navbar-brand" to="/">
                                    <img src='https://www.wscubetech.com/images/ws-cube-white-logo.svg' />
                                </Link>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse justify-content-between navbar-collapse" id="navbarText">
                                    <div className='d-flex justify-content-center m-auto'>
                                        <ul class="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">

                                            {
                                                (categories.length > 0)
                                                    ?
                                                    <li class="nav-item">
                                                        <Link class="nav-link text-white active" aria-current="page" to="/">Home</Link>
                                                    </li>
                                                    :
                                                    ''
                                            }


                                            {
                                                categories.map((v, i) => {
                                                    return (
                                                        (i < 6)
                                                            ?
                                                            <li class="nav-item px-3" key={i}>
                                                                <Link class="nav-link text-white" to={`/categories/${v.slug}`}>{v.name}</Link>
                                                            </li>
                                                            :
                                                            ''
                                                    )
                                                })
                                            }

                                            {
                                                (categories.length > 0)
                                                    ?
                                                    <li class="nav-item">
                                                        <Link class="nav-link text-white" to="/categories">See All</Link>
                                                    </li>
                                                    :
                                                    ''
                                            }



                                        </ul>
                                    </div>

                                    <span class="navbar-text">
                                        <Link to="/view-cart">
                                            <button type="button" class="btn btn-primary position-relative">
                                                View Cart
                                                <span class="position-absolute top-0 start-100 translate-middle px-1 py-0 bg-danger border border-light rounded-circle">
                                                    {cartItems.length}
                                                </span>
                                            </button>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}
