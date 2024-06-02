import React, { useContext } from "react";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa6";
import formatPrice from "../../helper/formatPrice";
import { Link, useNavigate } from "react-router-dom";
import scrollTop from "../../helper/scrollTop";
import { useSelector } from "react-redux";
import SummaryApi from "../../common/index.jsx";
import { toast } from "react-toastify";
import Context from "../../context/index.jsx";
import addToCart from "../../helper/addToCart.jsx";

const ProductCardShop = ({ product }) => {
  const user = useSelector((state) => state?.user?.user);
  const { getCountCartProduct } = useContext(Context);
  const navigate = useNavigate();

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user) {
      navigate("/login");
      toast.error("Please login first");
      return;
    }
    await addToCart(productId, quantity);
    getCountCartProduct();
  };

  return (
    <div className="flex flex-col gap-1 border w-full col-span-1 rounded shadow-md cursor-pointer ">
      <div className="relative group h-[80%] border-b md:p-10 md:hover:p-16 p-6 hover:p-12 transition-all">
        <div className="absolute right-0 left-0 top-0 p-2 flex justify-between items-center ">
          <p className="bg-primary px-5 py-1 rounded-xl text-white text-lg">
            -{Math.round(100 - (product.sellingPrice / product.price) * 100)}%
          </p>
          <FaRegHeart className="rounded-full border text-4xl p-2" />
          <FaHeart className="rounded-full border text-4xl p-2 hidden" />
        </div>
        <Link to={`/product/${product._id}`} onClick={scrollTop}>
          <img
            className="w-full h-full object-scale-down mix-blend-multiply mx-auto"
            src={product.productImage[0]}
            alt="productImage1"
          />
        </Link>
        <div
          className="absolute z-20 left-0 right-0 bottom-0 py-2 lg:hidden group-hover:block w-full bg-primary text-white text-center duration-200"
          onClick={() => handleAddToCart(product._id, 1)}
        >
          <p>Add to cart</p>
        </div>
      </div>
      <Link to={`/product/${product._id}`} onClick={scrollTop}>
        <div className="grid gap-1 px-4 pb-2">
          <div>
            <p className="text-sm text-primary">
              {product.category.categoryName}
            </p>
          </div>
          <div>
            <p className="text-lg text-ellipsis line-clamp-1">
              {product.productName}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-lg">
            <div className="flex gap-4">
              <p className="text-primary">
                {formatPrice(product.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardShop;
