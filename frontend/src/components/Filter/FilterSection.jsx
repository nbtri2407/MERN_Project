import React, { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import {
  priceFilter,
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
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../store/filterSlice";
import { clearFilters } from "../../store/filterSlice";
import SummaryApi from "../../common";

const FilterSection = () => {
  const [categories, setCategories] = useState([]);
  const fetchAllCategories = async () => {
    const dataResponse = await fetch(SummaryApi.allCategories.url, {
      method: "get",
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      setCategories(dataApi.data);
    } else {
      toast.error(dataApi.message);
    }
  };

  const state = useSelector((state) => state);
  const [filters, setFilters] = useState(state?.filter);
  const dispatch = useDispatch();

  const isAnyFilterActive = () => {
    return (
      filters?.price?.length > 0 ||
      filters?.category?.length > 0 ||
      filters?.length?.length > 0 ||
      filters?.handleLength?.length > 0 ||
      filters?.balancePoint?.length > 0 ||
      filters?.formatPlay?.length > 0 ||
      filters?.level?.length > 0 ||
      filters?.stiffness?.length > 0 ||
      filters?.stylePlay?.length > 0 ||
      filters?.swingweight?.length > 0 ||
      filters?.weight?.length > 0
    );
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    
  };

  useEffect(() => {
    setFilters(state?.filter);
  }, [state?.filter]);


  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full bg-white flex flex-col">
        <h1 className="p-2 mb-4 text-2xl text-primary border border-l-8 border-transparent border-l-primary">
          All Products
        </h1>
        {isAnyFilterActive() && (
          <button
            className="flex items-center px-1 py-2 gap-1 text-md text-primary"
            onClick={handleClearFilters}
          >
            <MdFilterAltOff className=" text-2xl" />
            <p className="">Clear Filters</p>
          </button>
        )}
      </div>
      <div className="w-full">
        {/* <HeadingFilter heading={"Price"} type={priceFilter} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Price</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {priceFilter.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.value}
                    onChange={() =>
                      dispatch(
                        setFilter({ filterName: "price", value: item.value })
                      )
                    }
                    checked={filters?.price?.includes(item.value)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"Brand"} type={categories} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Brand</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {categories.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item._id}
                    onChange={() =>
                      dispatch(
                        setFilter({ filterName: "category", value: item._id })
                      )
                    }
                    checked={filters?.category?.includes(item._id)}
                  />
                  <label>{item.categoryName}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"Length"} type={lengthList} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Length</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {lengthList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={() =>
                      dispatch(
                        setFilter({ filterName: "length", value: item.name })
                      )
                    }
                    checked={filters?.length?.includes(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"Handle Length"} type={handleLengthList} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Handle Length</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {handleLengthList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={() =>
                      dispatch(
                        setFilter({
                          filterName: "handleLength",
                          value: item.name,
                        })
                      )
                    }
                    checked={filters?.handleLength?.includes(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"SWINGWEIGHT"} type={swingweightList} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>SWINGWEIGHT</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {swingweightList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={() =>
                      dispatch(
                        setFilter({
                          filterName: "swingweight",
                          value: item.name,
                        })
                      )
                    }
                    checked={filters?.swingweight?.includes(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"WEIGHT"} type={weightList} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>WEIGHT</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {weightList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={() =>
                      dispatch(
                        setFilter({ filterName: "weight", value: item.name })
                      )
                    }
                    checked={filters?.weight?.includes(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"Balance Point"} type={balancePointList} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Balance Point</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {balancePointList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={() =>
                      dispatch(
                        setFilter({
                          filterName: "balancePoint",
                          value: item.name,
                        })
                      )
                    }
                    checked={filters?.balancePoint?.includes(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"stiffness"} type={stiffnessList} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Stiffness</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {stiffnessList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={() =>
                      dispatch(
                        setFilter({ filterName: "stiffness", value: item.name })
                      )
                    }
                    checked={filters?.stiffness?.includes(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"Style Play"} type={stylePlayList} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Style Play</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {stylePlayList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={() =>
                      dispatch(
                        setFilter({ filterName: "stylePlay", value: item.name })
                      )
                    }
                    checked={filters?.stylePlay?.includes(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"Format Play"} type={formatPlayList} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Format Play</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {formatPlayList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={() =>
                      dispatch(
                        setFilter({
                          filterName: "formatPlay",
                          value: item.name,
                        })
                      )
                    }
                    checked={filters?.formatPlay?.includes(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <HeadingFilter heading={"Level"} type={levelList} /> */}
        <div className="py-2 flex flex-col gap-2">
          <div className="w-full flex justify-between items-center text-xl">
            <p>Level</p>
          </div>
          <hr className="border border-black/50" />
          <div className="w-full max-h-40 overflow-y-auto">
            <div className="w-full flex flex-col gap-2">
              {levelList.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    value={item.name}
                    onChange={() =>
                      dispatch(
                        setFilter({ filterName: "level", value: item.name })
                      )
                    }
                    checked={filters?.level?.includes(item.name)}
                  />
                  <label>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
