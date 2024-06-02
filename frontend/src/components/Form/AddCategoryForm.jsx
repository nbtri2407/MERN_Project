import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const AddCategoryForm = ({ onClose, callBack }) => {
  const [data, setData] = useState({
    categoryName: "",
    description:
      "This brand represents a symbol of trust and quality across various industries. It embodies a commitment to excellence and innovation, catering to the needs of consumers worldwide. With a focus on delivering value and performance, this brand has earned a reputation for reliability and customer satisfaction. Its products and services are designed to meet the evolving demands of a diverse global market.",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    console.log(data);
    const fetchData = await fetch(SummaryApi.addCategory.url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await fetchData.json();
    if (dataApi.status) {
      toast.success(dataApi.message);
      onClose();
      callBack();
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="absolute z-10 top-[100%] left-[50%] translate-x-[-50%] flex flex-col gap-6 w-[50%] p-4 shadow bg-white border">
      <button
        className="block ml-auto text-2xl border border-black/20 text-primary hover:bg-primary hover:text-white transition-all"
        onClick={onClose}
      >
        <IoMdClose />
      </button>
      <h1 className="text-2xl">Add Category</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="categoryName">Category Name</label>
        <input
          className=" border border-black/50 p-2 rounded outline-none"
          type="text"
          name="categoryName"
          id="categoryName"
          value={data.categoryName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <textarea
          rows="5"
          className=" p-2 border border-black/50 rounded outline-none"
          type="text"
          name="description"
          id="description"
          value={data.description}
          onChange={handleChange}
          required
        />
      </div>
      <button onClick={handleAddCategory} className="primary-btn">
        Add
      </button>
    </div>
  );
};

export default AddCategoryForm;
