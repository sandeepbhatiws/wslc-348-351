import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChromePicker } from "react-color";
import { Link, useParams } from "react-router-dom";

export default function AddColor() {
  const [color, setColor] = useState("#000000");
  const { id: updateId } = useParams();
  const updateIdState = Boolean(updateId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (updateIdState) {
      // Fetch existing data if it's an update case (You can replace this with an API call)
      setValue("colorName", "Sample Color");
      setValue("colorOrder", 1);
      setColor("#ff5733");
    }
  }, [updateIdState, setValue]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", { ...data, color });
    alert(`${updateIdState ? "Color Updated" : "Color Added"}: ${data.colorName} - ${color}`);
  };

  return (
    <div className="w-full">
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
          {updateIdState ? "Update Color" : "Add Colors"}
        </h3>

        <form
          className="p-3 border border-t-0 rounded-b-md border-slate-400"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Color Name */}
          <div className="mb-5">
            <label className="block text-md font-medium text-gray-900">Color Name</label>
            <input
              type="text"
              {...register("colorName", { required: "Color Name is required" })}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Color Name"
            />
            {errors.colorName && <p className="text-red-500 text-sm">{errors.colorName.message}</p>}
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
              {...register("colorOrder", {
                required: "Order is required",
                min: { value: 1, message: "Order must be at least 1" },
              })}
              className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter Order"
            />
            {errors.colorOrder && <p className="text-red-500 text-sm">{errors.colorOrder.message}</p>}
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
