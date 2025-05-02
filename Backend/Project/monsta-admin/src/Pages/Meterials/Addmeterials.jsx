
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Addmaterials() {

  const navigate = useNavigate();

  const [materailDetails, setMaterialDetails] = useState('');

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if(updateIdState){
      axios.put(`http://localhost:5000/api/admin/materials/update/${updateId}`, data)
    .then((response) => {
      if(response.data._status == true){
        toast.success(response.data._message);
        navigate('/material/view');
      } else {
        toast.error(response.data._message);
      }        
    })
    .catch((error) => {
        toast.error('Something went wrong !!')
    });
    } else {
      axios.post('http://localhost:5000/api/admin/materials/create', data)
      .then((response) => {
        if(response.data._status == true){
          toast.success(response.data._message);
          navigate('/material/view');
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
  const [updateIdState,setUpdateIdState]=useState(false)

  let updateId=useParams().id
  useEffect(()=>{
    if(updateId==undefined){
      setUpdateIdState(false)
    } else{
      setUpdateIdState(true)

      axios.post(`http://localhost:5000/api/admin/materials/details/${ updateId }`)
      .then((response) => {
        if(response.data._status == true){
          setMaterialDetails(response.data._data);
          setValue('name', response.data._data.name);
          setValue('order', response.data._data.order);
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
      <Breadcrumb path={"Material"} path2= {updateIdState ? "Update" : "Add"}  slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {updateIdState ? "Update Material" : "Add Material"}  
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            
              <div className="">
                <div className="mb-5">
                  <label
                    htmlFor="Name"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Material Name
                  </label>
                  <input
                    type="text"
                    defaultValue={materailDetails.name}
                    {...register("name", { required: "Material name is required" })}
                    id="Name"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Material Name"
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
                    defaultValue={materailDetails.order}
                    {...register("order", { required: "Order is required" })}
                    id="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                  {errors.order && <p className="text-red-500">{errors.order.message}</p>}
                </div>
              </div>
           
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
             {updateIdState ? "Update Material" : "Add Material"}  
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
