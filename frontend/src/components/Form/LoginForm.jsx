import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import Context from "../../context";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "tri123@gmail.com",
    password: "123",
  });

  const navigator = useNavigate();
  const { fetchUserDetails, getCountCartProduct } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.login.url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.status) {
      toast.success(dataApi.message);
      navigator("/");
      fetchUserDetails();
      getCountCartProduct();
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="border border-black/30 p-2 rounded-md outline-none"
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border border-black/30 p-2 rounded-md outline-none"
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button className="primary-btn">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
