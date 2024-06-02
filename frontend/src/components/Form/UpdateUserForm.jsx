import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const UpdateUserForm = ({ name, email, role, userId, onClose, callFunc }) => {

  const handleOnChangeSelect = (e) => {
    setData((prev) => {
        return {
          ...prev,
          role: e.target.value,
        };
      });
  };

  const [data, setData] = useState({
    name: name,
    email: email,
    role: role,
    userId: userId,
  });

  console.log('data', data);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.updateUser.url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      toast.success(dataApi.message);
      callFunc();
      onClose();
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="absolute z-10 top-0 w-full h-full bg-black/10">
      <div className="absolute top-10 left-[50%] p-4 translate-x-[-50%] w-[50%] h-[50%] border bg-slate-200 shadow-xl">
        <button
          className="block ml-auto text-2xl border border-black/20 text-primary hover:bg-primary hover:text-white transition-all"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Update User</h1>
          <div className="flex flex-col">
            <label htmlFor="name">Full Name</label>
            <input
              className="border border-black/30 p-2 rounded-md outline-none"
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="border border-black/30 p-2 rounded-md outline-none"
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex gap-8 items-center my-4">
            <p>Role:</p>
            <select
              className="border px-4 py-1"
              value={data.role}
              onChange={handleOnChangeSelect}
              required
            >
              <option value="ADMIN">ADMIN</option>
              <option value="GENERAL">GENERAL</option>
            </select>
          </div>
          <button className="primary-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserForm;
