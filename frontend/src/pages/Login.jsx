import React, { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "../components/Form/SignUpForm";
import LoginForm from "../components/Form/LoginForm";

const Login = () => {
  const [pickedBtn, setPickedBtn] = useState("Login");

  useEffect(() => {
    
  }, []);

  return (
    <div className="flex justify-center items-center w-full py-12 bg-gradient-to-r from-purple-500 to-pink-500 mt-[130px]">
      <div className="flex flex-col gap-4 items-center p-12 w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] bg-white rounded-lg shadow-lg">
        <div className="w-full flex justify-between rounded-lg overflow-x-hidden bg-black/20">
          <button
            className={
              pickedBtn === "Login"
                ? "picked-btn"
                : "w-1/2"
            }
            onClick={() => setPickedBtn("Login")}
          >
            Login
          </button>
          <button
            className={
              pickedBtn === "Sign Up"
                ? "picked-btn"
                : "w-1/2"
            }
            onClick={() => setPickedBtn("Sign Up")}
          >
            Sign Up
          </button>
        </div>
        <div className="flex flex-col gap-3 flex-1 items-center lg:px-12 w-[90%] duration-200">
          <div className="font-semibold text-2xl">
            {pickedBtn === "Sign Up" ? (
              <h1>Sign Up</h1>
            ) : (
              <h1 className="">Login</h1>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-3 items-center justify-center cursor-pointer  py-3 rounded-full border border-black">
              <FaFacebookF className="p-1 rounded-full bg-blue-500 text-3xl text-white" />
              <pre>Login with Facebook</pre>
            </div>
            <div className="flex gap-3 items-center justify-center cursor-pointer  py-3 rounded-full border border-black">
              <FcGoogle className="text-3xl" />
              <pre>Login with Google  </pre>
            </div>
          </div>
          <div className="flex gap-4 justify-between items-center w-full">
            <hr className="w-1/2  h-[2px] bg-black/50" />
            <p>OR</p>
            <hr className="w-1/2  h-[2px] bg-black/50" />
          </div>

          {pickedBtn === "Sign Up" ? <SignUpForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default Login;
