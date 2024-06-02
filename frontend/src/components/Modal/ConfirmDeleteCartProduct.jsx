import React from "react";

const ConfirmDeleteCartProduct = ({ onClose ,callBack}) => {

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/20 flex items-center justify-center">
      <div className=" max-h-1/2 bg-white p-6 flex flex-col gap-24 justify-between">
        <p className="text-center text-lg font-bold">
          Are you sure you want to delete this products?
        </p>
        <div className="flex gap-4 justify-between">
          <button className="text-red-500" onClick={callBack}>Delete</button>
          <button className="text-slate-500" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteCartProduct;
