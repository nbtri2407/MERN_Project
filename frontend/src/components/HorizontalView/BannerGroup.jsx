import React from "react";
import Heading from "./Heading";

const BannerGroup = () => {
  return (
    <div className="container mt-8 lg:mt-24 mx-auto">
      <Heading title={"Featured"} subtitle={"New Arrival"} />
      <div className="flex justify-between">
        <div className="w-[48%]">
          <img
            src="https://th.bing.com/th/id/OIP.Oephs8PqmlZjERbhkpfZMQHaHa?rs=1&pid=ImgDetMain"
            alt=""
            className="h-full border"
          />
        </div>
        <div className="flex flex-col justify-between items-center w-[48%]">
          <div className="h-[48%] w-full ">
            <img
              src="https://th.bing.com/th/id/OIP.QA0LoqPdFuYlRAmA7VDrXQHaEu?rs=1&pid=ImgDetMain"
              alt=""
              className="w-full h-full object-center border"
            />
          </div>
          <div className="flex justify-between w-full h-[48%]">
            <img
              src="https://th.bing.com/th/id/R.1cb48746bfc15d508a3e0e5473c532bc?rik=wdcBQEYQSFGq5Q&pid=ImgRaw&r=0"
              alt=""
              className="w-[48%] object-top border"
            />
            <img
              src="https://cdn.ebaumsworld.com/2020/09/16/025032/86390829/console_wrap_28.jpg"
              alt=""
              className="w-[48%] object-top border"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerGroup;
