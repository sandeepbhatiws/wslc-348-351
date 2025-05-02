import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/Sidebar'
import Header from '../../common/Header'
import Breadcrumb from '../../common/Breadcrumb'
import Footer from '../../common/Footer'
import { Link } from 'react-router-dom'
import { MdFilterAltOff, MdModeEdit } from 'react-icons/md'
import { FaFilter } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Pagination } from "flowbite-react";

export default function ViewMeterials() {
    let [activeFilter, setactiveFilter] = useState(true);
    let [filterName, setFilterName] = useState('');
    var [materails, setMaterials] = useState([]);
    let [checkBoxValues, setCheckBoxValues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [apiStatus, setApiStatus] = useState(true);

    const onPageChange = (page) => setCurrentPage(page);


    useEffect(() => {
        axios.post('http://localhost:5000/api/admin/materials/view', {
            name: filterName
        })
            .then((response) => {
                setMaterials(response.data._data);
                setTotalPages(response.data.total_pages);
            })
            .catch((error) => {
                toast.error('Something went wrong !!')
            });
    }, [filterName, apiStatus]);

    const filter = (event) => {
        setFilterName(event.target.value);
    }

    const selectCheckBox = (id) => {
        if (checkBoxValues.includes(id)) {
            var data = checkBoxValues.filter((v) => {
                if (v != id) {
                    return v;
                }
            })

            data = [...data];
            setCheckBoxValues(data);

        } else {
            var data = [...checkBoxValues, id];
            setCheckBoxValues(data);
        }
    }

    const selectAllCheckBox = (event) => {

        if (event.target.checked) {
            var data = materails.map((v) => {
                return v._id;
            })

            data = [...data];
            setCheckBoxValues(data);

        } else {
            setCheckBoxValues([]);
        }

    }

    const changeStatus = () => {
        if(checkBoxValues.length > 0){
            if(confirm('Are you sure you want to change status ?')){
                axios.post('http://localhost:5000/api/admin/materials/change-status', {
                    ids: checkBoxValues
                })
                .then((response) => {
                    setCheckBoxValues([]);
                    setApiStatus(!apiStatus)
                })
                .catch((error) => {
                    toast.error('Something went wrong !!')
                });
            }
        }
    }

    const deleteRecord = () => {
        if(checkBoxValues.length > 0){
            if(confirm('Are you sure you want to delete ?')){
                axios.post('http://localhost:5000/api/admin/materials/delete', {
                    ids: checkBoxValues
                })
                .then((response) => {
                    setCheckBoxValues([]);
                    setApiStatus(!apiStatus)
                })
                .catch((error) => {
                    toast.error('Something went wrong !!')
                });
            }
        }
    }

    return (
        <>
            <Breadcrumb path={"Material"} link={"/materials/view"} path2={"View"} slash={"/"} />
            <div className="w-full h-[610px]">
                <div className="max-w-[1220px] mx-auto py-2">

                    <div className={` rounded-lg border border-gray-300 px-5 py-5 max-w-[1220px] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>

                        <form className="flex max-w-sm">
                            <div className="relative w-full">
                                <input onKeyUp={filter}
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search Name"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>


                    </div>
                    <div className="w-full min-h-[610px]">
                        <div className="max-w-[1220px] mx-auto py-5">
                            <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
                                <h3 className="text-[26px] font-semibold" >
                                    View Material
                                </h3>
                                <div className='flex justify-between '>
                                    <div onClick={() => setactiveFilter(!activeFilter)} className="cursor-pointer mx-3 rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        {activeFilter ? <FaFilter className='text-[18px]' /> : <MdFilterAltOff className='text-[18px]' />}
                                    </div>

                                    <button type="button" onClick={ changeStatus } class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Change Status</button>
                                    <button type="button" onClick={ deleteRecord }  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete </button>
                                </div>
                            </div>
                            <div className="border border-t-0 rounded-b-md border-slate-400">

                                {/* border-2 border-[red] */}
                                <div className="relative overflow-x-auto">


                                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="p-4">
                                                        <div class="flex items-center">
                                                            <input id="checkbox-all-search"
                                                                onChange={selectAllCheckBox}
                                                                value={1}
                                                                checked={checkBoxValues.length == materails.length ? 'checked' : ''}
                                                                type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                                        </div>
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Material Name
                                                    </th>

                                                    <th scope="col" class=" w-[12%] ">
                                                        Order
                                                    </th>
                                                    <th scope="col" class="w-[11%]">
                                                        Status
                                                    </th>
                                                    <th scope="col" class="w-[6%]">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    (materails.length > 0)
                                                        ?
                                                        materails.map((v, i) => {
                                                            return (
                                                                <tr key={i} class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                    <td class="w-4 p-4">
                                                                        <div class="flex items-center">
                                                                            <input onClick={() => selectCheckBox(v._id)}

                                                                                checked={checkBoxValues.includes(v._id) ? 'checked' : ''}


                                                                                id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                                                        </div>
                                                                    </td>
                                                                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                                                                        <div class="py-4">
                                                                            <div class="text-base font-semibold">{v.name}</div>

                                                                        </div>
                                                                    </th>

                                                                    <td class="px-6 py-4">
                                                                        {v.order}
                                                                    </td>
                                                                    <td class=" py-4">

                                                                        {
                                                                            v.status
                                                                                ?
                                                                                <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Active</button>
                                                                                :
                                                                                <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Deactive</button>
                                                                        }




                                                                    </td>
                                                                    <td class=" py-4">

                                                                        <Link to={`/material/update/${v._id}`} >
                                                                            <div className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                                <MdModeEdit className='text-[18px]' />
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })

                                                        :

                                                        <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td class="px-6 py-4 text-center" colSpan={5}>
                                                                <b>No Record Found !!</b>
                                                            </td>
                                                        </tr>

                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                </div>



                            </div>

                            {
                                totalPages > 1
                                    ?
                                    <div className="flex overflow-x-auto sm:justify-center">
                                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                                    </div>
                                    :
                                    ''
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
