import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <div className="p-2 text-xl font-medium border-l-8 border-primary text-primary ">
        <h3>{subtitle}</h3>
      </div>
      <div className="flex justify-between items-center p-2 ">
        <h1 className="text-3xl font-semibold ">{title}</h1>
        <button className="primary-btn">View All</button>
      </div>
    </div>
  );
};

export default Heading;
