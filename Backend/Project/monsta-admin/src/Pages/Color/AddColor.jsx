import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChromePicker } from "react-color";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddColor() {
  const [colorDetails, setColorDetails] = useState('');
  const [color, setColor] = useState("#000000");

  const navigate = useNavigate();

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };


  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.color_code = color;

    if(updateIdState){
      axios.put(`http://localhost:5000/api/admin/colors/update/${updateId}`, data)
    .then((response) => {
      if(response.data._status == true){
        toast.success(response.data._message);
        navigate('/color/view');
      } else {
        toast.error(response.data._message);
      }        
    })
    .catch((error) => {
        toast.error('Something went wrong !!')
    });
    } else {
      axios.post('http://localhost:5000/api/admin/colors/create', data)
      .then((response) => {
        if(response.data._status == true){
          toast.success(response.data._message);
          navigate('/color/view');
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

      axios.post(`http://localhost:5000/api/admin/colors/details/${ updateId }`)
      .then((response) => {
        if(response.data._status == true){
          setColorDetails(response.data._data);
          setValue('name', response.data._data.name);
          setValue('order', response.data._data.order);
          setColor(response.data._data.color_code)
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
    <div className="w-full">
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
          {updateIdState ? "Update Color" : "Add Colors"}
        </h3>

        <form
          autoComplete="off"
          className="p-3 border border-t-0 rounded-b-md border-slate-400"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Color Name */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Color Name</label>
            <input
              type="text"
              defaultValue={colorDetails.name}
              {...register("name", { required: "Color Name is required" })}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Color Name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Color Picker */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Color Picker</label>
             
            <div className="flex items-center gap-3">
              <ChromePicker color={color} onChange={handleColorChange} />
              <div className="w-10 h-10 border border-gray-400 rounded-md" style={{ backgroundColor: color }}></div>
            </div>
          </div>

          {/* Color Order */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Order</label>
            <input
              type="number"
              defaultValue={colorDetails.order}
              {...register("order", {
                required: "Order is required",
                min: { value: 1, message: "Order must be at least 1" },
              })}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Order"
            />
            {errors.order && <p className="text-red-500 text-sm">{errors.order.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {updateIdState ? "Update Color" : "Add Color"}
          </button>
        </form>
      </div>
    </div>
  );
}
