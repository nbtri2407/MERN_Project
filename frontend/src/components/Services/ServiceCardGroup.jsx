import React from "react";
import { services } from "../../data/data";

const ServiceCardGroup = () => {
  return (
    <div className="flex justify-between items-center lg:flex-nowrap flex-wrap my-12">
      {services.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 lg:gap-4 items-center border w-[46%] lg:w-[22%] mt-4 p-2 lg:p-8">
          <div className="bg-slate-200 p-2 xl:p-4 rounded-full">
            <div className="xl:text-4xl md:text-2xl text-md bg-black text-white p-2 xl:p-4 rounded-full">
              {item.icon}
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-1">
            <h1 className="font-semibold text-[8px] xl:text-lg">{item.name}</h1>
            <p className="hidden xl:block">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCardGroup;
