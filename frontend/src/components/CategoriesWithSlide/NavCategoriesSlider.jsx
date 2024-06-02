import React, { useEffect, useState } from "react";
import SummaryApi from "../../common";
import SliderComponent from "./SliderComponent";
import { clearFilters, setFilter } from "../../store/filterSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavCategoriesSlider = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const fetchAllCategories = async () => {
    const dataResponse = await fetch(
      `${SummaryApi.allCategories.url}?page=1&limit=10`,
      {
        method: "get",
        credentials: "include",
      }
    );

    const dataApi = await dataResponse.json();

    if (dataApi.status) {
      setCategoriesList(dataApi.data);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  console.log(categoriesList);

  return (
    <div>
      <div className="container mx-auto flex gap-24 mt-[130px]">
        {/* Categories */}
        <div className="hidden xl:grid grid-cols-1 relative w-36 vr">
          {categoriesList.map((item, index) => (
            <div
              className="bg-white text-black hover:text-primary hover:bg-slate-200 transition-all cursor-pointer"
              key={"a" + index}
            >
              <h1
                className="p-2"
                onClick={() => {
                  navigator(`/shop`);
                  dispatch(clearFilters());
                  dispatch(
                    setFilter({
                      filterName: "category",
                      value: item._id,
                    })
                  );
                }}
              >
                {item.categoryName}
              </h1>
            </div>
          ))}
        </div>

        {/* Slider */}
        <div className="w-[80%] h-full flex-1">
          <SliderComponent />
        </div>
      </div>
    </div>
  );
};

export default NavCategoriesSlider;
