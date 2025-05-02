import React, { useEffect, useState } from 'react'
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios, { toFormData } from 'axios';
import { toast } from 'react-toastify';

export default function ProductDetails() {

  const [imagePath, setImagePath] = useState('');
  const [imageValue, setImageValue] = useState('');
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [colors, setColors] = useState([]);
  const [updateIdState, setUpdateIdState] = useState(false)
  const [productDetails, setProductDetails] = useState('');
  const [description, setDescriptionData] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');


  const setDescription = (event) => {
    setDescriptionData(event.target.value)
  }

  // View Parent Categories
  useEffect(() => {
    var filterData = {
      limit: 1000,
      status: 1,
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

  // View Sub Categories
    useEffect(() => {
      var filterData = {
        limit: 1000,
        status: 1,
        parent_category_id : parentCategoryId
      };
  
      axios.post('http://localhost:5000/api/admin/sub-categories/view', toFormData(filterData))
        .then((result) => {
          if (result.data._status) {
            setSubCategories(result.data._data);
          } else {
            setSubCategories([])
          }
        })
        .catch((error) => {
          toast.error('Something went wrong !!')
        })
    }, [parentCategoryId]);

    // View Materials
  useEffect(() => {
    var filterData = {
      limit: 1000,
      status: 1,
    };

    axios.post('http://localhost:5000/api/admin/materials/view', toFormData(filterData))
      .then((result) => {
        if (result.data._status) {
          setMaterials(result.data._data);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong !!')
      })
  }, []);

  // View Colors
  useEffect(() => {
    var filterData = {
      limit: 1000,
      status: 1,
    };

    axios.post('http://localhost:5000/api/admin/colors/view', toFormData(filterData))
      .then((result) => {
        if (result.data._status) {
          setColors(result.data._data);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong !!')
      })
  }, []);

  const navigate = useNavigate();

  // Update Record
  let updateId = useParams().id
  useEffect(() => {
    if (updateId == undefined) {
      setUpdateIdState(false)
    } else {
      setUpdateIdState(true)

      axios.post(`http://localhost:5000/api/admin/products/details/${updateId}`)
        .then((response) => {
          if (response.data._status == true) {
            setProductDetails(response.data._data);
            setValue('name', response.data._data.name);
            setValue('order', response.data._data.order);
            setValue('parent_category_id', response.data._data.parent_category_id);
            setImagePath(response.data.image_path + response.data._data.image);
          } else {
            toast.error(response.data._message);
          }
        })
        .catch((error) => {
          toast.error('Something went wrong !!')
        });
    }
  }, [updateId])



  //Dropify Method
  useEffect(() => {

    const dropifyElement = $(".dropify");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="image"
        class="dropify" data-height="250" data-default-file="${imagePath}"/>`
    );

    // **Reinitialize Dropify**
    $(".dropify").dropify();

    // **Update React Hook Form when File Changes**
    $("#image").on("change", function (event) {

      if (event.target.files.length > 0) {
        setImageValue(event.target.files[0]); // ✅ Sync React Hook Form
      }
    });

  }, [imagePath]);


  // Form Validation
    const {
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm();


  const onSubmit = (data) => {

    if (imageValue) {
      data.image = imageValue;
    }

    if(updateIdState){
      axios.put(`http://localhost:5000/api/admin/products/update/${updateId}`, toFormData(data))
    .then((response) => {
      if(response.data._status == true){
        toast.success(response.data._message);
        navigate('/category/sub-category/view');
      } else {
        toast.error(response.data._message);
      }        
    })
    .catch((error) => {
        toast.error('Something went wrong !!')
    });
    } else {
      axios.post('http://localhost:5000/api/admin/products/create', toFormData(data))
      .then((response) => {
        if(response.data._status == true){
          toast.success(response.data._message);
          navigate('/product/view');
        } else {
          toast.error(response.data._message);
        }        
      })
      .catch((error) => {
          toast.error('Something went wrong !!')
      });
    }

    console.log("Form Data:", data);
    // alert("Product Created Successfully!");
  };

  const getParentCategory = (data) => {
    // console.log('Hello');
    console.log(data.target.value);
    setParentCategoryId(data.target.value)
  }

  return (
    <section className="w-full">

      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link to={"/home"} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              /
              <Link to={"/product/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Product</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{updateIdState ? "Update" : "Add"}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className='w-full px-6 py-6  '>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-[10px] ">
            {/* for left */}
            <div className="for-images ">

              <div className="">
                <label
                  htmlFor="ProductImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="image"
                  className="dropify"
                  data-height="160"
                  // {...register("productImage", { required: "Product Image is required" })}
                />
                {errors.productImage && <p className="text-red-500 text-sm">{errors.productImage.message}</p>}


              </div>

              <div className="">
                <label
                  htmlFor="backImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Back Image
                </label>
                <input
                  type="file"
                  id="image"
                  className="dropify"
                  data-height="160"
                  // {...register("backImage", { required: "Back Image is required" })}
                />
                {errors.backImage && <p className="text-red-500 text-sm">{errors.backImage.message}</p>}
              </div>

              <div className="">
                <label
                  htmlFor="GalleryImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Gallery Image
                </label>
                <input
                  type="file"
                  id="image"
                  className="dropify"
                  data-height="160"
                  // {...register("GalleryImage", { required: "Gallery Image is required" })}
                />
                {errors.GalleryImage && <p className="text-red-500 text-sm">{errors.GalleryImage.message}</p>}
              </div>
            </div>

            {/* for midd */}
            <div className="middle">

              <div className="mb-5">
                <label
                  htmlFor="Prodct_Name"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Prodct Name
                </label>
                <input
                  type="text"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Prodct Name'
                  {...register("name", { required: "Prodct Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Category
                </label>
                <select
                  {...register("sub_category_id", { required: "Sub Category is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Category</option>
                  { 
                    subCategories.map((v,i) => {
                      return(
                        <option value={v._id}> {v.name}</option>
                      )
                    })
                  }

                </select>
                {errors.sub_category_id && <p className="text-red-500 text-sm">{errors.sub_category_id.message}</p>}

              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Meterial
                </label>
                <select multiple="multiple"
                  {...register("material_id", { required: "Meterial is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  { 
                    materials.map((v,i) => {
                      return(
                        <option value={v._id}> {v.name}</option>
                      )
                    })
                  }

                </select>
                {errors.material_id && <p className="text-red-500 text-sm">{errors.material_id.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Prodcut Type
                </label>
                <select
                  // {...register("Prodcut_Type", { required: "Prodcut Type is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Featured</option>
                  <option value="">New Arrivals</option>
                  <option value="">Onsale</option>


                </select>
                {errors.Prodcut_Type && <p className="text-red-500 text-sm">{errors.Prodcut_Type.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Top Rated
                </label>
                <select
                  // {...register("Rated", { required: "Top Rated is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Yes</option>
                  <option value="">No</option>

                </select>
                {errors.Rated && <p className="text-red-500 text-sm">{errors.Rated.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Actual Price
                </label>
                <input
                  type="text"
                  {...register("actual_price", { required: " Actual Price is required" })}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Actual Price'
                />
                {errors.actual_price && <p className="text-red-500 text-sm">{errors.actual_price.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Total In Stocks
                </label>
                <input
                  type="text"
                  // {...register("Stocks", { required: "Stocks is required" })}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Total In Stocks'
                />
                {errors.Stocks && <p className="text-red-500 text-sm">{errors.Stocks.message}</p>}
              </div>

            </div>

            {/* for right */}
            <div className="right-items">
              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Parent Category
                </label>
                <select {...register("parent_category_id", { required: "Parent Category is required" })} 
                onChange={ getParentCategory } name='parent_category_id'
                  // 
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Parent Category</option>

                  { 
                    parentCategories.map((v,i) => {
                      return(
                        <option value={v._id}> {v.name}</option>
                      )
                    })
                  }
                </select>
                {errors.parent_category_id && <p className="text-red-500 text-sm">{errors.parent_category_id.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Sub Category
                </label>
                <select multiple="multiple"
                  // {...register("sub_sub_category_id", { required: "Sub Sub Category is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>

                  <option value="mobile">Mobile Phones</option>
                  <option value="laptop">Laptops</option>

                  <option value="men">Men's Wear</option>
                  <option value="women">Women's Wear</option>

                </select>
                {errors.Sub_Sub_Category && <p className="text-red-500 text-sm">{errors.Sub_Sub_Category.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Color
                </label>
                <select multiple="multiple"
                  {...register("color_id", { required: "Color is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">

                  { 
                    colors.map((v,i) => {
                      return(
                        <option value={v._id}> {v.name}</option>
                      )
                    })
                  }

                </select>
                {errors.color_id && <p className="text-red-500 text-sm">{errors.color_id.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Best Selling
                </label>
                <select
                  // {...register("Selling", { required: " Best Selling is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Yes</option>
                  <option value="">No</option>

                </select>
                {errors.Selling && <p className="text-red-500 text-sm">{errors.Selling.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Upsell
                </label>
                <select
                  // {...register("Upsell", { required: "Upsell is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Yes</option>
                  <option value="">No</option>

                </select>
                {errors.Upsell && <p className="text-red-500 text-sm">{errors.Upsell.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Sale Price
                </label>
                <input
                  type="text"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder=' Sale Price'
                  {...register("sale_price", { required: "Sale Price is required" })}
                />
                {errors.sale_price && <p className="text-red-500 text-sm">{errors.sale_price.message}</p>}
              </div>


              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Order
                </label>
                <input
                  type="text"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Order'
                  {...register("order", { required: " Order is required" })}
                />
                {errors.order && <p className="text-red-500 text-sm">{errors.order.message}</p>}
              </div>


            </div>
          </div>

          <div className='py-[40px]'>
            <label
              htmlFor="categoryImage"
              className="block  text-md font-medium text-gray-900 text-[#76838f]"
            >
              Description
            </label>
            <ReactQuill theme="snow" value={description} onChange={setDescription} className='h-[200px]' 
            // {...register("description", { required: "Description is required" })} 
            />

          </div>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <button class=" mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
            {updateIdState ? "Update Product " : "Add Product"}
          </button>

        </form>

      </div>
    </section>
  )
}

