import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

export default function ProductListing() {

    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [sorting, setSorting] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [categoryData, setCategoryData] = useState([]);


    var [currentPage, setCurrentPage] = useState(1);
    var [totalPages, setTotalPages] = useState('');

    var [totalPagination, setTotalPagination] = useState([]);

    useEffect(() => {
        if(totalPages!= ''){
            var data = [];
            for(var i = 1; i <= totalPages; i++){
                data.push(i);
            }
            setTotalPagination(data);
            // console.log(data);
        }

    },[totalPages]);


    useEffect(() => {
        if (params.slug != undefined) {
            setCategoryData([params.slug]);
        } else {
            setCategoryData([]);
        }
        setCurrentPage(1)
    }, [params.slug])

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/categories.php')
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch((error) => {
                toast.error('Something went wrong.')
            });
    }, [])

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/brands.php')
            .then((response) => {
                setBrands(response.data.data);
            })
            .catch((error) => {
                toast.error('Something went wrong.')
            });
    }, [])

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/products.php', {
            params: {
                page: currentPage,
                limit: 15,
                sorting: sorting,
                name: '',
                price_from: priceFrom,
                price_to: priceTo,
                discount_from: '',
                discount_to: '',
                rating: '',
                brands: '',
                categories: (categoryData.length > 0) ? categoryData.toString() : (params.slug != undefined) ? params.slug : '',

            }
        })
            .then((response) => {
                setProducts(response.data.data);
                setTotalPages(response.data.toal_pages);
            })
            .catch((error) => {
                toast.error('Something went wrong.')
            });
    }, [params.slug, sorting, priceFrom, categoryData, currentPage])

    const filterCategory = (slug) => {

        if (categoryData.includes(slug)) {
            const data = categoryData.filter((v, i) => {
                if (v != slug) {
                    return v;
                }
            })
            setCategoryData([...data])

        } else {
            setCategoryData([...categoryData, slug])
        }

        setCurrentPage(1)

    }

    const filterSorting = (value) => {
        setSorting(value);
        setCurrentPage(1)
    }

    const filterPrice = (from, to) => {
        setPriceFrom(from);
        setPriceTo(to);
        setCurrentPage(1)
    }

    const pagination = (page) => {
        setCurrentPage(page);
    }

    const paginationPrev = () => {
        if(currentPage > 1){
            currentPage--;
            setCurrentPage(currentPage);
        }
    }

    const paginationNext = () => {
        if(currentPage < totalPages){
            currentPage++;
            setCurrentPage(currentPage);
        }
    }

    return (
        <>
            {/* <Header /> */}
            <div class="search-section">
                <div class="container-fluid container-xl">
                    <div class="row main-content ml-md-0">
                        <div class="sidebar col-md-3 px-0">
                            <h1 class="border-bottom filter-header d-flex d-md-none p-3 mb-0 align-items-center">
                                <span class="mr-2 filter-close-btn">
                                    X
                                </span>
                                Filters
                                <span class="ml-auto text-uppercase">Reset Filters</span>
                            </h1>
                            <div class="sidebar__inner ">
                                <div class="filter-body">
                                    <div>
                                        <h2 class="border-bottom filter-title">All Categories</h2>
                                        <div class="mb-30 filter-options">
                                            {
                                                categories.map((v, i) => {
                                                    return (
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox"
                                                                onClick={() => filterCategory(v.slug)}
                                                                class="custom-control-input" id={v.slug} checked={(categoryData.includes(v.slug)) ? 'checked' : ''} />
                                                            <label class="ps-2 custom-control-label" for={v.slug}>{v.name}</label>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                        {/* <!--seating option end--> */}
                                        <h2 class="font-xbold body-font border-bottom filter-title">All Brands</h2>
                                        <div class="mb-3 filter-options" id="cusine-options">
                                            {
                                                brands.map((v, i) => {
                                                    return (
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox" class="custom-control-input" id={v.slug} />
                                                            <label class="ps-2 custom-control-label" for={v.slug}>{v.name}</label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        {/* <!-- cusine filters end --> */}

                                        <h2 class="border-bottom filter-title">Pricing</h2>
                                        <div class="mb-3 filter-options" id="services-options">
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" name='price' class="custom-control-input" id="0-1000" onClick={() => filterPrice(0, 1000)} />
                                                <label class="ps-2 custom-control-label" for="0-1000">Rs.0 - Rs. 1000</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" name='price' class="custom-control-input" id="1000-3000" onClick={() => filterPrice(1000, 3000)} />
                                                <label class="ps-2 custom-control-label" for="1000-3000">Rs.1000 - Rs. 3000</label>
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input type="radio" name='price' class="custom-control-input" id="3000-100000" onClick={() => filterPrice(3000, 100000)} />
                                                <label class="ps-2 custom-control-label" for="3000-100000">Rs.3000 - Rs. 100000</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content col-md-9">
                            <div class="d-flex justify-content-between border-bottom align-items-center">
                                <h2 class="title">Products</h2>
                                <div class="filters-actions">
                                    <div>
                                        <button class="btn filter-btn d-md-none"><svg xmlns="http://www.w3.org/2000/svg" class="mr-2" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" /></svg>
                                            Filter</button>
                                    </div>
                                    <div class="d-flex align-items-center">

                                        <div class="btn-group">
                                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                                Sorting By
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-lg-end">
                                                <li onClick={() => filterSorting(1)}>
                                                    <a class={(sorting == 1) ? 'dropdown-item active' : "dropdown-item"}>Name ASC</a>
                                                </li>
                                                <li onClick={() => filterSorting(2)}>
                                                    <a class={(sorting == 2) ? 'dropdown-item active' : "dropdown-item"}>Name DESC</a>
                                                </li>
                                                <li onClick={() => filterSorting(3)}>
                                                    <a class={(sorting == 3) ? 'dropdown-item active' : "dropdown-item"}>Price ASC</a>
                                                </li>
                                                <li onClick={() => filterSorting(4)}>
                                                    <a class={(sorting == 4) ? 'dropdown-item active' : "dropdown-item"}>Price DESC</a>
                                                </li>
                                                <li onClick={() => filterSorting(5)}>
                                                    <a class={(sorting == 5) ? 'dropdown-item active' : "dropdown-item"}>Discount ASC</a>
                                                </li>
                                                <li onClick={() => filterSorting(6)}>
                                                    <a class={(sorting == 6) ? 'dropdown-item active' : "dropdown-item"}>Discount DESC</a>
                                                </li>
                                                <li onClick={() => filterSorting(7)}>
                                                    <a class={(sorting == 7) ? 'dropdown-item active' : "dropdown-item"}>Rating Low to High</a>
                                                </li>
                                                <li onClick={() => filterSorting(8)}>
                                                    <a class={(sorting == 8) ? 'dropdown-item active' : "dropdown-item"}>Rating High to Low</a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="row row-grid">

                                {
                                    products.map((v, i) => {
                                        return (
                                            <ProductCard key={i} data={v} pageName="catolag" />
                                        )
                                    })
                                }

                                <div className='col-12 mt-5'>
                                    <Pagination className='mx-auto text-center justify-content-center'>
                                        <Pagination.Prev onClick={ paginationPrev }/>
                                            
                                            {
                                                totalPagination.map((v,i) => {
                                                    return(
                                                        <Pagination.Item onClick={ () => pagination(v) } className={ (currentPage == v) ? 'active' : '' }   >{v}</Pagination.Item>
                                                    )
                                                })
                                            }                                            


                                        <Pagination.Next onClick={ paginationNext }/>
                                    </Pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
