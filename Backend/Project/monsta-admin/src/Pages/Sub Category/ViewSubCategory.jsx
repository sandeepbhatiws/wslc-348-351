import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, MdModeEditOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import axios, { toFormData } from 'axios'
import { toast } from 'react-toastify'
import { Pagination } from "flowbite-react";

export default function ViewCategory() {

  let [activeFilter, setactiveFilter] = useState(true);
  let [filterName, setFilterName] = useState('');
  let [filterParentCategory, setFilterParentCategory] = useState('');
  var [categories, setCategories] = useState([]);
  let [checkBoxValues, setCheckBoxValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiStatus, setApiStatus] = useState(true);
  const [imagePath, setImagePath] = useState('');
  const [parentCategories, setParentCategories] = useState([]);

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    var filterData = {
      limit: 1000,
    };

    axios.post('http://localhost:5000/api/admin/parent-categories/view', toFormData(filterData))
      .then((result) => {
        if (result.data._status) {
          setParentCategories(result.data._data);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong !!')
      })
  }, []);

  useEffect(() => {
    axios.post('http://localhost:5000/api/admin/sub-categories/view', {
      name: filterName,
      parent_category_id : filterParentCategory
    })
      .then((response) => {
        setCategories(response.data._data);
        setImagePath(response.data.image_path);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        toast.error('Something went wrong !!')
      });
  }, [filterName, apiStatus, filterParentCategory]);

  const filter = (event) => {
    setFilterName(event.target.value);
  }

  const filterCategory = (event) => {
    setFilterParentCategory(event.target.value);
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
      var data = categories.map((v) => {
        return v._id;
      })

      data = [...data];
      setCheckBoxValues(data);

    } else {
      setCheckBoxValues([]);
    }

  }

  const changeStatus = () => {
    if (checkBoxValues.length > 0) {
      if (confirm('Are you sure you want to change status ?')) {
        axios.post('http://localhost:5000/api/admin/sub-categories/change-status', {
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
    if (checkBoxValues.length > 0) {
      if (confirm('Are you sure you want to delete ?')) {
        axios.post('http://localhost:5000/api/admin/sub-categories/delete', {
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
    <section className="w-full">

      <Breadcrumb path={"Sub Category"} link={'/category/sub-category/view'} path2={"View"} slash={"/"} />

      <div className={`rounded-lg border border-gray-300 px-5 py-5 max-w-[1220px] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>

        <form className="grid grid-cols-[40%_35%_5%] gap-[1%] items-center ">
          <div className="">

            <select onChange={ filterCategory }
              name="parentCatSelectBox"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
            >
              <option value="">Select Parent Category</option>
              {
                  parentCategories.map((v, i) => {
                    return (
                      <option value={v._id}>{v.name}</option>
                    )
                  })
                }
            </select>
          </div>
          <div className="">
            <input
              type="text" onKeyUp={filter}
              id="simple-search"
              className="border  border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-3"
              placeholder="Search  name..."
              required
            />
          </div>
          {/* <div className=''>
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
          </div> */}



        </form>


      </div>
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
            <h3 className="text-[26px] font-semibold" >
              View Sub Category
            </h3>
            <div className='flex justify-between '>
              <div onClick={() => setactiveFilter(!activeFilter)} className="cursor-pointer text-[white] mx-3 rounded-[50%] w-[40px] h-[40px]  mx-3 rounded-[50%] w-[40px] h-[40px] flex items-center justify-center  text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {activeFilter ? <FaFilter className='text-[18px]' /> : <MdFilterAltOff className='text-[18px]' />}
              </div>

              <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Change Status</button>
              <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete </button>
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
                          <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Parent Category Name
                      </th>
                      <th scope="col" class="px-0 py-3">
                        Sub Category Name
                      </th>
                      <th scope="col" class=" w-[12%] ">
                        Image
                      </th>
                      <th scope="col" class=" w-[10%] ">
                        Order
                      </th>
                      <th scope="col" class="w-[10%]  ">
                        Status
                      </th>
                      <th scope="col" class="w-[6%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      (categories.length > 0)
                        ?
                        categories.map((v, i) => {
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
                              <td class="px-6 py-4">{
                                (v.parent_category_id.name)
                                ?
                                v.parent_category_id.name
                                :
                                'N/A'
                              }
                              </td>
                              <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

                                <div class="py-4">
                                  <div class="text-base font-semibold">{v.name}</div>

                                </div>
                              </th>
                              <td class="px-6 py-4">
                                {
                                  (v.image)
                                    ?
                                    <img src={imagePath + v.image} width={40} />
                                    :
                                    'N/A'
                                }
                              </td>
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

                                <Link to={`/category/sub-category/update/${v._id}`} >
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
        </div>
      </div>



    </section>
  )
}
