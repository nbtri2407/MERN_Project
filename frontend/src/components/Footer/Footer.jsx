import React from "react";
import { VscSend } from "react-icons/vsc";
import { FaFacebookF } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-black py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between text-white ">
        <div className="flex flex-col lg:items-start items-center gap-2">
          <h1 className="text-4xl">ViVid</h1>
          <h3 className="text-2xl">Subscribe</h3>
          <p>Get 10% off your first order</p>
          <div className="flex relative items-center w-full">
            <input
              type="text"
              className="w-full p-2 bg-black text-white border border-white rounded-lg outline-none"
              placeholder="Enter your email"
            />
            <VscSend className="absolute right-0 top-[50%] translate-y-[-50%] text-4xl" />
          </div>
        </div>
        <div className="flex flex-col lg:items-start items-center gap-2 ">
          <h3 className="text-2xl">Support</h3>
          <p>Da Nang, Viet Nam</p>
          <p>vivid@gmail.com</p>
          <p>+8423456789</p>
        </div>
        <div className="flex-col lg:items-start items-center gap-2 hidden lg:flex">
          <h3 className="text-2xl">Account</h3>
          <p>My Account</p>
          <p>Login / Register</p>
          <p>Cart</p>
          <p>Wishlist</p>
          <p>Shop</p>
        </div>
        <div className=" flex-col lg:items-start items-center gap-2 hidden lg:flex">
          <h3 className="text-2xl">Quick Link</h3>
          <p>Privacy Policy</p>
          <p>Terms Of Use</p>
          <p>FAQ</p>
          <p>Contact</p>
        </div>
        <div className="flex flex-col lg:items-start items-center gap-2">
          <h3 className="text-2xl">Download App</h3>
          <p className="lg:pt-4">Save S3 with App New User Only</p>
          <div className="flex justify-between">
            <div className="w-[48%] hidden lg:block">
              <img
                src="https://th.bing.com/th/id/OIP.X9ImdPHMRbztC2KYQ69wHgHaHa?rs=1&pid=ImgDetMain"
                alt="QR Code"
                className="w-36 h-36 "
              />
            </div>
            <div className="w-48 flex flex-col gap-2">
              <div className="flex items-center justify-evenly border border-white rounded-lg p-2">
                <FaGooglePlay className="text-3xl" />
                <div className="flex flex-col">
                  <span>GET IT ON</span>
                  <span>Google Play</span>
                </div>
              </div>
              <div className="flex items-center justify-evenly border border-white rounded-lg p-2">
                <FaApple className="text-3xl" />
                <div className="flex flex-col">
                  <span>GET IT ON</span>
                  <span>App Store</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly items-center text-2xl pt-4 w-full">
            <FaFacebookF />
            <LuTwitter />
            <FaInstagram />
            <SlSocialLinkedin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
