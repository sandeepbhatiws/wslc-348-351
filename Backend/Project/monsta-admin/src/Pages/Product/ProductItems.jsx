import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";

export default function ProductItems() {
  let [orderModal, setOrderModal] = useState(false);

  let [activeFilter, setactiveFilter] = useState(true);
  let [filterName, setFilterName] = useState('');
  var [products, setProducts] = useState([]);
  let [checkBoxValues, setCheckBoxValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiStatus, setApiStatus] = useState(true);
  const [imagePath, setImagePath] = useState('');

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    axios.post('http://localhost:5000/api/admin/products/view', {
      name: filterName
    })
      .then((response) => {
        setProducts(response.data._data);
        setImagePath(response.data.image_path);
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
      var data = products.map((v) => {
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
        axios.post('http://localhost:5000/api/admin/products/change-status', {
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
        axios.post('http://localhost:5000/api/admin/products/delete', {
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
      {/* Order Modal Start */}
      <div
        id="order-modal"
        className={`${orderModal === true ? `block` : `hidden`
          }  block overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div
          className="fixed w-full h-screen "
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="relative p-4 px-20 w-full max-w-full max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900">
                  Product Image's & Price
                </h3>
                <button
                  onClick={() => setOrderModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="order-modal"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div className="grid grid-cols-[22%_45%_27%] gap-10">
                  <div className="border-2 rounded-md shadow-md p-4">
                    <img
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/902af913-69be-4024-b22c-cd573b7dd13b1613028902744-Roadster-Men-Tshirts-9521613028900435-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex items-start flex-wrap gap-5 border-2 rounded-md shadow-md p-3">
                    <img
                      className="w-36"
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/7f8383cc-07f5-4714-b451-fba7d49776921613028902727-Roadster-Men-Tshirts-9521613028900435-2.jpg"
                      alt=""
                    />
                    <img
                      className="w-36"
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/5d8249b2-cbfa-42a3-9b8a-9406fcb8af0c1613028902710-Roadster-Men-Tshirts-9521613028900435-3.jpg"
                      alt=""
                    />
                    <img
                      className="w-36"
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/bf9e30b3-5b8e-4cf1-811b-81ea64d45ed81613028902692-Roadster-Men-Tshirts-9521613028900435-4.jpg"
                      alt=""
                    />
                    <img
                      className="w-36"
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/77451543-64cb-4294-8f82-24ac1d78dcf01613028902666-Roadster-Men-Tshirts-9521613028900435-5.jpg"
                      alt=""
                    />
                  </div>
                  <div className="border-2 rounded-md shadow-md p-3">
                    <h3 className="text-center font-semibold text-[20px]">
                      Product Details
                    </h3>
                    <ul className="space-y-4 mt-8">
                      <li className="font-semibold text-[17px]">
                        Price :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; ₹ 1500
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        MRP :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; ₹ 3000
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        Manage Stock :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; In Stock
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        Brand Name:{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; Lev's
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        Size :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; Xl{" "}
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        Color :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; Red{" "}
                        </span>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Order Modal End */}

      <Breadcrumb path={"Product"} path2={"Product Items"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Product Items
          </h3>
          <div className="border border-t-0 rounded-b-md border-slate-400">
            <div className="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="p-4">
                      <div class="flex items-center">
                        <input id="checkbox-all-search"
                          onChange={selectAllCheckBox}
                          value={1}
                          checked={checkBoxValues.length == products.length ? 'checked' : ''}
                          type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                      </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Product Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Parent Category Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Actual Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Sale Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Image
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
                    (products.length > 0)
                      ?
                      products.map((v, i) => {
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
                            <td class="px-6 py-4">
                                <div class="text-base font-semibold">{v.name}</div>
                            </td>
                            <td class="px-6 py-4">
                              {
                                v.parent_category_id.name 
                                ?
                                v.parent_category_id.name
                                :
                                'N/A'
                              } 
                            </td>
                            <td class="px-6 py-4"> { v.actual_price }</td>
                            <td class="px-6 py-4"> { v.sale_price }</td>
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

                              <Link to={`/product/update/${v._id}`} >
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
                        <td class="px-6 py-4 text-center" colSpan={9}>
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
    </section>
  );
}
