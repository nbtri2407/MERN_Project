import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import SummaryApi from "../../common";

const ChangePassword = ({ onClose, callBack }) => {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const fetchData = await fetch(SummaryApi.changePassword.url, {
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
      callBack(data);
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
          <IoClose
            onClick={onClose}
            className="hover:text-primary cursor-pointer transition-all"
          />
        </div>
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleOnSubmit}>
          <div className="flex gap-2 items-center">
            <label htmlFor="oldPassword" className="text-xl w-1/4">
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={data.oldPassword}
              onChange={(e) =>
                setData({ ...data, oldPassword: e.target.value })
              }
              className="flex-1 outline-none p-2 border rounded-md"
              placeholder="Current password"
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="newPassword" className="text-xl w-1/4">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={data.newPassword}
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
              className="flex-1 outline-none p-2 border rounded-md"
              placeholder="New password"
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="confirmPassword" className="text-xl w-1/4">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              className="flex-1 outline-none p-2 border rounded-md"
              placeholder="Confirm password"
              required
            />
          </div>

          <button className="primary-btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
