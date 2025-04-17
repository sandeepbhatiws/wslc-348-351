import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../common/Breadcrumb";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { Link,useNavigate, useParams } from "react-router-dom";
import axios, { toFormData } from "axios";
import { toast } from "react-toastify";

export default function AddCategory() {
  const [imagePath,  setImagePath] = useState('');
  const [imageValue,  setImageValue] = useState('');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  useEffect(() => {
    // $(".dropify").dropify({
    //   messages: {
    //     default: "Drag and drop ",
    //     replace: "Drag and drop ",
    //     remove: "Remove",
    //     error: "Oops, something went wrong"
    //   }
    // });

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
        console.log(event.target.files[0]);
        setImageValue(event.target.files[0]); // ✅ Sync React Hook Form
      }
    });


  }, [imagePath]);

  const navigate = useNavigate();
  const [categoryDetails, setCategoryDetails] = useState('');
  // const [imagePath,  setImagePath] = useState('');

  

  const onSubmit = (data) => {

    if(imageValue){
      data.image = imageValue
    }

    console.log(data);

    if(updateIdState){
      axios.put(`http://localhost:5000/api/admin/parent-categories/update/${updateId}`, toFormData(data))
    .then((response) => {
      if(response.data._status == true){
        toast.success(response.data._message);
        navigate('/category/view');
      } else {
        toast.error(response.data._message);
      }        
    })
    .catch((error) => {
        toast.error('Something went wrong !!')
    });
    } else {
      axios.post('http://localhost:5000/api/admin/parent-categories/create', toFormData(data))
      .then((response) => {
        if(response.data._status == true){
          toast.success(response.data._message);
          navigate('/category/view');
        } else {
          toast.error(response.data._message);
        }        
      })
      .catch((error) => {
          toast.error('Something went wrong !!')
      });
    }
  };

  // update work
  const [updateIdState, setUpdateIdState] = useState(false)
  let updateId=useParams().id
  useEffect(()=>{
    if(updateId==undefined){
      setUpdateIdState(false)
    } else{
      setUpdateIdState(true)

      axios.post(`http://localhost:5000/api/admin/parent-categories/details/${ updateId }`)
      .then((response) => {
        if(response.data._status == true){
          setCategoryDetails(response.data._data);
          setValue('name', response.data._data.name);
          setValue('order', response.data._data.order);
          setImagePath(response.data.image_path+response.data._data.image);

          console.log(imagePath);
        } else {
          toast.error(response.data._message);
        }        
      })
      .catch((error) => {
          toast.error('Something went wrong !!')
      });
      
    }
  },[updateId])



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
              <Link to={"/category/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Category</Link>
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


      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updateIdState ? "Update Category" : "Add Category"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label

                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  // {...register("image", { required: "Category image is required" })}
                  id="categoryImage"
                  name="image"
                  data-default-file={imagePath}
                  className="dropify"
                  data-height="250"
                />
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
              </div>
              <div className="w-2/3">
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
                    htmlFor="order"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    {...register("order", { required: "Order is required" })}
                    id="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                  {errors.order && <p className="text-red-500">{errors.order.message}</p>}
                </div>

              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateIdState ? "Update Category" : "Add Category"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
