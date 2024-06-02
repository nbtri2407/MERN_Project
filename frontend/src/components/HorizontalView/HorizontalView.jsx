import React, { useEffect, useRef, useState } from "react";
import Heading from "./Heading";
import ProductCard from "../ProductCard/ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import SummaryApi from "../../common";

const HorizontalView = ({ title, subtitle }) => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchAllProducts = async () => {
    const dataResponse = await fetch(
      `${SummaryApi.allProducts.url}?page=${1}&limit=${12}`,
      {
        method: "post",
        credentials: "include",
      }
    );

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      setAllProducts(dataApi.data);
    } else {
      toast.error(dataApi.message);
    }
  };

  const scrollElement = useRef();

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 800;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 800;
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="container mx-auto mt-8 lg:mt-24 relative">
      <Heading title={title} subtitle={subtitle} />

      <div
        className=" flex gap-8 justify-between overflow-x-auto scroll-smooth hidden-scrollbar"
        ref={scrollElement}
      >
        <button
          onClick={scrollLeft}
          className="bg-white border shadow-md rounded-full p-2 text-2xl hidden md:block absolute z-10 -left-4 top-[50%]"
        >
          {/*  */}
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollRight}
          className="bg-white border shadow-md rounded-full p-2 text-2xl hidden md:block absolute z-10 -right-4 top-[50%]"
        >
          <FaAngleRight />
        </button>

        {allProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalView;
