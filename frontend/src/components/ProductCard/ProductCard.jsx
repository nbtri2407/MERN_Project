import React, { useContext } from "react";
import formatPrice from "../../helper/formatPrice";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import scrollTop from "../../helper/scrollTop.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../../common/index.jsx";
import Context from "../../context/index.jsx";
import addToCart from "../../helper/addToCart.jsx";

const ProductCard = ({ product }) => {
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
    <div className="flex flex-col gap-1 border mb-6 min-w-[48%] 2xl:min-w-[20%] xl:min-w-[24%] lg:min-w-[32%] md:min-w-[40%] rounded shadow-md cursor-pointer ">
      <div className="pb-2">
        <div className="relative group h-[72%] border-b p-4 md:p10 hover:p-14 transition-all">
          <div className="absolute right-0 left-0 top-0 p-2 flex justify-between items-center ">
            <p className="bg-primary md:px-5 px-2 py-1 rounded-xl text-white md:text-lg text-sm">
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
            className="absolute left-0 right-0 bottom-0 py-2 hidden group-hover:block w-full bg-primary text-white text-center duration-200"
            onClick={() => handleAddToCart(product._id, 1)}
          >
            <p>Add to cart</p>
          </div>
        </div>
        <Link to={`/product/${product._id}`} onClick={scrollTop}>
          <div className="grid gap-1 p-4">
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
            <div className="flex gap-2 items-center text-lg">
              <p className="text-primary">
                {formatPrice(product.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
