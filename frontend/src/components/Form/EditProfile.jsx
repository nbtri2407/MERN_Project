import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const EditProfile = ({ user, onClose, callBack }) => {
  const currentUser = useSelector((state) => state?.user?.user);
  console.log(currentUser);
  const [data, setData] = useState(user);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const fetchData = await fetch(SummaryApi.updateUser.url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await fetchData.json();
    if (dataApi.status) {
      toast.success(dataApi.message);
      callBack();
      onClose();
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/20 flex items-center justify-center">
      <div className="max-h-1/2 w-1/2 bg-white p-6">
        <div className="flex justify-between items-center text-2xl">
          <h1 className="">Edit Profile</h1>
          <IoClose onClick={onClose} className="hover:text-primary cursor-pointer transition-all" />
        </div>
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleOnSubmit}>
          <div className="flex gap-2 items-center">
            <label htmlFor="name" className="text-xl w-1/4">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="flex-1 outline-none p-2 border rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="email" className="text-xl w-1/4">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="flex-1 outline-none p-2 border rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="phone" className="text-xl w-1/4">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              className="flex-1 outline-none p-2 border rounded-md"
              placeholder="Enter your phone number (+84)"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="address" className="text-xl w-1/4">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              className="flex-1 outline-none p-2 border rounded-md"
              placeholder="Enter your address"
            />
          </div>
          {currentUser.role === "ADMIN" && (
            <div className="flex gap-2 items-center">
              <label htmlFor="role" className="text-xl w-1/4">
                Role
              </label>
              <select
                className="border px-4 py-1"
                name="role"
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                required
              >
                <option value="ADMIN">ADMIN</option>
                <option value="GENERAL">GENERAL</option>
              </select>
            </div>
          )}

          <button className="primary-btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
