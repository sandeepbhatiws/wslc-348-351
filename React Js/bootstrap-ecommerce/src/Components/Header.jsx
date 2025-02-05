import React from 'react'

export default function Header() {
    return (
        <>
            <div className='container-fluid bg-black text-white'>
                <div className='row'>
                    <div className='col-12'>
                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">
                                <img src='https://www.wscubetech.com/images/ws-cube-white-logo.svg'/>
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse justify-content-between navbar-collapse" id="navbarText">
                                <div className='d-flex justify-content-center m-auto'>
                                    <ul class="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                    <a class="nav-link text-white active" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li class="nav-item">
                                    <a class="nav-link text-white" href="#">Features</a>
                                    </li>
                                    <li class="nav-item">
                                    <a class="nav-link text-white" href="#">Pricing</a>
                                    </li>
                                </ul>
                                </div>
                            
                            <span class="navbar-text">
                            <button type="button" class="btn btn-primary position-relative">
                                View Cart
                                <span class="position-absolute top-0 start-100 translate-middle px-2 py-1 bg-danger border border-light rounded-circle">
                                    7
                                </span>
                                </button>
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
