import React from "react";
import NavCategoriesSlider from "../components/CategoriesWithSlide/NavCategoriesSlider";
import HorizontalView from "../components/HorizontalView/HorizontalView";
import banner from "../assets/banner4.png";
import BannerGroup from "../components/HorizontalView/BannerGroup";
import ServiceCardGroup from "../components/Services/ServiceCardGroup";

const Home = () => {
  return (
    <div className="container mx-auto">
      <NavCategoriesSlider />
      <HorizontalView title={"Flash Sales"} subtitle={"Today’s"} />

      <HorizontalView title={"Best Selling Products"} subtitle={"This Month"} />

      <div className="w-full">
        <img src={banner} alt="" className="w-full mt-8 lg:mt-16" />
      </div>
      <HorizontalView
        title={"Explore Our Products"}
        subtitle={"Our Products"}
      />
      <HorizontalView
        title={"Explore Our Products"}
        subtitle={"Our Products"}
      />
      <BannerGroup />
      <ServiceCardGroup />
    </div>
  );
};

export default Home;
