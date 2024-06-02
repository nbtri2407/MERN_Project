import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import formatPrice from "../helper/formatPrice";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { RiLoopLeftFill } from "react-icons/ri";
import RelatedProduct from "../components/CategoryProduct/RelatedProduct";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, setFilter } from "../store/filterSlice";
import Context from "../context";
import addToCart from "../helper/addToCart";

const ProductDetails = () => {
  const user = useSelector((state) => state?.user?.user);
  const productId = useParams();
  const dispatch = useDispatch();
  const { getCountCartProduct } = useContext(Context);
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);

  const fetchProductDetails = async () => {
    const dataResponse = await fetch(SummaryApi.productDetails.url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: productId.id,
      }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.status) {
      setProductDetails(dataApi.data);
      setQuantity(1);
    } else {
      toast.error(dataApi.message);
    }
  };

  const [imageDisplay, setImageDisplay] = useState(0);

  const handleSubQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.error("Minimum quantity reached");
    }
  };

  const handleAddQuantity = () => {
    if (quantity < productDetails?.quantity) {
      setQuantity(+quantity + 1);
    } else {
      setQuantity(productDetails?.quantity);
      toast.error("Maximum quantity reached");
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    await addToCart(productId, quantity);
    getCountCartProduct();
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (quantity >= productDetails?.quantity) {
      setQuantity(productDetails?.quantity);
      toast.error("Maximum quantity reached");
    }
  }, [quantity]);

  return (
    <div className="container mx-auto mt-[136px] mb-8">
      <div className="w-full flex gap-2 md:mb-4 mb-44">
        <Link className="hover:text-primary" to={"/shop"}>
          Shop
        </Link>
        <p>/</p>
        <p
          className="hover:text-primary cursor-pointer"
          onClick={() => {
            navigate(`/shop`);
            dispatch(clearFilters());
            dispatch(
              setFilter({
                filterName: "category",
                value: productDetails?.category?._id,
              })
            );
          }}
        >
          {productDetails?.category?.categoryName}
        </p>
        <p>/</p>
        <p className="hover:text-primary cursor-pointer">
          {productDetails?.productName}
        </p>
      </div>
      <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        <div className="flex flex-col-reverse md:flex-row gap-4 col-span-1 w-full h-full">
          <div className="flex md:flex-col justify-between">
            {productDetails?.productImage?.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImageDisplay(index)}
                alt="product"
                className="2xl:w-24  xl:w-44 lg:w-24 md:w-28 w-1/5 border border-black/20 object-scale-down cursor-pointer hover:border-primary transition-all"
              />
            ))}
          </div>
          <div className="min-h-full">
            <img
              src={productDetails?.productImage?.[imageDisplay]}
              alt="product"
              className="flex-1 h-full border border-black/50 object-scale-down"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:gap-0 justify-between col-span-1 w-full h-full">
          <h1 className="text-3xl font-semibold text-ellipsis line-clamp-2">
            {productDetails?.productName}
          </h1>
          <div className="flex gap-4 items-baseline">
            <p className="text-xl">
              Brand:{" "}
              <span className="text-primary">
                {productDetails?.category?.categoryName}
              </span>
            </p>
            <p className="text-3xl">|</p>
            <p className="text-xl">
              Status:{" "}
              <span className="text-primary">
                {productDetails?.quantity > 0 ? "In Stock" : "Sould out"}
              </span>
            </p>
          </div>
          <div className="flex gap-4 items-baseline text-2xl font-semibold">
            Price:
            <p className=" text-primary">
              {formatPrice(productDetails?.sellingPrice)}
            </p>
            <span className="text-xl font-normal text-slate-400">
              Listed price:
            </span>
            <p className="text-xl font-normal text-slate-400 line-through">
              {formatPrice(productDetails?.price)}
            </p>
          </div>
          <hr className="border border-black/30" />
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 ">
            <div className="w-1/3 grid grid-cols-4 border border-black/30 rounded overflow-hidden">
              <RiSubtractFill
                className="text-4xl w-full cursor-pointer bg-primary text-white px-1"
                onClick={handleSubQuantity}
              />
              <input
                type="number"
                min={1}
                max={productDetails?.quantity}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className=" text-center pl-2 col-span-2 outline-none text-2xl"
              />
              <IoMdAdd
                className="text-4xl w-full cursor-pointer bg-primary text-white px-1"
                onClick={handleAddQuantity}
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="primary-btn">Buy Now</button>
              <button className="primary-btn" onClick={()=>handleAddToCart(productDetails._id,quantity)}>Add to cart</button>
            </div>
          </div>
          <div className="w-full border border-black/50">
            <div className="w-full p-2 lg:p-4 flex items-center gap-4">
              <TbTruckDelivery className="text-4xl" />
              <div className="flex-1">
                <p>Free Delivery</p>
                <p>Enter your postal code for Delivery</p>
              </div>
            </div>
            <hr className="border border-black/50" />
            <div className="w-full p-2 lg:p-4 flex items-center gap-4">
              <RiLoopLeftFill className="text-4xl" />
              <div className="flex-1">
                <p>Return Delivery</p>
                <p>Free 30 Days Delivery Return</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between md:col-span-2 xl:col-span-1 col-span-1 w-full h-full">
          <h1 className="text-2xl text-center font-semibold text-ellipsis line-clamp-2">
            Specifications
          </h1>
          <table className="Specifications-table">
            <tbody>
              <tr>
                <th>Level:</th>
                <td>{productDetails?.level}</td>
              </tr>
              <tr>
                <th>Swingweight:</th>
                <td>{productDetails?.swingweight}</td>
              </tr>
              <tr>
                <th>Handle Length:</th>
                <td>{productDetails?.handleLength}</td>
              </tr>
              <tr>
                <th>Length:</th>
                <td>{productDetails?.length}</td>
              </tr>
              <tr>
                <th>Format Play:</th>
                <td>{productDetails?.formatPlay}</td>
              </tr>
              <tr>
                <th>Style Play:</th>
                <td>{productDetails?.stylePlay}</td>
              </tr>
              <tr>
                <th>Stiffness:</th>
                <td>{productDetails?.stiffness}</td>
              </tr>
              <tr>
                <th>Balance Point:</th>
                <td>{productDetails?.balancePoint}</td>
              </tr>
              <tr>
                <th>Weight:</th>
                <td>{productDetails?.weight}</td>
              </tr>
              <tr>
                <th>Swing weight:</th>
                <td>{productDetails?.swingweight}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <RelatedProduct categoryId={productDetails?.category?._id} />
    </div>
  );
};

export default ProductDetails;
