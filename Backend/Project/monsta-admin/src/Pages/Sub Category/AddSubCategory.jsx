import React, { useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import Breadcrumb from "../../common/Breadcrumb";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios, { toFormData } from "axios";
import { toast } from "react-toastify";

export default function AddSubCategory() {

  const [imagePath, setImagePath] = useState('');
  const [imageValue, setImageValue] = useState('');
  const [parentCategories, setParentCategories] = useState([]);
  const [updateIdState, setUpdateIdState] = useState(false)
  const [categoryDetails, setCategoryDetails] = useState('');

  const navigate = useNavigate();

  // Update Record
  let updateId = useParams().id
  useEffect(() => {
    if (updateId == undefined) {
      setUpdateIdState(false)
    } else {
      setUpdateIdState(true)

      axios.post(`http://localhost:5000/api/admin/sub-categories/details/${ updateId }`)
      .then((response) => {
        if(response.data._status == true){
          setCategoryDetails(response.data._data);
          setValue('name', response.data._data.name);
          setValue('order', response.data._data.order);
          setValue('parent_category_id', response.data._data.parent_category_id);
          setImagePath(response.data.image_path+response.data._data.image);
        } else {
          toast.error(response.data._message);
        }        
      })
      .catch((error) => {
          toast.error('Something went wrong !!')
      });
    }
  }, [updateId])

  // View Parent Categories
  useEffect(() => {
    var filterData = {
      limit: 1000,
      status: 1,
      parent_category_id : categoryDetails.parent_category_id
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
  }, [categoryDetails]);

  //Dropify Method
  useEffect(() => {

    const dropifyElement = $("#categoryImage");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="categoryImage"
        class="dropify" data-height="250" data-default-file="${imagePath}"/>`
    );

    // **Reinitialize Dropify**
    $("#categoryImage").dropify();

    // **Update React Hook Form when File Changes**
    $("#categoryImage").on("change", function (event) {

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


  // Form Sumbit
  const onSubmit = (data) => {
    if (imageValue) {
      data.image = imageValue;
    }

    if(updateIdState){
      axios.put(`http://localhost:5000/api/admin/sub-categories/update/${updateId}`, toFormData(data))
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
      axios.post('http://localhost:5000/api/admin/sub-categories/create', toFormData(data))
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
    }
  };

  const selectCategory = (event) => {
    setValue('parent_category_id', event.target.value)
  }

  return (
    <section className="w-full">
      <Breadcrumb path={"Sub Category"} link={'/category/sub-category/view'} path2={"Add"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Sub Category
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label
                  htmlFor="categoryImage"
                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="categoryImage"
                  className="dropify"
                  data-height="230"
                />
                {errors.categoryImage && <p className="text-red-500">{errors.categoryImage.message}</p>}
              </div>

              <div className="w-2/3">
                {/* Parent Category Dropdown */}
                <div className="mb-5">
                  <label className="block  text-md font-medium text-gray-900">
                    Parent Category Name
                  </label>
                  <select
                    {...register("parent_category_id", { required: "Select Category is required" })}
                    name="parentCatSelectBox"
                    onChange={selectCategory}
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {
                      parentCategories.map((v, i) => {
                        return (
                          <option value={v._id}  selected={ (categoryDetails.parent_category_id == v._id) ? 'selected' : '' }  >{v.name}</option>
                        )
                      })
                    }
                  </select>
                  {errors.parent_category_id && <p className="text-red-500">{errors.parent_category_id.message}</p>}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Category name is required" })}
                    id="categoryName"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="text"
                    {...register("order", { required: "Category Order is required" })}
                    id="categoryName"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Order"
                  />
                  {errors.order && <p className="text-red-500">{errors.order.message}</p>}
                </div>

              </div>


            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateIdState ? "Update Sub Category" : "Add Sub Category"}
            </button>
          </form>


        </div>
      </div>
    </section>
  );
}
