import React, { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {

  const [data, setData] = useState({
    name: "Tri Nguyen",
    email: "tri123@gmail.com",
    password: "",
    confirmPassword: "",
  });

  const navigator = useNavigate();

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

    const dataResponse = await fetch(SummaryApi.signUp.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.status) {
      toast.success(dataApi.message);
      window.location.reload();
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col gap-4">
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
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border border-black/30 p-2 rounded-md outline-none"
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="border border-black/30 p-2 rounded-md outline-none"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={data.confirmPassword}
            onChange={handleOnChange}
            required
          />
        </div>
      </div>
      {/* <div className="w-full flex justify-center">
        <button className="primary-btn">Sign Up</button>
      </div> */}
      <button type="submit" className="primary-btn">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
