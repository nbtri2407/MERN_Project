import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import DisplayImage from "../DisplayImage/DisplayImage";
import uploadImage from "../../helper/uploadImage";
import {
  balancePointList,
  formatPlayList,
  handleLengthList,
  lengthList,
  levelList,
  stiffnessList,
  stylePlayList,
  swingweightList,
  weightList,
} from "../../data/data";

const UpdateProductForm = ({
  _id,
  productName,
  level,
  swingweight,
  handleLength,
  length,
  stylePlay,
  formatPlay,
  stiffness,
  balancePoint,
  weight,
  category,
  quantity,
  price,
  sellingPrice,
  productImage,
  onClose,
  callBack,
}) => {
  const [product, setProduct] = useState({
    _id,
    productName,
    level,
    swingweight,
    handleLength,
    length,
    stylePlay,
    formatPlay,
    stiffness,
    balancePoint,
    weight,
    category,
    quantity,
    price,
    sellingPrice,
    productImage,
  });

  console.log("product", product);

  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const [categoriesList, setCategoriesList] = useState([]);

  const fetchAllCategories = async () => {
    const dataResponse = await fetch(SummaryApi.allCategories.url, {
      method: "get",
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    console.log("dataApi", dataApi);
    if (dataApi.status) {
      setCategoriesList(dataApi.data);
    } else {
      toast.error(dataApi.message);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setProduct((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...product.productImage];
    newProductImage.splice(index, 1);
    setProduct((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const fetchData = await fetch(SummaryApi.editProduct.url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const dataApi = await fetchData.json();

    if (dataApi.status) {
      toast.success(dataApi.message);
      callBack();
      onClose();
    } else {
      toast.error(dataApi.message);
    }
  };
  return (
    <div className="absolute z-10 top-0 left-[50%] translate-x-[-50%] flex flex-col gap-2 w-[50%] p-4 shadow bg-white border">
      <button
        className="block ml-auto text-2xl border border-black/20 text-primary hover:bg-primary hover:text-white transition-all"
        onClick={onClose}
      >
        <IoMdClose />
      </button>
      <h1 className="text-2xl">Update Product</h1>
      {/* Name and Category */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="productName">Product Name</label>
          <input
            className=" border border-black/50 p-2 rounded outline-none"
            type="text"
            name="productName"
            id="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <label htmlFor="category">Brand</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="category"
            id="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Brand</option>
            {categoriesList.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.categoryName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* Quantity and Price */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="quantity">Quantity</label>
          <input
            className=" border border-black/50 p-2 rounded outline-none"
            type="number"
            name="quantity"
            id="quantity"
            value={product.quantity}
            onChange={handleChange}
            min={1}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="price">Price</label>
          <input
            className=" border border-black/50 p-2 rounded outline-none"
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
            min={1}
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full relative">
          <label htmlFor="sellingPrice">Selling Price</label>
          <input
            className=" border border-black/50 p-2 rounded outline-none"
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            value={product.sellingPrice}
            min={1}
            onChange={handleChange}
          />
          <p className="absolute top-0 right-0 text-red-500 text-end">
            {product.price - product.sellingPrice < 0
              ? "!!!!Selling price > price"
              : -Math.round(
                  100 - (product.sellingPrice / product.price) * 100
                ) + "%"}
          </p>
        </div>
      </div>
      {/* Handle Length and Length and Weight */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="handleLength">Handle Length</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="handleLength"
            id="handleLength"
            value={product.handleLength}
            onChange={handleChange}
            required
          >
            <option value="">Select Handle Length</option>
            {handleLengthList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="length">Length</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="length"
            id="length"
            value={product.length}
            onChange={handleChange}
            required
          >
            <option value="">Select Length</option>
            {lengthList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="swingweight">Swing Weight</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="swingweight"
            id="swingweight"
            value={product.swingweight}
            onChange={handleChange}
            required
          >
            <option value="">Select Swing Weight</option>
            {swingweightList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="stiffness">Stiffness</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="stiffness"
            id="stiffness"
            value={product.stiffness}
            onChange={handleChange}
            required
          >
            <option value="">Select Stiffness</option>
            {stiffnessList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="formatPlay">Format Play</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="formatPlay"
            id="formatPlay"
            value={product.formatPlay}
            onChange={handleChange}
            required
          >
            <option value="">Select Format Play</option>
            {formatPlayList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="stylePlay">Style Play</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="stylePlay"
            id="stylePlay"
            value={product.stylePlay}
            onChange={handleChange}
            required
          >
            <option value="">Select Style Play</option>
            {stylePlayList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="level">Level</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="level"
            id="level"
            value={product.level}
            onChange={handleChange}
            required
          >
            <option value="">Select Level</option>
            {levelList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="weight">Weight</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="weight"
            id="weight"
            value={product.weight}
            onChange={handleChange}
            required
          >
            <option value="">Select Weight</option>
            {weightList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="balancePoint">Balance Point</label>
          <select
            className="border border-black/50 p-2 rounded outline-none"
            name="balancePoint"
            id="balancePoint"
            value={product.balancePoint}
            onChange={handleChange}
            required
          >
            <option value="">Select Balance Point</option>
            {balancePointList.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="productImage" className="">
          Product Image:
        </label>
        <label htmlFor="uploadImageInput">
          <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
              <span className="text-4xl">
                <FaCloudUploadAlt />
              </span>
              <p className="text-sm">Upload Product Image</p>
              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                onChange={handleUploadImage}
              />
            </div>
          </div>
        </label>
      </div>
      <div>
        {product?.productImage[0] ? (
          <div className="flex items-center gap-2">
            {product.productImage.map((el, index) => {
              return (
                <div className="relative group">
                  <img
                    src={el}
                    alt={el}
                    width={80}
                    height={80}
                    className="bg-slate-100 border cursor-pointer"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(el);
                    }}
                  />
                  <div
                    className="absolute top-1 right-0.5 cursor-pointer text-red-600 hidden group-hover:block"
                    onClick={() => {
                      handleDeleteProductImage(index);
                    }}
                  >
                    <MdDelete />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-red-600 text-xs">*Please Upload Product Image</p>
        )}
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
      <button className="primary-btn" onClick={handleUpdateProduct}>
        Update
      </button>
    </div>
  );
};

export default UpdateProductForm;
