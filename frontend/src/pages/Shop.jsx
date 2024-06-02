import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import ProductCardShop from "../components/ProductCard/ProductCardShop";
import FilterSection from "../components/Filter/FilterSection";
import { useSelector } from "react-redux";
import scrollTop from "../helper/scrollTop";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  // Pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };
  const [filterPrice, setFilterPrice] = useState("");
  const handleSortBy = (filterPrice) => {
    if (filterPrice === "") {
      setProducts((preve) => preve);
    }
    if (filterPrice === "asc") {
      setProducts((preve) =>
        preve.sort((a, b) => a.sellingPrice - b.sellingPrice)
      );
    }
    if (filterPrice === "dsc") {
      setProducts((preve) =>
        preve.sort((a, b) => b.sellingPrice - a.sellingPrice)
      );
    }
  };

  const state = useSelector((state) => state);
  const filters = state.filter;

  const fetchAllProducts = async () => {
    const params = new URLSearchParams();
    params.append("limit", 24);
    params.append("page", currentPage);

    if (filters.price.length) params.append("price", filters.price.join(","));
    if (filters.length.length)
      params.append("length", filters.length.join(","));
    if (filters.category.length)
      params.append("category", filters.category.join(","));
    if (filters.handleLength.length)
      params.append("handleLength", filters.handleLength.join(","));
    if (filters.balancePoint.length)
      params.append("balancePoint", filters.balancePoint.join(","));
    if (filters.formatPlay.length)
      params.append("formatPlay", filters.formatPlay.join(","));
    if (filters.level.length) params.append("level", filters.level.join(","));
    if (filters.stiffness.length)
      params.append("stiffness", filters.stiffness.join(","));
    if (filters.stylePlay.length)
      params.append("stylePlay", filters.stylePlay.join(","));
    if (filters.swingweight.length)
      params.append("swingweight", filters.swingweight.join(","));
    if (filters.weight.length)
      params.append("weight", filters.weight.join(","));
    if (filters.search.length) params.append("search", filters.search);

    const queryString = params.toString();
    navigate(`?${queryString}`);
    const dataResponse = await fetch(
      `${SummaryApi.allProducts.url}?${queryString}`,
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      }
    );
    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      setProducts(dataApi.data);
      setPagination(dataApi.pagination);
    } else {
      toast.error(dataApi.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    scrollTop()
  }, [currentPage, filters]);

  return (
    <div className="w-full relative">
      <div className="container mx-auto mt-[136px] mb-8 ">
        <div className="flex gap-8 items-baseline justify-between">
          {/* Filter */}
          <div className="xl:w-1/5 md:w-1/4 hidden lg:block">
            <FilterSection />
          </div>
          {openFilter && (
            <div className="absolute top-0 bottom-0 right-0 left-0 z-30 bg-black/30">
              <div className="w-full z-30 overflow-y-auto flex flex-row ">
                <div
                  className="flex-1 w-full min-h-full"
                  onClick={(e) => {
                    setOpenFilter(false);
                  }}
                ></div>
                <div className="w-1/2 md:w-1/3 px-2 bg-white relative">
                  <div className="absolute z-40 top-4 right-4">
                    <IoIosClose
                      className="text-2xl border hover:bg-primary hover:text-white cursor-pointer transition-all"
                      onClick={(e) => {
                        setOpenFilter(false);
                      }}
                    />
                  </div>
                  <FilterSection />
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1 ">
            <div className="flex items-center justify-between">
              <p className="text-lg text-slate-500">
                Selected Products: {pagination.totalItems}
              </p>
              <div className="flex items-center gap-2">
                {!openFilter ? (
                  <button
                    className="border p-2 lg:hidden"
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    <FaFilter />
                  </button>
                ) : (
                  <></>
                )}

                <select
                  defaultValue={""}
                  className="w-100 border rounded p-2"
                  value={filterPrice}
                  onChange={(e) => {
                    setFilterPrice(e.target.value);
                    handleSortBy(e.target.value);
                  }}
                >
                  <option value={""} selected>
                    Sort
                  </option>
                  <option value={"asc"}>Price: Low to High</option>
                  <option value={"dsc"}>Price: High to Low</option>
                </select>
              </div>
            </div>
            {pagination.totalItems > 0 ? (
              <div className="">
                {/* products */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-span-1 gap-8">
                  {products?.map((product) => (
                    <ProductCardShop product={product} key={product._id} />
                  ))}
                </div>
                {/* pagination */}
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pagination.totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={
                    "flex items-center justify-center gap-1 mt-8"
                  }
                  pageClassName={"px-3 py-1 border border-blue-400 "}
                  pageLinkClassName={"page-link"}
                  previousClassName={"px-3 py-1 border border-blue-400"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"px-3 py-1 border border-blue-400 "}
                  nextLinkClassName={"page-link"}
                  breakClassName={"px-3 py-1 border border-blue-400 "}
                  breakLinkClassName={"page-link"}
                  activeClassName={"bg-blue-400 text-white"}
                />
              </div>
            ):(
              <p className="text-center text-primary text-2xl mt-24">Product Empty</p>
            )
          }
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
