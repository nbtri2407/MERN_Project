import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import formatPrice from "../helper/formatPrice";
import Context from "../context";
import ConfirmDeleteCartProduct from "../components/Modal/ConfirmDeleteCartProduct";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const { getCountCartProduct, handleSetSelectedProduct } = useContext(Context);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const context = useContext(Context); 
  const fetchAllCart = async () => {
    const dataResponse = await fetch(SummaryApi.cart.url, {
      method: "get",
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      let total = 0;
      dataApi.data.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      setTotal(total);
      setCart(dataApi.data);
    } else {
      toast.error(dataApi.message);
    }
  };
  const updateQtyCart = async (cartId, qty) => {
    const dataResponse = await fetch(SummaryApi.updateCart.url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: cartId,
        quantity: qty,
      }),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      fetchAllCart();
    } else {
      toast.error(dataApi.message);
    }
  };

  const increaseQty = async (cartId, qty, maxQty) => {
    // console.log(qty, maxQty,cartId);
    if (qty < maxQty) {
      updateQtyCart(cartId, qty + 1);
    } else {
      toast.error("Maximum quantity reached");
    }
  };
  const descreaseQty = async (cartId, qty) => {
    if (qty > 1) {
      updateQtyCart(cartId, qty - 1);
    } else {
      handleSetSelectedProduct([cartId]);
      setOpenModalDelete(true);
    }
  };
  const handleOnChangeQuantity = (e, cartId, maxQty) => {
    const qty = +e.target.value;
    if (qty < maxQty) {
      updateQtyCart(cartId, qty);
    } else {
      toast.error("Maximum quantity reached");
    }
    updateQtyCart(cartId, qty);
  };
  const handleSelectItem = (id) => {
    handleSetSelectedProduct((preve) =>
      preve.includes(id) ? preve.filter((item) => item !== id) : [...preve, id]
    );
  };
  const handleSelectAllItem = () => {
    if (context.selectedProduct.length === cart.length) {
      handleSetSelectedProduct([]);
    } else {
      handleSetSelectedProduct(cart.map((item) => item._id));
    }
  };

  const handleDeleteItem = async () => {
    const dataResponse = await fetch(SummaryApi.deleteCartProduct.url, {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        products: context.selectedProduct,
      }),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      getCountCartProduct();
      fetchAllCart();
      handleSetSelectedProduct([]);
      setOpenModalDelete(false);
      toast.success(dataApi.message);
    } else {
      toast.error(dataApi.message);
    }
  };

  console.log(context.selectedProduct);
  const handleCheckout = async () => {
    if (context.selectedProduct.length === 0) {
      handleSelectAllItem();
      navigate("/checkout");
    } else {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    fetchAllCart();
  }, []);
  return (
    <div className="container mx-auto mt-[160px] mb-12 relative">
      {openModalDelete && (
        <ConfirmDeleteCartProduct
          onClose={() => setOpenModalDelete(false)}
          callBack={handleDeleteItem}
        />
      )}

      <h1 className="text-3xl font-semibold text-primary">Cart</h1>
      {/* Cart Table */}
      <div className="w-full mt-10 hidden lg:block">
        <table className="text-left w-full ">
          <thead class="bg-black flex justify-between items-center text-white w-full">
            <tr class="flex w-full mb-4">
              <th className="py-4 px-8 w-1/6">Product</th>
              <th className="py-4 px-8 w-1/6">Name</th>
              <th className="py-4 px-8 w-1/6">Price</th>
              <th className="py-4 px-8 w-1/6">Quantity</th>
              <th className="py-4 px-8 w-1/6">Total</th>
              <th className="py-4 px-8 w-1/6 flex items-center gap-4">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={handleSelectAllItem}
                  checked={context.selectedProduct.length === cart.length}
                />
                {context.selectedProduct.length > 0 ? (
                  <MdOutlineDeleteForever
                    className="text-2xl cursor-pointer  hover:text-primary transition-all"
                    onClick={() => setOpenModalDelete(true)}
                  />
                ) : (
                  <></>
                )}
              </th>
            </tr>
          </thead>
          <tbody class="bg-grey-light flex flex-col items-center justify-between max-h-[50vh] overflow-y-scroll scrollbar-none w-full">
            {cart?.map((item) => (
              <tr
                class="flex justify-between items-center w-full mb-4"
                key={item._id}
              >
                <td className="py-4 px-8 w-1/6">
                  <img
                    src={item?.product?.productImage[0]}
                    alt="product"
                    className="w-32 h-32 object-scale-down"
                  />
                </td>
                <td className="py-4 w-1/6 px-8">
                  {item?.product?.productName}
                </td>
                <td className="py-4 w-1/6 px-8">
                  {formatPrice(item?.product?.price)}
                </td>
                <td className="py-4 w-1/6 px-8  ">
                  <div className="flex items-center">
                    <RiSubtractLine
                      className=" text-2xl cursor-pointer hover:bg-primary hover:text-white transition-all"
                      onClick={() => descreaseQty(item?._id, item?.quantity)}
                    />
                    <input
                      className="border border-black/20 outline-none text-center pl-3"
                      type="number"
                      name="quantity"
                      onFocusCapture={(e) => e.target.select()}
                      min={1}
                      value={item?.quantity}
                      max={item?.product?.quantity}
                      onChange={(e) =>
                        handleOnChangeQuantity(
                          e,
                          item._id,
                          item?.product?.quantity
                        )
                      }
                    />
                    <IoMdAdd
                      className=" text-2xl cursor-pointer hover:bg-primary hover:text-white transition-all"
                      onClick={() =>
                        increaseQty(
                          item?._id,
                          item?.quantity,
                          item?.product?.quantity
                        )
                      }
                    />
                  </div>
                  {/* {item?.quantity} */}
                </td>
                <td className="py-4 w-1/6 px-8">
                  {formatPrice(item?.product?.price * item?.quantity)}
                </td>
                <td className="py-4 w-1/6 px-8">
                  {/*  */}
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={() => handleSelectItem(item?._id)}
                    checked={context.selectedProduct.includes(item?._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Small Screen */}
      <div className="w-full mt-10 lg:hidden">
        <div className="flex flex-col gap-2">
          {cart?.map((item) => (
            <div className="flex justify-between items-center " key={item._id}>
              <div className="flex-1 flex gap-4">
                <img
                  src={item?.product?.productImage?.[0]}
                  alt="item"
                  className="w-20 h-20 border border-black/20 object-scale-down cursor-pointer hover:border-primary transition-all"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-ellipsis line-clamp-2">
                    {item?.product?.productName}
                  </p>
                  <div className="flex items-center">
                    <RiSubtractLine
                      className=" text-xl cursor-pointer hover:bg-primary hover:text-white transition-all"
                      onClick={() => descreaseQty(item?._id, item?.quantity)}
                    />
                    <input
                      className="border border-black/20 outline-none text-center"
                      type="number"
                      min={1}
                      value={item?.quantity}
                      max={item?.product?.quantity}
                      onChange={(e) => handleOnChangeQuantity(e, item?._id)}
                    />
                    <IoMdAdd
                      className=" text-xl cursor-pointer hover:bg-primary hover:text-white transition-all"
                      onClick={() =>
                        increaseQty(
                          item?._id,
                          item?.quantity,
                          item?.product?.quantity
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xl text-primary">
                  {formatPrice(item?.product?.price * item?.quantity)}
                </p>
                <p
                  onClick={() => {
                    handleSetSelectedProduct([item?._id]);
                    setOpenModalDelete(true);
                  }}
                >
                  Delete
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-end items-center mt-4 lg:pr-16 gap-4">
        <h1 className="text-2xl">Total: {formatPrice(total)}</h1>
        <button className="primary-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
