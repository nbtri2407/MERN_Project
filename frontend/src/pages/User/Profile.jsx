import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaAddressBook } from "react-icons/fa";
import moment from "moment";
import { useSelector } from "react-redux";
import EditProfile from "../../components/Form/EditProfile";
import Context from "../../context";
import ChangePassword from "../../components/Form/ChangePassword";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import formatPrice from "../../helper/formatPrice";
import { Link } from "react-router-dom";
import OrderDetails from "../../components/Modal/OrderDetails";
const Profile = () => {
  const user = useSelector((state) => state?.user?.user);
  const { fetchUserDetails } = useContext(Context);
  const [showModalEditProfile, setShowModalEditProfile] = useState(false);
  const [showModalChangePassword, setShowModalChangePassword] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [cartListOrder, setCartListOrder] = useState([]);

  const fetchOrderHistory = async () => {
    const fetchData = await fetch(SummaryApi.orderHistory.url, {
      method: "get",
      credentials: "include",
    });
    const dataApi = await fetchData.json();
    if (dataApi.status) {
      setOrderHistory(dataApi.data);
    } else {
      toast.error(dataApi.message);
    }
  };
 

  useEffect(() => {
    fetchUserDetails();
    fetchOrderHistory();
  }, []);

  return (
    <div className="container mx-auto min-h-[70vh] mt-[160px] mb-8 grid grid-cols-4 gap-8 relative">
      <div className="cols-span-1 flex flex-col gap-2">
        <h1 className="w-full text-3xl">Profile</h1>
        <hr className="w-full my-4" />
        <div className="flex flex-col gap-3 text-xl">
          <div className="flex gap-1 items-center">
            <FaUser />
            <p>Name: {user?.name}</p>
          </div>
          <div className="flex gap-1 items-center">
            <MdEmail />
            <p>Email: {user?.email}</p>
          </div>
          <div className="flex gap-1 items-center">
            <FaPhone />
            <p>Phone: {user?.phone}</p>
          </div>
          <div className="flex gap-1 items-center flex-wrap">
            <FaAddressBook />
            <p>Address:</p>
            <p>{user?.address}</p>
          </div>
        </div>
        <hr className="w-full my-4" />
        <button
          className="primary-btn"
          onClick={() => {
            setShowModalEditProfile(true);
          }}
        >
          Edit Profile
        </button>
        <button
          className="primary-btn"
          onClick={() => {
            setShowModalChangePassword(true);
          }}
        >
          Change Password
        </button>
      </div>
      <div className="col-span-3 flex flex-col gap-2">
        <h1 className="text-3xl">Order History</h1>
        <hr className="w-full my-4" />
        {/* Order History */}
        <table className="text-left w-full ">
          <thead class="bg-black flex justify-between items-center text-white w-full">
            <tr class="flex w-full mb-4">
              <th className="py-4 px-8 w-1/5">Receiver</th>
              <th className="py-4 px-8 w-1/5">Address</th>
              <th className="py-4 px-8 w-1/5">Order date</th>
              <th className="py-4 px-8 w-1/5">Total Price</th>
              <th className="py-4 px-8 w-1/5">Status</th>
            </tr>
          </thead>
          <tbody class="bg-grey-light flex flex-col items-center justify-between max-h-[50vh] overflow-y-scroll scrollbar-none w-full">
            {orderHistory?.map((item) => (
              <tr
                class="flex justify-between items-center w-full mb-4"
                key={item._id}
              >
                <td className="py-4 w-1/5 px-8">
                  <p>Name: {item?.name}</p>
                  <p>Phone: {item?.phone}</p>
                </td>
                <td className="py-4 w-1/5 px-8">{item?.address}</td>
                <td className="py-4 w-1/5 px-8">
                  {moment(item?.createdAt).format("LL")}
                </td>
                <td className="py-4 w-1/5 px-8">
                  {formatPrice(item?.totalPrice)}
                </td>
                <td className="py-4 w-1/5 px-8 flex gap-2">
                  <p>{item?.status}</p>
                  <p
                    className="cursor-pointer text-primary hover:underline transition-all"
                    onClick={() => {
                      setShowOrderDetails(true);
                      setCartListOrder(item.carts.map((cart) => cart._id));
                    }}
                  >
                    Details
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Edit Profile */}
      {showModalEditProfile && (
        <EditProfile
          user={user}
          onClose={() => setShowModalEditProfile(false)}
          callBack={() => fetchUserDetails()}
        />
      )}
      {showModalChangePassword && (
        <ChangePassword
          onClose={() => setShowModalChangePassword(false)}
          callBack={() => fetchUserDetails()}
        />
      )}

      {showOrderDetails && <OrderDetails cartList={cartListOrder} onClose={()=>setShowOrderDetails(false)} />}
    </div>
  );
};

export default Profile;
