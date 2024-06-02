import React, { useEffect, useMemo, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import AddCategoryForm from "../../components/Form/AddCategoryForm";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import EditCategory from "../../components/Form/EditCategory";
import Paginate from "react-paginate";


const AllCategories = () => {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [editCategory, setEditCategory] = useState({
    categoryId: "",
    categoryName: "",
    description: "",
  });
  const [data, setData] = useState([]);

  const [pagination, setPagination] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllCategories = async () => {
    const dataResponse = await fetch(
      `${SummaryApi.allCategories.url}?page=${currentPage}&limit=${5}`,
      {
        method: "get",
        credentials: "include",
      }
    );

    const dataApi = await dataResponse.json(); 
    if (dataApi.status) {
      setData(dataApi.data);
      setPagination(dataApi.pagination);
    } else {
      toast.error(dataApi.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    const dataResponse = await fetch(`${SummaryApi.deleteCategory.url}`, {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      toast.success(dataApi.message);
      fetchAllCategories();
    } else {
      toast.error(dataApi.message);
    }
  };

  // Pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  useEffect(() => {
    fetchAllCategories();
  }, [currentPage]);

  return (
    <div>
      <div className="relative w-full flex justify-between items-center px-4">
        <h1 className="text-3xl font-semibold">
          All Categories ({pagination.totalItems})
        </h1>
        <button>
          <IoAddCircle
            className="text-3xl hover:text-red-500"
            onClick={() => setOpenAddCategory(true)}
          />
        </button>
        {openAddCategory && (
          <AddCategoryForm
            onClose={() => setOpenAddCategory(false)}
            callBack={fetchAllCategories}
          />
        )}
        {openEditCategory && (
          <EditCategory
            onClose={() => setOpenEditCategory(false)}
            callBack={fetchAllCategories}
            {...editCategory}
          />
        )}
      </div>
      <div className="w-full mt-12">
        <table className="w-full userTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Number of Products</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{category.categoryName}</td>
                  <td>{category.description}</td>
                  <td className="text-center">{category.products.length}</td>
                  <td className="">
                    <p
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => {
                        setEditCategory(category);
                        setOpenEditCategory(true);
                      }}
                    >
                      Edit
                    </p>
                    <p
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Paginate
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

export default AllCategories;
