import React, { useContext, useEffect, useState } from "react";
import QR from "../assets/qrcode.jpg";
import Context from "../context";
import SummaryApi from "../common";
import { Link, useNavigate } from "react-router-dom";
import formatPrice from "../helper/formatPrice";
import { IoIosArrowBack } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Checkout = () => {
  const user = useSelector((state) => state?.user?.user); 
  const [payment, setPayment] = useState("cod");
  const context = useContext(Context);
  const {handleSetSelectedProduct, getCountCartProduct } = useContext(Context);
  const navigate = useNavigate();
  const [productCart, setProductCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone || "",
    address: user?.address || "",
    payment,
    total,
    products: context.selectedProduct,
  });

  const [openOrderList, setOpenOrderList] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        setOpenOrderList(false);
      } else {
        setOpenOrderList(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchProductCart = async () => {
    const dataResponse = await fetch(
      SummaryApi.productCartSelectedCheckout.url,
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: context.selectedProduct,
        }),
      }
    );
    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      setProductCart(dataApi.data);
      let total = 0;
      dataApi.data.forEach((item) => {
        total += item.product.sellingPrice * item.quantity;
      });
      setTotal(total);
    } else {
      toast.error(dataApi.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    info.payment = payment;
    info.total = total; 
    const dataResponse = await fetch(SummaryApi.checkoutCart.url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      toast.success(dataApi.message);
      navigate("/");
      handleSetSelectedProduct([]);
      getCountCartProduct();
    } else {
      toast.error(dataApi.message);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnChecedPayment = (e) => {
    setPayment(e.target.value);
  };

  useEffect(() => {
    if (context.selectedProduct.length === 0) {
      navigate("/cart");
    }
    fetchProductCart();
  }, []);
  return (
    <div className="container mx-auto mt-[160px] min-h-[70vh] mb-8">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
      <hr />
      <div className="grid gap-12 grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1 flex flex-col gap-4 ">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl">
              Order ({context.selectedProduct.length} items)
            </h1>
            <p
              className="lg:hidden text-lg text-primary hover:underline cursor-pointer flex gap-1 items-center"
              onClick={() => setOpenOrderList(!openOrderList)}
            >
              <p>View Details</p>
              <MdArrowForwardIos
                className={
                  openOrderList
                    ? "rotate-90 transition-all"
                    : "rotate-0 transition-all"
                }
              />
            </p>
          </div>
          {openOrderList && (
            <div className="w-full flex flex-col gap-2 max-h-[50vh] overflow-y-auto pt-1 pr-4">
              {productCart?.map((product, index) => (
                <div className="flex gap-12 items-center" key={index}>
                  <div className="relative">
                    <img
                      src={product?.product?.productImage?.[0]}
                      alt="item"
                      className="w-16 h-16 border border-black/20 object-scale-down cursor-pointer hover:border-primary transition-all"
                    />
                    <div className="absolute -top-1 -right-1 rounded-full bg-primary text-white w-5 h-5 flex items-center justify-center">
                      {product?.quantity}
                    </div>
                  </div>
                  <p className="flex-1 text-ellipsis line-clamp-1">
                    {product?.product?.productName}
                  </p>
                  <p>
                    {formatPrice(
                      product?.product?.sellingPrice * product?.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}

          <hr />
          <div className="flex justify-between items-center w-full mt-2">
            <p className="text-2xl">Total: </p>
            <p className="text-2xl">{formatPrice(total)}</p>
          </div>

          <div className="w-full">
            <p className="text-sm text-slate-400">
              - Giá trên chưa bao gồm phí vận chuyển. Phí vận chuyển sẽ được
              nhân viên báo khi xác nhận đơn hàng.
            </p>
            <p className="text-sm text-slate-400">
              - Thời gian xử lý đơn hàng: Từ 8h00- 17h thứ 2 đến thứ 7. Các đơn
              hàng sau thời gian này sẽ được xử lý vào ngày làm việc tiếp theo.
            </p>
          </div>
        </div>
        <div className="col-span-2 grid gap-12 grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-4">
            <h1 className="text-2xl w-full">Delivery information</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={info.name}
                onChange={(e) => handleOnChange(e)}
                className="w-full p-2 border border-black/30 rounded-md outline-none"
                required
              />
              <input
                type="tel"
                pattern="[+]{1}[0-9]{11,14}"
                maxLength={12}
                name="phone"
                value={info.phone}
                onChange={(e) => handleOnChange(e)}
                placeholder="Phone Number (+84)"
                className="w-full p-2 border border-black/30 rounded-md outline-none"
                required
              />
              <input
                type="text"
                name="address"
                value={info.address}
                onChange={(e) => handleOnChange(e)}
                placeholder="Address"
                className="w-full p-2 border border-black/30 rounded-md outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={info.email}
                onChange={(e) => handleOnChange(e)}
                placeholder="Email"
                className="col-span-1 p-2 border border-black/30 rounded-md outline-none"
                required
              />
              <div className="flex justify-between items-center w-full mt-2">
                <Link
                  to="/cart"
                  className="text-lg text-primary hover:underline flex items-center"
                >
                  <IoIosArrowBack /> <p>Back to cart</p>
                </Link>
                <button type="submit" className="primary-btn">
                  Place order
                </button>
              </div>
            </form>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <h1 className="text-xl w-full">Payments</h1>
            <div className="w-full border border-black/30 rounded-md p-8 flex flex-col justify-center gap-4">
              <div className="w-full flex gap-2 items-center">
                <input
                  type="radio"
                  name="payment"
                  value={"cod"}
                  checked={payment === "cod"}
                  onChange={handleOnChecedPayment}
                  id="payment1"
                />
                <label htmlFor="payment1">Payment on delivery (COD)</label>
              </div>
              <div className="w-full flex gap-2 items-center">
                <input
                  type="radio"
                  name="payment"
                  value={"paypal"}
                  checked={payment === "paypal"}
                  onChange={handleOnChecedPayment}
                  id="payment2"
                />
                <label htmlFor="payment2">Transfer payments</label>
              </div>
            </div>
            {payment === "paypal" && (
              <div className="w-full flex flex-col gap-1.5 bg-slate-100 p-2">
                <p>
                  Bank name: <span className="font-bold">VIETCOMBANK</span>
                </p>
                <p>
                  Account number: <span className="font-bold">9967456435</span>{" "}
                </p>
                <p>
                  Account owner:{" "}
                  <span className="font-bold">NGUYEN BAO TRI</span>
                </p>
                <p>
                  (Transfer content:{" "}
                  <span className="font-bold">Name + Phone Number</span>)
                </p>
                <div className="flex justify-center">
                  <img src={QR} alt="QR code" className="h-80" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
