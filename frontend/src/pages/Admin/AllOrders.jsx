import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import formatPrice from "../../helper/formatPrice";
import moment from "moment";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);

  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleOnChecked = (id) => {
    setSelectedOrders((preve) =>
      preve.includes(id) ? preve.filter((item) => item !== id) : [...preve, id]
    );
  };

  const handleSelectAllOrders = () => {
    if (selectedOrders.length !== allOrders.length) {
      setSelectedOrders(allOrders.map((item) => item._id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleUpdateOrder = async ({status}) => {
    const dataResponse = await fetch(SummaryApi.updateOrder.url, {
      method: 'post',
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        status,
        selectedOrders,
      }),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      fetchAllOrders();
      setSelectedOrders([])
      toast.success(dataApi.message);
    } else {
      toast.error(dataApi.message);
    }
  };

  const fetchAllOrders = async () => {
    const dataResponse = await fetch(SummaryApi.allOrders.url, {
      method: "get",
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      setAllOrders(dataApi.data);
    } else {
      toast.error(dataApi.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="w-full">
      {/* Orders */}
      <table className="text-left w-full ">
        <thead class="bg-black flex justify-between items-center text-white w-full">
          <tr class="flex w-full mb-4">
            <th className="py-4 px-8 w-1/6">Receiver</th>
            <th className="py-4 px-8 w-1/6">Address</th>
            <th className="py-4 px-8 w-1/6">Order date</th>
            <th className="py-4 px-8 w-1/6">Products</th>
            <th className="py-4 px-8 w-1/6">Total Price</th>
            <th className="py-4 px-8 w-1/6 flex gap-2">Status</th>
            <th className="py-4 px-8 w-1/12">
              <input
                type="checkbox"
                onChange={handleSelectAllOrders}
                checked={selectedOrders.length === allOrders.length}
              />
            </th>
          </tr>
        </thead>
        <tbody class="bg-grey-light flex flex-col items-center border max-h-[70vh] overflow-y-scroll scrollbar-none w-full">
          {allOrders?.map((item) => (
            <tr
              class="flex justify-between items-center w-full mb-4 border"
              key={item._id}
            >
              <td className="py-4 w-1/6 px-8">
                <p>Name: {item?.name}</p>
                <p>Phone: {item?.phone}</p>
              </td>
              <td className="py-4 w-1/6 px-8">{item?.address}</td>
              <td className="py-4 w-1/6 px-8">
                {moment(item?.createdAt).format("LL")}
              </td>
              <td className="py-4 w-1/6 px-8">
                {item?.carts?.map((cart) => (
                  <p key={cart._id}>{cart?.product.productName}</p>
                ))}
              </td>
              <td className="py-4 w-1/6 px-8">
                {formatPrice(item?.totalPrice)}
              </td>
              <td className="py-4 w-1/6 px-8 flex gap-2">
                <p
                  className={
                    item?.status === "Pending"
                      ? "bg-yellow-200 cursor-pointer"
                      : item?.status === "Delivery"
                      ? "bg-blue-200 cursor-pointer"
                      : item?.status === "Completed"
                      ? "bg-green-200 cursor-pointer"
                      : "bg-red-200 cursor-pointer"
                  }
                >
                  {item?.status}
                </p>
              </td>
              <td className="py-4 w-1/12 px-8">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(item?._id)}
                  onChange={() => {
                    handleOnChecked(item?._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center gap-12 mt-4">
        <button
          className="primary-btn bg-blue-500"
          onClick={() => handleUpdateOrder({status:"Delivery"})}
        >
          Delivery
        </button>
        <button
          className="primary-btn bg-green-500"
          onClick={() => handleUpdateOrder({status:"Completed"})}
        >
          Completed
        </button>
        <button
          className="primary-btn "
          onClick={() => handleUpdateOrder({status:"Cancel"})}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AllOrders;
