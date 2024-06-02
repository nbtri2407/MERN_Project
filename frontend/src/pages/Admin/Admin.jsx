import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import {  useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Admin = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  if (user?.role !== "ADMIN") {
    navigate("/");
    toast.error("You are not authorized to access this page");
  }

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden mt-[136px]">
      <aside className="bg-white border min-h-90 w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className=" text-sm">{user?.role}</p>
        </div>
        <hr></hr>
        <div>
          <nav className="grid p-2">
          <Link to={``} className="px-2 py-1 hover:bg-slate-100">
              Dashboard
            </Link>
            <Link to={`all-users`} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={`categories`} className="px-2 py-1 hover:bg-slate-100">
              All Categories
            </Link>
            <Link to={`products`} className="px-2 py-1 hover:bg-slate-100">
              All Products
            </Link>
            <Link to={`orders`} className="px-2 py-1 hover:bg-slate-100">
              All Orders
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
