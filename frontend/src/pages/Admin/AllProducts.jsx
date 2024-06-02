import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import SummaryApi from "../../common";
import AddProductForm from "../../components/Form/AddProductForm";
import { MdDelete, MdModeEdit } from "react-icons/md";
import UpdateProductForm from "../../components/Form/UpdateProductForm";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import formatPrice from "../../helper/formatPrice";

const AllProducts = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [editProductDetail, setEditProductDetail] = useState({});
  
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  
  const [allProducts, setAllProducts] = useState([]);
  const fetchAllProducts = async () => {
    const dataResponse = await fetch(
      `${SummaryApi.allProducts.url}?page=${currentPage}&limit=${6}`,
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      setAllProducts(dataApi.data);
      setPagination(dataApi.pagination);
    } else {
      toast.error(dataApi.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const dataResponse = await fetch(SummaryApi.deleteProduct.url, {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: productId,
      }),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      toast.success(dataApi.message);
      fetchAllProducts();
    } else {
      toast.error(dataApi.message);
    }
  };

  // Pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [currentPage]);

  return (
    <div>
      <div className="relative w-full flex justify-between items-center px-4">
        <h1 className="text-3xl font-semibold">
          All Products ({pagination.totalItems})
        </h1>
        <button>
          <IoAddCircle
            className="text-3xl hover:text-red-500"
            onClick={() => setOpenAddProduct(true)}
          />
        </button>
        {openAddProduct && (
          <AddProductForm
            onClose={() => setOpenAddProduct(false)}
            callBack={fetchAllProducts}
          />
        )}
        {openEditProduct && (
          <UpdateProductForm
            _id={editProductDetail._id}
            productName={editProductDetail.productName}
            category={editProductDetail.category}
            level={editProductDetail.level}
            swingweight={editProductDetail.swingweight}
            handleLength={editProductDetail.handleLength}
            length={editProductDetail.length}
            stylePlay={editProductDetail.stylePlay}
            formatPlay={editProductDetail.formatPlay}
            stiffness={editProductDetail.stiffness}
            balancePoint={editProductDetail.balancePoint}
            weight={editProductDetail.weight}
            quantity={editProductDetail.quantity}
            price={editProductDetail.price}
            sellingPrice={editProductDetail.sellingPrice}
            productImage={editProductDetail.productImage}
            onClose={() => setOpenEditProduct(false)}
            callBack={fetchAllProducts}
          />
        )}
      </div>
      <div className="w-full mt-12">
        <table className="w-full userTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Selling Price</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td className="flex justify-center">
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="text-center">
                    {product.category.categoryName}
                  </td>
                  <td className="text-center">{product.quantity}</td>
                  <td className="text-center">
                    {formatPrice(product.sellingPrice)}
                  </td>
                  <td className="text-center">{formatPrice(product.price)}</td>
                  <td className="text-center">
                    <span
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => {
                        setOpenEditProduct(true);
                        setEditProductDetail(product);
                      }}
                    >
                      Edit
                    </span>
                    <span className="mx-2"></span>
                    <span
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pagination.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex items-center justify-center gap-1 mt-8"}
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
  );
};

export default AllProducts;
