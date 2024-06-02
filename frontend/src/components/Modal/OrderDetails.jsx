import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import formatPrice from "../../helper/formatPrice";
import { IoMdClose } from "react-icons/io";

const OrderDetails = ({ cartList, onClose }) => {
  const [cart, setCart] = useState([]);
  

  const fetchOrderDetails = async () => {
    const dataResponse = await fetch(SummaryApi.orderDetails.url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartList,
      }),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      setCart(dataApi.data);
      toast.success(dataApi.message);
    } else {
      toast.error(dataApi.message);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/20 flex items-center justify-center">
      <div className="w-[70%] bg-white">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-2xl text-primary">Order Details</h1>
          <button
            className="block ml-auto text-2xl text-primary hover:bg-primary hover:text-white transition-all"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>
        <table className="text-left w-full ">
          <thead class=" border-b-2 text-center flex justify-between items-center text-black w-full">
            <tr class="flex w-full">
              <th className="py-4 w-2/5" colSpan={2}>
                Product
              </th> 
              <th className="py-4 w-1/5">Quantity</th>
              <th className="py-4 w-1/5">Price</th>
              <th className="py-4 w-1/5">Total</th>
            </tr>
          </thead>
          <tbody class="bg-grey-light flex flex-col justify-between max-h-[50vh] overflow-y-scroll w-full">
            {cart.map((item) => {
              return (
                <tr
                  class="flex justify-between items-center w-full"
                  key={item._id}
                >
                  <td className="py-4 w-1/5">
                    <img
                      className="w-20 h-20"
                      src={item?.product?.productImage[0]}
                      alt=""
                    />
                  </td>
                  <td className="py-4 w-1/5">
                    <p>{item.product.productName}</p>
                  </td>
                  <td className="py-4 w-1/5 text-center">
                    <p>{item.quantity}</p>
                  </td>
                  <td className="py-4 w-1/5 text-center">
                    <p>{formatPrice(item.product.sellingPrice)}</p>
                  </td>
                  <td className="py-4 w-1/5 text-center">
                    <p>
                      {formatPrice(item.quantity * item.product.sellingPrice)}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
