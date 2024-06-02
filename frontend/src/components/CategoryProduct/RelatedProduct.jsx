import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import ProductCardShop from "../ProductCard/ProductCardShop";

const RelatedProduct = ({ categoryId }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const dataResponse = await fetch(
      `${SummaryApi.categoryProduct.url}?page=${1}&limit=10`,
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: categoryId,
        }),
      }
    );

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      setProducts(dataApi.data);
    } else {
      toast.error(dataApi.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  return (
    <div className="mt-24">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold text-primary">
          Related Products
        </h1>
        <button className="primary-btn">View All</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 col-span-1 gap-8">
        {products.map((item, index) => (
          <ProductCardShop key={index} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
